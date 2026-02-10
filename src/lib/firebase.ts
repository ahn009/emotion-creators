import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHKkyvCIlcvN6bhpXs3jufDzV2BbAfMeo",
  authDomain: "emotion-creator.firebaseapp.com",
  projectId: "emotion-creator",
  storageBucket: "emotion-creator.firebasestorage.app",
  messagingSenderId: "97576446080",
  appId: "1:97576446080:web:e6af01895c5c03cc0fde65",
  measurementId: "G-GJZQLN4KDX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Analytics (only in browser environment)
let analytics;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
    console.log('Firebase Analytics initialized');
  } catch (error) {
    console.warn('Firebase Analytics initialization failed:', error);
  }
}

console.log('Firebase initialized successfully');

export { auth, analytics, app };
