import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
} from 'lucide-react';
import { TEMPLATES } from '@/features/templates/constants';

const MyMessagesPage = () => {
  const { user } = useAuth();
  const messages = useMessageStore((s) => s.messages);

  const getTemplateInfo = (templateId: string) => {
    return TEMPLATES.find((t) => t.id === templateId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <PageShell>
      <div className="py-24 md:py-32">
        <Container size="md">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
              My Messages
            </h1>
            <p className="text-text-secondary">
              View and manage all the messages you've created.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {messages.length === 0 ? (
              /* ── Empty State ── */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="glass-card rounded-2xl p-8 md:p-12 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold mb-3">
                  No messages yet
                </h2>
                <p className="text-text-secondary mb-8 max-w-sm mx-auto">
                  Create your first emotional message and share it with someone special.
                </p>
                <Link to={ROUTES.CREATE}>
                  <Button variant="gradient" className="gap-2">
                    <Sparkles className="w-4 h-4" />
                    Create Your First Message
                  </Button>
                </Link>
              </motion.div>
            ) : (
              /* ── Messages List ── */
              <div className="space-y-4">
                {messages.map((message, index) => {
                  const template = getTemplateInfo(message.template);
                  return (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 min-w-0">
                          {/* Template icon */}
                          <div
                            className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${
                              template?.gradient || 'from-primary to-secondary'
                            } text-lg flex-shrink-0`}
                          >
                            {template?.icon || '💌'}
                          </div>

                          <div className="min-w-0">
                            <p className="font-medium text-foreground truncate">
                              To: {message.data.receiver}
                            </p>
                            <p className="text-sm text-text-secondary truncate mt-0.5">
                              From: {message.data.sender}
                            </p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-text-muted">
                              <span className="inline-flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(message.createdAt)}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {message.views} {message.views === 1 ? 'view' : 'views'}
                              </span>
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-glass-bg">
                                {template?.name || message.template}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* View link */}
                        <Link
                          to={`${ROUTES.MESSAGE}/${message.slug}`}
                          className="flex-shrink-0"
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1.5 text-text-secondary hover:text-primary"
                          >
                            View
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </Container>
      </div>
    </PageShell>
  );
};

export default MyMessagesPage;
