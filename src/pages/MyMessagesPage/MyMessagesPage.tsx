import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageShell } from '@/components/layout';
import { Container } from '@/components/common';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/shared/config/constants';
import { useMessageStore } from '@/features/messages/stores/messageStore';
import { useAuth } from '@/features/auth';
import {
  FileText,
  Sparkles,
  ExternalLink,
  Calendar,
  Eye,
  Trash2,
  MessageCircle,
  Heart,
  Share2,
  Copy,
  CheckCircle2,
} from 'lucide-react';
import { TEMPLATES } from '@/features/templates/constants';
import { toast } from 'sonner';

const MyMessagesPage = () => {
  const { user } = useAuth();
  const messages = useMessageStore((s) => s.messages);
  const deleteMessage = useMessageStore((s) => s.deleteMessage);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const getTemplateInfo = (templateId: string) => {
    return TEMPLATES.find((t) => t.id === templateId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleDelete = (id: string) => {
    deleteMessage(id);
    setConfirmDeleteId(null);
    toast.success('Message deleted');
  };

  const handleCopyLink = (slug: string) => {
    const url = `${window.location.origin}${ROUTES.MESSAGE}/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    toast.success('Link copied to clipboard');
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <PageShell>
      <div className="py-24 md:py-32">
        <Container size="lg">
          {/* ── Hero Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">
              My Messages
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
              Every message you create lives here. Review your heartfelt
              creations, share them with the people who matter most, or remove
              the ones you no longer need. Your emotional journey, all in one
              place.
            </p>
          </motion.div>

          {/* ── Stats Bar ── */}
          {messages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center justify-center gap-6 mb-12"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-glass-bg border border-glass-border">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm text-text-secondary">
                  <strong className="text-foreground">{messages.length}</strong>{' '}
                  {messages.length === 1 ? 'message' : 'messages'} created
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-glass-bg border border-glass-border">
                <Eye className="w-4 h-4 text-primary" />
                <span className="text-sm text-text-secondary">
                  <strong className="text-foreground">
                    {messages.reduce((sum, m) => sum + m.views, 0)}
                  </strong>{' '}
                  total views
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-glass-bg border border-glass-border">
                <Heart className="w-4 h-4 text-rose-400" />
                <span className="text-sm text-text-secondary">
                  <strong className="text-foreground">
                    {new Set(messages.map((m) => m.template)).size}
                  </strong>{' '}
                  emotions used
                </span>
              </div>
            </motion.div>
          )}

          <div className="max-w-3xl mx-auto">
            {messages.length === 0 ? (
              /* ── Empty State ── */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="glass-card rounded-3xl p-10 md:p-16 text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-8">
                  <FileText className="w-10 h-10 text-primary" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">
                  Your message board is empty
                </h2>
                <p className="text-text-secondary text-lg mb-4 max-w-md mx-auto leading-relaxed">
                  You haven't created any messages yet. EmotionCreator makes it
                  effortless to craft beautiful, personalized messages for the
                  people you care about.
                </p>
                <p className="text-text-muted mb-10 max-w-md mx-auto">
                  Choose from 9 unique emotion templates — love, gratitude,
                  birthday wishes, encouragement, and more. Each template is
                  designed with its own distinct style to perfectly match the
                  feeling you want to express.
                </p>
                <Link to={ROUTES.CREATE}>
                  <Button variant="gradient" size="lg" className="gap-2">
                    <Sparkles className="w-5 h-5" />
                    Create Your First Message
                  </Button>
                </Link>

                {/* Quick template suggestions */}
                <div className="mt-12 pt-8 border-t border-glass-border">
                  <p className="text-sm text-text-muted mb-5">
                    Popular starting points
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {TEMPLATES.slice(0, 5).map((t) => (
                      <Link key={t.id} to={ROUTES.CREATE}>
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass-bg border border-glass-border text-sm text-text-secondary hover:text-foreground hover:border-primary/30 transition-all">
                          <span>{t.icon}</span>
                          {t.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ── Messages List ── */
              <div className="space-y-5">
                {/* Create new CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-end mb-2"
                >
                  <Link to={ROUTES.CREATE}>
                    <Button variant="gradient" size="sm" className="gap-2">
                      <Sparkles className="w-4 h-4" />
                      New Message
                    </Button>
                  </Link>
                </motion.div>

                <AnimatePresence mode="popLayout">
                  {messages.map((message, index) => {
                    const template = getTemplateInfo(message.template);
                    const isConfirming = confirmDeleteId === message.id;

                    return (
                      <motion.div
                        key={message.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100, height: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="glass-card rounded-2xl overflow-hidden hover:border-primary/20 transition-all duration-300"
                      >
                        {/* Gradient accent top bar matching template */}
                        <div
                          className={`h-1 bg-gradient-to-r ${
                            template?.gradient || 'from-primary to-secondary'
                          }`}
                        />

                        <div className="p-5 md:p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4 min-w-0 flex-1">
                              {/* Template icon badge */}
                              <div
                                className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${
                                  template?.gradient ||
                                  'from-primary to-secondary'
                                } text-xl flex-shrink-0 shadow-lg`}
                              >
                                {template?.icon || '💌'}
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-semibold text-foreground truncate">
                                    To {message.data.receiver}
                                  </p>
                                  <span
                                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-gradient-to-r ${
                                      template?.gradient ||
                                      'from-primary to-secondary'
                                    } text-white`}
                                  >
                                    {template?.name || message.template}
                                  </span>
                                </div>
                                <p className="text-sm text-text-secondary truncate">
                                  From {message.data.sender}
                                </p>

                                {/* Message preview */}
                                <p className="text-sm text-text-muted mt-2 line-clamp-2 leading-relaxed">
                                  {message.data.message}
                                </p>

                                {/* Meta row */}
                                <div className="flex items-center gap-4 mt-3 text-xs text-text-muted">
                                  <span className="inline-flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {formatDate(message.createdAt)}
                                  </span>
                                  <span className="inline-flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    {message.views}{' '}
                                    {message.views === 1 ? 'view' : 'views'}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex items-center gap-1 flex-shrink-0">
                              {/* Copy link */}
                              <button
                                onClick={() => handleCopyLink(message.slug)}
                                className="p-2 rounded-lg text-text-muted hover:text-foreground hover:bg-glass-bg transition-colors"
                                title="Copy link"
                              >
                                {copiedSlug === message.slug ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </button>

                              {/* View */}
                              <Link
                                to={`${ROUTES.MESSAGE}/${message.slug}`}
                                className="p-2 rounded-lg text-text-muted hover:text-primary hover:bg-glass-bg transition-colors"
                                title="View message"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Link>

                              {/* Delete */}
                              {isConfirming ? (
                                <div className="flex items-center gap-1 ml-1">
                                  <button
                                    onClick={() => handleDelete(message.id)}
                                    className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    onClick={() => setConfirmDeleteId(null)}
                                    className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-text-muted hover:bg-glass-bg transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() =>
                                    setConfirmDeleteId(message.id)
                                  }
                                  className="p-2 rounded-lg text-text-muted hover:text-destructive hover:bg-destructive/10 transition-colors"
                                  title="Delete message"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}

            {/* ── Bottom Info Section ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-16 space-y-8"
            >
              {/* How it works */}
              <div className="glass-card rounded-2xl p-8 md:p-10">
                <h3 className="font-display text-xl font-semibold mb-4">
                  How Your Messages Work
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-medium text-foreground">Create</h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      Choose an emotion template that matches your feeling. Write
                      your message with the guided prompts. Every word matters,
                      and our templates help you express exactly what you mean.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Share2 className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-medium text-foreground">Share</h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      Each message gets a unique shareable link. Copy it and send
                      it through any platform — text, email, social media, or
                      anywhere you want. The recipient doesn't need an account to
                      view it.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-medium text-foreground">Connect</h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      Your recipient opens the link and sees a beautifully
                      designed page with your personal message, styled to match
                      the emotion. It's more meaningful than a text and more
                      personal than an e-card.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tips section */}
              <div className="glass-card rounded-2xl p-8 md:p-10">
                <h3 className="font-display text-xl font-semibold mb-4">
                  Tips for Better Messages
                </h3>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-0.5">1.</span>
                    <span>
                      <strong className="text-foreground">Be specific.</strong>{' '}
                      Instead of "you're great", mention a specific moment or
                      quality. "The way you stayed up to help me study last
                      Tuesday meant the world to me" hits differently.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-0.5">2.</span>
                    <span>
                      <strong className="text-foreground">
                        Match the template to the feeling.
                      </strong>{' '}
                      Each template is designed for a specific emotion. A
                      gratitude template carries different weight than a birthday
                      one. Choose the one that amplifies what you're feeling.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-0.5">3.</span>
                    <span>
                      <strong className="text-foreground">
                        Don't overthink it.
                      </strong>{' '}
                      The best messages come from genuine emotion, not perfect
                      grammar. Write what you feel. The person receiving it will
                      appreciate the thought more than the polish.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-0.5">4.</span>
                    <span>
                      <strong className="text-foreground">
                        Share at the right moment.
                      </strong>{' '}
                      Timing matters. A surprise "thinking of you" message on a
                      random Tuesday can be more powerful than a birthday message
                      everyone expects.
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>
    </PageShell>
  );
};

export default MyMessagesPage;
