// Enhanced Footer with elegant design and animations

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container, Logo } from '@/components/common';
import { ROUTES } from '@/shared/config/constants';
import { Heart, Github, Twitter, Mail, ArrowUpRight, ArrowUp } from 'lucide-react';

// Register GSAP plugins safely only in browser environment
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const footerLinks = {
  product: [
    { label: 'Create Message', href: ROUTES.CREATE },
    { label: 'Templates', href: ROUTES.CREATE },
    { label: 'How It Works', href: '/#how-it-works' },
  ],
  company: [
    { label: 'Privacy Policy', href: ROUTES.PRIVACY },
    { label: 'Terms of Service', href: ROUTES.TERMS },
    { label: 'Cookie Policy', href: ROUTES.COOKIE_POLICY },
    { label: 'Contact & Support', href: ROUTES.CONTACT },
  ],
};

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Only run GSAP animations if in browser and footerRef is available
    if (typeof window === 'undefined' || !footerRef.current) return;

    try {
      gsap.fromTo(
        footerRef.current.querySelectorAll('.footer-animate'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          },
        }
      );
    } catch (error) {
      console.error('GSAP animation error in Footer:', error);
    }
  }, []);

  return (
    <footer ref={footerRef} className="relative border-t border-glass-border overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      
      <Container className="relative py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2 footer-animate">
            <Logo showText className="mb-4" />
            <p className="text-text-secondary max-w-sm mb-6">
              Transform your deepest emotions into beautiful, shareable pages. 
              One emotion, one page, one link.
            </p>
            <div className="flex items-center gap-4">
              <SocialLink href="#" icon={<Twitter className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Github className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Mail className="w-5 h-5" />} />
            </div>
          </div>

          {/* Product Links */}
          <div className="footer-animate">
            <h4 className="font-display font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="group flex items-center gap-1 text-text-secondary hover:text-foreground transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="footer-animate">
            <h4 className="font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="group flex items-center gap-1 text-text-secondary hover:text-foreground transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Back to top */}
        <div className="footer-animate flex justify-center mb-8">
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-glass-bg border border-glass-border text-text-secondary hover:text-foreground hover:border-primary/40 transition-all"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            <span className="text-sm font-medium">Back to top</span>
          </motion.button>
        </div>

        {/* Bottom bar */}
        <div className="footer-animate pt-8 border-t border-glass-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} EmotionCreator. All rights reserved.
          </p>
          <motion.p
            className="flex items-center gap-1.5 text-text-muted text-sm"
            whileHover={{ scale: 1.05 }}
          >
            Made with <Heart className="w-4 h-4 text-love fill-love" /> for emotions
          </motion.p>
        </div>
      </Container>
    </footer>
  );
};

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-xl bg-glass-bg border border-glass-border flex items-center justify-center text-text-secondary hover:text-foreground hover:border-primary/50 transition-all"
    whileHover={{ scale: 1.1, y: -2 }}
    whileTap={{ scale: 0.95 }}
  >
    {icon}
  </motion.a>
);
