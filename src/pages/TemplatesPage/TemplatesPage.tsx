import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageShell } from '@/components/layout';
import { Container, SEO } from '@/components/common';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/shared/config/constants';
import { TEMPLATES } from '@/features/templates/constants';
import { Sparkles, ArrowRight, Heart, Zap, Star } from 'lucide-react';
import { useMessageStore } from '@/features/messages/stores/messageStore';

/** Unique extended copy and accent colors per template — each emotion gets its own visual identity. */
const TEMPLATE_DETAILS: Record<
  string,
  {
    tagline: string;
    longDescription: string;
    whenToUse: string[];
    bgAccent: string;
    borderAccent: string;
    textAccent: string;
    glowColor: string;
  }
> = {
  love: {
    tagline: 'Let your heart speak',
    longDescription:
      'Love is the most powerful emotion we experience. Whether it\'s the early butterflies, years of deep companionship, or that quiet comfort of knowing someone truly understands you — this template wraps your words in warmth. Rose petals, soft gradients, and heartfelt design elements create an intimate backdrop for your most personal message. Say what you\'ve always wanted to say.',
    whenToUse: [
      'Anniversary surprises',
      'Long-distance "thinking of you" notes',
      'First time saying "I love you"',
      'Just because — the best reason of all',
    ],
    bgAccent: 'from-rose-500/10 via-pink-500/5 to-transparent',
    borderAccent: 'hover:border-rose-500/30',
    textAccent: 'text-rose-400',
    glowColor: 'shadow-rose-500/10',
  },
  sorry: {
    tagline: 'Mend what matters',
    longDescription:
      'Apologies are hard. Finding the right words when you know you\'ve hurt someone can feel impossible. This template provides a calm, respectful space for your message — clean lines, soothing blue tones, and a gentle presentation that says "I care enough to do this thoughtfully." It won\'t fix everything, but it\'s the first step toward making things right.',
    whenToUse: [
      'After a disagreement or misunderstanding',
      'When distance has grown between you',
      'Making amends for past mistakes',
      'Showing vulnerability and accountability',
    ],
    bgAccent: 'from-sky-500/10 via-blue-500/5 to-transparent',
    borderAccent: 'hover:border-sky-500/30',
    textAccent: 'text-sky-400',
    glowColor: 'shadow-sky-500/10',
  },
  birthday: {
    tagline: 'Make their day unforgettable',
    longDescription:
      'Birthdays only come once a year, and a generic "HBD" text doesn\'t cut it anymore. This template turns your birthday wishes into a celebration — vibrant colors, playful energy, and a design that feels like confetti and cake rolled into one. Whether they\'re turning 18 or 80, your words deserve a presentation that matches the joy of the occasion.',
    whenToUse: [
      'Best friend\'s milestone birthday',
      'Family celebrations from afar',
      'Colleague or teammate birthdays',
      'Surprise early morning birthday messages',
    ],
    bgAccent: 'from-amber-500/10 via-yellow-500/5 to-transparent',
    borderAccent: 'hover:border-amber-500/30',
    textAccent: 'text-amber-400',
    glowColor: 'shadow-amber-500/10',
  },
  gratitude: {
    tagline: 'Thank them the right way',
    longDescription:
      'Gratitude is underrated. We think it but rarely say it well. This template gives your appreciation the elegance it deserves — warm emerald tones, refined typography, and a presentation that elevates a simple "thank you" into something they\'ll remember. Whether someone saved your day or changed your life, this is how you honor that.',
    whenToUse: [
      'Thanking a mentor or teacher',
      'After someone went above and beyond',
      'Expressing appreciation for everyday kindness',
      'End-of-year gratitude for someone special',
    ],
    bgAccent: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    borderAccent: 'hover:border-emerald-500/30',
    textAccent: 'text-emerald-400',
    glowColor: 'shadow-emerald-500/10',
  },
  congratulations: {
    tagline: 'Celebrate their win',
    longDescription:
      'Someone you care about just achieved something incredible — a promotion, graduation, new baby, dream job, or personal milestone. Don\'t let the moment pass with just a thumbs-up emoji. This template brings the energy of a standing ovation to your screen. Bold purples, electric pinks, and celebratory design elements that say "I see you, and I\'m proud of you."',
    whenToUse: [
      'Graduations and academic achievements',
      'Career promotions and new jobs',
      'Personal milestones and breakthroughs',
      'Engagements, weddings, and new beginnings',
    ],
    bgAccent: 'from-purple-500/10 via-fuchsia-500/5 to-transparent',
    borderAccent: 'hover:border-purple-500/30',
    textAccent: 'text-purple-400',
    glowColor: 'shadow-purple-500/10',
  },
  encouragement: {
    tagline: 'Lift them up when it counts',
    longDescription:
      'Everyone hits a wall sometimes. When someone you care about is struggling — with work, health, confidence, or life in general — the right words at the right time can change everything. This template channels strength and hope through deep indigo tones and uplifting design. Your message becomes a lifeline, a reminder that they\'re not alone and they\'re stronger than they think.',
    whenToUse: [
      'Before a big exam or interview',
      'During tough personal times',
      'When someone doubts themselves',
      'Supporting a friend through change',
    ],
    bgAccent: 'from-indigo-500/10 via-blue-500/5 to-transparent',
    borderAccent: 'hover:border-indigo-500/30',
    textAccent: 'text-indigo-400',
    glowColor: 'shadow-indigo-500/10',
  },
  'miss-you': {
    tagline: 'Bridge the distance',
    longDescription:
      'Missing someone is a quiet kind of pain. It sits in the background of your day — in a song that plays, a place you walk past, a joke only they would get. This template captures that tender, nostalgic feeling with soft violet tones and a dreamy presentation. It tells someone "you\'re still here in my thoughts, even though you\'re not here beside me." Sometimes that\'s all someone needs to hear.',
    whenToUse: [
      'Long-distance friendships and relationships',
      'After someone moves away',
      'Reconnecting after losing touch',
      'Holiday seasons when someone is absent',
    ],
    bgAccent: 'from-violet-500/10 via-purple-500/5 to-transparent',
    borderAccent: 'hover:border-violet-500/30',
    textAccent: 'text-violet-400',
    glowColor: 'shadow-violet-500/10',
  },
  friendship: {
    tagline: 'Celebrate the bond',
    longDescription:
      'Good friendships are one of life\'s greatest treasures, yet we rarely stop to tell our friends what they mean to us. This template wraps your words in warm amber and golden tones — the colors of sunrise and warmth — because that\'s what real friendship feels like. Whether you\'ve been friends for five months or fifty years, put it into words. They deserve to know.',
    whenToUse: [
      'Friendship anniversaries',
      'After a friend helps you through a hard time',
      'Just to say "I appreciate you"',
      'Best friend appreciation out of the blue',
    ],
    bgAccent: 'from-orange-500/10 via-amber-500/5 to-transparent',
    borderAccent: 'hover:border-orange-500/30',
    textAccent: 'text-orange-400',
    glowColor: 'shadow-orange-500/10',
  },
  'get-well': {
    tagline: 'Send healing thoughts',
    longDescription:
      'When someone is sick, recovering, or going through a health struggle, words of comfort matter more than you think. A visit isn\'t always possible, but a heartfelt message can be. This template uses gentle pinks and soft rose tones — colors that feel like a warm blanket and a cup of tea. It creates a safe, caring space for your well-wishes. Let them know you\'re thinking of them and rooting for their recovery.',
    whenToUse: [
      'Hospital stays and surgeries',
      'Recovery from illness or injury',
      'Mental health support',
      'Sending comfort during chronic conditions',
    ],
    bgAccent: 'from-pink-400/10 via-rose-400/5 to-transparent',
    borderAccent: 'hover:border-pink-400/30',
    textAccent: 'text-pink-400',
    glowColor: 'shadow-pink-400/10',
  },
};

const TemplatesPage = () => {
  const setTemplate = useMessageStore((s) => s.setTemplate);

  const handleSelectTemplate = (templateId: string) => {
    setTemplate(templateId as Parameters<typeof setTemplate>[0]);
  };

  const templatesStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Emotion Message Templates',
    description: 'Browse 9 beautiful emotion templates for creating heartfelt digital messages.',
    numberOfItems: TEMPLATES.length,
    itemListElement: TEMPLATES.map((template, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: template.name,
      description: template.description,
      url: 'https://emotion-creators.vercel.app/create',
    })),
  };

  return (
    <PageShell>
      <SEO
        title="Message Templates - EmotionCreator"
        description="Browse 9 beautiful emotion templates: love, sorry, birthday, thank you, congratulations & more. Create your heartfelt message in minutes."
        canonical="/templates"
        structuredData={templatesStructuredData}
      />
      <div className="py-24 md:py-32">
        <Container size="lg">
          {/* ── Hero Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Emotion Templates
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
              Every emotion deserves its own canvas. Our 9 handcrafted templates
              are designed to amplify the feeling behind your words — from the
              warmth of love to the hope of healing. Each one uses unique
              colors, typography, and design elements that match the emotion
              perfectly.
            </p>
          </motion.div>

          {/* ── Quick Stats ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-6 mb-16"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-glass-bg border border-glass-border">
              <Star className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-text-secondary">
                <strong className="text-foreground">9</strong> unique emotions
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-glass-bg border border-glass-border">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-text-secondary">
                Unique styling per template
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-glass-bg border border-glass-border">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm text-text-secondary">
                Free to use, always
              </span>
            </div>
          </motion.div>

          {/* ── Template Cards — each emotion gets its own distinct section ── */}
          <div className="space-y-8 max-w-4xl mx-auto">
            {TEMPLATES.map((template, index) => {
              const details = TEMPLATE_DETAILS[template.id];
              if (!details) return null;

              return (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <Link
                    to={ROUTES.CREATE}
                    onClick={() => handleSelectTemplate(template.id)}
                    className="block group"
                  >
                    <div
                      className={`glass-card rounded-2xl overflow-hidden transition-all duration-500 ${details.borderAccent} group-hover:shadow-xl ${details.glowColor}`}
                    >
                      {/* Gradient top accent bar */}
                      <div
                        className={`h-1.5 bg-gradient-to-r ${template.gradient}`}
                      />

                      {/* Subtle gradient background tint */}
                      <div
                        className={`bg-gradient-to-br ${details.bgAccent} p-6 md:p-8`}
                      >
                        {/* Header row */}
                        <div className="flex items-start justify-between gap-4 mb-5">
                          <div className="flex items-center gap-4">
                            <div
                              className={`flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${template.gradient} text-2xl shadow-lg flex-shrink-0`}
                            >
                              {template.icon}
                            </div>
                            <div>
                              <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                                {template.name}
                              </h2>
                              <p className={`text-sm font-medium ${details.textAccent}`}>
                                {details.tagline}
                              </p>
                            </div>
                          </div>

                          {/* CTA arrow */}
                          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-glass-bg border border-glass-border text-sm text-text-secondary group-hover:text-foreground group-hover:border-primary/30 transition-all">
                            <Sparkles className="w-3.5 h-3.5" />
                            Use template
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>

                        {/* Long description */}
                        <p className="text-text-secondary leading-relaxed mb-6">
                          {details.longDescription}
                        </p>

                        {/* When to use */}
                        <div>
                          <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
                            Perfect for
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {details.whenToUse.map((use) => (
                              <span
                                key={use}
                                className="inline-flex items-center px-3 py-1.5 rounded-full bg-glass-bg border border-glass-border text-xs text-text-secondary"
                              >
                                {use}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Mobile CTA */}
                        <div className="sm:hidden mt-5">
                          <Button
                            variant="gradient"
                            size="sm"
                            className="w-full gap-2"
                          >
                            <Sparkles className="w-4 h-4" />
                            Use this template
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* ── Bottom Sections ── */}
          <div className="max-w-4xl mx-auto mt-20 space-y-10">
            {/* How templates work */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card rounded-2xl p-8 md:p-10"
            >
              <h3 className="font-display text-2xl font-semibold mb-6">
                How Templates Work
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <h4 className="font-medium text-foreground">
                    Pick your emotion
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Browse the templates above and choose the one that matches
                    what you're feeling. Each template has been designed with
                    specific colors, tones, and visual elements that amplify
                    that particular emotion. The right template makes your words
                    hit harder.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <h4 className="font-medium text-foreground">
                    Write your message
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Our guided form helps you structure your message — who it's
                    from, who it's for, and what you want to say. No character
                    limit anxiety. Write as much or as little as feels right.
                    The template will present it beautifully regardless of
                    length.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <h4 className="font-medium text-foreground">
                    Share the link
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Your message gets a unique URL that you can share anywhere —
                    text, email, social media, or print. When your recipient
                    opens it, they see a full-page, beautifully designed
                    experience with your personal message. No app downloads, no
                    sign-ups needed.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Why it matters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-card rounded-2xl p-8 md:p-10"
            >
              <h3 className="font-display text-2xl font-semibold mb-4">
                Why Design Matters for Emotions
              </h3>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  We read emotions before we read words. When someone opens your
                  message and sees warm rose gradients, they already feel love
                  before reading a single word. When the palette is calm blue,
                  they sense sincerity. When it's bright gold, they feel
                  celebration. That's the power of visual design applied to human
                  connection.
                </p>
                <p>
                  Each of our 9 templates was crafted by studying color
                  psychology, typography pairing, and emotional design patterns.
                  The Love template uses warm, intimate tones. The Encouragement
                  template uses strong, uplifting contrasts. The Get Well
                  template uses soft, nurturing pastels. Every pixel serves the
                  emotion.
                </p>
                <p>
                  A plain text message says "I care." A beautifully designed
                  emotional message says "I care enough to make this special for
                  you." That difference matters. That's what EmotionCreator is
                  about — taking the words you already have and giving them a
                  canvas worthy of the feeling behind them.
                </p>
              </div>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="glass-card rounded-2xl p-8 md:p-10"
            >
              <h3 className="font-display text-2xl font-semibold mb-6">
                Frequently Asked Questions
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Are the templates free to use?
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Yes, all 9 emotion templates are completely free. You can
                    create as many messages as you want using any template,
                    anytime. No hidden limits, no premium tiers for basic usage.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Can the recipient see which template I used?
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    The recipient sees the beautifully designed message page with
                    the template's styling — but the focus is entirely on your
                    message and the emotion. The template name isn't prominently
                    displayed to them; the experience feels personal and custom.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Can I change the template after creating a message?
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Currently, the template is set when you create the message.
                    If you want a different look, you can create a new message
                    with a different template — it only takes a minute. We're
                    working on template-switching for future updates.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Does the recipient need an account?
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    No. Your recipient simply opens the unique link and sees
                    your message instantly. No downloads, no sign-ups, no
                    friction. It works on any device with a web browser.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Final CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center py-12"
            >
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Ready to express yourself?
              </h3>
              <p className="text-text-secondary mb-8 max-w-lg mx-auto">
                Pick the emotion that matches your heart, write what you feel,
                and send something beautiful to someone who deserves it.
              </p>
              <Link to={ROUTES.CREATE}>
                <Button variant="gradient" size="lg" className="gap-2">
                  <Sparkles className="w-5 h-5" />
                  Start Creating Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </div>
    </PageShell>
  );
};

export default TemplatesPage;
