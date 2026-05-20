# Migration Summary: Next.js → Vite + React

## Overview

This project was migrated from Next.js (Pages Router) to Vite + React + TypeScript with Vercel serverless functions.

## What Changed

| Area | Before (Next.js) | After (Vite + React) |
|------|-----------------|----------------------|
| Build tool | Next.js webpack | Vite + SWC |
| Routing | Pages Router (`/pages/*.tsx`) | React Router v6 (`react-router-dom`) |
| API routes | `/pages/api/*.ts` | `/api/*.ts` (Vercel serverless) |
| SSR/SSG | Next.js built-in | None (SPA) — SEO via `react-helmet-async` |
| Entry point | `_app.tsx` | `src/main.tsx` |
| Config | `next.config.js` | `vite.config.ts` |
| TypeScript env types | `next-env.d.ts` | `src/vite-env.d.ts` |
| Dev server port | 3000 (default) | 8080 (configured in `vite.config.ts`) |

## File Cleanup

- `next-env.d.ts` — removed (Next.js TypeScript types, not applicable to Vite)
- `fix-white-screen.sh` — removed (debugging artifact from migration)

## Routing

React Router v6 handles all client-side routing. Routes are defined in `src/app/router/routes.tsx`. A catch-all rewrite in `vercel.json` ensures SPA routing works on Vercel:

```json
{
  "rewrites": [{ "source": "/((?!api/).*)", "destination": "/index.html" }]
}
```

## API Routes

Vercel serverless functions in `/api/`:

- `generate-message.ts` — calls Anthropic Claude API to generate message content
- `create-checkout.ts` — creates a Stripe checkout session
- `stripe-webhook.ts` — handles Stripe payment webhooks
- `prerender.js` — generates Open Graph metadata for shared message pages
- `_firebaseAdmin.ts` — shared Firebase Admin SDK initializer

## Authentication

Migrated from Supabase to Firebase Authentication. The `@supabase/supabase-js` package has been removed. Firebase Auth handles email/password and Google OAuth.

## Database

Migrated from Supabase (PostgreSQL) to Cloud Firestore. All message data is stored in the `messages` collection. See `firestore.rules` for security rules.
