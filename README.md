# EmotionCreator

Turn emotions into beautiful, shareable single-page websites.

## Features

- **No Authentication Required**: Create and share messages without signing up
- **Three Beautiful Templates**: Love, Sorry, and Birthday themes
- **Privacy First**: No tracking, no analytics, no data collection
- **Mobile Responsive**: Works perfectly on all devices
- **Performance Optimized**: Fast loading with minimal bundle size

## Tech Stack

- **Framework**: Next.js 16.1.4 (App Router) / Vite + React 18
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS v4.1.18
- **Animations**: Framer Motion 12.27.1 + GSAP 3.14.2
- **State Management**: Zustand 5.0.10
- **Forms**: React Hook Form + Zod validation
- **Authentication**: Firebase Authentication (Email/Password + Google OAuth)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase account (free tier is sufficient)

### Setup

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Firebase**:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Email/Password and Google authentication
   - Copy your Firebase config to `.env.local`
   - See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed instructions

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:5173](http://localhost:5173)

### Quick Setup Script

Run the automated setup checker:
```bash
./setup.sh
```

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── create/            # Message creation flow
│   ├── m/[slug]/          # Public message pages
│   ├── marketing/         # Landing page
│   └── dashboard/         # User dashboard (post-MVP)
├── components/            # React components
│   ├── ui/               # shadcn/ui primitives
│   ├── layout/           # Layout components
│   ├── templates/        # Template components
│   └── forms/            # Form components
├── templates/            # Emotion templates
│   ├── love/            # Love template
│   ├── sorry/           # Sorry template
│   └── birthday/        # Birthday template
├── lib/                  # Utilities and helpers
├── store/               # Zustand stores
└── types/               # TypeScript types
```

## User Flow

1. **Landing Page** (`/`) - Marketing page with hero and features
2. **Template Selection** (`/create`) - Choose emotion template
3. **Message Creation** (`/create?template=love`) - Fill out form
4. **Preview** (`/create/preview`) - Review and get shareable link
5. **Public Page** (`/m/[slug]`) - Shareable message page

## Design System

- **Colors**: Dark theme with indigo (#6366F1) and purple (#8B5CF6) accents
- **Typography**: Inter (body) + Fredoka One (headings)
- **Spacing**: Consistent 8px grid system
- **Animations**: Subtle, purposeful, respects reduced motion

## Performance & Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader optimized
- Color contrast ≥ 4.5:1
- Reduced motion support
- Optimized Core Web Vitals

## Privacy & Security

- No third-party scripts or tracking
- Public pages are noindex, nofollow
- HTTPS enforcement
- Input sanitization
- Security headers configured

## Future Roadmap

### Phase 2 (Post-MVP)
- Optional user accounts
- Premium templates
- Custom domains
- Enhanced AI features
- Export options

### Phase 3 (Future)
- Template marketplace
- Team collaboration
- Analytics dashboard
- API access
- Mobile app

---

Built with ❤️ using Next.js and modern web technologies.