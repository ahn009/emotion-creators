// Public Message Page - renders the shared message

import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TemplatePreview } from '@/features/templates/components/TemplatePreview';
import { useMessageStore } from '@/features/messages/stores/messageStore';
import { SEO } from '@/components/common';
import { ROUTES } from '@/shared/config';

const MessagePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMessage } = useMessageStore();

  const message = id ? getMessage(id) : undefined;

  useEffect(() => {
    if (!message && id) {
      // Message not found, redirect to 404
      navigate('/not-found', { replace: true });
    }
  }, [message, id, navigate]);

  if (!message) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Shared Message - EmotionCreator"
        description="View a heartfelt message created with EmotionCreator."
        noIndex
      />
      <TemplatePreview message={message} />
    </>
  );
};

export default MessagePage;
