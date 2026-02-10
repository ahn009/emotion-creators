import { BrowserRouter } from 'react-router-dom';
import { AppProvidersNoAuth } from '@/app/providers/AppProvidersNoAuth';
import { AppRoutesNoAuth } from '@/app/router/routes-no-auth';
import '@/app/styles/globals.css';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvidersNoAuth>
        <AppRoutesNoAuth />
      </AppProvidersNoAuth>
    </BrowserRouter>
  );
}
