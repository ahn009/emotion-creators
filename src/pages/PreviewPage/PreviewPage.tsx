// src/pages/PreviewPage/PreviewPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMessageStore, useMessageStoreHydrated } from '@/features/messages/stores/messageStore';
import { TemplatePreview } from '@/features/templates/components/TemplatePreview';
import { MessageData } from '@/features/messages/types/message.types';
import { ROUTES } from '@/shared/config';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, ExternalLink, Check, Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const PreviewPage = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState<MessageData | null>(null);

  const hasHydrated = useMessageStoreHydrated();
  const { formData, currentTemplate, generatedSlug, createMessage } = useMessageStore();

  // Hook is now called unconditionally (before any early returns)
  useEffect(() => {
    if (!hasHydrated) return;

    if (!formData.sender || !formData.receiver || !formData.message) {
      toast.info('Please create a message first');
      navigate(ROUTES.CREATE, { replace: true });
      return;
    }

    const previewMessage: MessageData = {
      id: 'preview',
      slug: 'preview',
      template: currentTemplate,
      data: {
        sender: formData.sender,
        receiver: formData.receiver,
        message: formData.message,
        aiEnhanced: formData.options?.aiEnhanced,
        musicEnabled: formData.options?.musicEnabled,
      },
      createdAt: new Date().toISOString(),
      views: 0,
    };
    setMessage(previewMessage);
  }, [hasHydrated, formData, currentTemplate, navigate]);

  // Loading state while hydrating or building preview
  if (!hasHydrated || !message) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">
            {!hasHydrated ? 'Loading preview...' : 'Preparing preview...'}
          </p>
        </div>
      </div>
    );
  }

  const handlePublish = () => {
    createMessage();
    toast.success('Your message page is ready!');
  };

  const handleCopyLink = async () => {
    if (generatedSlug) {
      const url = `${window.location.origin}/message/${generatedSlug}`;
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        toast.success('Link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        toast.error('Failed to copy link');
      }
    }
  };

  const handleViewPage = () => {
    if (generatedSlug) {
      navigate(`/message/${generatedSlug}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {!generatedSlug ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Preview Your Message</h1>
              <p className="text-muted-foreground">
                This is how your message will look to {formData.receiver}
              </p>
            </div>

            <Card className="overflow-hidden shadow-2xl">
              <TemplatePreview message={message} />
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" onClick={() => navigate(ROUTES.CREATE)}>
                Edit Message
              </Button>
              <Button onClick={handlePublish} className="gap-2">
                <Sparkles className="h-4 w-4" />
                Publish & Share
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>

            <h2 className="text-3xl font-bold">Your Page is Live! 🎉</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Share this link with someone special
            </p>

            <Card className="p-4 max-w-md mx-auto">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={`${window.location.origin}/message/${generatedSlug}`}
                  className="flex-1 bg-transparent border-none outline-none text-sm text-muted-foreground"
                />
                <Button size="sm" variant="ghost" onClick={handleCopyLink}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="outline" onClick={handleCopyLink} className="gap-2">
                <Copy className="h-4 w-4" />
                {copied ? 'Copied!' : 'Copy Link'}
              </Button>
              <Button onClick={handleViewPage} className="gap-2">
                <ExternalLink className="h-4 w-4" />
                View Page
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PreviewPage;
