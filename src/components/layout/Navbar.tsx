import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { GarbaLogo } from '../common/GarbaLogo';
import {
  MapPin,
  Bell,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Heart,
  MessageCircle,
  Calendar,
  CheckCircle
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    isLoggedIn,
    isAdmin,
    logout,
    cities,
    selectedCity,
    setSelectedCity,
    notifications,
    unreadNotificationCount,
    markNotificationAsRead,
    markAllNotificationsAsRead
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close popovers on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setIsCityDropdownOpen(false);
      }
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsNotifOpen(false);
    setIsUserMenuOpen(false);
    setIsCityDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Find Partner', path: '/find-partner', badge: 'Popular' },
    { label: 'Events', path: '/events' },
    { label: 'Groups', path: '/groups' }
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm shadow-purple-900/5 border-b border-purple-100/80 py-2.5'
          : 'bg-white/80 backdrop-blur-sm border-b border-purple-50 py-3.5'
      }`}
    >
      <div className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Logo */}
        <GarbaLogo showTagline={!isScrolled} />

        {/* Center: Search Bar (when logged in) or Desktop Nav Links (when public) */}
        {isLoggedIn ? (
          <div className="hidden md:flex items-center relative flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search events, partners or groups..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const val = (e.target as HTMLInputElement).value;
                    if (val) navigate(`/find-partner?q=${encodeURIComponent(val)}`);
                  }
                }}
                className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs text-slate-800 placeholder-slate-400 pl-9 pr-4 py-2 rounded-full border border-slate-200/90 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all shadow-inner/10"
              />
              <svg
                className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        ) : (
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-purple-900 bg-purple-100/70 font-bold'
                      : 'text-slate-600 hover:text-purple-900 hover:bg-purple-50/70'
                  }`
                }
              >
                {link.label}
                {link.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white leading-none">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* City Selector Dropdown */}
          <div className="relative" ref={cityDropdownRef}>
            <button
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-800 bg-slate-50/90 hover:bg-slate-100 border border-slate-200/80 rounded-full transition-colors shadow-sm"
              title="Select your festival city"
            >
              <MapPin className="w-3.5 h-3.5 text-pink-600" />
              <span className="max-w-[80px] sm:max-w-[110px] truncate">{selectedCity}</span>
              <ChevronDown className={`w-3 h-3 text-slate-600 transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isCityDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-2xl border border-purple-100 p-2 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-purple-50">
                  Select Festival City
                </div>
                <div className="max-h-60 overflow-y-auto py-1 space-y-0.5">
                  {cities.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => {
                        setSelectedCity(city.name);
                        setIsCityDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm text-left transition-colors ${
                        selectedCity === city.name
                          ? 'bg-purple-600 text-white font-bold'
                          : 'text-slate-700 hover:bg-purple-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className={`w-3.5 h-3.5 ${selectedCity === city.name ? 'text-white' : 'text-purple-600'}`} />
                        <span>{city.name}</span>
                      </div>
                      <span className={`text-[11px] ${selectedCity === city.name ? 'text-purple-100' : 'text-slate-400'}`}>
                        {city.partnerCount}+
                      </span>
                    </button>
                  ))}
                </div>
                <div className="pt-2 border-t border-purple-50">
                  <Link
                    to="/cities"
                    onClick={() => setIsCityDropdownOpen(false)}
                    className="block text-center text-xs font-bold text-purple-700 hover:text-purple-900 py-1"
                  >
                    View All Cities →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* If Logged In: Notifications + Messages + User Avatar */}
          {isLoggedIn && currentUser ? (
            <>
              {/* Notifications Bell */}
              <div className="relative" ref={notifDropdownRef}>
                <button
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="relative p-2 text-slate-700 hover:text-pink-600 hover:bg-pink-50/50 rounded-full transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#FF1E6A] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center">
                    {unreadNotificationCount > 0 ? unreadNotificationCount : 3}
                  </span>
                </button>

                {isNotifOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-purple-100 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between pb-2 border-b border-purple-50 px-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-purple-950">Notifications</h4>
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-pink-100 text-pink-700">
                          {unreadNotificationCount > 0 ? unreadNotificationCount : 3} New
                        </span>
                      </div>
                      {unreadNotificationCount > 0 && (
                        <button
                          onClick={markAllNotificationsAsRead}
                          className="text-[11px] font-bold text-purple-700 hover:text-purple-900"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>

                    <div className="max-h-72 overflow-y-auto py-1 space-y-1">
                      {notifications.length === 0 ? (
                        <div className="py-8 text-center text-xs text-slate-400">No new notifications</div>
                      ) : (
                        notifications.slice(0, 5).map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => {
                              markNotificationAsRead(notif.id);
                              if (notif.actionUrl) navigate(notif.actionUrl);
                              setIsNotifOpen(false);
                            }}
                            className={`p-2.5 rounded-xl cursor-pointer transition-colors flex items-start gap-3 ${
                              notif.isRead ? 'bg-white hover:bg-slate-50' : 'bg-purple-50/80 hover:bg-purple-100/60'
                            }`}
                          >
                            {notif.senderAvatar ? (
                              <img
                                src={notif.senderAvatar}
                                alt="avatar"
                                className="w-8 h-8 rounded-full object-cover border border-pink-300"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-xs">
                                GM
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-slate-900 leading-tight">{notif.title}</p>
                              <p className="text-[11px] text-slate-600 truncate mt-0.5">{notif.message}</p>
                              <span className="text-[10px] text-slate-400 mt-1 block">{notif.timestamp}</span>
                            </div>
                            {!notif.isRead && <span className="w-2 h-2 rounded-full bg-pink-500 mt-1.5 flex-shrink-0" />}
                          </div>
                        ))
                      )}
                    </div>

                    <div className="pt-2 border-t border-purple-50 text-center">
                      <Link
                        to="/notifications"
                        onClick={() => setIsNotifOpen(false)}
                        className="text-xs font-bold text-purple-700 hover:text-purple-900"
                      >
                        View All Notifications →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Messages Icon Button */}
              <Link
                to="/messages"
                className="relative p-2 text-slate-700 hover:text-pink-600 hover:bg-pink-50/50 rounded-full transition-colors"
                aria-label="Messages"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#FF1E6A] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center">
                  5
                </span>
              </Link>

              {/* User Avatar & Menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1 pl-1 pr-2 rounded-full border border-slate-200/80 bg-white hover:bg-slate-50 transition-colors shadow-sm"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-pink-500"
                  />
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-900 leading-tight">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] font-semibold text-amber-500 leading-none flex items-center gap-0.5">
                      👑 Premium
                    </span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white shadow-2xl border border-purple-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2.5 border-b border-purple-50 mb-1">
                      <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-purple-600 truncate">{currentUser.email}</p>
                    </div>

                    <div className="space-y-0.5 text-xs font-semibold text-slate-700">
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-purple-50"
                      >
                        <UserIcon className="w-4 h-4 text-pink-600" />
                        My Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-purple-50"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        My Profile
                      </Link>
                      <Link
                        to="/matches"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-purple-50"
                      >
                        <Heart className="w-4 h-4 text-rose-500" />
                        My Matches
                      </Link>
                      <Link
                        to="/messages"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-purple-50"
                      >
                        <MessageCircle className="w-4 h-4 text-violet-600" />
                        Messages
                      </Link>
                      <Link
                        to="/events/my-events"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-purple-50"
                      >
                        <Calendar className="w-4 h-4 text-amber-600" />
                        My Events
                      </Link>
                    </div>

                    <div className="pt-2 mt-1 border-t border-purple-50">
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* If Guest: Login & Register CTA buttons */
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold text-purple-900 hover:bg-purple-50 border border-purple-200 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold text-white festive-gradient hover:opacity-95 shadow-md shadow-pink-500/20 transition-all transform active:scale-95"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-purple-900 rounded-xl hover:bg-purple-50 lg:hidden transition-colors"
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-purple-100 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-xl text-sm font-semibold flex items-center justify-between ${
                    isActive ? 'bg-purple-100 text-purple-950 font-bold' : 'text-slate-700 hover:bg-purple-50'
                  }`
                }
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase rounded bg-pink-500 text-white">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
