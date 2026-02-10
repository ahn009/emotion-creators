import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, sendVerification?: boolean) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Check for redirect result first
      getRedirectResult(auth)
        .then((result) => {
          if (result) {
            console.log('Google sign-in redirect successful');
          }
        })
        .catch((error) => {
          console.error('Redirect result error:', error);
        });

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log('Auth state changed:', user?.email || 'No user');
        setUser(user);
        setLoading(false);
      });
      return unsubscribe;
    } catch (error) {
      console.error('Auth state change error:', error);
      setLoading(false);
      return () => {};
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Sign in successful:', result.user.email);
    } catch (error: any) {
      console.error('Sign in error:', error);
      // Provide user-friendly error messages
      if (error.code === 'auth/user-not-found') {
        throw new Error('No account found with this email');
      } else if (error.code === 'auth/wrong-password') {
        throw new Error('Incorrect password');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Invalid email address');
      } else {
        throw new Error(error.message || 'Failed to sign in');
      }
    }
  };

  const signUp = async (email: string, password: string, sendVerification = true) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Sign up successful:', result.user.email);
      
      // Send verification email
      if (sendVerification && result.user) {
        await sendEmailVerification(result.user);
        console.log('Verification email sent');
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      // Provide user-friendly error messages
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('An account with this email already exists');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('Password should be at least 6 characters');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Invalid email address');
      } else {
        throw new Error(error.message || 'Failed to create account');
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      console.log('Attempting Google sign-in...');
      
      // Try popup first, fallback to redirect on mobile
      try {
        const result = await signInWithPopup(auth, provider);
        console.log('Google sign-in successful:', result.user.email);
      } catch (popupError: any) {
        console.log('Popup failed, trying redirect:', popupError.code);
        // If popup is blocked, use redirect
        if (popupError.code === 'auth/popup-blocked' || 
            popupError.code === 'auth/popup-closed-by-user' ||
            popupError.code === 'auth/cancelled-popup-request') {
          await signInWithRedirect(auth, provider);
        } else {
          throw popupError;
        }
      }
    } catch (error: any) {
      console.error('Google sign in error:', error);
      // Provide user-friendly error messages
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Sign-in cancelled');
      } else if (error.code === 'auth/network-request-failed') {
        throw new Error('Network error. Please check your connection');
      } else {
        throw new Error(error.message || 'Failed to sign in with Google');
      }
    }
  };

  const sendVerificationEmail = async () => {
    if (user) {
      try {
        await sendEmailVerification(user);
        console.log('Verification email sent');
      } catch (error) {
        console.error('Send verification email error:', error);
        throw error;
      }
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      console.log('Sign out successful');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signIn, 
      signUp, 
      signInWithGoogle, 
      signOut,
      sendVerificationEmail 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
