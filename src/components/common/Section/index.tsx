// Section component for page sections

import { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const Section = ({ children, className, id }: SectionProps) => {
  return (
    <section
      id={id}
      className={cn('py-16 md:py-24', className)}
    >
      {children}
    </section>
  );
};
