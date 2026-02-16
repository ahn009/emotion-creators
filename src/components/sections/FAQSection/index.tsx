// FAQ Section with accordion

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { ChevronDown, HelpCircle } from 'lucide-react';

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
  {
    question: 'How can I create a free digital apology card online?',
    answer: 'With EmotionCreator, you can create a free digital apology card in under 2 minutes. Choose the "Sorry" template, write your heartfelt message, and share it via a unique link. No signup, no payment, no app download required.',
  },
  {
    question: "What's a private way to send a heartfelt message without signing up?",
    answer: 'EmotionCreator lets you create and share beautiful digital messages without creating an account. Your messages are private — we don\'t track page visits or sell data. Just pick a template, write your message, and share the unique link.',
  },
  {
    question: 'Can I send a digital birthday message for free?',
    answer: 'Yes! EmotionCreator\'s Birthday template lets you create a vibrant, beautifully designed birthday message completely free. Add your personal wishes, get a unique shareable link, and send it via text, email, or social media.',
  },
  {
    question: 'How do I send a get well soon message online?',
    answer: 'EmotionCreator has a dedicated "Get Well" template with gentle, nurturing design elements. Write your comforting words, and your recipient gets a full-page, beautifully presented message they can view on any device — no app needed.',
  },
  {
    question: "What's the best tool for long-distance relationship messages?",
    answer: 'EmotionCreator is ideal for long-distance relationships. Use the "Love" or "Miss You" template to create a shareable page with your personal message. It\'s more meaningful than a text and works across any distance — just share the link.',
  },
  {
    question: 'What is EmotionCreator?',
    answer: 'EmotionCreator is a free, privacy-focused web application that lets you create beautifully designed digital messages for nine emotions: love, apology, birthday, gratitude, congratulations, encouragement, missing someone, friendship, and get well wishes. Each message gets a unique shareable URL. No signup, download, or payment required.',
  },
  {
    question: 'How many templates does EmotionCreator have?',
    answer: 'EmotionCreator offers 9 unique emotion templates: Love, Sorry, Birthday, Gratitude, Congratulations, Encouragement, Miss You, Friendship, and Get Well. Each template has its own color palette, typography, and design elements tailored to that specific emotion.',
  },
  {
    question: 'Is EmotionCreator free?',
    answer: 'Yes, EmotionCreator is 100% free. You can create unlimited messages using any of the 9 templates without paying anything. There are no hidden fees, no premium tiers, and no feature locks.',
  },
  {
    question: 'Do I need to download an app?',
    answer: 'No. EmotionCreator works entirely in your web browser — on desktop, tablet, or mobile. There\'s nothing to install or download. Just visit the site, create your message, and share the link.',
  },
  {
    question: 'Does my message work on mobile devices?',
    answer: 'Yes! Every EmotionCreator message page is fully responsive and optimized for mobile devices. Your recipient can view the beautifully designed message on any smartphone, tablet, or computer with a web browser.',
  },
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 relative">
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
              <motion.div
                key={i}
                className="glass-card rounded-2xl overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
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
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
