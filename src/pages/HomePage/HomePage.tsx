// Marketing Landing Page - with scrollable sections and GSAP animations

import { motion } from 'framer-motion';
import { PageShell } from '@/components/layout';
import { Hero } from '@/components/hero';
import { Container, Section } from '@/components/common';
import { Reveal } from '@/components/motion';
import { TestimonialsSection, StatsSection, FAQSection, CTASection } from '@/components/sections';
import { TEMPLATES } from '@/features/templates/constants';
import { Heart, Zap, Shield, Share2 } from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Express Authentically',
    description: 'Choose from curated templates designed to convey your emotions perfectly.',
  },
  {
    icon: Zap,
    title: 'Create Instantly',
    description: 'No signup, no friction. Create your message in under 2 minutes.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'No tracking, no analytics. Your emotions stay private.',
  },
  {
    icon: Share2,
    title: 'Share Easily',
    description: 'Get a unique link to share with anyone, anywhere.',
  },
];

const HomePage = () => {
  return (
    <PageShell>
      <div>
        <Hero />
        
        {/* How it works */}
        <Section id="how-it-works" className="bg-gradient-to-b from-background to-background/50">
          <Container>
            <Reveal>
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full bg-glass-bg border border-glass-border text-sm text-primary mb-4">
                  ✨ Simple & Fast
                </span>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  How It Works
                </h2>
                <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                  Three simple steps to share your heart
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Choose Template', 'Write Message', 'Share Link'].map((step, i) => (
                <Reveal key={step} delay={i * 0.15}>
                  <motion.div 
                    className="text-center group"
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-glow group-hover:shadow-glow-sm transition-shadow">
                      {i + 1}
                    </div>
                    <h3 className="font-display text-2xl font-semibold mb-3">{step}</h3>
                    <p className="text-text-muted leading-relaxed">
                      {i === 0 && 'Pick the perfect emotion template that matches your feelings'}
                      {i === 1 && 'Pour your heart into words that truly matter'}
                      {i === 2 && 'Send a beautiful page with one unique shareable link'}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* Stats Section */}
        <StatsSection />

        {/* Templates showcase */}
        <Section className="gsap-section">
          <Container>
            <Reveal>
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full bg-glass-bg border border-glass-border text-sm text-primary mb-4">
                  🎨 Crafted with Care
                </span>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  Beautiful Templates
                </h2>
                <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                  Each template is crafted to express a specific emotion
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TEMPLATES.map((template, i) => (
                <Reveal key={template.id} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -12, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="glass-card p-10 rounded-3xl text-center group cursor-pointer"
                  >
                    <motion.div 
                      className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${template.gradient} flex items-center justify-center text-5xl mx-auto mb-8 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {template.icon}
                    </motion.div>
                    <h3 className="font-display text-2xl font-semibold mb-3">
                      {template.name}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {template.description}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Features */}
        <Section className="bg-gradient-to-b from-background/50 to-background">
          <Container>
            <Reveal>
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full bg-glass-bg border border-glass-border text-sm text-primary mb-4">
                  💪 Powerful & Private
                </span>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  Why EmotionCreator?
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <Reveal key={feature.title} delay={i * 0.1}>
                  <motion.div 
                    className="glass-card p-8 rounded-3xl h-full group"
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-text-muted leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* FAQ */}
        <FAQSection />

        {/* Final CTA */}
        <CTASection />

      </div>
    </PageShell>
  );
}

export default HomePage;
