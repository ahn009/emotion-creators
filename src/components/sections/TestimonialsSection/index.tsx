// Testimonials section with scroll-triggered animations

import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Sent a love message',
    content: 'I used EmotionCreator to send my partner a birthday surprise. The look on their face when they opened the link was priceless!',
    rating: 5,
    avatar: '💕',
  },
  {
    name: 'James K.',
    role: 'Apologized to a friend',
    content: 'Sometimes words are hard. This made it easier to express how sorry I was. My friend loved it and we patched things up.',
    rating: 5,
    avatar: '🤝',
  },
  {
    name: 'Emily R.',
    role: 'Birthday celebration',
    content: 'Created the most beautiful birthday page for my mom. She keeps the link saved and revisits it whenever she misses me!',
    rating: 5,
    avatar: '🎂',
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2" />
      
      <Container className="relative">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-glass-bg border border-glass-border text-sm text-primary mb-4"
          >
            ❤️ Loved by thousands
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            Stories That <span className="gradient-text">Touch Hearts</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg max-w-2xl mx-auto"
          >
            See how others have used EmotionCreator to express their feelings
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              className="glass-card p-8 rounded-3xl relative group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-display font-semibold">{testimonial.name}</h4>
                  <p className="text-text-muted text-sm">{testimonial.role}</p>
                </div>
              </div>
              
              <p className="text-text-secondary mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-birthday fill-birthday" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
