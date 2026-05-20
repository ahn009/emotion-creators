# Quick Start Guide

## Prerequisites

- Node.js 18 or higher
- npm (comes with Node) or [bun](https://bun.sh)
- A Firebase project — see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

## 1. Clone & Install

```bash
git clone https://github.com/ahn009/emotion-creators.git
cd emotion-creators
npm install
# or: bun install
```

## 2. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in all required values (see table below).

## 3. Run Dev Server

```bash
npm run dev
```

Opens at **http://localhost:8080**

## 4. Build & Preview

```bash
npm run build        # production build → /dist
npm run preview      # serve /dist locally
```

## 5. Deploy to Vercel

### Option A: Vercel CLI

```bash
npm install -g vercel
vercel --prod
```

### Option B: GitHub Integration

1. Push the repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repository
4. Add all environment variables (see table below)
5. Deploy

> The `vercel.json` in the root handles SPA routing and API rewrites automatically.

## Required Environment Variables

| Variable | Description | Where to get it |
|----------|-------------|-----------------|
| `VITE_FIREBASE_API_KEY` | Firebase Web API key | Firebase console → Project settings → Web app |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Firebase console → Project settings → Web app |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | Firebase console → Project settings |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Firebase console → Project settings → Web app |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Firebase console → Project settings → Web app |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | Firebase console → Project settings → Web app |
| `FIREBASE_PROJECT_ID` | Firebase project ID (Admin SDK) | Same as above |
| `FIREBASE_CLIENT_EMAIL` | Service account email | Firebase console → Project settings → Service accounts |
| `FIREBASE_PRIVATE_KEY` | Service account private key | Firebase console → Project settings → Service accounts |
| `STRIPE_SECRET_KEY` | Stripe secret key | [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | Stripe dashboard → Webhooks |
| `STRIPE_PRICE_ID` | Stripe price ID for premium upgrade | Stripe dashboard → Products |
| `ANTHROPIC_API_KEY` | Anthropic Claude API key | [console.anthropic.com](https://console.anthropic.com) |
| `VITE_APP_URL` | Production app URL | Your Vercel deployment URL |

## Useful Commands

```bash
npm run dev          # dev server on port 8080
npm run build        # production build
npm run preview      # preview production build
npm run lint         # ESLint
npm run test         # run tests once
npm run test:watch   # run tests in watch mode
```

## Project Structure

```
/api          Vercel serverless functions (Anthropic, Stripe, Firebase Admin)
/docs         Developer documentation
/public       Static assets (favicons, OG images, sitemap, robots.txt)
/src
  /app        Router, providers, global styles
  /components Shared UI components (layout, common, motion, sections)
  /features   Feature modules (auth, messages, templates)
  /pages      Page components
  /shared     Utilities, hooks, stores, types, config
```

For Firebase setup, see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md).
For migration history, see [MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md).
