import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Copy, ExternalLink, MessageCircle, Send, Sparkles, Twitter } from 'lucide-react';
import { toast } from 'sonner';
import { PageShell } from '@/components/layout';
import { Container, SEO } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ROUTES } from '@/shared/config';
import { useAuth } from '@/features/auth';
import { buildShareUrl } from '@/shared/lib/utm';

const CreateSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const { user } = useAuth();
  const id = searchParams.get('id') ?? '';

  const shareUrl = useMemo(() => {
    if (!id) return '';
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://emotion-creators.vercel.app';
    return `${origin}/m/${id}`;
  }, [id]);

  const whatsappUrl = useMemo(() => {
    if (!id) return '';
    const url = buildShareUrl(id, 'whatsapp');
    return `https://wa.me/?text=${encodeURIComponent(`I made you a personal message: ${url}`)}`;
  }, [id]);

  const twitterUrl = useMemo(() => {
    if (!id) return '';
    const url = buildShareUrl(id, 'twitter');
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(`I made you something special 💌`)}&url=${encodeURIComponent(url)}`;
  }, [id]);

  const facebookUrl = useMemo(() => {
    if (!id) return '';
    const url = buildShareUrl(id, 'facebook');
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  }, [id]);

  const telegramUrl = useMemo(() => {
    if (!id) return '';
    const url = buildShareUrl(id, 'telegram');
    return `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent('I made you a personal message 💌')}`;
  }, [id]);

  const handleCopy = async () => {
    if (!shareUrl) return;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied');
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Could not copy the link');
    }
  };

  const handleUpgrade = async () => {
    setIsUpgrading(true);
    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId: id }),
      });
      const result = await response.json() as { url?: string; error?: string };

      if (!response.ok || !result.url) {
        throw new Error(result.error || 'Could not start checkout');
      }

      window.location.href = result.url;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not start checkout';
      toast.error(message);
      setIsUpgrading(false);
    }
  };

  if (!id) {
    return (
      <PageShell>
        <SEO
          title="Message Not Found — EmotionCreator"
          description="Create a free digital message with EmotionCreator."
          noIndex
        />
        <Container className="min-h-[70vh] flex items-center justify-center py-24">
          <Card className="max-w-md p-8 text-center">
            <h1 className="text-2xl font-bold mb-3">Missing message link</h1>
            <p className="text-muted-foreground mb-6">
              Create a new message to get a shareable link.
            </p>
            <Button asChild>
              <Link to={ROUTES.CREATE}>Create a Message</Link>
            </Button>
          </Card>
        </Container>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <SEO
        title="Your Message Is Ready — EmotionCreator"
        description="Copy and share your personal EmotionCreator message link."
        noIndex
      />
      <Container size="md" className="min-h-[80vh] flex items-center justify-center py-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl text-center"
        >
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300 mb-6">
            <Check className="h-8 w-8" />
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Your message is ready
          </h1>
          <p className="text-text-secondary text-lg mb-8">
            Share this private link with the person it was made for.
          </p>

          <Card className="p-4 bg-card/80 border-glass-border">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                readOnly
                value={shareUrl}
                className="min-w-0 flex-1 rounded-lg border border-glass-border bg-background/50 px-4 py-3 text-sm text-foreground outline-none"
                onFocus={(event) => event.currentTarget.select()}
              />
              <Button onClick={handleCopy} variant="gradient" className="gap-2">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </Card>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Button asChild variant="outline" size="lg" className="gap-2">
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <a href={twitterUrl} target="_blank" rel="noreferrer">
                <Twitter className="h-4 w-4" />
                X / Twitter
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <a href={telegramUrl} target="_blank" rel="noreferrer">
                <Send className="h-4 w-4" />
                Telegram
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <a href={facebookUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="h-4 w-4" />
                Facebook
              </a>
            </Button>
          </div>

          <div className="mt-4">
            <Button size="lg" className="w-full gap-2" onClick={() => navigate(`/m/${id}`)}>
              <ExternalLink className="h-4 w-4" />
              Preview your message
            </Button>
          </div>

          {!user && (
            <div className="mt-5 text-sm text-text-secondary">
              <Link to="/signin" className="text-primary hover:underline">
                Sign in to manage all your messages
              </Link>
            </div>
          )}

          <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/10 p-5 text-left">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Upgrade this message to Premium</p>
                <p className="text-sm text-text-secondary mt-1">
                  Remove branding and unlock extras for $2.99.
                </p>
              </div>
              </div>
              <Button onClick={handleUpgrade} disabled={isUpgrading} className="shrink-0">
                {isUpgrading ? 'Starting...' : 'Upgrade $2.99'}
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </PageShell>
  );
};

export default CreateSuccessPage;
