# Authentication & Legal Pages — Developer Documentation

## Authentication Flow

### Architecture

Auth is managed through React Context (`AuthProvider`) wrapping the entire app.

**Key file:** `src/features/auth/hooks/useAuth.tsx`

### Supported Auth Methods

| Method | Firebase Function | Notes |
|--------|------------------|-------|
| Email/Password Sign Up | `createUserWithEmailAndPassword` | Sends verification email automatically |
| Email/Password Sign In | `signInWithEmailAndPassword` | Standard credential auth |
| Google OAuth | `signInWithPopup` / `signInWithRedirect` | Auto-detects mobile/Safari for redirect fallback |
| Sign Out | `signOut` | Clears session storage flags |
| Password Reset | `sendPasswordResetEmail` | Sends Firebase reset link |
| Confirm Reset | `confirmPasswordReset` | Applies new password with `oobCode` |

### Auth Context API

```tsx
const {
  user,              // Firebase User | null
  loading,           // boolean — true during auth init or redirect
  isRedirectPending, // boolean — true when awaiting OAuth redirect
  signIn,            // (email, password) => Promise<void>
  signUp,            // (email, password, sendVerification?) => Promise<void>
  signInWithGoogle,  // (forceRedirect?) => Promise<void>
  signOut,           // () => Promise<void>
  sendVerificationEmail, // () => Promise<void>
  resetPassword,     // (email) => Promise<void>
  confirmReset,      // (oobCode, newPassword) => Promise<void>
} = useAuth();
```

### Sign Up Flow

1. User fills in name, email, password on `/signup`
2. `signUp(email, password, true)` creates account + sends Firebase verification email
3. User is redirected to `/verify-email` page
4. Page auto-polls `user.emailVerified` every 5 seconds via `reload(user)`
5. Once verified, page shows success state with link to `/create`

### Email Verification

**Page:** `src/pages/VerifyEmailPage/VerifyEmailPage.tsx`

Firebase uses **link-based email verification** (not OTP codes). The verification page:

- Displays the user's email address
- Auto-checks verification status every 5 seconds using `reload(user)` from Firebase Auth
- Provides manual "Check Verification Status" button
- Has "Resend Verification Email" with 60-second cooldown to prevent abuse
- Handles `auth/too-many-requests` errors with doubled cooldown
- Allows users to continue without verifying

### Password Reset Flow

1. User clicks "Forgot password?" on `/signin` page
2. Redirected to `/forgot-password`
3. Enters email → `sendPasswordResetEmail(auth, email)` sends Firebase reset link
4. Confirmation screen shows with:
   - Resend capability
   - Back to sign-in link
5. User clicks link in email → Firebase handles password reset via its hosted page

### Google OAuth Flow

1. Detects platform: mobile/Safari/in-app → uses redirect; desktop Chrome → uses popup
2. If popup fails (blocked/closed), automatically falls back to redirect
3. Session storage tracks redirect state (`auth_redirect_pending`)
4. On page reload after redirect, `getRedirectResult(auth)` picks up the result

### Firebase Configuration

**File:** `src/lib/firebase.ts`

- Uses environment variable `VITE_FIREBASE_API_KEY` for the API key
- Persistence set to `browserLocalPersistence` (survives page reloads)
- Analytics initialized conditionally (browser-only, with error handling)

**Environment variables:**
- `VITE_FIREBASE_API_KEY` (required)
- `VITE_FIREBASE_AUTH_DOMAIN` (optional, defaults to `emotion-creator.firebaseapp.com`)

## Legal Pages

### Page Locations

| Page | Route | File |
|------|-------|------|
| Terms of Service | `/terms` | `src/pages/TermsPage/TermsPage.tsx` |
| Privacy Policy | `/privacy` | `src/pages/PrivacyPage/PrivacyPage.tsx` |
| Cookie Policy | `/cookies` | `src/pages/CookiePolicyPage/CookiePolicyPage.tsx` |
| Contact & Support | `/contact` | `src/pages/ContactPage/ContactPage.tsx` |

### Route Constants

All routes are defined in `src/shared/config/constants.ts`:

```ts
ROUTES.TERMS           // '/terms'
ROUTES.PRIVACY         // '/privacy'
ROUTES.COOKIE_POLICY   // '/cookies'
ROUTES.CONTACT         // '/contact'
ROUTES.FORGOT_PASSWORD // '/forgot-password'
ROUTES.VERIFY_EMAIL    // '/verify-email'
```

### Modifying Legal Policies

Each legal page is a standalone React component using the same layout pattern:
- Wrapped in `<PageShell>` (includes Navbar + Footer)
- Uses `<Section>`, `<Container>` for layout
- Content structured in `glass-card` sections
- Framer Motion for entrance animations
- Inter-page links use `<Link>` with `ROUTES.*` constants

To update policy content:
1. Open the relevant page file in `src/pages/`
2. Edit the JSX content directly
3. Update the "Last updated" date in the header
4. If adding new sections, follow the existing `glass-card p-8 rounded-3xl mb-8` pattern

### Footer Links

Footer links are defined in `src/components/layout/Footer/index.tsx` in the `footerLinks.company` array. The footer links to all legal pages and the contact page.

## Auth-Related Routes

| Route | Page | Purpose |
|-------|------|---------|
| `/signin` | SignInPage | Email/password + Google sign in |
| `/signup` | SignUpPage | Account registration |
| `/forgot-password` | ForgotPasswordPage | Password reset request |
| `/verify-email` | VerifyEmailPage | Email verification status & resend |

All routes are registered in `src/app/router/routes.tsx`.
