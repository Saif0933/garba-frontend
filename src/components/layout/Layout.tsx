import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileBottomNav } from './MobileBottomNav';
import { ToastContainer } from '../common/ToastContainer';
import { MatchCelebrationModal } from '../modals/MatchCelebrationModal';

export const Layout: React.FC = () => {
  const location = useLocation();
  const isAuthPage = ['/', '/login', '/register', '/verify-otp', '/forgot-password'].includes(location.pathname);
  const isMessagesPage = location.pathname.startsWith('/messages');
  const hideFooter = isAuthPage || isMessagesPage;
  const hideMobileNav = isAuthPage || isMessagesPage;

  return (
    <div className={`flex flex-col bg-[#FAF7FD] w-full max-w-full overflow-x-hidden ${isMessagesPage ? 'h-screen h-[100dvh] overflow-hidden' : 'min-h-screen'}`}>
      {!isAuthPage && (
        <div className={isMessagesPage ? 'hidden md:block flex-shrink-0' : 'flex-shrink-0'}>
          <Navbar />
        </div>
      )}
      <main className={`flex-1 w-full max-w-full flex flex-col min-h-0 ${isAuthPage || isMessagesPage ? 'pb-0 overflow-hidden' : 'pb-20 md:pb-0'}`}>
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
      {!hideMobileNav && <MobileBottomNav />}
      <ToastContainer />
      <MatchCelebrationModal />
    </div>
  );
};

