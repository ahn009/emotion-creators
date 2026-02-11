import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageShell } from '@/components/layout';
import { Container } from '@/components/common';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth';
import { ROUTES } from '@/shared/config/constants';
import { MailCheck, CheckCircle2, RefreshCw, AlertTriangle, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { reload } from 'firebase/auth';

const RESEND_COOLDOWN_SECONDS = 60;

const VerifyEmailPage = () => {
  const { user, sendVerificationEmail } = useAuth();
  const navigate = useNavigate();
  const [resending, setResending] = useState(false);
  const [checking, setChecking] = useState(false);
  const [verified, setVerified] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Check if already verified
  useEffect(() => {
    if (user?.emailVerified) {
      setVerified(true);
    }
  }, [user]);

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Auto-check verification status every 5 seconds
  useEffect(() => {
    if (verified || !user) return;
    const interval = setInterval(async () => {
      try {
        await reload(user);
        if (user.emailVerified) {
          setVerified(true);
          toast.success('Email verified!');
        }
      } catch {
        // Silently retry
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [user, verified]);

  const handleResend = useCallback(async () => {
    if (cooldown > 0 || resending) return;
    setResending(true);
    try {
      await sendVerificationEmail();
      toast.success('Verification email sent! Check your inbox.');
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (error: any) {
      if (error.code === 'auth/too-many-requests') {
        toast.error('Too many attempts. Please wait before trying again.');
        setCooldown(RESEND_COOLDOWN_SECONDS * 2);
      } else {
        toast.error('Failed to send verification email. Please try again.');
      }
    } finally {
      setResending(false);
    }
  }, [cooldown, resending, sendVerificationEmail]);

  const handleCheckStatus = useCallback(async () => {
    if (!user) return;
    setChecking(true);
    try {
      await reload(user);
      if (user.emailVerified) {
        setVerified(true);
        toast.success('Email verified!');
      } else {
        toast.info('Email not yet verified. Check your inbox.');
      }
    } catch {
      toast.error('Could not check verification status. Please try again.');
    } finally {
      setChecking(false);
    }
  }, [user]);

  // Not logged in
  if (!user) {
    return (
      <PageShell>
        <div className="min-h-screen flex items-center justify-center py-24">
          <Container size="sm">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 md:p-12 rounded-3xl max-w-md mx-auto text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-yellow-500" />
              </div>
              <h1 className="font-display text-2xl font-bold mb-4">Sign In Required</h1>
              <p className="text-text-secondary mb-6">
                You need to be signed in to verify your email address.
              </p>
              <Link to={ROUTES.SIGN_IN}>
                <Button variant="gradient" className="w-full">
                  Sign In
                </Button>
              </Link>
            </motion.div>
          </Container>
        </div>
      </PageShell>
    );
  }

  // Verified state
  if (verified) {
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

              <h2 className="font-display text-2xl font-bold mb-4">Email Verified!</h2>

              <p className="text-text-secondary mb-6">
                Your email <strong className="text-foreground">{user.email}</strong> has been
                successfully verified. You're all set to use EmotionCreator.
              </p>

              <Button
                variant="gradient"
                className="w-full"
                onClick={() => navigate(ROUTES.CREATE)}
              >
                Start Creating
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </Container>
        </div>
      </PageShell>
    );
  }

  // Pending verification
  return (
    <PageShell>
      <div className="min-h-screen flex items-center justify-center py-24">
        <Container size="sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 md:p-12 rounded-3xl max-w-md mx-auto text-center"
          >
            {/* Header */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6"
            >
              <MailCheck className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="font-display text-3xl font-bold mb-2">Verify Your Email</h1>
            <p className="text-text-secondary mb-6">
              We sent a verification link to{' '}
              <strong className="text-foreground">{user.email}</strong>
            </p>

            {/* Instructions */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6 text-left">
              <p className="text-sm text-blue-200 mb-3">To verify your email:</p>
              <ol className="text-sm text-blue-200 list-decimal pl-4 space-y-1">
                <li>Open the email from EmotionCreator</li>
                <li>Click the verification link in the email</li>
                <li>Come back here — the page will update automatically</li>
              </ol>
            </div>

            {/* Auto-check indicator */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <RefreshCw className="w-4 h-4 text-text-muted" />
              </motion.div>
              <span className="text-sm text-text-muted">
                Automatically checking verification status...
              </span>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                variant="glass"
                className="w-full"
                onClick={handleCheckStatus}
                disabled={checking}
              >
                {checking ? 'Checking...' : 'Check Verification Status'}
              </Button>

              <Button
                variant="glass"
                className="w-full"
                onClick={handleResend}
                disabled={resending || cooldown > 0}
              >
                {resending
                  ? 'Sending...'
                  : cooldown > 0
                  ? `Resend in ${cooldown}s`
                  : 'Resend Verification Email'}
              </Button>

              <Button
                variant="gradient"
                className="w-full"
                onClick={() => navigate(ROUTES.CREATE)}
              >
                Continue Without Verifying
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <p className="text-text-muted text-xs mt-6">
              Didn't receive the email? Check your spam folder or try a different email address.
            </p>
          </motion.div>
        </Container>
      </div>
    </PageShell>
  );
};

export default VerifyEmailPage;
