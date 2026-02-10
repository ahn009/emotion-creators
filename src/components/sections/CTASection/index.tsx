// CTA Section - Final call to action

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { ROUTES } from '@/shared/config';
import { ArrowRight, Sparkles, Heart, Zap } from 'lucide-react';

// Register GSAP plugins safely only in browser environment
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Only run GSAP animations if in browser and sectionRef is available
    if (typeof window === 'undefined' || !sectionRef.current) return;

    try {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      tl.fromTo(
        sectionRef.current.querySelector('.cta-card'),
        { opacity: 0, scale: 0.95, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)' }
      );

      tl.fromTo(
        sectionRef.current.querySelectorAll('.cta-float'),
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(2)' },
        '-=0.4'
      );
    } catch (error) {
      console.error('GSAP animation error in CTASection:', error);
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      <Container>
        <div className="cta-card relative glass-card p-12 md:p-20 rounded-3xl border border-glass-border text-center overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
          
          {/* Floating elements */}
          <div className="cta-float absolute top-10 left-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-love/20 to-love/5 flex items-center justify-center animate-float">
            <Heart className="w-8 h-8 text-love" />
          </div>
          <div className="cta-float absolute top-10 right-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div className="cta-float absolute bottom-10 left-1/4 w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center animate-float" style={{ animationDelay: '2s' }}>
            <Zap className="w-5 h-5 text-secondary" />
          </div>
          
          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Ready to Share <br />
              <span className="gradient-text">Your Heart?</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10"
            >
              Create your first emotion page in under 2 minutes. No account required.
              Express what words alone cannot.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <MagneticButton>
                <Link to={ROUTES.CREATE}>
                  <Button variant="gradient" size="xl" className="shadow-glow">
                    Start Creating Now
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </MagneticButton>
              
              <Link to={ROUTES.SIGN_UP}>
                <Button variant="glass" size="lg">
                  Create Free Account
                </Button>
              </Link>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-text-muted text-sm mt-6"
            >
              ✨ Free forever • No credit card required
            </motion.p>
          </div>
        </div>
      </Container>
    </section>
  );
};
