// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import type { Auth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import type { Analytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'emotion-creator.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'emotion-creator',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'emotion-creator.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '97576446080',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:97576446080:web:e6af01895c5c03cc0fde65',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-GJZQLN4KDX'
};

const firebaseConfigError =
  !firebaseConfig.apiKey || firebaseConfig.apiKey.includes('Dummy') || firebaseConfig.apiKey.includes('your_')
    ? 'Missing or invalid VITE_FIREBASE_API_KEY. Add the Firebase web app config to .env.local or Vercel environment variables.'
    : null;

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let analytics: Analytics | undefined;
let persistenceReady: Promise<void> = Promise.resolve();

if (!firebaseConfigError) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);

  // Set persistence to local (survives page reloads)
  // Exported so AuthProvider can await it before using auth
  persistenceReady = setPersistence(auth, browserLocalPersistence)
    .catch((error) => {
      console.error('Auth persistence error:', error);
    });

  if (typeof window !== 'undefined') {
    try {
      analytics = getAnalytics(app);
    } catch (error) {
      console.warn('Analytics initialization failed:', error);
    }
  }
}

const requireFirebase = <T,>(service: T | null, name: string): T => {
  if (!service) {
    throw new Error(firebaseConfigError ?? `${name} is not initialized`);
  }

  return service;
};

const requireAuth = () => requireFirebase(auth, 'Firebase Auth');
const requireDb = () => requireFirebase(db, 'Firestore');
const requireApp = () => requireFirebase(app, 'Firebase App');

export {
  auth,
  db,
  analytics,
  app,
  firebaseConfigError,
  persistenceReady,
  requireApp,
  requireAuth,
  requireDb,
};
