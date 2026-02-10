// Preview Page - Live preview before generating the link

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageShell } from '@/components/layout';
import { Container } from '@/components/common';
import { TemplatePreview } from '@/features/templates/components';
import { Button } from '@/components/ui/button';
import { useMessageStore } from '@/features/messages/stores/messageStore';
import { useUIStore } from '@/shared/stores/uiStore';
import { getShareUrl, copyToClipboard } from '@/shared/lib/share';
import { ROUTES } from '@/shared/config';
import { getMessageUrl } from '@/shared/lib/share';
import { MessageData } from '@/features/messages/types/message.types';
import { ArrowLeft, Check, Copy, ExternalLink, Share } from 'lucide-react';

const PreviewPage = () => {
  const navigate = useNavigate();
  const { formData, currentTemplate, createMessage, generatedSlug } = useMessageStore();
  const { showToast } = useUIStore();
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState<MessageData | null>(null);

  // Create a preview message object
  useEffect(() => {
    if (!formData.sender || !formData.receiver || !formData.message) {
      navigate(ROUTES.CREATE);
      return;
    }

    // Create preview message data
    const previewMessage: MessageData = {
      id: 'preview',
      slug: 'preview',
      template: currentTemplate,
      data: {
        sender: formData.sender,
        receiver: formData.receiver,
        message: formData.message,
      },
      createdAt: new Date().toISOString(),
      views: 0,
    };
    
    setMessage(previewMessage);
  }, [formData, currentTemplate, navigate]);

  const handlePublish = () => {
    const newMessage = createMessage();
    showToast({ message: 'Your message page is ready!', type: 'success' });
  };

  const handleCopyLink = async () => {
    if (generatedSlug) {
      const url = getShareUrl(generatedSlug);
      const success = await copyToClipboard(url);
      if (success) {
        setCopied(true);
        showToast({ message: 'Link copied to clipboard!', type: 'success' });
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const handleViewPage = () => {
    if (generatedSlug) {
      navigate(getMessageUrl(generatedSlug));
    }
  };

  if (!message) {
    return null;
  }

  return (
    <PageShell showNavbar={!generatedSlug}>
      <div className="min-h-screen">
        {!generatedSlug ? (
          // Preview mode before publishing
          <div className="relative">
            {/* Preview header */}
            <div className="fixed top-16 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
              <Container>
                <div className="flex items-center justify-between h-16">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(ROUTES.CREATE)}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Edit
                  </Button>
                  
                  <span className="text-sm text-text-muted">Preview Mode</span>
                  
                  <Button
                    variant="gradient"
                    size="sm"
                    onClick={handlePublish}
                  >
                    Publish & Get Link
                  </Button>
                </div>
              </Container>
            </div>

            {/* Preview content */}
            <div className="pt-16">
              <TemplatePreview message={message} />
            </div>
          </div>
        ) : (
          // Success state after publishing
          <div className="flex items-center justify-center min-h-screen py-20">
            <Container size="sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 rounded-3xl text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-10 h-10 text-white" />
                </motion.div>

                <h1 className="font-display text-3xl font-bold mb-2">
                  Your Page is Live! 🎉
                </h1>
                <p className="text-text-secondary mb-8">
                  Share this link with someone special
                </p>

                {/* Link display */}
                <div className="bg-glass-bg rounded-xl p-4 mb-6 flex items-center gap-3">
                  <input
                    type="text"
                    readOnly
                    value={getShareUrl(generatedSlug)}
                    className="flex-1 bg-transparent text-sm text-text-secondary truncate outline-none"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopyLink}
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="gradient"
                    className="flex-1"
                    onClick={handleCopyLink}
                  >
                    <Share className="w-4 h-4" />
                    Copy Link
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleViewPage}
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Page
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  className="mt-6"
                  onClick={() => {
                    useMessageStore.getState().resetForm();
                    navigate(ROUTES.CREATE);
                  }}
                >
                  Create Another
                </Button>
              </motion.div>
            </Container>
          </div>
        )}
      </div>
    </PageShell>
  );
};

export default PreviewPage;
