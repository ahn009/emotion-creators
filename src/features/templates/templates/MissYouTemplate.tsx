// Miss You Template - Nostalgic, Violet/Purple, Dreamy
// 3-section minimal visual experience

import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageData } from '@/shared/types';
import { cn } from '@/shared/lib/cn';
import { Moon, Star, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { ParticleBackground } from '@/components/motion/ParticleBackground';

interface MissYouTemplateProps {
  message: MessageData;
}

export const MissYouTemplate = ({ message }: MissYouTemplateProps) => {
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
      className="relative bg-[#08060e] text-white overflow-x-hidden"
    >
      <ScrollProgress color="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400" />

      {/* Ambient gradients — night sky */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] rounded-full blur-[120px] opacity-15 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[100px] opacity-10 bg-gradient-to-tl from-indigo-400 to-violet-600" />
      </div>

      <div className="fixed inset-0 pointer-events-none z-[1]">
        <ParticleBackground type="stars" density={30} />
      </div>

      {/* SECTION 1: Hero */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 min-h-screen flex items-center justify-center p-6"
      >
        <div className="max-w-3xl w-full text-center">
          {/* Moon + Stars */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
            className="mb-8 inline-block relative"
          >
            <Moon className="w-16 h-16 md:w-20 md:h-20 text-violet-300/70" />
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2"
            >
              <Star className="w-5 h-5 text-violet-300/50 fill-violet-300/50" />
            </motion.div>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-1 -left-3"
            >
              <Star className="w-3 h-3 text-purple-300/40 fill-purple-300/40" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={cn(
              'font-display text-6xl md:text-7xl lg:text-9xl font-bold mb-6',
              'bg-clip-text text-transparent',
              'bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-300',
              'leading-tight'
            )}
          >
            Miss You
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-violet-200/60 text-xl md:text-2xl mb-4 font-light"
          >
            A message for <span className="text-purple-300/90 font-medium">{receiver}</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-violet-400/40 text-lg"
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
              className="flex flex-col items-center gap-2 text-violet-400/30"
            >
              <span className="text-sm">Scroll to continue</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* SECTION 2: Memories — Message in photo-frame style */}
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
                'bg-gradient-to-r from-violet-300 to-purple-300'
              )}
            >
              Memories of You
            </h2>
          </motion.div>

          {/* Photo-frame style message card */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -1 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Frame border */}
            <div className="rounded-3xl p-1 bg-gradient-to-br from-violet-500/30 via-purple-500/20 to-indigo-500/30">
              <div className="rounded-[22px] p-8 md:p-14 bg-violet-950/40 backdrop-blur-sm overflow-hidden">
                <p className="text-lg md:text-xl leading-relaxed text-violet-100/90 whitespace-pre-wrap font-light">
                  Dear {receiver},
                </p>
                <div className="h-4" />
                <p className="text-lg md:text-xl leading-relaxed text-violet-100/90 whitespace-pre-wrap font-light">
                  {userMessage}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Wish — Shooting star */}
      <section className="relative z-10 min-h-screen flex items-center justify-center py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Shooting star animation */}
            <div className="relative h-16 overflow-hidden">
              <motion.div
                animate={{ x: ['-100%', '200%'], y: ['0%', '50%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: 'easeOut' }}
                className="absolute left-0 top-0"
              >
                <Sparkles className="w-6 h-6 text-violet-300/60" />
              </motion.div>
            </div>

            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={cn(
                'text-4xl md:text-5xl font-bold',
                'bg-clip-text text-transparent',
                'bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-300'
              )}
            >
              Until We Meet Again
            </motion.h2>

            <p className="text-violet-300/60 text-lg italic">
              Thinking of you always,
            </p>

            <motion.p
              whileHover={{ scale: 1.05 }}
              className={cn(
                'font-display text-5xl md:text-6xl font-bold',
                'bg-clip-text text-transparent',
                'bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-300'
              )}
            >
              {sender}
            </motion.p>

            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Moon className="w-10 h-10 mx-auto text-violet-400/50" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <section className="relative z-10 py-16 px-6 border-t border-violet-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-violet-400/30 text-sm">
              This message was created with EmotionCreator
            </p>
            <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
              <a
                href="/"
                className={cn(
                  'text-sm font-medium',
                  'bg-clip-text text-transparent',
                  'bg-gradient-to-r from-violet-400 to-purple-400',
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
