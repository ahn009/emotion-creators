// Public Message Page - renders the shared message

import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TemplatePreview } from '@/features/templates/components/TemplatePreview';
import { SEO } from '@/components/common';
import {
  getMessageDocument,
  incrementMessageViewCount,
  toMessageData,
  type FirestoreMessage,
} from '@/features/messages/api/firestoreMessages';
import type { MessageData } from '@/shared/types';

const SITE_URL = 'https://emotion-creators.vercel.app';

const MessagePage = () => {
  const { slug, id } = useParams<{ slug?: string; id?: string }>();
  const messageId = slug ?? id ?? '';
  const [message, setMessage] = useState<MessageData | null>(null);
  const [firestoreMessage, setFirestoreMessage] = useState<FirestoreMessage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const hasIncrementedRef = useRef(false);

  const ogImage = useMemo(() => {
    const template = firestoreMessage?.template ?? 'love';
    return `${SITE_URL}/og/${template}.png`;
  }, [firestoreMessage?.template]);

  useEffect(() => {
    if (!messageId) {
      setNotFound(true);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    const loadMessage = async () => {
      try {
        const documentMessage = await getMessageDocument(messageId);

        if (cancelled) return;

        if (!documentMessage) {
          setNotFound(true);
          setMessage(null);
          return;
        }

        setFirestoreMessage(documentMessage);
        setMessage(toMessageData(documentMessage));

        if (!hasIncrementedRef.current) {
          hasIncrementedRef.current = true;
          incrementMessageViewCount(messageId).catch((error) => {
            console.warn('Could not increment view count:', error);
          });
        }
      } catch (error) {
        console.error('Could not load message:', error);
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadMessage();

    return () => {
      cancelled = true;
    };
  }, [messageId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-text-muted">Opening your message...</p>
        </div>
      </div>
    );
  }

  if (notFound || !message) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <SEO
          title="Message Not Found — EmotionCreator"
          description="This message has expired or doesn't exist."
          noIndex
        />
        <div className="max-w-md text-center">
          <h1 className="font-display text-3xl font-bold mb-3">
            This message has expired or doesn't exist
          </h1>
          <p className="text-text-secondary mb-6">
            The link may have been mistyped or the message may have been removed.
          </p>
          <Link
            to="/create"
            className="inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Make yours free
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${message.data.sender} sent you a message — EmotionCreator`}
        description="Open to see a personal message created just for you."
        ogTitle={`${message.data.sender} sent you something special 💌`}
        ogDescription="Tap to open your personal message"
        ogImage={ogImage}
        noIndex
      />
      <TemplatePreview message={message} />
      {!message.isPremium && (
        <div className="relative z-20 border-t border-white/10 bg-background/95 px-4 py-5 text-center backdrop-blur">
          <Link
            to="/create"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Created with EmotionCreator ✨ — Make yours free →
          </Link>
        </div>
      )}
    </>
  );
};

export default MessagePage;
