// Get Well Template - Gentle, Pink/Mint/Sunshine, Caring
// 3-section minimal visual experience

import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageData } from '@/shared/types';
import { cn } from '@/shared/lib/cn';
import { Flower2, Heart, Sun } from 'lucide-react';
import { useRef } from 'react';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { ParticleBackground } from '@/components/motion/ParticleBackground';

interface GetWellTemplateProps {
  message: MessageData;
}

export const GetWellTemplate = ({ message }: GetWellTemplateProps) => {
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
      className="relative bg-[#080a08] text-white overflow-x-hidden"
    >
      <ScrollProgress color="bg-gradient-to-r from-pink-400 via-emerald-400 to-amber-400" />

      {/* Ambient gradients — gentle, healing */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] rounded-full blur-[120px] opacity-12 bg-gradient-to-br from-pink-500 via-emerald-400 to-amber-400" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[100px] opacity-10 bg-gradient-to-tl from-amber-300 to-pink-500" />
      </div>

      <div className="fixed inset-0 pointer-events-none z-[1]">
        <ParticleBackground type="hearts" density={15} />
      </div>

      {/* SECTION 1: Hero — Flower bloom */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 min-h-screen flex items-center justify-center p-6"
      >
        <div className="max-w-3xl w-full text-center">
          {/* Blooming flower */}
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100, duration: 1.5 }}
            className="mb-8 inline-block"
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Flower2 className="w-16 h-16 md:w-20 md:h-20 text-pink-400/70" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={cn(
              'font-display text-5xl md:text-7xl lg:text-9xl font-bold mb-6',
              'bg-clip-text text-transparent',
              'bg-gradient-to-r from-pink-300 via-emerald-300 to-amber-300',
              'leading-tight'
            )}
          >
            Feel Better
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-pink-200/60 text-xl md:text-2xl mb-4 font-light"
          >
            A caring message for <span className="text-emerald-300/90 font-medium">{receiver}</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-pink-400/40 text-lg"
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
              className="flex flex-col items-center gap-2 text-pink-400/30"
            >
              <span className="text-sm">Scroll to continue</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* SECTION 2: Care — Message + healing icons */}
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
                'bg-gradient-to-r from-pink-300 to-emerald-300'
              )}
            >
              Sending You Care
            </h2>
          </motion.div>

          {/* Healing icons */}
          <div className="flex justify-center gap-8 mb-14">
            {[
              { icon: Heart, label: 'Love', color: 'text-pink-400/60' },
              { icon: Flower2, label: 'Healing', color: 'text-emerald-400/60' },
              { icon: Sun, label: 'Warmth', color: 'text-amber-400/60' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, type: 'spring' }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-900/20 border border-emerald-500/15 flex items-center justify-center">
                  <item.icon className={cn('w-8 h-8', item.color)} />
                </div>
                <span className="text-pink-200/50 text-sm">{item.label}</span>
              </motion.div>
            ))}
          </div>

          {/* User's message */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl p-8 md:p-14 bg-emerald-950/15 border border-emerald-500/10 backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-24 h-24 opacity-10 bg-gradient-to-br from-pink-400 to-emerald-400 rounded-br-full" />
            <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10 bg-gradient-to-tl from-amber-400 to-pink-400 rounded-tl-full" />

            <p className="text-lg md:text-xl leading-relaxed text-emerald-100/90 whitespace-pre-wrap relative z-10 font-light">
              Dear {receiver},
            </p>
            <div className="h-4" />
            <p className="text-lg md:text-xl leading-relaxed text-emerald-100/90 whitespace-pre-wrap relative z-10 font-light">
              {userMessage}
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Sunshine — Healing vibes */}
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
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="inline-block"
            >
              <Sun className="w-16 h-16 text-amber-400/50" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={cn(
                'text-4xl md:text-5xl font-bold',
                'bg-clip-text text-transparent',
                'bg-gradient-to-r from-pink-300 via-emerald-300 to-amber-300'
              )}
            >
              Sending Healing Vibes
            </motion.h2>

            {/* Gentle progress bar */}
            <div className="max-w-xs mx-auto">
              <div className="h-2 rounded-full bg-emerald-900/30 overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 3, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-pink-400 via-emerald-400 to-amber-400"
                />
              </div>
              <p className="text-emerald-400/40 text-xs mt-2">Healing energy sent</p>
            </div>

            <p className="text-pink-300/60 text-lg">
              Wishing you a speedy recovery,
            </p>

            <motion.p
              whileHover={{ scale: 1.05 }}
              className={cn(
                'font-display text-5xl md:text-6xl font-bold',
                'bg-clip-text text-transparent',
                'bg-gradient-to-r from-pink-300 via-emerald-300 to-amber-300'
              )}
            >
              {sender}
            </motion.p>

            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart className="w-10 h-10 mx-auto text-pink-500/50 fill-pink-500/50" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <section className="relative z-10 py-16 px-6 border-t border-emerald-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-emerald-400/30 text-sm">
              This message was created with EmotionCreator
            </p>
            <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
              <a
                href="/"
                className={cn(
                  'text-sm font-medium',
                  'bg-clip-text text-transparent',
                  'bg-gradient-to-r from-pink-400 to-emerald-400',
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
