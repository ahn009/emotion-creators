import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { requireDb } from '@/lib/firebase';
import { sanitizeText } from '@/shared/lib/sanitize';
import type { MessageData, TemplateType } from '@/shared/types/message';

const MESSAGES_COLLECTION = 'messages';

export interface CreateMessageInput {
  template: TemplateType;
  senderName: string;
  recipientName: string;
  messageBody: string;
  customColor?: string;
  musicMood?: string;
  userId?: string | null;
  isPremium?: boolean;
}

export interface FirestoreMessage {
  id: string;
  template: TemplateType;
  senderName: string;
  recipientName: string;
  messageBody: string;
  customColor?: string;
  musicMood?: string;
  createdAt: Timestamp | null;
  viewCount: number;
  isPremium: boolean;
  userId?: string | null;
}

const normalizeTemplate = (template: TemplateType): TemplateType => {
  if (template === 'congratulations') return 'congrats';
  if (template === 'encouragement') return 'motivation';
  if (template === 'miss-you') return 'missing-you';
  return template;
};

const renderTemplate = (template: TemplateType): TemplateType => {
  if (template === 'congratulations') return 'congrats';
  if (template === 'encouragement') return 'motivation';
  if (template === 'miss-you') return 'missing-you';
  return template;
};

const toFirestoreMessage = (
  snapshot: QueryDocumentSnapshot<DocumentData> | { id: string; data: () => DocumentData }
): FirestoreMessage => {
  const data = snapshot.data();

  return {
    id: data.id ?? snapshot.id,
    template: (data.template ?? 'love') as TemplateType,
    senderName: data.senderName ?? '',
    recipientName: data.recipientName ?? '',
    messageBody: data.messageBody ?? '',
    customColor: data.customColor,
    musicMood: data.musicMood,
    createdAt: data.createdAt instanceof Timestamp ? data.createdAt : null,
    viewCount: typeof data.viewCount === 'number' ? data.viewCount : 0,
    isPremium: Boolean(data.isPremium),
    userId: data.userId ?? null,
  };
};

export const toMessageData = (message: FirestoreMessage): MessageData => ({
  id: message.id,
  slug: message.id,
  template: renderTemplate(message.template),
  data: {
    sender: message.senderName,
    receiver: message.recipientName,
    message: message.messageBody,
    musicEnabled: Boolean(message.musicMood),
  },
  createdAt: message.createdAt?.toDate().toISOString() ?? new Date().toISOString(),
  views: message.viewCount,
  isPremium: message.isPremium,
  userId: message.userId ?? null,
});

export const createMessageDocument = async (input: CreateMessageInput): Promise<string> => {
  const db = requireDb();
  const id = uuidv4();
  const messageRef = doc(db, MESSAGES_COLLECTION, id);

  await setDoc(messageRef, {
    id,
    template: normalizeTemplate(input.template),
    senderName: sanitizeText(input.senderName.trim()),
    recipientName: sanitizeText(input.recipientName.trim()),
    messageBody: sanitizeText(input.messageBody.trim()),
    customColor: input.customColor,
    musicMood: input.musicMood,
    createdAt: serverTimestamp(),
    viewCount: 0,
    isPremium: input.isPremium ?? false,
    userId: input.userId ?? null,
  });

  return id;
};

export const getMessageDocument = async (id: string): Promise<FirestoreMessage | null> => {
  const db = requireDb();
  const messageRef = doc(db, MESSAGES_COLLECTION, id);
  const snapshot = await getDoc(messageRef);

  if (!snapshot.exists()) return null;

  return toFirestoreMessage({ id: snapshot.id, data: () => snapshot.data() });
};

export const incrementMessageViewCount = async (id: string): Promise<void> => {
  const db = requireDb();
  const messageRef = doc(db, MESSAGES_COLLECTION, id);
  await updateDoc(messageRef, { viewCount: increment(1) });
};

export const listUserMessages = async (userId: string): Promise<MessageData[]> => {
  const db = requireDb();
  const messagesQuery = query(
    collection(db, MESSAGES_COLLECTION),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(messagesQuery);

  return snapshot.docs.map((documentSnapshot) => toMessageData(toFirestoreMessage(documentSnapshot)));
};

export const deleteMessageDocument = async (id: string): Promise<void> => {
  const db = requireDb();
  await deleteDoc(doc(db, MESSAGES_COLLECTION, id));
};

export const markMessagePremium = async (id: string): Promise<void> => {
  const db = requireDb();
  await updateDoc(doc(db, MESSAGES_COLLECTION, id), { isPremium: true });
};
