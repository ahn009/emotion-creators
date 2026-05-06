# EmotionCreator

Create and share personalized message pages (love, apology, birthday, gratitude, and more) with a unique public link.

## Stack

- Vite 5 + React 18 + TypeScript
- Tailwind CSS 3
- Firebase Auth + Firestore
- Vercel Serverless Functions (`/api/*`)
- Stripe Checkout + Stripe Webhooks
- Vitest + Testing Library

## Features

- Multi-template message creation flow
- Public share pages at `/m/:id`
- Optional auth (email/password + Google)
- Dashboard for signed-in users (`/my-messages`)
- AI-assisted draft generation endpoint
- Premium upgrade flow via Stripe

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env.local` from `.env.example` and fill values.
3. Run dev server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:8080`

## Required Environment Variables

See `.env.example` for full list. Core values:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `ANTHROPIC_API_KEY`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

Optional:

- `APP_ORIGIN` (default `https://emotion-creators.vercel.app`)
- `ALLOWED_CHECKOUT_ORIGINS` (comma-separated)

## Scripts

- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run lint` - ESLint
- `npm run test` - run tests
- `npm run test:watch` - watch tests

## Deploy Notes

- Frontend + API functions are designed for Vercel.
- Deploy Firestore rules from `firestore.rules`.
- Configure Stripe webhook to `POST /api/stripe-webhook`.
