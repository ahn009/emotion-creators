// Love Template - warm, romantic, heart motifs

import { motion } from 'framer-motion';
import { MessageData } from '@/shared/types';
import { BaseTemplate } from './BaseTemplate';

interface LoveTemplateProps {
  message: MessageData;
}

// Floating hearts animation
const FloatingHearts = () => {
  const hearts = Array.from({ length: 12 });
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl opacity-20"
          initial={{ 
            x: `${Math.random() * 100}%`, 
            y: '110%',
            rotate: Math.random() * 30 - 15
          }}
          animate={{ 
            y: '-10%',
            rotate: Math.random() * 30 - 15
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear',
          }}
        >
          💕
        </motion.span>
      ))}
    </div>
  );
};

export const LoveTemplate = ({ message }: LoveTemplateProps) => {
  return (
    <div className="relative">
      <FloatingHearts />
      <BaseTemplate 
        message={message}
        gradientFrom="from-rose-500"
        gradientTo="to-pink-600"
        icon="💕"
      />
    </div>
  );
};
