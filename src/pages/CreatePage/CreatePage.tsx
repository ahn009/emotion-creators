// Create Page - Template selection & message form (MVP flow, no auth required)

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PageShell } from '@/components/layout';
import { Container } from '@/components/common';
import { TemplateGrid } from '@/features/templates/components/TemplateGrid';
import { MessageForm } from '@/components/forms';
import { FadeIn } from '@/components/motion';
import { Button } from '@/components/ui/button';
import { useMessageStore } from '@/features/messages/stores/messageStore';
import { ROUTES } from '@/shared/config';
import { TEMPLATES } from '@/features/templates/constants';
import { ArrowLeft, ArrowRight, Sparkles, Heart, Palette, PenTool } from 'lucide-react';

// Register GSAP plugins safely only in browser environment
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Step = 'template' | 'message';

const tips = [
  { icon: Heart, text: 'Be genuine - authentic emotions resonate the most' },
  { icon: Palette, text: 'Choose a template that matches your mood' },
  { icon: PenTool, text: 'Keep it simple - sometimes less is more' },
];

const CreatePage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('template');
  const { currentTemplate, setTemplate, resetForm } = useMessageStore();
  const pageRef = useRef<HTMLDivElement>(null);

  // Reset form state when entering create page so previous message data doesn't persist
  useEffect(() => {
    resetForm();
  }, [resetForm]);

  useEffect(() => {
    // Only run GSAP animations if in browser and pageRef is available
    if (typeof window === 'undefined' || !pageRef.current) return;

    try {
      // Animate page elements on load
      gsap.fromTo(
        pageRef.current.querySelectorAll('.animate-in'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
      );
    } catch (error) {
      console.error('GSAP animation error in CreatePage:', error);
    }
  }, [step]);

  const handleTemplateSelect = () => {
    setStep('message');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = () => {
    navigate(ROUTES.PREVIEW);
  };

  const selectedTemplate = TEMPLATES.find(t => t.id === currentTemplate);

  return (
    <PageShell showGuestWarning>
      <div ref={pageRef} className="min-h-screen">
        {/* Hero section for Create */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          {/* Background effects */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
          
          <Container size="md" className="relative">
            {/* Progress indicator */}
            <div className="animate-in flex items-center justify-center gap-4 mb-12">
              <motion.div 
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  step === 'template' ? 'bg-primary scale-125 shadow-glow-sm' : 'bg-primary/30'
                }`}
                whileHover={{ scale: 1.2 }}
              />
              <div className="w-16 h-1 rounded-full bg-glass-border overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: '0%' }}
                  animate={{ width: step === 'message' ? '100%' : '0%' }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <motion.div 
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  step === 'message' ? 'bg-primary scale-125 shadow-glow-sm' : 'bg-primary/30'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            </div>

            <AnimatePresence mode="wait">
              {step === 'template' && (
                <motion.div
                  key="template"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <div className="animate-in text-center mb-12">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass-bg border border-glass-border mb-6"
                    >
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-sm text-text-secondary">Step 1 of 2</span>
                    </motion.div>
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                      Choose Your <span className="gradient-text">Emotion</span>
                    </h1>
                    <p className="text-text-secondary text-lg md:text-xl max-w-xl mx-auto">
                      Select a template that matches the feeling you want to express
                    </p>
                  </div>

                  <div className="animate-in">
                    <TemplateGrid
                      selectedTemplate={currentTemplate}
                      onSelect={setTemplate}
                    />
                  </div>

                  <div className="animate-in flex justify-center mt-12">
                    <Button 
                      variant="gradient" 
                      size="xl"
                      onClick={handleTemplateSelect}
                      className="shadow-glow"
                    >
                      Continue to Message
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 'message' && (
                <motion.div
                  key="message"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <div className="animate-in">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setStep('template')}
                      className="mb-8"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to templates
                    </Button>
                  </div>

                  <div className="animate-in text-center mb-12">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass-bg border border-glass-border mb-6"
                    >
                      <PenTool className="w-4 h-4 text-primary" />
                      <span className="text-sm text-text-secondary">Step 2 of 2</span>
                    </motion.div>
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                      Write Your <span className="gradient-text">Message</span>
                    </h1>
                    <p className="text-text-secondary text-lg md:text-xl max-w-xl mx-auto">
                      Express what's in your heart with the{' '}
                      <span className="text-primary font-medium">{selectedTemplate?.name}</span> template
                    </p>
                  </div>

                  <div className="animate-in max-w-2xl mx-auto">
                    <div className="glass-card p-8 md:p-10 rounded-3xl mb-8">
                      <MessageForm onSubmit={handleFormSubmit} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Container>
        </section>

        {/* Tips section - always visible */}
        <section className="py-16 border-t border-glass-border">
          <Container size="md">
            <FadeIn>
              <div className="text-center mb-10">
                <h3 className="font-display text-2xl font-semibold mb-2">
                  💡 Tips for a Heartfelt Message
                </h3>
                <p className="text-text-muted">
                  Make your message stand out
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tips.map((tip, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <motion.div
                    className="glass-card p-6 rounded-2xl text-center"
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
                      <tip.icon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-text-secondary">{tip.text}</p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
      </div>
    </PageShell>
  );
};

export default CreatePage;
