// Encouragement Template - Uplifting, Indigo/Blue/Orange, Empowering
// 3-section minimal visual experience

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MessageData } from '@/shared/types';
import { cn } from '@/shared/lib/cn';
import { Sunrise, Flame, Heart } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { ParticleBackground } from '@/components/motion/ParticleBackground';

interface EncouragementTemplateProps {
  message: MessageData;
}

const POWER_WORDS = ['Strong', 'Brave', 'Capable', 'Resilient', 'Unstoppable'];

export const EncouragementTemplate = ({ message }: EncouragementTemplateProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.92]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % POWER_WORDS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const { receiver, sender } = message.data;
  const userMessage = message.data.message;

  return (
    <div
      ref={containerRef}
      className="relative bg-[#060810] text-white overflow-x-hidden"
    >
      <ScrollProgress color="bg-gradient-to-r from-indigo-400 via-blue-400 to-orange-400" />

      {/* Ambient gradients — sunrise feel */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] rounded-full blur-[120px] opacity-15 bg-gradient-to-br from-indigo-600 via-blue-500 to-orange-500" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[100px] opacity-10 bg-gradient-to-tl from-orange-400 to-indigo-600" />
      </div>

      <div className="fixed inset-0 pointer-events-none z-[1]">
        <ParticleBackground type="stars" density={25} />
      </div>

      {/* SECTION 1: Hero */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 min-h-screen flex items-center justify-center p-6"
      >
        <div className="max-w-3xl w-full text-center">
          <motion.div
            initial={{ scale: 0, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-8 inline-block"
          >
            <Sunrise className="w-16 h-16 md:w-20 md:h-20 text-orange-400/70" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={cn(
              'font-display text-5xl md:text-7xl lg:text-9xl font-bold mb-6',
              'bg-clip-text text-transparent',
              'bg-gradient-to-r from-indigo-300 via-blue-300 to-orange-300',
              'leading-tight'
            )}
          >
            You&apos;ve Got This
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-indigo-200/60 text-xl md:text-2xl mb-4 font-light"
          >
            A message of strength for <span className="text-blue-300/90 font-medium">{receiver}</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-indigo-400/40 text-lg"
          >
            from {sender}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-20"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-indigo-400/30"
            >
              <span className="text-sm">Scroll to continue</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* SECTION 2: Power Words + Message */}
      <section className="relative z-10 min-h-screen flex items-center justify-center py-24 px-6">
        <div className="max-w-3xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-blue-400/50 text-lg mb-4">You are</p>
            <div className="h-24 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={wordIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4 }}
                  className={cn(
                    'text-5xl md:text-7xl font-bold',
                    'bg-clip-text text-transparent',
                    'bg-gradient-to-r from-indigo-300 via-blue-300 to-orange-300'
                  )}
                >
                  {POWER_WORDS[wordIndex]}
                </motion.h2>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* User's message */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl p-8 md:p-14 bg-indigo-950/20 border border-indigo-500/10 backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-24 h-24 opacity-10 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-br-full" />
            <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10 bg-gradient-to-tl from-orange-400 to-indigo-500 rounded-tl-full" />

            <p className="text-lg md:text-xl leading-relaxed text-indigo-100/90 whitespace-pre-wrap relative z-10 font-light">
              Dear {receiver},
            </p>
            <div className="h-4" />
            <p className="text-lg md:text-xl leading-relaxed text-indigo-100/90 whitespace-pre-wrap relative z-10 font-light">
              {userMessage}
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Support Closing */}
      <section className="relative z-10 min-h-screen flex items-center justify-center py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={cn(
                'text-4xl md:text-5xl font-bold',
                'bg-clip-text text-transparent',
                'bg-gradient-to-r from-blue-300 to-orange-300'
              )}
            >
              I&apos;m Here For You
            </motion.h2>

            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block"
            >
              <Flame className="w-12 h-12 mx-auto text-orange-500/60" />
            </motion.div>

            <p className="text-indigo-300/60 text-lg">
              Always cheering for you,
            </p>

            <motion.p
              whileHover={{ scale: 1.05 }}
              className={cn(
                'font-display text-5xl md:text-6xl font-bold',
                'bg-clip-text text-transparent',
                'bg-gradient-to-r from-indigo-300 via-blue-300 to-orange-300'
              )}
            >
              {sender}
            </motion.p>

            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart className="w-10 h-10 mx-auto text-orange-500/50 fill-orange-500/50" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <section className="relative z-10 py-16 px-6 border-t border-indigo-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-indigo-400/30 text-sm">
              This message was created with EmotionCreator
            </p>
            <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
              <a
                href="/"
                className={cn(
                  'text-sm font-medium',
                  'bg-clip-text text-transparent',
                  'bg-gradient-to-r from-indigo-400 to-blue-400',
                  'hover:opacity-80 transition-opacity'
                )}
              >
                Create your own message &rarr;
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
