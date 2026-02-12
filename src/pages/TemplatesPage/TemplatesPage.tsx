import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageShell } from '@/components/layout';
import { Container } from '@/components/common';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/shared/config/constants';
import { TEMPLATES } from '@/features/templates/constants';
import { Sparkles } from 'lucide-react';
import { useMessageStore } from '@/features/messages/stores/messageStore';

const TemplatesPage = () => {
  const setTemplate = useMessageStore((s) => s.setTemplate);

  const handleSelectTemplate = (templateId: string) => {
    setTemplate(templateId as Parameters<typeof setTemplate>[0]);
  };

  return (
    <PageShell>
      <div className="py-24 md:py-32">
        <Container size="lg">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
              Templates
            </h1>
            <p className="text-text-secondary max-w-lg mx-auto">
              Choose a template to get started. Each one is designed to help you
              express a specific emotion beautifully.
            </p>
          </motion.div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {TEMPLATES.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={ROUTES.CREATE}
                  onClick={() => handleSelectTemplate(template.id)}
                  className="block group"
                >
                  <div className="glass-card rounded-2xl p-6 h-full hover:border-primary/30 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/5">
                    {/* Gradient accent bar */}
                    <div
                      className={`h-1.5 rounded-full bg-gradient-to-r ${template.gradient} mb-5 w-16 group-hover:w-full transition-all duration-500`}
                    />

                    {/* Icon + name */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{template.icon}</span>
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {template.name}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-text-secondary leading-relaxed mb-5">
                      {template.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Sparkles className="w-3.5 h-3.5" />
                      Use this template
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </div>
    </PageShell>
  );
};

export default TemplatesPage;
