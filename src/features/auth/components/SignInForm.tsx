// Sign In Page with email/password and Google OAuth

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageShell } from '@/components/layout';
import { Container } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/features/auth';
import { ROUTES } from '@/shared/config/constants';
import { Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function SignInForm() {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptedTerms) {
      toast.error('Please accept the Terms of Service and Privacy Policy');
      return;
    }

    setLoading(true);

    try {
      await signIn(email, password);
      toast.success('Welcome back!');
      navigate(ROUTES.CREATE);
    } catch (error) {
      toast.error((error as Error).message);
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    if (!acceptedTerms) {
      toast.error('Please accept the Terms of Service and Privacy Policy');
      return;
    }

    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success('Welcome!');
      navigate(ROUTES.CREATE);
    } catch (error) {
      toast.error((error as Error).message);
      setLoading(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 pl-12 bg-glass-bg border border-glass-border rounded-xl text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all";

  return (
    <PageShell>
      <div className="min-h-screen flex items-center justify-center py-24">
        <Container size="sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 md:p-12 rounded-3xl max-w-md mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="font-display text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-text-secondary">Sign in to access your emotion pages</p>
            </div>

            {/* Google Sign In */}
            <Button
              variant="glass"
              className="w-full mb-6"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-glass-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-background text-text-muted">or</span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClasses}
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClasses}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Terms and Privacy Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  className="mt-1"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-text-secondary leading-relaxed cursor-pointer"
                >
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:underline" target="_blank">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-primary hover:underline" target="_blank">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                variant="gradient"
                className="w-full"
                disabled={loading || !acceptedTerms}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <p className="text-center text-text-secondary mt-6">
              Don't have an account?{' '}
              <Link to={ROUTES.SIGN_UP} className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </motion.div>
        </Container>
      </div>
    </PageShell>
  );
}
