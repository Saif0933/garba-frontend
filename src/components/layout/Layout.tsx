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

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7FD]">
      {!isAuthPage && <Navbar />}
      <main className={`flex-1 ${isAuthPage || isMessagesPage ? 'pb-0' : 'pb-16 lg:pb-0'}`}>
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
      {!isAuthPage && <MobileBottomNav />}
      <ToastContainer />
      <MatchCelebrationModal />
    </div>
  );
};

