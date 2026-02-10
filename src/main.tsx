import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/app/App';
import ErrorBoundary from '@/app/ErrorBoundary';

console.log('main.tsx: Script loaded');

const rootElement = document.getElementById('root');
console.log('main.tsx: Root element:', rootElement);

if (!rootElement) {
  console.error('main.tsx: No root element found!');
  throw new Error('No root element found');
}

console.log('main.tsx: Creating React root...');
const root = ReactDOM.createRoot(rootElement);

console.log('main.tsx: Rendering app...');
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

console.log('main.tsx: Render called');
