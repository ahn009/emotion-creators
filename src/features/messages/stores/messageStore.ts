// src/features/messages/stores/messageStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { TemplateType, MessageData } from '@/shared/types';
import { v4 as uuidv4 } from 'uuid';

// Define FormData locally since it's not in shared types
interface FormData {
  sender: string;
  receiver: string;
  message: string;
  options: Record<string, any>;
}

interface MessageState {
  currentTemplate: TemplateType;
  formData: FormData;
  generatedSlug: string | null;
  messages: MessageData[];
  _hasHydrated: boolean;

  setTemplate: (template: TemplateType) => void;
  setFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
  createMessage: () => MessageData;
  getMessage: (slug: string) => MessageData | undefined;
  deleteMessage: (id: string) => void;
  setHasHydrated: (state: boolean) => void;
}

const initialFormData: FormData = {
  sender: '',
  receiver: '',
  message: '',
  options: {},
};

const slugify = (sender: string, receiver: string): string => {
  const base = `for-${receiver.toLowerCase().replace(/\s+/g, '-')}`;
  const suffix = uuidv4().slice(0, 8);
  return `${base}-${suffix}`;
};

export const useMessageStore = create<MessageState>()(
  persist(
    (set, get) => ({
      currentTemplate: 'love',
      formData: initialFormData,
      generatedSlug: null,
      messages: [],
      _hasHydrated: false,

      setTemplate: (template) => set({ currentTemplate: template }),

      setFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
      })),

      resetForm: () => set({
        formData: initialFormData,
        generatedSlug: null
      }),

      createMessage: () => {
        const state = get();
        const slug = slugify(state.formData.sender, state.formData.receiver);

        const newMessage: MessageData = {
          id: uuidv4(),
          slug,
          template: state.currentTemplate,
          data: {
            sender: state.formData.sender,
            receiver: state.formData.receiver,
            message: state.formData.message,
            ...state.formData.options,
          },
          createdAt: new Date().toISOString(),
          views: 0,
        };

        set((state) => ({
          messages: [...state.messages, newMessage],
          generatedSlug: slug,
        }));

        return newMessage;
      },

      getMessage: (slug) => {
        return get().messages.find((m) => m.slug === slug);
      },

      deleteMessage: (id) => {
        set((state) => ({
          messages: state.messages.filter((m) => m.id !== id),
        }));
      },

      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'emotion-creator-messages',
      storage: createJSONStorage(() => localStorage),
      skipHydration: false,
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
    }
  )
);

// FIXED: Create the hydration hook
export const useMessageStoreHydrated = () => {
  return useMessageStore((state) => state._hasHydrated);
};