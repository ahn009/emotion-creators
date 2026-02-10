// Hero section for marketing landing page

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Starfield } from '@/components/hero';
import { Container } from '@/components/common';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/motion';
import { ROUTES } from '@/shared/config';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Starfield background */}
      <Starfield />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      
      <Container className="relative z-10 text-center py-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass-bg border border-glass-border mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-text-secondary">Transform emotions into art</span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
        >
          One Emotion.
          <br />
          <span className="gradient-text">One Page.</span>
          <br />
          One Link.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto mb-10"
        >
          Create beautiful, shareable pages that express your deepest feelings. 
          No accounts needed. Just pure emotion.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton>
            <Link to={ROUTES.CREATE}>
              <Button variant="gradient" size="xl">
                Create Your Message
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </MagneticButton>
          
          <Link to={ROUTES.CREATE}>
            <Button variant="glass" size="lg">
              <Heart className="w-4 h-4" />
              See Templates
            </Button>
          </Link>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-text-muted text-sm"
        >
          <div className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            No account required
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            Free forever
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            No tracking
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
