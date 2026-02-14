import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageShell } from '@/components/layout';
import { Container, Section, SEO } from '@/components/common';
import { Mail, MessageCircle, Shield, Clock, AlertCircle } from 'lucide-react';
import { ROUTES } from '@/shared/config/constants';

const ContactPage = () => {
  return (
    <PageShell>
      <SEO
        title="Contact & Support - EmotionCreator"
        description="Get in touch with the EmotionCreator team. We're here to help with questions, feedback, or support."
        canonical="/contact"
      />
      <Section className="py-24">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6"
              >
                <MessageCircle className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="font-display text-5xl font-bold mb-4">Contact & Support</h1>
              <p className="text-text-secondary text-lg">
                We're here to help. Reach out to us anytime.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-8 rounded-3xl text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">General Support</h3>
                <p className="text-text-secondary mb-4">
                  Questions about using EmotionCreator, account issues, or feature requests.
                </p>
                <a
                  href="mailto:support@emotioncreator.com"
                  className="text-primary hover:underline font-medium"
                >
                  support@emotioncreator.com
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-8 rounded-3xl text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">Privacy & Data</h3>
                <p className="text-text-secondary mb-4">
                  Data access requests, deletion requests, or privacy concerns.
                </p>
                <a
                  href="mailto:privacy@emotioncreator.com"
                  className="text-primary hover:underline font-medium"
                >
                  privacy@emotioncreator.com
                </a>
              </motion.div>
            </div>

            {/* Response Time */}
            <div className="glass-card p-8 rounded-3xl mb-8">
              <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-3">
                <Clock className="w-6 h-6 text-primary" />
                Response Times
              </h2>
              <div className="space-y-4 text-text-secondary">
                <p>
                  We aim to respond to all inquiries within <strong className="text-foreground">
                  24-48 hours</strong> on business days. For data-related requests (access,
                  deletion, portability), we will respond within <strong className="text-foreground">
                  30 days</strong> as required by applicable data protection regulations.
                </p>
              </div>
            </div>

            {/* FAQ Reference */}
            <div className="glass-card p-8 rounded-3xl mb-8">
              <h2 className="font-display text-2xl font-bold mb-4">Before You Contact Us</h2>
              <div className="space-y-4 text-text-secondary">
                <p>You may find answers to common questions here:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong className="text-foreground">Account Issues:</strong> Check your email
                    for verification links. If your session expired, try signing in again. Clear
                    your browser cache if you experience display issues.
                  </li>
                  <li>
                    <strong className="text-foreground">Lost Messages:</strong> If you created
                    messages as a guest (without signing in), they are stored in your browser's
                    local storage. Clearing browser data will remove them permanently.
                  </li>
                  <li>
                    <strong className="text-foreground">Password Reset:</strong> Use the{' '}
                    <Link to={ROUTES.FORGOT_PASSWORD} className="text-primary hover:underline">
                      Forgot Password
                    </Link>{' '}
                    page to reset your password via email.
                  </li>
                  <li>
                    <strong className="text-foreground">Email Verification:</strong> After signing
                    up, check your inbox (and spam folder) for a verification email. You can
                    resend it from the verification page.
                  </li>
                </ul>
              </div>
            </div>

            {/* Report Abuse */}
            <div className="glass-card p-8 rounded-3xl mb-8">
              <h2 className="font-display text-2xl font-bold mb-4">Report Abuse</h2>
              <div className="space-y-4 text-text-secondary">
                <p>
                  If you encounter content on EmotionCreator that violates our{' '}
                  <Link to={ROUTES.TERMS} className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  — including harassing, threatening, or illegal content — please report it
                  immediately to{' '}
                  <a
                    href="mailto:abuse@emotioncreator.com"
                    className="text-primary hover:underline"
                  >
                    abuse@emotioncreator.com
                  </a>.
                  Include the page link and a description of the issue.
                </p>
              </div>
            </div>

            {/* Notice Box */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Legal Policies</h3>
                  <p className="text-text-secondary text-sm">
                    Review our{' '}
                    <Link to={ROUTES.TERMS} className="text-primary hover:underline">
                      Terms of Service
                    </Link>,{' '}
                    <Link to={ROUTES.PRIVACY} className="text-primary hover:underline">
                      Privacy Policy
                    </Link>, and{' '}
                    <Link to={ROUTES.COOKIE_POLICY} className="text-primary hover:underline">
                      Cookie Policy
                    </Link>{' '}
                    for detailed information about your rights and our obligations.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>
    </PageShell>
  );
};

export default ContactPage;
