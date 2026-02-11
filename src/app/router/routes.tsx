import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { HomePage } from '@/pages/HomePage/index';
import { SignInPage, SignUpPage } from '@/pages/AuthPages/index';
import { CreatePage } from '@/pages/CreatePage/index';
import { MessagePage } from '@/pages/MessagePage/index';
import { PreviewPage } from '@/pages/PreviewPage/index';
import { NotFoundPage } from '@/pages/NotFoundPage/index';
import { TermsPage } from '@/pages/TermsPage/index';
import { PrivacyPage } from '@/pages/PrivacyPage/index';
import { CookiePolicyPage } from '@/pages/CookiePolicyPage/index';
import { ContactPage } from '@/pages/ContactPage/index';
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage/index';
import { VerifyEmailPage } from '@/pages/VerifyEmailPage/index';

export function AppRoutes() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading page...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/message/:id" element={<MessagePage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/cookies" element={<CookiePolicyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}