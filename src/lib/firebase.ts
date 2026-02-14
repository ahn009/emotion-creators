// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "emotion-creator.firebaseapp.com",
  projectId: "emotion-creator",
  storageBucket: "emotion-creator.firebasestorage.app",
  messagingSenderId: "97576446080",
  appId: "1:97576446080:web:e6af01895c5c03cc0fde65",
  measurementId: "G-GJZQLN4KDX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Set persistence to local (survives page reloads)
// Exported so AuthProvider can await it before using auth
const persistenceReady = setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error('Auth persistence error:', error);
  });

let analytics;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn('Analytics initialization failed:', error);
  }
}

export { auth, analytics, app, persistenceReady };