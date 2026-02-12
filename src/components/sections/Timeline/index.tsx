import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/cn';

export interface TimelineItem {
  label: string;
  title: string;
  description: string;
  icon?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  accentColor?: string;
  lineColor?: string;
}

export const Timeline = ({
  items,
  accentColor = 'bg-primary',
  lineColor = 'bg-border',
}: TimelineProps) => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div
        className={cn(
          'absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5',
          lineColor
        )}
      />

      <div className="space-y-12 md:space-y-16">
        {items.map((item, i) => {
          const isLeft = i % 2 === 0;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                'relative flex items-start gap-6',
                'md:gap-0',
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              )}
            >
              {/* Dot on line */}
              <div
                className={cn(
                  'absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-background z-10',
                  accentColor
                )}
              />

              {/* Content */}
              <div
                className={cn(
                  'ml-10 md:ml-0 md:w-[45%]',
                  isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                )}
              >
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  {item.label}
                </span>
                <h3 className="text-xl md:text-2xl font-bold mt-1 text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
