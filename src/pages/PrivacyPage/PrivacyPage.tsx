import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageShell } from '@/components/layout';
import { Container, Section } from '@/components/common';
import { ShieldCheck, Database, Eye, UserCheck, AlertCircle } from 'lucide-react';
import { ROUTES } from '@/shared/config/constants';

const PrivacyPage = () => {
  return (
    <PageShell>
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
                <ShieldCheck className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="font-display text-5xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-text-secondary text-lg">
                Last updated: February 10, 2026
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none">
              <div className="glass-card p-8 rounded-3xl mb-8">
                <h2 className="font-display text-3xl font-bold mb-4 flex items-center gap-3">
                  <Eye className="w-8 h-8 text-primary" />
                  Your Privacy Matters
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  EmotionCreator ("we", "our", or "us") is committed to protecting your privacy.
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your
                  information when you use our web application and services (collectively, the "Service").
                </p>
                <p className="text-text-secondary leading-relaxed">
                  By using the Service, you consent to the data practices described in this policy.
                  If you do not agree with the terms of this Privacy Policy, please do not access the Service.
                </p>
              </div>

              <div className="glass-card p-8 rounded-3xl mb-8">
                <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-3">
                  <Database className="w-6 h-6 text-primary" />
                  1. Information We Collect
                </h2>
                <div className="space-y-4 text-text-secondary">
                  <p>
                    <strong className="text-foreground">1.1 Account Information:</strong> When you
                    create an account, we collect your email address and authentication credentials.
                    If you sign in with Google, we receive your name, email, and profile picture
                    from Google.
                  </p>
                  <p>
                    <strong className="text-foreground">1.2 Content Data:</strong> We store the
                    emotion pages you create, including sender name, recipient name, and message
                    content. This data is necessary to generate and host your shareable pages.
                  </p>
                  <p>
                    <strong className="text-foreground">1.3 Usage Data:</strong> We automatically
                    collect certain information when you access the Service, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Browser type and version</li>
                    <li>Pages visited and time spent on those pages</li>
                    <li>Device type and operating system</li>
                    <li>Referring URL</li>
                    <li>IP address (anonymized)</li>
                  </ul>
                  <p>
                    <strong className="text-foreground">1.4 Cookies and Local Storage:</strong> We
                    use cookies and browser local storage to maintain your session, remember your
                    preferences, and store draft messages. See our{' '}
                    <Link to={ROUTES.COOKIE_POLICY} className="text-primary hover:underline">
                      Cookie Policy
                    </Link>{' '}
                    for details.
                  </p>
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl mb-8">
                <h2 className="font-display text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                <div className="space-y-4 text-text-secondary">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide, maintain, and improve the Service</li>
                    <li>Create and manage your account</li>
                    <li>Process and host your emotion pages</li>
                    <li>Send you verification emails and important service updates</li>
                    <li>Respond to your inquiries and support requests</li>
                    <li>Monitor and analyze usage trends to improve user experience</li>
                    <li>Detect, prevent, and address technical issues and abuse</li>
                  </ul>
                  <p>
                    We do <strong className="text-foreground">not</strong> sell your personal
                    information to third parties. We do <strong className="text-foreground">not</strong>{' '}
                    use your content for advertising purposes.
                  </p>
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl mb-8">
                <h2 className="font-display text-2xl font-bold mb-4">3. Third-Party Services</h2>
                <div className="space-y-4 text-text-secondary">
                  <p>We use the following third-party services:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-foreground">Firebase Authentication:</strong> Provided
                      by Google LLC, used for account management and authentication. Subject to{' '}
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Google's Privacy Policy
                      </a>.
                    </li>
                    <li>
                      <strong className="text-foreground">Google Analytics:</strong> Used to
                      understand how users interact with the Service. Data is anonymized and
                      aggregated. You may opt out using browser extensions or settings.
                    </li>
                    <li>
                      <strong className="text-foreground">Vercel:</strong> Our hosting provider.
                      Subject to{' '}
                      <a
                        href="https://vercel.com/legal/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Vercel's Privacy Policy
                      </a>.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl mb-8">
                <h2 className="font-display text-2xl font-bold mb-4">4. Data Retention</h2>
                <div className="space-y-4 text-text-secondary">
                  <p>
                    <strong className="text-foreground">4.1 Account Data:</strong> We retain your
                    account information for as long as your account is active. If you delete your
                    account, we will remove your personal data within 30 days, except where we are
                    required to retain it by law.
                  </p>
                  <p>
                    <strong className="text-foreground">4.2 Emotion Pages:</strong> Published emotion
                    pages remain accessible via their unique links until you delete them or close
                    your account. Guest-created pages (without an account) are stored in browser
                    local storage and are not persisted on our servers.
                  </p>
                  <p>
                    <strong className="text-foreground">4.3 Usage Data:</strong> Anonymized usage
                    data may be retained indefinitely for analytics and service improvement purposes.
                  </p>
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl mb-8">
                <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-3">
                  <UserCheck className="w-6 h-6 text-primary" />
                  5. Your Rights and Choices
                </h2>
                <div className="space-y-4 text-text-secondary">
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-foreground">Access:</strong> Request a copy of the
                      personal data we hold about you.
                    </li>
                    <li>
                      <strong className="text-foreground">Correction:</strong> Request correction
                      of inaccurate personal data.
                    </li>
                    <li>
                      <strong className="text-foreground">Deletion:</strong> Request deletion of
                      your account and associated personal data.
                    </li>
                    <li>
                      <strong className="text-foreground">Data Portability:</strong> Request an
                      export of your data in a machine-readable format.
                    </li>
                    <li>
                      <strong className="text-foreground">Opt-Out:</strong> Opt out of analytics
                      tracking and non-essential cookies.
                    </li>
                    <li>
                      <strong className="text-foreground">Withdraw Consent:</strong> Withdraw your
                      consent to data processing at any time by deleting your account.
                    </li>
                  </ul>
                  <p>
                    To exercise any of these rights, contact us at{' '}
                    <a
                      href="mailto:privacy@emotioncreator.com"
                      className="text-primary hover:underline"
                    >
                      privacy@emotioncreator.com
                    </a>.
                    We will respond to your request within 30 days.
                  </p>
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl mb-8">
                <h2 className="font-display text-2xl font-bold mb-4">6. Data Security</h2>
                <div className="space-y-4 text-text-secondary">
                  <p>
                    We implement industry-standard security measures to protect your data, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Encryption of data in transit via HTTPS/TLS</li>
                    <li>Secure authentication via Firebase Auth with bcrypt password hashing</li>
                    <li>Regular security reviews and updates</li>
                    <li>Access controls limiting data access to authorized personnel</li>
                  </ul>
                  <p>
                    While we take reasonable precautions, no method of electronic transmission or
                    storage is 100% secure. We cannot guarantee absolute security of your data.
                  </p>
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl mb-8">
                <h2 className="font-display text-2xl font-bold mb-4">7. Children's Privacy</h2>
                <div className="space-y-4 text-text-secondary">
                  <p>
                    The Service is not directed to children under 13 years of age. We do not
                    knowingly collect personal information from children under 13. If we become
                    aware that a child under 13 has provided us with personal data, we will take
                    steps to delete such information.
                  </p>
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl mb-8">
                <h2 className="font-display text-2xl font-bold mb-4">8. International Data Transfers</h2>
                <div className="space-y-4 text-text-secondary">
                  <p>
                    Your information may be transferred to and processed in countries other than
                    your own. Our service providers (Firebase, Vercel) operate globally. By using
                    the Service, you consent to the transfer of your data to these jurisdictions,
                    which may have different data protection laws than your country of residence.
                  </p>
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl mb-8">
                <h2 className="font-display text-2xl font-bold mb-4">9. Changes to This Policy</h2>
                <div className="space-y-4 text-text-secondary">
                  <p>
                    We may update this Privacy Policy periodically. We will notify you of significant
                    changes by posting a notice on the Service or sending you an email. The "Last
                    updated" date at the top of this page indicates when the policy was last revised.
                    Your continued use of the Service after changes constitutes acceptance of the
                    updated policy.
                  </p>
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl mb-8">
                <h2 className="font-display text-2xl font-bold mb-4">10. Contact Us</h2>
                <div className="space-y-4 text-text-secondary">
                  <p>
                    If you have questions or concerns about this Privacy Policy or our data
                    practices, please contact us:
                  </p>
                  <ul className="list-none space-y-2">
                    <li>
                      Email:{' '}
                      <a
                        href="mailto:privacy@emotioncreator.com"
                        className="text-primary hover:underline"
                      >
                        privacy@emotioncreator.com
                      </a>
                    </li>
                    <li>
                      General Support:{' '}
                      <a
                        href="mailto:support@emotioncreator.com"
                        className="text-primary hover:underline"
                      >
                        support@emotioncreator.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Notice Box */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Your Consent</h3>
                    <p className="text-text-secondary text-sm">
                      By using EmotionCreator, you consent to the collection and use of your
                      information as described in this Privacy Policy. For questions about your
                      data rights, see our{' '}
                      <Link to={ROUTES.TERMS} className="text-primary hover:underline">
                        Terms of Service
                      </Link>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>
    </PageShell>
  );
};

export default PrivacyPage;
