import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { LayoutDashboard, Users, Calendar, MessageCircle, User, Sparkles, Heart } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { isLoggedIn, unreadNotificationCount } = useApp();
  const location = useLocation();

  // Hide on admin or auth routes to prevent cluttering
  if (location.pathname.startsWith('/admin') || ['/', '/login', '/register', '/verify-otp', '/forgot-password'].includes(location.pathname)) {
    return null;
  }

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-purple-100/90 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] px-2 py-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-around relative max-w-md mx-auto">
        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 px-2 rounded-xl transition-all duration-200 ${
              isActive
                ? 'text-[#FF1E6A] font-bold scale-105'
                : 'text-slate-500 hover:text-purple-900 active:scale-95'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5 tracking-tight">Home</span>
        </NavLink>

        {/* Find Partner */}
        <NavLink
          to="/find-partner"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 px-2 rounded-xl transition-all duration-200 ${
              isActive
                ? 'text-[#FF1E6A] font-bold scale-105'
                : 'text-slate-500 hover:text-purple-900 active:scale-95'
            }`
          }
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5 tracking-tight">Find</span>
        </NavLink>

        {/* Events */}
        <NavLink
          to="/events"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 px-2 rounded-xl transition-all duration-200 ${
              isActive
                ? 'text-[#FF1E6A] font-bold scale-105'
                : 'text-slate-500 hover:text-purple-900 active:scale-95'
            }`
          }
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5 tracking-tight">Events</span>
        </NavLink>

        {/* Messages */}
        <NavLink
          to="/messages"
          className={({ isActive }) =>
            `relative flex flex-col items-center py-1 px-2 rounded-xl transition-all duration-200 ${
              isActive
                ? 'text-[#FF1E6A] font-bold scale-105'
                : 'text-slate-500 hover:text-purple-900 active:scale-95'
            }`
          }
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5" />
            <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-[#FF1E6A] text-white text-[8px] font-black rounded-full flex items-center justify-center">
              5
            </span>
          </div>
          <span className="text-[10px] font-semibold mt-0.5 tracking-tight">Chat</span>
        </NavLink>

        {/* Profile */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 px-2 rounded-xl transition-all duration-200 ${
              isActive
                ? 'text-[#FF1E6A] font-bold scale-105'
                : 'text-slate-500 hover:text-purple-900 active:scale-95'
            }`
          }
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5 tracking-tight">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};
