// Logo component based on spec brand identity

import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo = ({ className, showText = true }: LogoProps) => {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-8 h-8">
        <img 
          src="/favicon.png" 
          alt="EmotionCreator" 
          className="w-full h-full object-contain"
        />
      </div>
      {showText && (
        <span className="font-display text-xl font-semibold tracking-tight">
          Emotion<span className="gradient-text">Creator</span>
        </span>
      )}
    </Link>
  );
};
