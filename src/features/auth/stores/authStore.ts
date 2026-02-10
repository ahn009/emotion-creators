import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: true,
      error: null,

      initialize: async () => {
        set({ isLoading: true });
        setTimeout(() => {
          set({ isLoading: false });
        }, 500);
      },

      signIn: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
          // In a real app, you'd make an API call here
          const mockUser = { id: '1', email, name: 'Test User' } as unknown as User;
          const mockToken = 'mock-jwt-token';

          set({ user: mockUser, token: mockToken, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
          throw error;
        }
      },

      signUp: async (email, password, name) => {
        set({ isLoading: true, error: null });

        try {
          // In a real app, you'd make an API call here
          const mockUser = { id: '1', email, name } as unknown as User;
          const mockToken = 'mock-jwt-token';

          set({ user: mockUser, token: mockToken, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
          throw error;
        }
      },

      signOut: async () => {
        set({ user: null, token: null, isLoading: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

// NOTE: This mock auth store is deprecated in favor of the context-based auth system
// The hooks useAuth and useSignOut are now exported from the context-based system
// This store remains for backward compatibility but should not be used