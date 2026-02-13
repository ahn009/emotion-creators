import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ProtectedRoute } from './route-guards';
import { PageFallback } from '@/components/common/PageFallback';

// Route-based code splitting - each page loads on demand
const HomePage = lazy(() => import('@/pages/HomePage/HomePage'));
const SignInPage = lazy(() => import('@/pages/AuthPages/SignInPage'));
const SignUpPage = lazy(() => import('@/pages/AuthPages/SignUpPage'));
const CreatePage = lazy(() => import('@/pages/CreatePage/CreatePage'));
const MessagePage = lazy(() => import('@/pages/MessagePage/MessagePage'));
const PreviewPage = lazy(() => import('@/pages/PreviewPage/PreviewPage'));
const TemplatesPage = lazy(() => import('@/pages/TemplatesPage/TemplatesPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage/ProfilePage'));
const AccountSettingsPage = lazy(() => import('@/pages/AccountSettingsPage/AccountSettingsPage'));
const MyMessagesPage = lazy(() => import('@/pages/MyMessagesPage/MyMessagesPage'));
const TermsPage = lazy(() => import('@/pages/TermsPage/TermsPage'));
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage/PrivacyPage'));
const CookiePolicyPage = lazy(() => import('@/pages/CookiePolicyPage/CookiePolicyPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage/ContactPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPasswordPage/ForgotPasswordPage'));
const VerifyEmailPage = lazy(() => import('@/pages/VerifyEmailPage/VerifyEmailPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage/NotFoundPage'));

export function AppRoutes() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/message/:id" element={<MessagePage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/cookies" element={<CookiePolicyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        {/* Protected routes — require authentication */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/account-settings" element={<AccountSettingsPage />} />
          <Route path="/my-messages" element={<MyMessagesPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
