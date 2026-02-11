import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageShell } from '@/components/layout';
import { Container } from '@/components/common';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/shared/config/constants';
import { Mail, KeyRound, CheckCircle2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setSent(true);
      toast.success('Password reset email sent!');
    } catch (error: any) {
      const errorMessages: Record<string, string> = {
        'auth/user-not-found': 'No account found with this email address',
        'auth/invalid-email': 'Please enter a valid email address',
        'auth/too-many-requests': 'Too many attempts. Please try again later',
      };
      toast.error(errorMessages[error.code] || error.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      toast.success('Reset email sent again. Check your inbox.');
    } catch (error: any) {
      if (error.code === 'auth/too-many-requests') {
        toast.error('Too many attempts. Please wait before trying again.');
      } else {
        toast.error('Failed to resend. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    'w-full px-4 py-3 pl-12 bg-glass-bg border border-glass-border rounded-xl text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all';

  if (sent) {
    return (
      <PageShell>
        <div className="min-h-screen flex items-center justify-center py-24">
          <Container size="sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-8 md:p-12 rounded-3xl max-w-md mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="font-display text-2xl font-bold mb-4">Check Your Email</h2>

              <p className="text-text-secondary mb-6">
                We've sent a password reset link to{' '}
                <strong className="text-foreground">{email}</strong>
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-200">
                  Click the link in the email to create a new password. The link will expire in
                  1 hour. Check your spam folder if you don't see it.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  variant="glass"
                  className="w-full"
                  onClick={handleResend}
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Resend Email'}
                </Button>

                <Link to={ROUTES.SIGN_IN}>
                  <Button variant="gradient" className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </motion.div>
          </Container>
        </div>
      </PageShell>
    );
  }

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
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4"
              >
                <KeyRound className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="font-display text-3xl font-bold mb-2">Reset Password</h1>
              <p className="text-text-secondary">
                Enter your email and we'll send you a link to reset your password.
              </p>
            </div>

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
                  autoFocus
                />
              </div>

              <Button
                type="submit"
                variant="gradient"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>

            <p className="text-center text-text-secondary mt-6">
              Remember your password?{' '}
              <Link to={ROUTES.SIGN_IN} className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </motion.div>
        </Container>
      </div>
    </PageShell>
  );
};

export default ForgotPasswordPage;
