// Birthday Template - playful, bright, celebratory

import { motion } from 'framer-motion';
import { MessageData } from '@/shared/types';
import { BaseTemplate } from './BaseTemplate';

interface BirthdayTemplateProps {
  message: MessageData;
}

// Confetti animation
const Confetti = () => {
  const pieces = Array.from({ length: 20 });
  const colors = ['🎉', '🎊', '✨', '🎈', '🎁'];
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pieces.map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl"
          initial={{ 
            x: `${Math.random() * 100}%`, 
            y: '-10%',
            rotate: 0,
            opacity: 0.6
          }}
          animate={{ 
            y: '110%',
            rotate: 360,
            opacity: 0
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'linear',
          }}
        >
          {colors[i % colors.length]}
        </motion.span>
      ))}
    </div>
  );
};

export const BirthdayTemplate = ({ message }: BirthdayTemplateProps) => {
  return (
    <div className="relative">
      <Confetti />
      <BaseTemplate 
        message={message}
        gradientFrom="from-amber-500"
        gradientTo="to-orange-600"
        icon="🎂"
      />
    </div>
  );
};
