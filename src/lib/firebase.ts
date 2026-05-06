// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import type { Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const requiredFirebaseKeys: Array<keyof typeof firebaseConfig> = [
  'apiKey',
  'authDomain',
  'projectId',
  'storageBucket',
  'messagingSenderId',
  'appId',
];

const hasMissingRequiredKey = requiredFirebaseKeys.some((key) => {
  const value = firebaseConfig[key];
  return !value || value.includes('Dummy') || value.includes('your_');
});

const firebaseConfigError = hasMissingRequiredKey
  ? 'Missing or invalid Firebase config. Set all VITE_FIREBASE_* values in .env.local or deployment environment variables.'
  : null;

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
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
  app,
  firebaseConfigError,
  persistenceReady,
  requireApp,
  requireAuth,
  requireDb,
};
