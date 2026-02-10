// FAQ Section with accordion

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/common/Container';
import { ChevronDown, HelpCircle } from 'lucide-react';

// Register GSAP plugins safely only in browser environment
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const faqs = [
  {
    question: 'Do I need an account to create a message?',
    answer: 'No! You can create and share messages without signing up. However, if you close your browser without an account, your links will be lost. Sign up to keep your pages forever!',
  },
  {
    question: 'How long do shared links last?',
    answer: 'For guests, links last as long as your browser session. With an account, your links are permanent and will never expire.',
  },
  {
    question: 'Can I customize the templates?',
    answer: 'Currently, you can choose from our curated templates and add your personal message. Each template is designed to perfectly express specific emotions.',
  },
  {
    question: 'Is my data private?',
    answer: 'Absolutely! We don\'t track page visits, we don\'t sell your data, and your messages are yours alone. Privacy is core to our values.',
  },
  {
    question: 'Can recipients see who sent the message?',
    answer: 'Only if you include your name in the "From" field. Otherwise, it can be completely anonymous. You control what information is shared.',
  },
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Only run GSAP animations if in browser and sectionRef is available
    if (typeof window === 'undefined' || !sectionRef.current) return;

    try {
      const items = sectionRef.current.querySelectorAll('.faq-item');

      gsap.fromTo(
        items,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    } catch (error) {
      console.error('GSAP animation error in FAQSection:', error);
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left side - Heading */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-glass-bg border border-glass-border text-sm text-primary mb-4"
            >
              <HelpCircle className="w-4 h-4" />
              FAQ
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold mb-6"
            >
              Questions? <br />
              <span className="gradient-text">We've Got Answers</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-lg"
            >
              Everything you need to know about EmotionCreator. Can't find what you're looking for? Reach out to us!
            </motion.p>
          </div>

          {/* Right side - Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="faq-item glass-card rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-medium pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-text-muted" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 text-text-secondary">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
