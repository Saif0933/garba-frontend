import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Calendar,
  MessageCircle,
  Users,
  MapPin,
  Building2,
  User as UserIcon,
  ArrowRight
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, loginAsDemoUser, loginAsDemoAdmin } = useApp();
  const navigate = useNavigate();

  const [role, setRole] = useState<'partner' | 'organizer'>('partner');
  const [email, setEmail] = useState('user@garbamitra.com');
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (email === 'admin@garbamitra.com' || role === 'organizer') {
        await login(email, 'admin');
        navigate('/admin');
      } else {
        await login(email, 'user');
        navigate('/dashboard');
      }
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full relative bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 sm:p-6 lg:p-10"
      style={{
        backgroundImage: `linear-gradient(rgba(18, 4, 30, 0.78), rgba(28, 6, 44, 0.85)), url('/login-bg.jpg')`
      }}
    >
      {/* Decorative Top Toran / Hanging Lights Glow */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-amber-500/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10 py-6">
        
        {/* LEFT COLUMN: HERO BRANDING & VALUE PROPOSITIONS */}
        <div className="lg:col-span-7 text-white space-y-8 lg:pr-6">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-amber-400 p-0.5 shadow-lg flex items-center justify-center">
              <div className="w-full h-full bg-[#200836] rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 40 40" fill="none">
                  <path d="M14 11C15.6569 11 17 9.65685 17 8C17 6.34315 15.6569 5 14 5C12.3431 5 11 6.34315 11 8C11 9.65685 12.3431 11 14 11Z" fill="#EC4899"/>
                  <path d="M15.5 14H12.5C10.5 14 9 16 9 18V24H12V34H16V26H17V34H21V22L18.5 16L19.5 14" stroke="#EC4899" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M26 11C27.6569 11 29 9.65685 29 8C29 6.34315 27.6569 5 26 5C24.3431 5 23 6.34315 23 8C23 9.65685 24.3431 11 26 11Z" fill="#14B8A6"/>
                  <path d="M24.5 14H27.5C29.5 14 31 16 31 18V24H28V34H24V26H23V34H19V22L21.5 16L20.5 14" stroke="#14B8A6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div>
              <div className="text-2xl font-black font-heading tracking-tight leading-none">
                Garba<span className="text-pink-400">Mitra</span>
              </div>
              <div className="text-[11px] text-purple-200/90 font-medium tracking-wide mt-0.5">
                Find Your Garba Partner
              </div>
            </div>
          </div>

          {/* Main Hero Headline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black font-heading leading-[1.1] tracking-tight">
              No Partner<br />
              for Garba?<br />
              <span className="text-amber-400">We’ve Got You.</span>
            </h1>
            <p className="text-sm sm:text-base text-purple-100/90 max-w-xl leading-relaxed pt-1">
              Join thousands of Garba & Dandiya lovers, find your perfect partner, discover events and make your Navratri unforgettable.
            </p>
          </div>

          {/* 4 Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 max-w-xl">
            {/* 1. Verified Profiles */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-pink-500/30">
                <Shield className="w-5 h-5 text-white fill-white/20" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white leading-tight">Verified Profiles</h4>
                <p className="text-xs text-purple-200/80 mt-0.5">Real people, safe community</p>
              </div>
            </div>

            {/* 2. Event Based Matching */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-violet-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-purple-600/30">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white leading-tight">Event Based Matching</h4>
                <p className="text-xs text-purple-200/80 mt-0.5">Find partners for the same event</p>
              </div>
            </div>

            {/* 3. Chat Securely */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-500/30">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white leading-tight">Chat Securely</h4>
                <p className="text-xs text-purple-200/80 mt-0.5">Connect after a mutual match</p>
              </div>
            </div>

            {/* 4. Join Groups */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-500/30">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white leading-tight">Join Groups</h4>
                <p className="text-xs text-purple-200/80 mt-0.5">Meet new friends and dance together</p>
              </div>
            </div>
          </div>

          {/* Bottom Floating Stats Pill */}
          <div className="p-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 shadow-xl max-w-xl grid grid-cols-3 gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-pink-500/30 flex items-center justify-center text-pink-300">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-black text-white leading-none">50K+</div>
                <div className="text-[10px] sm:text-[11px] text-purple-200/80 mt-0.5">Active Members</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 border-l border-white/10 pl-3">
              <div className="w-8 h-8 rounded-xl bg-purple-500/30 flex items-center justify-center text-purple-300">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-black text-white leading-none">500+</div>
                <div className="text-[10px] sm:text-[11px] text-purple-200/80 mt-0.5">Garba Events</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 border-l border-white/10 pl-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/30 flex items-center justify-center text-amber-300">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-black text-white leading-none">15+</div>
                <div className="text-[10px] sm:text-[11px] text-purple-200/80 mt-0.5">Major Cities</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LOGIN FORM CARD */}
        <div className="lg:col-span-5 w-full max-w-md mx-auto">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl space-y-5 border border-purple-100">
            {/* Card Header */}
            <div className="text-center space-y-1.5">
              <div className="inline-flex items-center justify-center gap-2 mb-1">
                <svg className="w-7 h-7" viewBox="0 0 40 40" fill="none">
                  <path d="M14 11C15.6569 11 17 9.65685 17 8C17 6.34315 15.6569 5 14 5C12.3431 5 11 6.34315 11 8C11 9.65685 12.3431 11 14 11Z" fill="#EC4899"/>
                  <path d="M15.5 14H12.5C10.5 14 9 16 9 18V24H12V34H16V26H17V34H21V22L18.5 16L19.5 14" stroke="#EC4899" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M26 11C27.6569 11 29 9.65685 29 8C29 6.34315 27.6569 5 26 5C24.3431 5 23 6.34315 23 8C23 9.65685 24.3431 11 26 11Z" fill="#14B8A6"/>
                  <path d="M24.5 14H27.5C29.5 14 31 16 31 18V24H28V34H24V26H23V34H19V22L21.5 16L20.5 14" stroke="#14B8A6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-xs font-semibold text-slate-500">Welcome to</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 font-heading">
                Garba<span className="text-pink-600">Mitra</span>
              </h2>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Login to continue and find your Garba partner or manage your events.
              </p>
            </div>

            {/* Role Switcher Tabs */}
            <div className="grid grid-cols-2 gap-3">
              {/* Find Partner Tab */}
              <button
                type="button"
                onClick={() => {
                  setRole('partner');
                  setEmail('user@garbamitra.com');
                }}
                className={`p-3 rounded-2xl flex items-center gap-2.5 transition-all text-left border ${
                  role === 'partner'
                    ? 'border-pink-500 bg-pink-50/50 shadow-sm ring-1 ring-pink-500/20'
                    : 'border-slate-100 bg-slate-50/70 hover:bg-slate-100/80 text-slate-600'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  role === 'partner' ? 'bg-pink-500 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  <UserIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className={`text-xs font-bold leading-tight ${role === 'partner' ? 'text-pink-600' : 'text-slate-800'}`}>
                    Find Partner
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">Join as a participant</div>
                </div>
              </button>

              {/* Event Organizer Tab */}
              <button
                type="button"
                onClick={() => {
                  setRole('organizer');
                  setEmail('admin@garbamitra.com');
                }}
                className={`p-3 rounded-2xl flex items-center gap-2.5 transition-all text-left border ${
                  role === 'organizer'
                    ? 'border-blue-500 bg-blue-50/50 shadow-sm ring-1 ring-blue-500/20'
                    : 'border-slate-100 bg-slate-50/70 hover:bg-slate-100/80 text-slate-600'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  role === 'organizer' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className={`text-xs font-bold leading-tight ${role === 'organizer' ? 'text-blue-600' : 'text-slate-800'}`}>
                    Event Organizer
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">Create and manage events</div>
                </div>
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              {error && (
                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold">
                  {error}
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 bg-white text-xs font-medium text-slate-800 transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800">Password</label>
                  <Link to="/forgot-password" className="text-[11px] font-bold text-pink-600 hover:text-pink-700">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 bg-white text-xs font-medium text-slate-800 transition-all placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center gap-2 pt-0.5">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-pink-600 accent-pink-600 focus:ring-pink-500 cursor-pointer"
                />
                <label htmlFor="rememberMe" className="text-xs font-semibold text-slate-700 cursor-pointer select-none">
                  Remember me
                </label>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                <span>{isLoading ? 'Signing In...' : 'Login'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* OR Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-100 w-full" />
              <span className="bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                OR
              </span>
              <div className="border-t border-slate-100 w-full" />
            </div>

            {/* Demo Quick Logins Side by Side */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  loginAsDemoUser();
                  navigate('/dashboard');
                }}
                className="p-2.5 rounded-2xl bg-pink-50/70 hover:bg-pink-100/70 border border-pink-100/80 flex items-center gap-2.5 transition-all text-left group"
              >
                <div className="w-7 h-7 rounded-xl bg-pink-500 text-white flex items-center justify-center flex-shrink-0">
                  <UserIcon className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-pink-700 group-hover:text-pink-800 leading-tight truncate">
                    Demo User Login
                  </div>
                  <div className="text-[9px] text-pink-500/80 truncate">Explore as a participant</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  loginAsDemoAdmin();
                  navigate('/admin');
                }}
                className="p-2.5 rounded-2xl bg-blue-50/70 hover:bg-blue-100/70 border border-blue-100/80 flex items-center gap-2.5 transition-all text-left group"
              >
                <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-blue-700 group-hover:text-blue-800 leading-tight truncate">
                    Demo Organizer Login
                  </div>
                  <div className="text-[9px] text-blue-500/80 truncate">Explore as an event organizer</div>
                </div>
              </button>
            </div>

            {/* Bottom Signup Link */}
            <div className="text-center pt-1 text-xs text-slate-500">
              <span>Don't have an account? </span>
              <Link to="/register" className="font-bold text-pink-600 hover:text-pink-700">
                Sign Up
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

