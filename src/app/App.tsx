import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from '@/app/providers';
import { AppRoutes } from '@/app/router';
import '@/app/styles/globals.css';

console.log('App.tsx: Module loaded');

export default function App() {
  console.log('App.tsx: App component rendering...');
  
  try {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>
        <BrowserRouter>
          <AppProviders>
            <AppRoutes />
          </AppProviders>
        </BrowserRouter>
      </div>
    );
  } catch (error) {
    console.error('App.tsx: Error in App component:', error);
    throw error;
  }
}
