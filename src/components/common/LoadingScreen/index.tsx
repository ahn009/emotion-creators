import { AnimatePresence, motion } from 'framer-motion';

interface LoadingScreenProps {
  isLoading: boolean;
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0a0a0a',
          }}
        >
          {/* Background orbs */}
          <motion.div
            style={{
              position: 'absolute',
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: 'hsl(239 84% 67%)',
              filter: 'blur(80px)',
              opacity: 0.4,
              top: '20%',
              left: '30%',
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -20, 15, 0],
              scale: [1, 1.05, 0.95, 1],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            style={{
              position: 'absolute',
              width: 250,
              height: 250,
              borderRadius: '50%',
              background: 'hsl(263 70% 66%)',
              filter: 'blur(80px)',
              opacity: 0.4,
              bottom: '25%',
              right: '25%',
            }}
            animate={{
              x: [0, -25, 20, 0],
              y: [0, 15, -25, 0],
              scale: [1, 0.95, 1.05, 1],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Brand name */}
          <motion.div
            style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              backgroundImage: 'linear-gradient(135deg, hsl(239 84% 67%), hsl(263 70% 66%))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              position: 'relative',
              zIndex: 1,
            }}
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            EmotionCreator
          </motion.div>

          {/* Tagline */}
          <div
            style={{
              fontSize: '0.95rem',
              color: 'hsl(215 25% 63%)',
              marginTop: '0.75rem',
              position: 'relative',
              zIndex: 1,
              opacity: 0.8,
            }}
          >
            Transform emotions into shareable pages
          </div>

          {/* Progress bar */}
          <div
            style={{
              width: 180,
              height: 3,
              background: 'hsl(0 0% 100% / 0.08)',
              borderRadius: 4,
              marginTop: '2rem',
              overflow: 'hidden',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <motion.div
              style={{
                width: '40%',
                height: '100%',
                borderRadius: 4,
                background: 'linear-gradient(90deg, hsl(239 84% 67%), hsl(263 70% 66%), hsl(239 84% 67%))',
                backgroundSize: '200% 100%',
              }}
              animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
