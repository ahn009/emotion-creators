import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { Info, Layers, DollarSign, UserX, Clock } from 'lucide-react';

const stats = [
  { icon: Layers, value: '9', label: 'Emotion Templates' },
  { icon: DollarSign, value: '100%', label: 'Free' },
  { icon: UserX, value: '0', label: 'Signup Required' },
  { icon: Clock, value: '<2 min', label: 'To Create' },
];

export const AboutSection = () => {
  return (
    <section className="py-24 md:py-32 relative">
      <Container>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-glass-bg border border-glass-border text-sm text-primary mb-4">
              <Info className="w-4 h-4" />
              About
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              What is <span className="gradient-text">EmotionCreator</span>?
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-3xl p-8 md:p-10 mb-10"
          >
            <p className="text-text-secondary text-lg leading-relaxed">
              EmotionCreator is a free, privacy-focused web application that enables users to
              create beautifully designed digital messages for nine emotions: love, apology,
              birthday, gratitude, congratulations, encouragement, missing someone, friendship,
              and get well wishes. Each message gets a unique shareable URL. No signup, download,
              or payment required. Users choose from handcrafted templates — each with its own
              color palette, typography, and design elements — write a personal message, and
              share the resulting page via a link. Recipients view a full-page, responsive
              experience on any device with a web browser.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="font-display text-2xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-text-muted text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
