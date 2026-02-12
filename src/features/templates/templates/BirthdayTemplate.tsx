// Birthday Template - Joyful, Vibrant, Celebratory
// Full-length immersive experience with 6 scrollable sections

import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageData } from '@/shared/types';
import { cn } from '@/shared/lib/cn';
import { Sparkles, Gift, Music, Star, PartyPopper, Cake } from 'lucide-react';
import { useRef, useState } from 'react';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { ParticleBackground } from '@/components/motion/ParticleBackground';
import { Timeline, TimelineItem } from '@/components/sections/Timeline';

interface BirthdayTemplateProps {
  message: MessageData;
}

// ── Placeholder content ──────────────────────────────────────────────
const BIRTHDAY_PARAGRAPHS = [
  `HAPPY BIRTHDAY to the most incredible person anyone could ask for! Today we celebrate not just another year, but every moment of joy, laughter, and love you've brought into our lives. From your first steps to your latest achievements, watching you grow has been life's greatest privilege.`,

  `On this special day, I want you to know just how much you mean to everyone around you. You have a gift for making people feel seen, heard, and valued. Your smile can light up the darkest room, your laughter is the most contagious melody, and your kindness ripples out far beyond what you can see.`,

  `This past year has been nothing short of amazing for you. You've faced challenges with grace, celebrated victories with humility, and continued to be the kind of person that makes the world a better place. Every obstacle you overcame, every dream you chased, and every act of kindness you showed — they all add up to the remarkable story of who you are.`,

  `As you blow out the candles today, know that every wish you make is backed by the love and support of everyone who has been lucky enough to know you. You deserve every good thing this world has to offer, and I truly believe that the best chapters of your story are yet to be written.`,

  `May this new year of your life bring you adventures that make your heart race, quiet moments that bring you peace, friendships that fill you with warmth, and achievements that make you proud. May you continue to dream big, love deeply, and live fully — because that is exactly what someone as wonderful as you deserves.`,

  `Here is to another year of incredible memories, unstoppable growth, and the kind of happiness that fills you from the inside out. The world is so much brighter because you are in it. Happy Birthday — today and every day, you are celebrated and loved beyond measure.`,
];

const BIRTHDAY_WISHES = [
  { text: 'May all your dreams come true', emoji: '\u2B50' },
  { text: 'Wishing you endless laughter', emoji: '\u{1F602}' },
  { text: 'Here\'s to adventure and discovery', emoji: '\u{1F30D}' },
  { text: 'May love surround you always', emoji: '\u{1F495}' },
  { text: 'To health, happiness, and success', emoji: '\u{1F389}' },
  { text: 'Cheers to the amazing person you are', emoji: '\u{1F942}' },
  { text: 'May this year be your best yet', emoji: '\u{1F31F}' },
  { text: 'Wishing you magic in every moment', emoji: '\u2728' },
];

const YEAR_IN_REVIEW: TimelineItem[] = [
  {
    label: 'January',
    title: 'A Fresh Start',
    description:
      'The year began with new resolutions and bright hopes. You stepped into it with determination and optimism.',
    icon: '\u{1F305}',
  },
  {
    label: 'Spring',
    title: 'Growth & Bloom',
    description:
      'Like the season itself, you blossomed. New opportunities emerged, and you embraced every single one.',
    icon: '\u{1F338}',
  },
  {
    label: 'Summer',
    title: 'Adventures & Memories',
    description:
      'Sun-soaked days filled with laughter, travel, and the kind of memories that last a lifetime.',
    icon: '\u2600\uFE0F',
  },
  {
    label: 'Autumn',
    title: 'Harvest of Achievements',
    description:
      'All your hard work came to fruition. You proved once again that dedication and heart always pay off.',
    icon: '\u{1F341}',
  },
  {
    label: 'Today',
    title: 'Your Special Day!',
    description:
      'And here we are — celebrating YOU. Every moment of this year led to this beautiful day.',
    icon: '\u{1F382}',
  },
];

// ── Sub-components ───────────────────────────────────────────────────

const BirthdayCake = () => {
  const [blown, setBlown] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0, y: 40 }}
      whileInView={{ scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
      className="flex flex-col items-center cursor-pointer select-none"
      onClick={() => setBlown(true)}
    >
      {/* Candle flames */}
      <div className="flex gap-4 mb-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={
              blown
                ? { opacity: 0, scale: 0, y: -10 }
                : {
                    y: [0, -3, 0],
                    scale: [1, 1.15, 1],
                  }
            }
            transition={
              blown
                ? { duration: 0.3, delay: i * 0.1 }
                : { duration: 0.8, repeat: Infinity, delay: i * 0.2 }
            }
            className="text-2xl"
          >
            {'\u{1F525}'}
          </motion.div>
        ))}
      </div>

      {/* Cake body */}
      <div className="text-7xl md:text-8xl">
        {'\u{1F382}'}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className={cn(
          'text-sm mt-4 transition-colors',
          blown ? 'text-amber-300/60' : 'text-amber-400/40'
        )}
      >
        {blown ? 'Wish made! \u2728' : 'Tap to blow out the candles!'}
      </motion.p>

      {blown && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2"
        >
          <Sparkles className="w-6 h-6 text-amber-400/50" />
        </motion.div>
      )}
    </motion.div>
  );
};

const Balloon = ({ color, delay, x }: { color: string; delay: number; x: string }) => (
  <motion.div
    className="absolute bottom-0 pointer-events-none"
    style={{ left: x }}
    initial={{ y: '100%', opacity: 0 }}
    whileInView={{ y: '-120%', opacity: [0, 0.6, 0.6, 0] }}
    viewport={{ once: true }}
    transition={{ duration: 8, delay, ease: 'easeOut' }}
  >
    <div className={cn('w-8 h-10 rounded-full', color)} />
    <div className="w-px h-20 bg-white/20 mx-auto" />
  </motion.div>
);

// ── Main Template ────────────────────────────────────────────────────

export const BirthdayTemplate = ({ message }: BirthdayTemplateProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.92]);

  const { receiver, sender } = message.data;
  const userMessage = message.data.message;

  return (
    <div
      ref={containerRef}
      className="relative bg-[#0a0806] text-white overflow-x-hidden"
    >
      <ScrollProgress color="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500" />

      {/* Global ambient gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] rounded-full blur-[120px] opacity-15 bg-gradient-to-br from-amber-500 via-orange-500 to-pink-600" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[100px] opacity-10 bg-gradient-to-tl from-purple-500 to-amber-400" />
      </div>

      {/* Confetti particles */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <ParticleBackground type="confetti" density={35} />
      </div>

      {/* ═══════════════════════════════════════════════════
          SECTION 1: Hero — Explosive celebration opening
          ═══════════════════════════════════════════════════ */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 min-h-screen flex items-center justify-center p-6 overflow-hidden"
      >
        {/* Floating balloons */}
        <Balloon color="bg-pink-400/60" delay={0.5} x="10%" />
        <Balloon color="bg-amber-400/60" delay={1} x="25%" />
        <Balloon color="bg-purple-400/60" delay={0.8} x="75%" />
        <Balloon color="bg-cyan-400/60" delay={1.3} x="88%" />

        <div className="max-w-3xl w-full text-center relative z-10">
          {/* Celebration burst */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-7xl md:text-8xl mb-4 inline-block"
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {'\u{1F389}'}
            </motion.span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-amber-300/70 text-xl md:text-2xl mb-2 font-light uppercase tracking-widest"
          >
            Happy Birthday
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={cn(
              'font-display text-6xl md:text-7xl lg:text-9xl font-bold mb-6',
              'bg-clip-text text-transparent',
              'bg-gradient-to-r from-amber-300 via-orange-400 to-pink-400',
              'leading-tight'
            )}
          >
            {receiver}!
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-3 text-amber-400/40"
          >
            <Star className="w-4 h-4" />
            <span className="text-lg">Wishing you the most wonderful day</span>
            <Star className="w-4 h-4" />
          </motion.div>

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
              className="flex flex-col items-center gap-2 text-amber-400/30"
            >
              <span className="text-sm">Scroll to celebrate</span>
              <PartyPopper className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════
          SECTION 2: Year in Review Timeline
          ═══════════════════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-400/50 uppercase tracking-[0.25em] text-sm">
              Looking Back
            </span>
            <h2
              className={cn(
                'text-4xl md:text-5xl font-bold mt-3',
                'bg-clip-text text-transparent',
                'bg-gradient-to-r from-amber-300 via-orange-400 to-pink-400'
              )}
            >
              This Year in Review
            </h2>
          </motion.div>

          <Timeline
            items={YEAR_IN_REVIEW}
            accentColor="bg-amber-500"
            lineColor="bg-amber-500/20"
          />
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 flex items-center justify-center py-8">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="h-px w-32 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"
        />
        <Gift className="mx-4 w-5 h-5 text-amber-400/40" />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="h-px w-32 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"
        />
      </div>

      {/* ═══════════════════════════════════════════════════
          SECTION 3: Birthday Message — User + placeholder
          ═══════════════════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-orange-400/50 uppercase tracking-[0.25em] text-sm">
              A Special Message
            </span>
            <h2
              className={cn(
                'text-4xl md:text-5xl font-bold mt-3',
                'bg-clip-text text-transparent',
                'bg-gradient-to-r from-amber-300 to-orange-400'
              )}
            >
              Birthday Wishes for You
            </h2>
          </motion.div>

          {/* User's message */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl p-8 md:p-14 mb-12 bg-amber-950/20 border border-amber-500/10 backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-24 h-24 opacity-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-br-full" />
            <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10 bg-gradient-to-tl from-pink-400 to-amber-500 rounded-tl-full" />

            <p className="text-lg md:text-xl leading-relaxed text-amber-100/90 whitespace-pre-wrap relative z-10 font-light">
              Dear {receiver},
            </p>
            <div className="h-4" />
            <p className="text-lg md:text-xl leading-relaxed text-amber-100/90 whitespace-pre-wrap relative z-10 font-light">
              {userMessage}
            </p>
          </motion.div>

          {/* Extended birthday paragraphs */}
          <div className="space-y-8">
            {BIRTHDAY_PARAGRAPHS.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="text-lg leading-relaxed text-amber-200/50 font-light"
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 4: Wishes Wall
          ═══════════════════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-pink-400/50 uppercase tracking-[0.25em] text-sm">
              Sending You
            </span>
            <h2
              className={cn(
                'text-4xl md:text-5xl font-bold mt-3',
                'bg-clip-text text-transparent',
                'bg-gradient-to-r from-amber-300 via-pink-400 to-purple-400'
              )}
            >
              Birthday Wishes
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BIRTHDAY_WISHES.map((wish, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="group relative rounded-2xl p-5 bg-amber-950/20 border border-amber-500/10 backdrop-blur-sm text-center cursor-default"
              >
                <motion.span
                  className="text-3xl block mb-3"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut',
                  }}
                >
                  {wish.emoji}
                </motion.span>
                <p className="text-amber-100/70 text-sm font-light">{wish.text}</p>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-b from-amber-500/5 to-pink-500/5" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 5: Cake — Interactive blow-out
          ═══════════════════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen flex items-center justify-center py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-amber-400/50 uppercase tracking-[0.25em] text-sm">
              Make a Wish
            </span>
            <h2
              className={cn(
                'text-4xl md:text-5xl font-bold mt-3',
                'bg-clip-text text-transparent',
                'bg-gradient-to-r from-amber-300 to-orange-400'
              )}
            >
              Your Birthday Cake
            </h2>
          </motion.div>

          <BirthdayCake />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 6: Closing — Signature
          ═══════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
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
                className="h-px w-24 bg-gradient-to-r from-transparent to-amber-500/30"
              />
              <Cake className="mx-3 w-5 h-5 text-amber-400/40" />
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                className="h-px w-24 bg-gradient-to-l from-transparent to-amber-500/30"
              />
            </div>

            <p className="text-amber-300/50 text-lg">
              With all the birthday love in the world,
            </p>

            <motion.p
              whileHover={{ scale: 1.05 }}
              className={cn(
                'font-display text-5xl md:text-6xl font-bold',
                'bg-clip-text text-transparent',
                'bg-gradient-to-r from-amber-300 via-orange-400 to-pink-400'
              )}
            >
              {sender}
            </motion.p>

            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <PartyPopper className="w-10 h-10 mx-auto text-amber-500/60" />
            </motion.div>

            <p className="text-amber-300/20 text-sm pt-8">
              Here's to another year of being absolutely amazing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <section className="relative z-10 py-16 px-6 border-t border-amber-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-amber-400/30 text-sm">
              This message was created with EmotionCreator
            </p>
            <p className="text-amber-400/20 text-xs">
              A platform for sharing emotions, one page at a time
            </p>
            <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
              <a
                href="/"
                className={cn(
                  'text-sm font-medium',
                  'bg-clip-text text-transparent',
                  'bg-gradient-to-r from-amber-400 to-orange-400',
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
