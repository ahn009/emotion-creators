# Firebase Setup Guide

## 1. Create a Firebase Project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → enter a name (e.g. `emotion-creator`) → Continue
3. Disable Google Analytics if not needed → **Create project**

## 2. Enable Authentication

1. In the Firebase console, go to **Build → Authentication**
2. Click **Get started**
3. Under **Sign-in method**, enable:
   - **Email/Password** — toggle on → Save
   - **Google** (optional) — toggle on, configure OAuth consent → Save

## 3. Enable Cloud Firestore

1. Go to **Build → Firestore Database**
2. Click **Create database**
3. Choose **Start in production mode** → select a region close to your users → **Done**

## 4. Create Composite Indexes

The app queries messages by `userId` ordered by `createdAt` (descending). Create this index:

1. Go to **Firestore → Indexes → Composite**
2. Click **Add index**:
   - Collection: `messages`
   - Fields:
     - `userId` — Ascending
     - `createdAt` — Descending
   - Query scope: Collection
3. Click **Create**

Alternatively, run the app in dev mode — Firestore will show a direct link in the console to create missing indexes automatically.

## 5. Deploy Security Rules

```bash
npm install -g firebase-tools
firebase login
firebase use --add   # select your project
firebase deploy --only firestore:rules
```

The rules file is at `firestore.rules` in the project root.

## 6. Create a Web App

1. In the Firebase console, go to **Project settings** (gear icon)
2. Under **Your apps**, click the **Web** icon (`</>`)
3. Register app (nickname: `emotion-creator-web`) → **Register app**
4. Copy the config values — you'll need them in the next step

## 7. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in the values from your Firebase config:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

## 8. Admin SDK (for API routes)

The Vercel serverless functions in `/api` use the Firebase Admin SDK.

1. In the Firebase console, go to **Project settings → Service accounts**
2. Click **Generate new private key** → download the JSON file
3. Add the values to `.env.local`:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

> **Warning:** Never commit the service account JSON file or private key to git.

## 9. Verify Setup

```bash
npm run dev
```

Open `http://localhost:8080` — if Firebase connects without errors in the browser console, setup is complete.
