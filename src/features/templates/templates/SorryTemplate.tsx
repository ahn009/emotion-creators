// Sorry Template - Sincere, Reflective, Hopeful
// Full-length immersive experience with 5 scrollable sections

import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageData } from '@/shared/types';
import { cn } from '@/shared/lib/cn';
import { Sparkles, CloudRain, Leaf, Sun } from 'lucide-react';
import { useRef } from 'react';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { ParticleBackground } from '@/components/motion/ParticleBackground';
import { Timeline, TimelineItem } from '@/components/sections/Timeline';

interface SorryTemplateProps {
  message: MessageData;
}

// ── Placeholder content ──────────────────────────────────────────────
const APOLOGY_PARAGRAPHS = [
  `I know words can never fully mend what my actions have broken, but I need you to know how deeply I regret causing you pain. Looking back, I see now how my thoughtlessness must have hurt you, and the weight of that realization keeps me awake at night. I wish I could go back and choose differently, act with the care and consideration you have always deserved.`,

  `You trusted me with your heart, with your time, with your vulnerability — and I failed to honor that trust in the way it deserved. That is something I carry with me, not as a burden of guilt, but as a reminder of what truly matters: your feelings, your well-being, your peace of mind. I never wanted to be the reason you felt less than the extraordinary person you are.`,

  `I have spent a lot of time reflecting on what happened, not to make excuses, but to truly understand. I realize now that my actions came from a place of carelessness, not cruelty, but I know that doesn't lessen the impact. Pain is pain regardless of intent, and I am deeply sorry for the hurt I caused.`,

  `What I value most in this world is the bond we share, and I am terrified that my actions may have damaged something so precious. I want you to know that I see the cracks, and I am committed to the slow, patient work of repair. Not because I feel obligated, but because you mean more to me than my pride or my comfort.`,

  `I don't expect forgiveness overnight. Real healing takes time, and I am willing to wait, to listen, to change. I want to earn back your trust through consistent actions, not empty promises. Every day, I will strive to be the person you believed me to be — the person I know I can become with your patience and grace.`,

  `If there is anything I can do to make things right, please tell me. I am here, with open ears and an open heart. And even if you need space, know that I will be waiting with the same sincerity I carry in every word written here. You deserve nothing less than complete honesty, and that is what I am giving you now.`,
];

const COMMITMENTS = [
  {
    title: 'Listen More, Assume Less',
    description: 'I will make space for your feelings and truly hear what you need, without jumping to conclusions.',
    icon: '\u{1F442}',
  },
  {
    title: 'Choose Words with Care',
    description: 'I will be mindful of how my words affect you, speaking with the kindness you deserve.',
    icon: '\u{1F4AC}',
  },
  {
    title: 'Show Up Consistently',
    description: 'Actions speak louder than words. I will prove my sincerity through what I do, every single day.',
    icon: '\u{1F91D}',
  },
  {
    title: 'Be Patient with the Process',
    description: 'Healing takes time, and I will honor your pace without rushing or pressuring.',
    icon: '\u{1F331}',
  },
  {
    title: 'Take Responsibility',
    description: 'I will own my mistakes fully, without deflecting or minimizing their impact.',
    icon: '\u{1F4AA}',
  },
  {
    title: 'Grow from This',
    description: 'I will use this experience not just to repair, but to become genuinely better — for you and for myself.',
    icon: '\u{1F33F}',
  },
];

const HEALING_TIMELINE: TimelineItem[] = [
  {
    label: 'Acknowledgment',
    title: 'Seeing What I Did Wrong',
    description:
      'The first step is the hardest: facing my own actions with honesty and accepting the hurt they caused.',
    icon: '\u{1F52C}',
  },
  {
    label: 'Understanding',
    title: 'Learning Why It Mattered',
    description:
      'Taking time to truly understand your perspective, not just the event, but the deeper impact on your trust.',
    icon: '\u{1F4D6}',
  },
  {
    label: 'Change',
    title: 'Turning Words Into Action',
    description:
      'Making real, visible changes in my behavior — small daily choices that reflect the person I want to be for you.',
    icon: '\u{1F504}',
  },
  {
    label: 'Healing',
    title: 'Rebuilding What Was Broken',
    description:
      'Patiently nurturing our bond back to health, knowing that some things grow even stronger after being mended.',
    icon: '\u{1F33B}',
  },
];

// ── Sub-components ───────────────────────────────────────────────────

const GrowingPlant = () => (
  <div className="flex flex-col items-center">
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="origin-bottom"
    >
      <div className="flex flex-col items-center">
        {/* Bloom */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.6, type: 'spring' }}
          className="text-5xl mb-2"
        >
          {'\u{1F33C}'}
        </motion.div>
        {/* Stem */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="w-1 h-32 bg-gradient-to-b from-emerald-400/60 to-emerald-600/30 rounded-full origin-bottom"
        />
        {/* Soil */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-16 h-3 bg-amber-900/30 rounded-full mt-1"
        />
      </div>
    </motion.div>
  </div>
);

// ── Main Template ────────────────────────────────────────────────────

export const SorryTemplate = ({ message }: SorryTemplateProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.12], [1, 0.92]);

  const { receiver, sender } = message.data;
  const userMessage = message.data.message;

  return (
    <div
      ref={containerRef}
      className="relative bg-[#080b10] text-white overflow-x-hidden"
    >
      <ScrollProgress color="bg-gradient-to-r from-slate-400 via-sky-400 to-amber-400" />

      {/* Global ambient gradients — stormy blues clearing to warm amber */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] rounded-full blur-[120px] opacity-15 bg-gradient-to-br from-slate-500 via-sky-600 to-cyan-700" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[100px] opacity-10 bg-gradient-to-tl from-amber-400 to-emerald-500" />
      </div>

      {/* Rain particle overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <ParticleBackground type="rain" density={50} />
      </div>

      {/* ═══════════════════════════════════════════════════
          SECTION 1: Hero — Stormy sky, sincere opening
          ═══════════════════════════════════════════════════ */}
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
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {'\u{1F33F}'}
            </motion.span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 text-xl md:text-2xl mb-4 font-light"
          >
            A heartfelt apology to
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={cn(
              'font-display text-6xl md:text-7xl lg:text-8xl font-bold mb-6',
              'bg-clip-text text-transparent',
              'bg-gradient-to-r from-slate-300 via-sky-300 to-cyan-300',
              'leading-tight'
            )}
          >
            {receiver}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-slate-500 text-lg"
          >
            from {sender}, with sincerity
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
              className="flex flex-col items-center gap-2 text-slate-500/50"
            >
              <span className="text-sm">Scroll to read</span>
              <CloudRain className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════
          SECTION 2: Reflection — Full-page letter
          ═══════════════════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sky-400/50 uppercase tracking-[0.25em] text-sm">
              Words from My Heart
            </span>
            <h2
              className={cn(
                'text-4xl md:text-5xl font-bold mt-3',
                'bg-clip-text text-transparent',
                'bg-gradient-to-r from-slate-300 to-sky-300'
              )}
            >
              I Need You to Know
            </h2>
          </motion.div>

          {/* User's message */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl p-8 md:p-14 mb-12 bg-slate-900/40 border border-slate-500/10 backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-24 h-24 opacity-10 bg-gradient-to-br from-slate-400 to-sky-400 rounded-br-full" />
            <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10 bg-gradient-to-tl from-amber-400 to-emerald-400 rounded-tl-full" />

            <p className="text-lg md:text-xl leading-relaxed text-slate-200/80 whitespace-pre-wrap relative z-10 font-light">
              Dear {receiver},
            </p>
            <div className="h-4" />
            <p className="text-lg md:text-xl leading-relaxed text-slate-200/80 whitespace-pre-wrap relative z-10 font-light">
              {userMessage}
            </p>
          </motion.div>

          {/* Extended apology paragraphs */}
          <div className="space-y-8">
            {APOLOGY_PARAGRAPHS.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="text-lg leading-relaxed text-slate-300/50 font-light"
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 flex items-center justify-center py-8">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="h-px w-32 bg-gradient-to-r from-transparent via-slate-500/30 to-transparent"
        />
        <Leaf className="mx-4 w-5 h-5 text-emerald-500/40" />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="h-px w-32 bg-gradient-to-r from-transparent via-slate-500/30 to-transparent"
        />
      </div>

      {/* ═══════════════════════════════════════════════════
          SECTION 3: Amends — Commitments checklist
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
              My Promise
            </span>
            <h2
              className={cn(
                'text-4xl md:text-5xl font-bold mt-3',
                'bg-clip-text text-transparent',
                'bg-gradient-to-r from-slate-300 via-sky-300 to-amber-300'
              )}
            >
              How I Will Do Better
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMMITMENTS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative rounded-2xl p-6 bg-slate-900/30 border border-slate-500/10 backdrop-blur-sm"
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-200/90 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-slate-400/70 leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-sky-500/5 to-amber-500/5" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 4: Hope — Healing timeline + growing plant
          ═══════════════════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-emerald-400/50 uppercase tracking-[0.25em] text-sm">
              The Path Forward
            </span>
            <h2
              className={cn(
                'text-4xl md:text-5xl font-bold mt-3',
                'bg-clip-text text-transparent',
                'bg-gradient-to-r from-sky-300 via-emerald-300 to-amber-300'
              )}
            >
              From Storm to Sunshine
            </h2>
          </motion.div>

          <Timeline
            items={HEALING_TIMELINE}
            accentColor="bg-sky-500"
            lineColor="bg-sky-500/20"
          />

          {/* Growing plant animation */}
          <div className="mt-20">
            <GrowingPlant />
          </div>

          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-xl md:text-2xl italic text-slate-400/40 leading-relaxed">
              "The most beautiful thing about healing<br />
              is that it proves love is still alive."
            </p>
          </motion.blockquote>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 5: Forgiveness — Humble closing
          ═══════════════════════════════════════════════════ */}
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
                className="h-px w-24 bg-gradient-to-r from-transparent to-slate-500/30"
              />
              <Sun className="mx-3 w-5 h-5 text-amber-400/40" />
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                className="h-px w-24 bg-gradient-to-l from-transparent to-slate-500/30"
              />
            </div>

            <p className="text-slate-400/60 text-lg">
              With deep sincerity and hope,
            </p>

            <motion.p
              whileHover={{ scale: 1.05 }}
              className={cn(
                'font-display text-5xl md:text-6xl font-bold',
                'bg-clip-text text-transparent',
                'bg-gradient-to-r from-slate-300 via-sky-300 to-amber-300'
              )}
            >
              {sender}
            </motion.p>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Leaf className="w-10 h-10 mx-auto text-emerald-500/50" />
            </motion.div>

            <p className="text-slate-400/25 text-sm pt-8">
              Every ending can be the start of something even more beautiful.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <section className="relative z-10 py-16 px-6 border-t border-slate-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-slate-500/30 text-sm">
              This message was created with EmotionCreator
            </p>
            <p className="text-slate-500/20 text-xs">
              A platform for sharing emotions, one page at a time
            </p>
            <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
              <a
                href="/"
                className={cn(
                  'text-sm font-medium',
                  'bg-clip-text text-transparent',
                  'bg-gradient-to-r from-slate-400 to-sky-400',
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
