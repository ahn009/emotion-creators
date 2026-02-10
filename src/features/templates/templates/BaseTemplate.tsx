// Enhanced Base Template - all templates extend this
// Now with longer, scrollable content and more elegant design

import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageData } from '@/shared/types';
import { cn } from '@/shared/lib/cn';
import { Heart, Sparkles, Star } from 'lucide-react';
import { useRef } from 'react';

interface BaseTemplateProps {
  message: MessageData;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
  icon?: string;
}

export const BaseTemplate = ({ 
  message, 
  className,
  gradientFrom = 'from-primary',
  gradientTo = 'to-secondary',
  icon = '✨'
}: BaseTemplateProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        'min-h-screen bg-background relative overflow-x-hidden',
        className
      )}
    >
      {/* Ambient gradient background - fixed */}
      <div className="fixed inset-0 pointer-events-none">
        <div className={cn(
          'absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] rounded-full blur-3xl opacity-20',
          `bg-gradient-to-br ${gradientFrom} ${gradientTo}`
        )} />
        <div className={cn(
          'absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-10',
          `bg-gradient-to-tl ${gradientFrom} ${gradientTo}`
        )} />
      </div>

      {/* Hero Section */}
      <motion.section 
        style={{ opacity, scale }}
        className="relative z-10 min-h-screen flex items-center justify-center p-6"
      >
        <div className="max-w-3xl w-full text-center">
          {/* Icon with pulse animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-7xl md:text-8xl mb-8 inline-block"
          >
            <motion.span
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {icon}
            </motion.span>
          </motion.div>
          
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-text-secondary text-xl md:text-2xl mb-4 font-light"
          >
            A special message for
          </motion.p>
          
          {/* Receiver name with gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={cn(
              'font-display text-6xl md:text-7xl lg:text-8xl font-bold mb-12',
              'bg-clip-text text-transparent',
              `bg-gradient-to-r ${gradientFrom} ${gradientTo}`,
              'leading-tight'
            )}
          >
            {message.data.receiver}
          </motion.h1>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-text-muted"
            >
              <span className="text-sm">Scroll to read</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Decorative Divider */}
      <div className="relative z-10 flex items-center justify-center py-12">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={cn(
            'h-px w-32 bg-gradient-to-r',
            `${gradientFrom} ${gradientTo}`
          )}
        />
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="mx-4"
        >
          <Sparkles className={cn('w-6 h-6', 'text-primary')} />
        </motion.div>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={cn(
            'h-px w-32 bg-gradient-to-l',
            `${gradientFrom} ${gradientTo}`
          )}
        />
      </div>

      {/* Main Message Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="glass-card p-10 md:p-16 rounded-3xl mb-12 relative overflow-hidden"
          >
            {/* Decorative corner elements */}
            <div className={cn(
              'absolute top-0 left-0 w-20 h-20 opacity-10',
              `bg-gradient-to-br ${gradientFrom} ${gradientTo}`,
              'rounded-br-full'
            )} />
            <div className={cn(
              'absolute bottom-0 right-0 w-20 h-20 opacity-10',
              `bg-gradient-to-tl ${gradientFrom} ${gradientTo}`,
              'rounded-tl-full'
            )} />

            <p className="text-xl md:text-2xl leading-relaxed text-foreground whitespace-pre-wrap relative z-10 font-light">
              {message.data.message}
            </p>
          </motion.div>

          {/* Additional decorative quote section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-12"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <Star className={cn('w-5 h-5', 'text-primary')} />
              <Star className={cn('w-6 h-6', 'text-primary')} />
              <Star className={cn('w-5 h-5', 'text-primary')} />
            </div>
            <p className="text-text-secondary italic text-lg max-w-2xl mx-auto">
              "Every word written here comes from the heart, crafted with care and sent with love."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Signature Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Decorative line */}
            <div className="flex items-center justify-center">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                className={cn(
                  'h-px w-24 bg-gradient-to-r',
                  `${gradientFrom} ${gradientTo}`
                )}
              />
            </div>

            <p className="text-text-secondary text-lg">
              With all my heart,
            </p>
            
            <motion.p
              whileHover={{ scale: 1.05 }}
              className={cn(
                'font-display text-4xl md:text-5xl font-bold',
                'bg-clip-text text-transparent',
                `bg-gradient-to-r ${gradientFrom} ${gradientTo}`
              )}
            >
              {message.data.sender}
            </motion.p>

            {/* Heart icon */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className={cn('w-8 h-8 mx-auto', 'text-primary', 'fill-primary')} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="relative z-10 py-16 px-6 border-t border-glass-border">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-text-muted text-sm">
              This message was created with EmotionCreator
            </p>
            <p className="text-text-muted text-xs">
              A platform for sharing emotions, one page at a time
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block"
            >
              <a 
                href="/" 
                className={cn(
                  'text-sm font-medium',
                  'bg-clip-text text-transparent',
                  `bg-gradient-to-r ${gradientFrom} ${gradientTo}`,
                  'hover:opacity-80 transition-opacity'
                )}
              >
                Create your own message →
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Spacer for better scroll experience */}
      <div className="h-20" />
    </div>
  );
};
