import { ReactNode } from 'react';
import { AuthProvider as FirebaseAuthProvider } from '@/features/auth/hooks/useAuth';

export function AuthProvider({ children }: { children: ReactNode }) {
  return <FirebaseAuthProvider>{children}</FirebaseAuthProvider>;
}
