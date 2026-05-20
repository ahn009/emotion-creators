import { useCallback } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { requireDb } from '@/lib/firebase';

type AnalyticsEvent =
  | 'page_view'
  | 'message_created'
  | 'message_shared'
  | 'signup_attempted'
  | 'message_viewed';

interface EventPayload {
  page?: string;
  template?: string;
  share_channel?: string;
  message_id?: string;
}

export const useAnalytics = () => {
  const track = useCallback(async (event: AnalyticsEvent, payload: EventPayload = {}) => {
    try {
      const db = requireDb();
      await addDoc(collection(db, 'analytics'), {
        event,
        ...payload,
        timestamp: serverTimestamp(),
        referrer: typeof document !== 'undefined' ? document.referrer : null,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      });
    } catch {
      // Analytics errors must not affect app
    }
  }, []);

  return { track };
};
