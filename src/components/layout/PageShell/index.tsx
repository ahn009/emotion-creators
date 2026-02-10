// PageShell - wraps pages with Navbar, Footer, and Guest Warning

import { ReactNode } from 'react';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { GuestWarningBanner } from '@/components/common';

interface PageShellProps {
  children: ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
  showGuestWarning?: boolean;
}

export const PageShell = ({ 
  children, 
  showNavbar = true, 
  showFooter = true,
  showGuestWarning = false,
}: PageShellProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {showGuestWarning && <GuestWarningBanner />}
      {showNavbar && <Navbar />}
      <main className={`flex-1 ${showNavbar ? 'pt-16' : ''}`}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};
