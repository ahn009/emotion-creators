// Stats section with animated counters

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/common';
import { Heart, Send, Users, Sparkles } from 'lucide-react';

// Register GSAP plugins safely only in browser environment
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  {
    icon: Heart,
    value: 10000,
    suffix: '+',
    label: 'Messages Created',
    color: 'text-love',
  },
  {
    icon: Send,
    value: 8500,
    suffix: '+',
    label: 'Messages Shared',
    color: 'text-primary',
  },
  {
    icon: Users,
    value: 5000,
    suffix: '+',
    label: 'Happy Users',
    color: 'text-secondary',
  },
  {
    icon: Sparkles,
    value: 98,
    suffix: '%',
    label: 'Satisfaction Rate',
    color: 'text-birthday',
  },
];

const AnimatedCounter = ({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, inView]);

  return (
    <span className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    // Only run GSAP animations if in browser and sectionRef is available
    if (typeof window === 'undefined' || !sectionRef.current) return;

    try {
      const items = sectionRef.current.querySelectorAll('.stat-item');

      gsap.fromTo(
        items,
        { opacity: 0, scale: 0.8, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    } catch (error) {
      console.error('GSAP animation error in StatsSection:', error);
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <Container className="relative">
        <div className="glass-card p-8 md:p-12 rounded-3xl border border-glass-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="stat-item text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-glass-bg border border-glass-border mb-4 ${stat.color}`}>
                  <stat.icon className="w-7 h-7" />
                </div>
                <div className="font-display text-3xl md:text-4xl font-bold mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={isInView} />
                </div>
                <p className="text-text-muted text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
