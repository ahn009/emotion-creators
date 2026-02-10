// src/lib/gsap-setup.ts
import gsap from 'gsap';

let isRegistered = false;

export function safeRegisterGsapPlugins() {
  if (typeof window !== 'undefined' && !isRegistered) {
    try {
      // Dynamically import plugins to avoid SSR issues
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        isRegistered = true;
      });
    } catch (error) {
      console.warn('Failed to register GSAP plugins:', error);
    }
  }
  return gsap;
}

export { gsap };