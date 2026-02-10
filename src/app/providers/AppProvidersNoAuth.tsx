import { ReactNode } from 'react';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProvidersNoAuth({ children }: AppProvidersProps) {
  return <>{children}</>;
}
