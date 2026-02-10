import { Routes, Route } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          EmotionCreator
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Transform emotions into beautiful, shareable pages
        </p>
        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition">
          Get Started
        </button>
      </div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
        <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
      </div>
    </div>
  );
}

export function AppRoutesNoAuth() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
