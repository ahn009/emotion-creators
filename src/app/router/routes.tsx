import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy, ReactNode } from 'react';
import { ProtectedRoute } from './route-guards';
import { PageFallback } from '@/components/common/PageFallback';
import { useAuth } from '@/features/auth';

// Redirects authenticated users away from auth pages
function AuthGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <PageFallback />;
  }
  
  // If user is already authenticated, redirect to create page
  if (user) {
    return <Navigate to="/create" replace />;
  }
  
  return <>{children}</>;
}

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

// Blog pages
const BlogIndexPage = lazy(() => import('@/pages/BlogPages/BlogIndexPage'));
const LoveMessagesForHer = lazy(() => import('@/pages/BlogPages/LoveMessagesForHer'));
const SorryMessages = lazy(() => import('@/pages/BlogPages/SorryMessages'));
const GoodMorningMessages = lazy(() => import('@/pages/BlogPages/GoodMorningMessages'));

export function AppRoutes() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<AuthGuard><SignInPage /></AuthGuard>} />
        <Route path="/signup" element={<AuthGuard><SignUpPage /></AuthGuard>} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/message/:id" element={<MessagePage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/cookies" element={<CookiePolicyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Blog pages */}
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/love-messages-for-her" element={<LoveMessagesForHer />} />
        <Route path="/blog/sorry-messages" element={<SorryMessages />} />
        <Route path="/blog/good-morning-messages" element={<GoodMorningMessages />} />
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
