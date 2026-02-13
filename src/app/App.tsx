import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { AppProviders } from '@/app/providers';
import { AppRoutes } from '@/app/router';
import { ScrollToTop } from '@/components/ScrollToTop';
import { LoadingScreen } from '@/components/common';
import '@/app/styles/globals.css';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.getElementById('initial-loading')?.remove();
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={loading} />
      <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>
        <BrowserRouter>
          <ScrollToTop />
          <AppProviders>
            <AppRoutes />
          </AppProviders>
        </BrowserRouter>
        <Analytics />
      </div>
    </>
  );
}
