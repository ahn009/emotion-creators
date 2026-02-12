import { useEffect, useRef, useMemo } from 'react';

type ParticleType = 'hearts' | 'rain' | 'confetti';

interface ParticleBackgroundProps {
  type: ParticleType;
  density?: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  char?: string;
}

const COLORS = {
  hearts: ['#f43f5e', '#ec4899', '#db2777', '#be185d', '#e879a0'],
  rain: ['#94a3b8', '#64748b', '#78909c', '#90a4ae', '#b0bec5'],
  confetti: ['#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#10b981', '#f43f5e'],
};

const CHARS = {
  hearts: ['\u2665', '\u2764', '\u2661'],
  rain: ['|'],
  confetti: ['\u25CF', '\u25A0', '\u2605', '\u25B2'],
};

export const ParticleBackground = ({ type, density = 40 }: ParticleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  const reducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const colors = COLORS[type];
    const chars = CHARS[type];

    const createParticle = (): Particle => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      if (type === 'rain') {
        return {
          x: Math.random() * w,
          y: Math.random() * h * -1,
          size: Math.random() * 2 + 1,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 4 + 6,
          opacity: Math.random() * 0.3 + 0.1,
          rotation: 0,
          rotationSpeed: 0,
          color: colors[Math.floor(Math.random() * colors.length)],
          char: chars[0],
        };
      }

      if (type === 'hearts') {
        return {
          x: Math.random() * w,
          y: h + Math.random() * 100,
          size: Math.random() * 14 + 8,
          speedX: Math.random() * 1 - 0.5,
          speedY: -(Math.random() * 1.5 + 0.5),
          opacity: Math.random() * 0.15 + 0.05,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 2 - 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          char: chars[Math.floor(Math.random() * chars.length)],
        };
      }

      // confetti
      return {
        x: Math.random() * w,
        y: Math.random() * h * -0.5,
        size: Math.random() * 8 + 4,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 + 1.5,
        opacity: Math.random() * 0.5 + 0.3,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 6 - 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        char: chars[Math.floor(Math.random() * chars.length)],
      };
    };

    particlesRef.current = Array.from({ length: density }, createParticle);

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      particlesRef.current.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Reset particles that leave the screen
        if (type === 'rain' && p.y > h) {
          p.y = -10;
          p.x = Math.random() * w;
        } else if (type === 'hearts' && p.y < -50) {
          p.y = h + 50;
          p.x = Math.random() * w;
        } else if (type === 'confetti' && p.y > h + 50) {
          p.y = -50;
          p.x = Math.random() * w;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;

        if (type === 'rain') {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size * 0.5;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, p.size * 6);
          ctx.stroke();
        } else {
          ctx.font = `${p.size}px serif`;
          ctx.fillStyle = p.color;
          ctx.textAlign = 'center';
          ctx.fillText(p.char || '', 0, 0);
        }

        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [type, density, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
