// Friendship Template - Playful, Orange/Amber, Warm
// 3-section minimal visual experience

import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageData } from '@/shared/types';
import { cn } from '@/shared/lib/cn';
import { Infinity, Users, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { ParticleBackground } from '@/components/motion/ParticleBackground';

interface FriendshipTemplateProps {
  message: MessageData;
}

export const FriendshipTemplate = ({ message }: FriendshipTemplateProps) => {
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
      className="relative bg-[#0c0804] text-white overflow-x-hidden"
    >
      <ScrollProgress color="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400" />

      {/* Ambient gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] rounded-full blur-[120px] opacity-15 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-600" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[100px] opacity-10 bg-gradient-to-tl from-yellow-400 to-orange-600" />
      </div>

      <div className="fixed inset-0 pointer-events-none z-[1]">
        <ParticleBackground type="confetti" density={20} />
      </div>

      {/* SECTION 1: Hero */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 min-h-screen flex items-center justify-center p-6"
      >
        <div className="max-w-3xl w-full text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-7xl md:text-8xl mb-8 inline-block"
          >
            <motion.span
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {'\u{1F91C}\u{1F91B}'}
            </motion.span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={cn(
              'font-display text-5xl md:text-6xl lg:text-8xl font-bold mb-6',
              'bg-clip-text text-transparent',
              'bg-gradient-to-r from-orange-300 via-amber-300 to-yellow-300',
              'leading-tight'
            )}
          >
            Partners in Crime
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-orange-200/60 text-xl md:text-2xl mb-4 font-light"
          >
            A message for <span className="text-amber-300/90 font-medium">{receiver}</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-orange-400/40 text-lg"
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
              className="flex flex-col items-center gap-2 text-orange-400/30"
            >
              <span className="text-sm">Scroll to continue</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* SECTION 2: Moments — Message in bubble cards */}
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
                'bg-gradient-to-r from-orange-300 to-amber-300'
              )}
            >
              To My Best Friend
            </h2>
          </motion.div>

          {/* Bubble-card style message */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl p-8 md:p-14 bg-orange-950/20 border border-orange-500/10 backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-24 h-24 opacity-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-br-full" />
            <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10 bg-gradient-to-tl from-yellow-400 to-orange-500 rounded-tl-full" />

            <p className="text-lg md:text-xl leading-relaxed text-orange-100/90 whitespace-pre-wrap relative z-10 font-light">
              Hey {receiver},
            </p>
            <div className="h-4" />
            <p className="text-lg md:text-xl leading-relaxed text-orange-100/90 whitespace-pre-wrap relative z-10 font-light">
              {userMessage}
            </p>
          </motion.div>

          {/* Fun stats */}
          <div className="flex justify-center gap-6 mt-10">
            {[
              { emoji: '\u{1F602}', label: 'Laughs shared' },
              { emoji: '\u{1F355}', label: 'Late nights' },
              { emoji: '\u{1F4F1}', label: 'Long calls' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <span className="text-3xl block mb-2">{item.emoji}</span>
                <span className="text-orange-300/50 text-xs">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Forever — Infinity */}
      <section className="relative z-10 min-h-screen flex items-center justify-center py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="inline-block"
            >
              <Infinity className="w-16 h-16 text-amber-400/50" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={cn(
                'text-4xl md:text-5xl font-bold',
                'bg-clip-text text-transparent',
                'bg-gradient-to-r from-orange-300 to-yellow-300'
              )}
            >
              Always There
            </motion.h2>

            <div className="flex items-center justify-center">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                className="h-px w-24 bg-gradient-to-r from-transparent to-orange-500/30"
              />
              <Users className="mx-3 w-5 h-5 text-orange-400/40" />
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                className="h-px w-24 bg-gradient-to-l from-transparent to-orange-500/30"
              />
            </div>

            <p className="text-orange-300/60 text-lg">
              Your friend forever,
            </p>

            <motion.p
              whileHover={{ scale: 1.05 }}
              className={cn(
                'font-display text-5xl md:text-6xl font-bold',
                'bg-clip-text text-transparent',
                'bg-gradient-to-r from-orange-300 via-amber-300 to-yellow-300'
              )}
            >
              {sender}
            </motion.p>

            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles className="w-10 h-10 mx-auto text-amber-500/50" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <section className="relative z-10 py-16 px-6 border-t border-orange-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-orange-400/30 text-sm">
              This message was created with EmotionCreator
            </p>
            <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
              <a
                href="/"
                className={cn(
                  'text-sm font-medium',
                  'bg-clip-text text-transparent',
                  'bg-gradient-to-r from-orange-400 to-amber-400',
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
