// Love Template - Romantic, Dreamy, Intimate
// Full-length immersive experience with 5 scrollable sections

import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageData } from '@/shared/types';
import { cn } from '@/shared/lib/cn';
import { Heart, Sparkles, Star } from 'lucide-react';
import { useRef } from 'react';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { ParticleBackground } from '@/components/motion/ParticleBackground';
import { Timeline, TimelineItem } from '@/components/sections/Timeline';

interface LoveTemplateProps {
  message: MessageData;
}

// ── Placeholder content ──────────────────────────────────────────────
const LOVE_LETTER_PARAGRAPHS = [
  `From the moment our eyes met across that crowded room, I knew my life would never be the same. Every day with you feels like a beautiful dream I never want to wake from. You are the first thought in my morning and the last whisper in my night. The way you laugh, the way your eyes light up when you talk about something you love — these are the things that make my heart beat a little faster, a little stronger.`,

  `I remember the first time you held my hand. The world seemed to pause, and in that quiet moment, I understood what all the poets meant when they wrote about love. It wasn't fireworks or grand gestures — it was the gentle warmth of your fingers intertwined with mine, a silent promise that we would face everything together.`,

  `You have this incredible way of making ordinary moments feel extraordinary. A Sunday morning with coffee, a walk through the park, even sitting in comfortable silence — with you, every moment becomes a treasure I hold close to my heart. You taught me that love isn't about the destination; it's about the journey we take side by side.`,

  `There are a thousand things I love about you, and every day I discover one more. The way you care so deeply for the people around you. The way you never give up, no matter how hard things get. The way you see beauty in the smallest things and remind me to slow down and appreciate what we have. You make me want to be a better person, not because you ask me to, but because you inspire me simply by being who you are.`,

  `If I could give you one thing in this life, I would give you the ability to see yourself through my eyes. Only then would you understand how special you are to me. You are my calm in the storm, my light in the darkness, my home in this vast and sometimes overwhelming world. No matter where life takes us, know that my love for you is unwavering, unconditional, and everlasting.`,

  `So here I am, putting my heart into words, hoping they reach you in the way they were meant to — with all the warmth, tenderness, and devotion I carry for you every single day. You are not just the love of my life; you are my life's greatest blessing.`,
];

const REASONS_I_LOVE_YOU = [
  'The way your eyes crinkle when you laugh',
  'How you always know exactly what to say',
  'Your kindness to everyone you meet',
  'The way you hold my hand a little tighter in crowds',
  'Your courage to be unapologetically yourself',
  'How you make every room brighter just by walking in',
  'The little notes you leave for me to find',
  'Your passion for the things you believe in',
];

const TIMELINE_ITEMS: TimelineItem[] = [
  {
    label: 'The Beginning',
    title: 'When Our Eyes First Met',
    description:
      'A chance encounter that changed everything. One look, one smile, and the universe shifted to bring us together.',
    icon: '\u2728',
  },
  {
    label: 'First Date',
    title: 'Butterflies and Blushing',
    description:
      'Nervous laughter, stolen glances, and the realization that this was the start of something beautiful and rare.',
    icon: '\u{1F33A}',
  },
  {
    label: 'Falling Deep',
    title: 'The Moment I Knew',
    description:
      'Somewhere between the late-night conversations and the comfortable silences, I realized you had become my whole world.',
    icon: '\u{1F496}',
  },
  {
    label: 'Together',
    title: 'Building Our Story',
    description:
      'Every adventure, every challenge, every quiet moment — we faced it all hand in hand, growing stronger together.',
    icon: '\u{1F3E0}',
  },
  {
    label: 'Forever',
    title: 'This Is Just the Beginning',
    description:
      'Our story has no final chapter. Every sunrise is a new page, and I can\'t wait to write them all with you.',
    icon: '\u{1F31F}',
  },
];

// ── Sub-components ───────────────────────────────────────────────────

const FloatingSparkle = ({ delay, x, y }: { delay: number; x: string; y: string }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: x, top: y }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  >
    <Sparkles className="w-4 h-4 text-rose-300/40" />
  </motion.div>
);

// ── Main Template ────────────────────────────────────────────────────

export const LoveTemplate = ({ message }: LoveTemplateProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.92]);

  const { receiver, sender } = message.data;
  const userMessage = message.data.message;

  return (
    <div
      ref={containerRef}
      className="relative bg-[#0d0609] text-white overflow-x-hidden"
    >
      <ScrollProgress color="bg-gradient-to-r from-rose-400 via-pink-500 to-rose-600" />

      {/* Global ambient gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] rounded-full blur-[120px] opacity-20 bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-600" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[100px] opacity-10 bg-gradient-to-tl from-rose-400 to-purple-600" />
      </div>

      {/* Particle overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <ParticleBackground type="hearts" density={25} />
      </div>

      {/* Sparkles scattered across the page */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        {[
          { delay: 0, x: '10%', y: '15%' },
          { delay: 1.2, x: '85%', y: '25%' },
          { delay: 0.6, x: '45%', y: '60%' },
          { delay: 1.8, x: '70%', y: '80%' },
          { delay: 2.4, x: '20%', y: '70%' },
          { delay: 0.3, x: '60%', y: '10%' },
        ].map((s, i) => (
          <FloatingSparkle key={i} {...s} />
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════
          SECTION 1: Hero — Full screen romantic entrance
          ═══════════════════════════════════════════════════ */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 min-h-screen flex items-center justify-center p-6"
      >
        <div className="max-w-3xl w-full text-center">
          {/* Pulsing heart icon */}
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

          {/* Receiver name — gradient script */}
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

          {/* Scroll hint */}
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

      {/* ═══════════════════════════════════════════════════
          SECTION 2: Our Story Timeline
          ═══════════════════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-rose-400/60 uppercase tracking-[0.25em] text-sm">
              Our Journey
            </span>
            <h2
              className={cn(
                'text-4xl md:text-5xl font-bold mt-3',
                'bg-clip-text text-transparent',
                'bg-gradient-to-r from-rose-400 to-pink-400'
              )}
            >
              How Our Story Unfolded
            </h2>
          </motion.div>

          <Timeline
            items={TIMELINE_ITEMS}
            accentColor="bg-rose-500"
            lineColor="bg-rose-500/20"
          />
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 flex items-center justify-center py-8">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="h-px w-32 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent"
        />
        <Heart className="mx-4 w-5 h-5 text-rose-400/50 fill-rose-400/50" />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="h-px w-32 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent"
        />
      </div>

      {/* ═══════════════════════════════════════════════════
          SECTION 3: The Love Letter (User message + placeholder)
          ═══════════════════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-rose-400/60 uppercase tracking-[0.25em] text-sm">
              From My Heart
            </span>
            <h2
              className={cn(
                'text-4xl md:text-5xl font-bold mt-3',
                'bg-clip-text text-transparent',
                'bg-gradient-to-r from-rose-400 to-pink-400'
              )}
            >
              My Letter to You
            </h2>
          </motion.div>

          {/* Glass card with the user's message */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl p-8 md:p-14 mb-12 bg-rose-950/30 border border-rose-500/10 backdrop-blur-sm overflow-hidden"
          >
            {/* Decorative corners */}
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

          {/* Extended love letter paragraphs */}
          <div className="space-y-8">
            {LOVE_LETTER_PARAGRAPHS.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="text-lg leading-relaxed text-rose-200/60 font-light"
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Poetry section */}
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center border-l-0 px-4"
          >
            <div className="flex justify-center gap-2 mb-4">
              <Star className="w-4 h-4 text-rose-400/40" />
              <Star className="w-5 h-5 text-rose-400/50" />
              <Star className="w-4 h-4 text-rose-400/40" />
            </div>
            <p className="text-xl md:text-2xl italic text-rose-300/50 leading-relaxed">
              "I loved you yesterday,<br />
              I love you still.<br />
              I always have,<br />
              I always will."
            </p>
          </motion.blockquote>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 4: Reasons I Love You — Carousel / Grid
          ═══════════════════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-rose-400/60 uppercase tracking-[0.25em] text-sm">
              Endless Reasons
            </span>
            <h2
              className={cn(
                'text-4xl md:text-5xl font-bold mt-3',
                'bg-clip-text text-transparent',
                'bg-gradient-to-r from-rose-400 to-pink-400'
              )}
            >
              Why I Love You
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REASONS_I_LOVE_YOU.map((reason, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="group relative rounded-2xl p-6 bg-rose-950/20 border border-rose-500/10 backdrop-blur-sm cursor-default"
              >
                <div className="flex items-start gap-4">
                  <motion.span
                    className="text-2xl flex-shrink-0 mt-0.5"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: 'easeInOut',
                    }}
                  >
                    {'\u2764\uFE0F'}
                  </motion.span>
                  <p className="text-rose-100/80 text-lg font-light leading-relaxed">
                    {reason}
                  </p>
                </div>
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-rose-500/5 to-pink-500/5" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 5: Closing — Signature & Final Embrace
          ═══════════════════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen flex items-center justify-center py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Decorative line */}
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

            <p className="text-rose-200/30 text-sm pt-8">
              Every love story is beautiful, but ours is my favorite.
            </p>
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
            <p className="text-rose-300/20 text-xs">
              A platform for sharing emotions, one page at a time
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

      <div className="h-20" />
    </div>
  );
};
