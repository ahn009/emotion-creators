import { httpsCallable, getFunctions } from 'firebase/functions';
import { app } from '@/lib/firebase';

interface InvitePayload {
  friendName: string;
  friendEmail: string;
  senderName: string;
}

/**
 * Sends an invite email to a friend.
 *
 * Attempts to call the `sendInviteEmail` Firebase Cloud Function.
 * If Cloud Functions are not deployed yet, falls back to a local
 * simulation that logs the email payload for development purposes.
 *
 * To deploy the real function, create a Cloud Function named
 * `sendInviteEmail` that accepts { friendName, friendEmail, senderName }
 * and sends an email with the following content:
 *
 * Subject: Your friend invited you to EmotionCreator
 * Body:
 *   Hi {friendName},
 *
 *   {senderName} is using EmotionCreator and invited you to try it.
 *
 *   EmotionCreator lets you create emotional messages, surprises, and more.
 *
 *   Visit EmotionCreator: https://emotioncreator.com
 */
export async function sendInviteEmail(payload: InvitePayload): Promise<void> {
  try {
    const functions = getFunctions(app);
    const callable = httpsCallable(functions, 'sendInviteEmail');
    await callable(payload);
  } catch (error: unknown) {
    const firebaseError = error as { code?: string };
    // If Cloud Functions not deployed, use fallback
    if (
      firebaseError.code === 'functions/not-found' ||
      firebaseError.code === 'functions/unavailable' ||
      firebaseError.code === 'functions/internal'
    ) {
      console.info(
        '[InviteService] Cloud Function not deployed. Using local fallback.'
      );
      await sendInviteEmailFallback(payload);
      return;
    }
    throw error;
  }
}

/**
 * Fallback: opens the user's email client with a pre-filled invite email.
 * This works without any backend and gives the user a real action to send.
 */
async function sendInviteEmailFallback(payload: InvitePayload): Promise<void> {
  const { friendName, friendEmail, senderName } = payload;

  const subject = encodeURIComponent(
    'Your friend invited you to EmotionCreator'
  );
  const body = encodeURIComponent(
    `Hi ${friendName},\n\n` +
    `${senderName} is using EmotionCreator and invited you to try it.\n\n` +
    `EmotionCreator lets you create emotional messages, surprises, and more.\n\n` +
    `Visit EmotionCreator: ${window.location.origin}\n\n` +
    `See you there!`
  );

  const mailtoLink = `mailto:${encodeURIComponent(friendEmail)}?subject=${subject}&body=${body}`;

  window.open(mailtoLink, '_blank');

  // Simulate async operation for consistent UX
  await new Promise((resolve) => setTimeout(resolve, 500));
}
