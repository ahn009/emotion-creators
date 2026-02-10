// Based on spec.md Section 7.3 - Hero Starfield (Canvas-based ambient animation)

import { useEffect, useRef, useCallback } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

export const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>();

  const initStars = useCallback((width: number, height: number) => {
    const stars: Star[] = [];
    const count = Math.floor((width * height) / 8000);
    
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        speed: Math.random() * 0.0005 + 0.0002,
      });
    }
    
    starsRef.current = stars;
  }, []);

  const animate = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    const time = Date.now();
    
    starsRef.current.forEach((star) => {
      const twinkle = Math.sin(time * star.speed) * 0.3 + 0.7;
      const opacity = star.opacity * twinkle;
      
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();
    });
    
    animationRef.current = requestAnimationFrame(() => animate(ctx, width, height));
  }, []);

  useEffect(() => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) {
        console.warn('Canvas not found for Starfield');
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.warn('Could not get 2D context for Starfield');
        return;
      }

      const handleResize = () => {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        ctx.scale(dpr, dpr);

        initStars(rect.width, rect.height);
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      // Check for reduced motion preference
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const prefersReducedMotion = mediaQuery.matches;

      if (!prefersReducedMotion) {
        animate(ctx, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);
      } else {
        // Static stars for reduced motion
        starsRef.current.forEach((star) => {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
          ctx.fill();
        });
      }

      // Listen for changes to reduced motion preference
      const handleReducedMotionChange = (e: MediaQueryListEvent) => {
        if (e.matches) {
          // Reduced motion enabled - stop animation
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
          }
        } else {
          // Reduced motion disabled - start animation again
          if (!animationRef.current) {
            animate(ctx, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);
          }
        }
      };

      mediaQuery.addEventListener('change', handleReducedMotionChange);

      return () => {
        window.removeEventListener('resize', handleResize);
        mediaQuery.removeEventListener('change', handleReducedMotionChange);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    } catch (error) {
      console.error('Error in Starfield component:', error);
    }
  }, [animate, initStars]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};
