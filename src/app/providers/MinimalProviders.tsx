import { ReactNode } from 'react';
import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';

console.log('MinimalProviders: Module loaded');

interface MinimalProvidersProps {
  children: ReactNode;
}

export function MinimalProviders({ children }: MinimalProvidersProps) {
  console.log('MinimalProviders: Rendering');
  return (
    <QueryProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
}