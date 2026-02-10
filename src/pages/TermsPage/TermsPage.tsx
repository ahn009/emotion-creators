// Terms of Service Page

import { motion } from 'framer-motion';
import { PageShell } from '@/components/layout';
import { Container, Section } from '@/components/common';
import { FileText, Shield, AlertCircle } from 'lucide-react';

const TermsPage = () => {
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
                <FileText className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="font-display text-5xl font-bold mb-4">Terms of Service</h1>
              <p className="text-text-secondary text-lg">
                Last updated: February 10, 2026
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none">
              <div className="glass-card p-8 rounded-3xl mb-8">
                <h2 className="font-display text-3xl font-bold mb-4 flex items-center gap-3">
                  <Shield className="w-8 h-8 text-primary" />
                  Agreement to Terms
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  By accessing and using EmotionCreator ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
                </p>
              </div>

              <div className="glass-card p-8 rounded-3xl mb-8">
                <h2 className="font-display text-2xl font-bold mb-4">1. Use of Service</h2>
                <div className="space-y-4 text-text-secondary">
                  <p>
                    <strong className="text-foreground">1.1 Eligibility:</strong> You must be at least 13 years old to use EmotionCreator. By using the Service, you represent that you meet this age requirement.
                  </p>
                  <p>
                    <strong className="text-foreground">1.2 Account Creation:</strong> You may create an account to save and manage your emotion pages. You are responsible for maintaining the confidentiality of your account credentials.
                  </p>
                  <p>
                    <strong className="text-foreground">1.3 Acceptable Use:</strong> You agree to use the Service only for lawful purposes and in accordance with these Terms. You will not:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Create content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable</li>
                    <li>Impersonate any person or entity</li>
                    <li>Violate any intellectual property rights</li>
                    <li>Attempt to gain unauthorized access to the Service</li>
                    <li>Use the Service to spam or send unsolicited messages</li>
                  </ul>
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl mb-8">
                <h2 className="font-display text-2xl font-bold mb-4">2. Content and Ownership</h2>
                <div className="space-y-4 text-text-secondary">
                  <p>
                    <strong className="text-foreground">2.1 Your Content:</strong> You retain all rights to the content you create using EmotionCreator. By creating and sharing content, you grant us a license to host, store, and display your content as necessary to provide the Service.
                  </p>
                  <p>
                    <strong className="text-foreground">2.2 Public Content:</strong> Content you share via generated links is publicly accessible to anyone with the link. Do not share sensitive or private information.
                  </p>
                  <p>
                    <strong className="text-foreground">2.3 Content Removal:</strong> We reserve the right to remove any content that violates these Terms or is otherwise inappropriate.
                  </p>
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl mb-8">
                <h2 className="font-display text-2xl font-bold mb-4">3. Privacy and Data</h2>
                <div className="space-y-4 text-text-secondary">
                  <p>
                    Your privacy is important to us. Please review our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> to understand how we collect, use, and protect your information.
                  </p>
                  <p>
                    <strong className="text-foreground">3.1 Data Collection:</strong> We collect minimal data necessary to provide the Service, including email addresses for account creation and analytics data to improve the Service.
                  </p>
                  <p>
                    <strong className="text-foreground">3.2 Email Verification:</strong> We may send verification emails to confirm your email address and important service updates.
                  </p>
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl mb-8">
                <h2 className="font-display text-2xl font-bold mb-4">4. Service Availability</h2>
                <div className="space-y-4 text-text-secondary">
                  <p>
                    <strong className="text-foreground">4.1 Uptime:</strong> We strive to keep EmotionCreator available 24/7, but we do not guarantee uninterrupted access. The Service may be temporarily unavailable for maintenance or updates.
                  </p>
                  <p>
                    <strong className="text-foreground">4.2 Changes to Service:</strong> We reserve the right to modify, suspend, or discontinue any part of the Service at any time with or without notice.
                  </p>
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl mb-8">
                <h2 className="font-display text-2xl font-bold mb-4">5. Disclaimer of Warranties</h2>
                <div className="space-y-4 text-text-secondary">
                  <p>
                    THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
                  </p>
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl mb-8">
                <h2 className="font-display text-2xl font-bold mb-4">6. Limitation of Liability</h2>
                <div className="space-y-4 text-text-secondary">
                  <p>
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, EMOTIONCREATOR SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE.
                  </p>
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl mb-8">
                <h2 className="font-display text-2xl font-bold mb-4">7. Termination</h2>
                <div className="space-y-4 text-text-secondary">
                  <p>
                    <strong className="text-foreground">7.1 By You:</strong> You may stop using the Service at any time. If you have an account, you may delete it through your account settings.
                  </p>
                  <p>
                    <strong className="text-foreground">7.2 By Us:</strong> We may terminate or suspend your access to the Service immediately, without prior notice, for any reason, including if you breach these Terms.
                  </p>
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl mb-8">
                <h2 className="font-display text-2xl font-bold mb-4">8. Changes to Terms</h2>
                <div className="space-y-4 text-text-secondary">
                  <p>
                    We may update these Terms from time to time. We will notify you of any material changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the Service after such changes constitutes your acceptance of the new Terms.
                  </p>
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl mb-8">
                <h2 className="font-display text-2xl font-bold mb-4">9. Contact Us</h2>
                <div className="space-y-4 text-text-secondary">
                  <p>
                    If you have any questions about these Terms, please contact us at:
                  </p>
                  <p className="text-foreground">
                    Email: <a href="mailto:support@emotioncreator.com" className="text-primary hover:underline">support@emotioncreator.com</a>
                  </p>
                </div>
              </div>

              {/* Notice Box */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Important Notice</h3>
                    <p className="text-text-secondary text-sm">
                      By using EmotionCreator, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree, please discontinue use of the Service immediately.
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

export default TermsPage;
