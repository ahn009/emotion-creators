import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageShell } from '@/components/layout';
import { Container, Section, SEO } from '@/components/common';
import { Cookie, AlertCircle } from 'lucide-react';
import { ROUTES } from '@/shared/config/constants';

const CookiePolicyPage = () => {
  return (
    <PageShell>
      <SEO
        title="Cookie Policy - EmotionCreator"
        description="Learn about the cookies and local storage EmotionCreator uses. Manage your cookie preferences and understand our data practices."
        canonical="/cookies"
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
                <Cookie className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="font-display text-5xl font-bold mb-4">Cookie Policy</h1>
              <p className="text-text-secondary text-lg">
                Last updated: February 10, 2026
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none">
              <div className="glass-card p-8 rounded-3xl mb-8">
                <h2 className="font-display text-3xl font-bold mb-4">What Are Cookies</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Cookies are small text files that are placed on your device when you visit a
                  website. They are widely used to make websites work more efficiently and to
                  provide information to site owners. EmotionCreator uses cookies and similar
                  technologies (such as local storage) to enhance your experience.
                </p>
              </div>

              <div className="glass-card p-8 rounded-3xl mb-8">
                <h2 className="font-display text-2xl font-bold mb-4">1. Cookies We Use</h2>
                <div className="space-y-6 text-text-secondary">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Essential Cookies (Required)
                    </h3>
                    <p className="mb-3">
                      These cookies are necessary for the Service to function and cannot be
                      disabled.
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-glass-border">
                            <th className="text-left py-2 pr-4 text-foreground">Cookie</th>
                            <th className="text-left py-2 pr-4 text-foreground">Purpose</th>
                            <th className="text-left py-2 text-foreground">Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-glass-border/50">
                            <td className="py-2 pr-4 font-mono text-xs">firebase:authUser</td>
                            <td className="py-2 pr-4">Maintains your authentication session</td>
                            <td className="py-2">Persistent</td>
                          </tr>
                          <tr className="border-b border-glass-border/50">
                            <td className="py-2 pr-4 font-mono text-xs">auth_redirect_pending</td>
                            <td className="py-2 pr-4">Tracks OAuth redirect state</td>
                            <td className="py-2">Session</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Functional Storage (Local Storage)
                    </h3>
                    <p className="mb-3">
                      We use browser local storage to save your work and preferences locally on
                      your device.
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-glass-border">
                            <th className="text-left py-2 pr-4 text-foreground">Key</th>
                            <th className="text-left py-2 pr-4 text-foreground">Purpose</th>
                            <th className="text-left py-2 text-foreground">Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-glass-border/50">
                            <td className="py-2 pr-4 font-mono text-xs">message-store</td>
                            <td className="py-2 pr-4">
                              Saves draft messages, template selections, and created pages locally
                            </td>
                            <td className="py-2">Persistent</td>
                          </tr>
                          <tr className="border-b border-glass-border/50">
                            <td className="py-2 pr-4 font-mono text-xs">theme-preference</td>
                            <td className="py-2 pr-4">Stores your dark/light mode preference</td>
                            <td className="py-2">Persistent</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Analytics Cookies (Optional)
                    </h3>
                    <p className="mb-3">
                      We use Google Analytics to understand how visitors interact with the Service.
                      These cookies collect anonymized and aggregated data.
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-glass-border">
                            <th className="text-left py-2 pr-4 text-foreground">Cookie</th>
                            <th className="text-left py-2 pr-4 text-foreground">Purpose</th>
                            <th className="text-left py-2 text-foreground">Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-glass-border/50">
                            <td className="py-2 pr-4 font-mono text-xs">_ga</td>
                            <td className="py-2 pr-4">
                              Google Analytics - distinguishes unique users
                            </td>
                            <td className="py-2">2 years</td>
                          </tr>
                          <tr className="border-b border-glass-border/50">
                            <td className="py-2 pr-4 font-mono text-xs">_ga_*</td>
                            <td className="py-2 pr-4">
                              Google Analytics 4 - maintains session state
                            </td>
                            <td className="py-2">2 years</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl mb-8">
                <h2 className="font-display text-2xl font-bold mb-4">
                  2. Managing Your Cookie Preferences
                </h2>
                <div className="space-y-4 text-text-secondary">
                  <p>
                    <strong className="text-foreground">Browser Settings:</strong> Most browsers
                    allow you to control cookies through their settings. You can block or delete
                    cookies, but this may affect the functionality of the Service.
                  </p>
                  <p>
                    <strong className="text-foreground">Google Analytics Opt-Out:</strong> You can
                    opt out of Google Analytics by installing the{' '}
                    <a
                      href="https://tools.google.com/dlpage/gaoptout"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Google Analytics Opt-out Browser Add-on
                    </a>.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Storage:</strong> You can clear local
                    storage data through your browser's developer tools or settings. Note that
                    clearing local storage will remove any unsaved draft messages.
                  </p>
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl mb-8">
                <h2 className="font-display text-2xl font-bold mb-4">
                  3. Third-Party Cookies
                </h2>
                <div className="space-y-4 text-text-secondary">
                  <p>
                    Some third-party services we use may set their own cookies. We do not have
                    control over these cookies. The third-party services include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-foreground">Google (Firebase & Analytics):</strong>{' '}
                      Authentication and usage analytics.{' '}
                      <a
                        href="https://policies.google.com/technologies/cookies"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Google's Cookie Policy
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl mb-8">
                <h2 className="font-display text-2xl font-bold mb-4">
                  4. Updates to This Policy
                </h2>
                <div className="space-y-4 text-text-secondary">
                  <p>
                    We may update this Cookie Policy from time to time to reflect changes in
                    technology or legal requirements. Any changes will be posted on this page with
                    an updated revision date.
                  </p>
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl mb-8">
                <h2 className="font-display text-2xl font-bold mb-4">5. Contact Us</h2>
                <div className="space-y-4 text-text-secondary">
                  <p>
                    If you have questions about our use of cookies, please contact us at{' '}
                    <a
                      href="mailto:privacy@emotioncreator.com"
                      className="text-primary hover:underline"
                    >
                      privacy@emotioncreator.com
                    </a>.
                  </p>
                </div>
              </div>

              {/* Notice Box */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Related Policies</h3>
                    <p className="text-text-secondary text-sm">
                      This Cookie Policy should be read alongside our{' '}
                      <Link to={ROUTES.PRIVACY} className="text-primary hover:underline">
                        Privacy Policy
                      </Link>{' '}
                      and{' '}
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

export default CookiePolicyPage;
