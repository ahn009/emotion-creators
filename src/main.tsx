import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from '@/app/App';
import ErrorBoundary from '@/app/ErrorBoundary';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('No root element found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </HelmetProvider>
  </React.StrictMode>
);
