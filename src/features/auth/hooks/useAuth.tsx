import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
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
  browserPopupRedirectResolver,
  sendPasswordResetEmail,
  confirmPasswordReset,
  AuthError,
} from 'firebase/auth';
import { auth, persistenceReady } from '@/lib/firebase';
import type { ActionCodeSettings } from 'firebase/auth';

const getVerificationSettings = (): ActionCodeSettings => ({
  url: `${window.location.origin}/verify-email`,
  handleCodeInApp: false,
});

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isRedirectPending: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, sendVerification?: boolean) => Promise<void>;
  signInWithGoogle: (useRedirect?: boolean) => Promise<void>;
  signOut: () => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  confirmReset: (oobCode: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Detect if we should use redirect instead of popup
const shouldUseRedirect = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const isInAppBrowser = /instagram|fbav|fb_iab|twitter|line|wechat|tiktok/i.test(userAgent);
  const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
  
  // Use redirect for: mobile devices, in-app browsers, Safari (aggressive popup blocking)
  return isMobile || isInAppBrowser || isSafari;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRedirectPending, setIsRedirectPending] = useState(false);

  // Handle redirect result and set up auth listener
  useEffect(() => {
    let mounted = true;
    let unsubscribe: (() => void) | undefined;

    const init = async () => {
      // Wait for persistence to be configured before any auth operations
      await persistenceReady;

      // Always set up the auth state listener
      unsubscribe = onAuthStateChanged(auth, (user) => {
        if (mounted) {
          console.log('Auth state changed:', user?.email || 'No user');
          setUser(user);
          setLoading(false);
          setIsRedirectPending(false);
          sessionStorage.removeItem('auth_redirect_pending');
        }
      }, (error) => {
        console.error('Auth state error:', error);
        if (mounted) setLoading(false);
      });

      // Check if we're coming back from a redirect
      try {
        const result = await getRedirectResult(auth);
        if (result?.user && mounted) {
          console.log('Redirect sign-in successful:', result.user.email);
          // onAuthStateChanged will handle setting the user
        }
      } catch (error: any) {
        console.error('Redirect result error:', error);
        if (mounted) {
          sessionStorage.removeItem('auth_redirect_pending');
          setIsRedirectPending(false);
        }
      }

      // If we were waiting for a redirect but no result came back, clear the flag
      if (mounted) {
        const pending = sessionStorage.getItem('auth_redirect_pending');
        if (pending) {
          setIsRedirectPending(true);
        }
      }
    };

    init();

    return () => {
      mounted = false;
      unsubscribe?.();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Sign in successful:', result.user.email);
    } catch (error: any) {
      console.error('Sign in error:', error);
      const errorMessages: Record<string, string> = {
        'auth/user-not-found': 'No account found with this email',
        'auth/wrong-password': 'Incorrect password',
        'auth/invalid-email': 'Invalid email address',
        'auth/too-many-requests': 'Too many attempts. Please try again later',
      };
      throw new Error(errorMessages[error.code] || error.message || 'Failed to sign in');
    }
  };

  const signUp = async (email: string, password: string, sendVerification = true) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Sign up successful:', result.user.email);

      if (sendVerification && result.user) {
        await sendEmailVerification(result.user, getVerificationSettings());
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      const errorMessages: Record<string, string> = {
        'auth/email-already-in-use': 'An account with this email already exists',
        'auth/weak-password': 'Password should be at least 6 characters',
        'auth/invalid-email': 'Invalid email address',
      };
      throw new Error(errorMessages[error.code] || error.message || 'Failed to create account');
    }
  };

  const signInWithGoogle = useCallback(async (forceRedirect = false) => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    const useRedirectMethod = forceRedirect || shouldUseRedirect();

    try {
      console.log('Attempting Google sign-in...', useRedirectMethod ? 'using redirect' : 'using popup');

      if (useRedirectMethod) {
        sessionStorage.setItem('auth_redirect_pending', 'true');
        setIsRedirectPending(true);
        await signInWithRedirect(auth, provider, browserPopupRedirectResolver);
      } else {
        try {
          const result = await signInWithPopup(auth, provider, browserPopupRedirectResolver);
          console.log('Google sign-in successful:', result.user.email);
        } catch (popupError: any) {
          console.warn('Popup failed:', popupError.code, popupError.message);

          // If popup blocked or closed, fallback to redirect
          if (popupError.code === 'auth/popup-blocked' ||
              popupError.code === 'auth/popup-closed-by-user' ||
              popupError.code === 'auth/cancelled-popup-request') {
            console.log('Falling back to redirect...');
            sessionStorage.setItem('auth_redirect_pending', 'true');
            setIsRedirectPending(true);
            await signInWithRedirect(auth, provider, browserPopupRedirectResolver);
          } else {
            throw popupError;
          }
        }
      }
    } catch (error: any) {
      console.error('Google sign in error:', error.code, error.message, error);
      sessionStorage.removeItem('auth_redirect_pending');
      setIsRedirectPending(false);

      const errorMessages: Record<string, string> = {
        'auth/popup-closed-by-user': 'Sign-in cancelled',
        'auth/popup-blocked': 'Popup was blocked. Please allow popups for this site and try again.',
        'auth/network-request-failed': 'Google sign-in failed. This is usually caused by ad blockers or browser privacy extensions — try disabling them and retry.',
        'auth/internal-error': 'Google sign-in failed. Try disabling ad blockers or browser privacy extensions and retry.',
        'auth/unauthorized-domain': 'This domain is not authorized for Google sign-in. Add it in Firebase Console > Authentication > Settings > Authorized domains.',
        'auth/account-exists-with-different-credential': 'An account already exists with this email using a different sign-in method',
        'auth/operation-not-allowed': 'Google sign-in is not enabled. Enable it in Firebase Console > Authentication > Sign-in method.',
      };

      throw new Error(errorMessages[error.code] || error.message || 'Failed to sign in with Google');
    }
  }, []);

  const sendVerificationEmail = async () => {
    if (!user) throw new Error('No user signed in');
    await sendEmailVerification(user, getVerificationSettings());
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset email sent');
    } catch (error: any) {
      console.error('Password reset error:', error);
      const errorMessages: Record<string, string> = {
        'auth/user-not-found': 'No account found with this email address',
        'auth/invalid-email': 'Invalid email address',
        'auth/too-many-requests': 'Too many attempts. Please try again later',
      };
      throw new Error(errorMessages[error.code] || error.message || 'Failed to send reset email');
    }
  };

  const confirmReset = async (oobCode: string, newPassword: string) => {
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      console.log('Password reset confirmed');
    } catch (error: any) {
      console.error('Confirm reset error:', error);
      const errorMessages: Record<string, string> = {
        'auth/expired-action-code': 'Reset link has expired. Please request a new one.',
        'auth/invalid-action-code': 'Invalid reset link. Please request a new one.',
        'auth/weak-password': 'Password should be at least 6 characters.',
      };
      throw new Error(errorMessages[error.code] || error.message || 'Failed to reset password');
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      console.log('Sign out successful');
      // Clear any pending states
      sessionStorage.removeItem('auth_redirect_pending');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading: loading || isRedirectPending,
      isRedirectPending,
      signIn,
      signUp,
      signInWithGoogle,
      signOut,
      sendVerificationEmail,
      resetPassword,
      confirmReset,
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