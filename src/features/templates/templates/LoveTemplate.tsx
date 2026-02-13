// Love Template - Romantic, Dreamy, Intimate
// 3-section minimal visual experience

import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageData } from '@/shared/types';
import { cn } from '@/shared/lib/cn';
import { Heart, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { ParticleBackground } from '@/components/motion/ParticleBackground';

interface LoveTemplateProps {
  message: MessageData;
}

export const LoveTemplate = ({ message }: LoveTemplateProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.92]);

  const { receiver, sender } = message.data;
  const userMessage = message.data.message;

  return (
    <div
      ref={containerRef}
      className="relative bg-[#0d0609] text-white overflow-x-hidden"
    >
      <ScrollProgress color="bg-gradient-to-r from-rose-400 via-pink-500 to-rose-600" />

      {/* Ambient gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] rounded-full blur-[120px] opacity-20 bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-600" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[100px] opacity-10 bg-gradient-to-tl from-rose-400 to-purple-600" />
      </div>

      <div className="fixed inset-0 pointer-events-none z-[1]">
        <ParticleBackground type="hearts" density={25} />
      </div>

      {/* SECTION 1: Hero */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 min-h-screen flex items-center justify-center p-6"
      >
        <div className="max-w-3xl w-full text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-7xl md:text-8xl mb-8 inline-block"
          >
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {'\u{1F495}'}
            </motion.span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-rose-300/80 text-xl md:text-2xl mb-4 font-light italic"
          >
            A love letter for
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={cn(
              'font-display text-6xl md:text-7xl lg:text-8xl font-bold mb-6',
              'bg-clip-text text-transparent',
              'bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400',
              'leading-tight'
            )}
          >
            {receiver}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-rose-200/50 text-lg"
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
              className="flex flex-col items-center gap-2 text-rose-300/40"
            >
              <span className="text-sm">Scroll to read your letter</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* SECTION 2: User Message */}
      <section className="relative z-10 min-h-screen flex items-center justify-center py-24 px-6">
        <div className="max-w-3xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className={cn(
                'text-4xl md:text-5xl font-bold',
                'bg-clip-text text-transparent',
                'bg-gradient-to-r from-rose-400 to-pink-400'
              )}
            >
              My Letter to You
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl p-8 md:p-14 bg-rose-950/30 border border-rose-500/10 backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-24 h-24 opacity-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-br-full" />
            <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10 bg-gradient-to-tl from-rose-500 to-pink-500 rounded-tl-full" />

            <p className="text-lg md:text-xl leading-relaxed text-rose-100/90 whitespace-pre-wrap relative z-10 font-light">
              Dear {receiver},
            </p>
            <div className="h-4" />
            <p className="text-lg md:text-xl leading-relaxed text-rose-100/90 whitespace-pre-wrap relative z-10 font-light">
              {userMessage}
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Closing */}
      <section className="relative z-10 min-h-screen flex items-center justify-center py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center justify-center">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                className="h-px w-24 bg-gradient-to-r from-transparent to-rose-500/40"
              />
              <Sparkles className="mx-3 w-5 h-5 text-rose-400/40" />
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                className="h-px w-24 bg-gradient-to-l from-transparent to-rose-500/40"
              />
            </div>

            <p className="text-rose-300/60 text-lg italic">
              Forever and always yours,
            </p>

            <motion.p
              whileHover={{ scale: 1.05 }}
              className={cn(
                'font-display text-5xl md:text-6xl font-bold',
                'bg-clip-text text-transparent',
                'bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400'
              )}
            >
              {sender}
            </motion.p>

            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart className="w-10 h-10 mx-auto text-rose-500 fill-rose-500" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <section className="relative z-10 py-16 px-6 border-t border-rose-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-rose-300/30 text-sm">
              This message was created with EmotionCreator
            </p>
            <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
              <a
                href="/"
                className={cn(
                  'text-sm font-medium',
                  'bg-clip-text text-transparent',
                  'bg-gradient-to-r from-rose-400 to-pink-400',
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
