// Template Card component for selection

import { motion } from 'framer-motion';
import { TemplateConfig } from '@/types/template';
import { cn } from '@/shared/lib/cn';

interface TemplateCardProps {
  template: TemplateConfig;
  isSelected: boolean;
  onClick: () => void;
}

export const TemplateCard = ({ template, isSelected, onClick }: TemplateCardProps) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative p-6 rounded-2xl border text-left transition-all duration-300',
        'bg-card backdrop-blur-xl',
        isSelected 
          ? 'border-primary shadow-glow' 
          : 'border-glass-border hover:border-primary/50'
      )}
      aria-pressed={isSelected}
      aria-label={`Select ${template.name} template`}
    >
      {/* Gradient overlay on selected */}
      {isSelected && (
        <motion.div
          layoutId="selected-template"
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 pointer-events-none"
          transition={{ type: 'spring', duration: 0.4 }}
        />
      )}
      
      <div className="relative z-10">
        {/* Icon */}
        <div className={cn(
          'w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-4',
          `bg-gradient-to-br ${template.gradient} bg-opacity-20`
        )}>
          {template.icon}
        </div>
        
        {/* Content */}
        <h3 className="text-lg font-display font-semibold mb-1">
          {template.name}
        </h3>
        <p className="text-text-secondary text-sm">
          {template.description}
        </p>
        
        {/* Selection indicator */}
        <div className={cn(
          'absolute top-4 right-4 w-5 h-5 rounded-full border-2 transition-all',
          isSelected 
            ? 'border-primary bg-primary' 
            : 'border-text-muted'
        )}>
          {isSelected && (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-full h-full text-white p-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path d="M5 12l5 5L20 7" />
            </motion.svg>
          )}
        </div>
      </div>
    </motion.button>
  );
};
