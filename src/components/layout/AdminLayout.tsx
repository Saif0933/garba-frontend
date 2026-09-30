import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { GarbaLogo } from '../common/GarbaLogo';
import { ToastContainer } from '../common/ToastContainer';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Heart,
  MessageSquare,
  ShieldAlert,
  CreditCard,
  Crown,
  MapPin,
  Image as ImageIcon,
  BarChart3,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Bell
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { currentUser, logout } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const adminNavItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'User Directory', path: '/admin/users', icon: Users },
    { label: 'Festival Events', path: '/admin/events', icon: Calendar },
    { label: 'Mutual Matches', path: '/admin/matches', icon: Heart },
    { label: 'Safety Moderation', path: '/admin/reports', icon: ShieldAlert, badge: 'Active' },
    { label: 'Chat Monitor', path: '/admin/messages', icon: MessageSquare },
    { label: 'Payments & Revenue', path: '/admin/payments', icon: CreditCard },
    { label: 'Pass Subscriptions', path: '/admin/subscriptions', icon: Crown },
    { label: 'City Hubs', path: '/admin/cities', icon: MapPin },
    { label: 'Promo Banners', path: '/admin/banners', icon: ImageIcon },
    { label: 'Analytics & Trends', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Platform Settings', path: '/admin/settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 p-4 justify-between flex-shrink-0">
        <div className="space-y-6">
          <div className="px-2 pt-2">
            <GarbaLogo isDark={true} size="md" />
            <div className="mt-2 text-[11px] font-bold text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2.5 py-1 rounded-lg inline-block">
              🛡️ Admin & Moderation Console
            </div>
          </div>

          <nav className="space-y-1">
            {adminNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase rounded bg-rose-600 text-white">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
              View Public Website
            </span>
          </Link>

          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out Admin
          </button>
        </div>
      </aside>

      {/* Mobile Admin Header & Drawer */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
        <GarbaLogo isDark={true} size="sm" />
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {sidebarOpen && (
        <div className="md:hidden bg-slate-900 p-4 border-b border-slate-800 space-y-2 animate-in slide-in-from-top-4">
          {adminNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold ${
                  isActive ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-800'
                }`
              }
            >
              <div className="flex items-center gap-2">
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </div>
            </NavLink>
          ))}
          <div className="pt-2 border-t border-slate-800">
            <Link to="/" className="block py-2 text-xs font-bold text-purple-400">
              ← Back to Main Website
            </Link>
          </div>
        </div>
      )}

      {/* Main Admin Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/60 backdrop-blur-md px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold text-slate-200">GarbaMitra Admin Center</h2>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
              Live Production Demo
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'}
                alt="admin"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-500"
              />
              <div className="hidden sm:block text-left text-xs">
                <div className="font-bold text-white leading-tight">{currentUser?.name || 'Admin'}</div>
                <div className="text-[10px] text-purple-400">Lead Safety Officer</div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Nested Route Content */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          <Outlet />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};
