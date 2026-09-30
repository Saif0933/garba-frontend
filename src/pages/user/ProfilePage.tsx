import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  User,
  CheckCircle2,
  MapPin,
  Calendar,
  Clock,
  Heart,
  Share2,
  Edit,
  ShieldCheck,
  Crown,
  Sparkles,
  Phone,
  Mail
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { currentUser, events, userEvents, showToast } = useApp();

  if (!currentUser) return null;

  const joinedEventObjects = events.filter((e) => userEvents.includes(e.id));

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${currentUser.name}'s GarbaMitra Profile`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Profile link copied to clipboard!', '', 'info');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* 1. PROFILE HEADER CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          {/* Avatar with Verified ring */}
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-pink-500 shadow-xl"
            />
            {currentUser.isPremium && (
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-900 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
                <Crown className="w-3 h-3 fill-slate-900" />
                Premium
              </div>
            )}
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-purple-950 font-heading flex items-center justify-center sm:justify-start gap-2">
                  <span>{currentUser.name}, {currentUser.age}</span>
                  <CheckCircle2 className="w-5 h-5 text-pink-600 fill-pink-100" />
                </h1>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-600 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-purple-600" />
                  <span>{currentUser.city} · {currentUser.area}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-2 pt-2 sm:pt-0">
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-2xl text-slate-600 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 transition-colors"
                  title="Share Profile"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <Link
                  to="/profile/edit"
                  className="py-2.5 px-4 rounded-2xl font-bold text-xs text-white festive-gradient hover:opacity-95 shadow-md shadow-pink-500/20 flex items-center gap-1.5"
                >
                  <Edit className="w-3.5 h-3.5" />
                  Edit Profile
                </Link>
              </div>
            </div>

            {/* Bio */}
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1">
              "{currentUser.bio}"
            </p>

            {/* Looking For Badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-2">
              {currentUser.lookingFor.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-xl bg-purple-100 text-purple-950 text-xs font-bold"
                >
                  Looking for: {item}
                </span>
              ))}
              <span className="px-2.5 py-1 rounded-xl bg-pink-50 text-pink-700 text-xs font-semibold">
                Style: {currentUser.danceStyle}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DANCE EXPERIENCE & PREFERENCES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dance Skills */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-purple-100 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-purple-950 font-heading">
            Dance Skills & Rhythms
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Garba (Claps & Dodhiya)</span>
              <span className="text-sm font-black text-purple-950 mt-0.5 block">{currentUser.garbaLevel}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-pink-50/70 border border-pink-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Dandiya Raas (Sticks)</span>
              <span className="text-sm font-black text-pink-700 mt-0.5 block">{currentUser.dandiyaLevel}</span>
            </div>
          </div>
          <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl">
            <strong>Preferred Partner Gender:</strong> {currentUser.preferredGender} · <strong>Age Range:</strong> {currentUser.preferredAgeMin} - {currentUser.preferredAgeMax} yrs
          </div>
        </div>

        {/* Verification Status */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-purple-100 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-purple-950 font-heading">
            Trust & Verification Status
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-50/50">
              <span className="flex items-center gap-2 font-semibold text-slate-800">
                <Phone className="w-4 h-4 text-purple-600" />
                Mobile OTP Verified
              </span>
              <span className="text-[11px] font-bold text-emerald-600">✓ Verified</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-50/50">
              <span className="flex items-center gap-2 font-semibold text-slate-800">
                <Mail className="w-4 h-4 text-purple-600" />
                Email Verification
              </span>
              <span className="text-[11px] font-bold text-emerald-600">✓ Verified</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-50/50">
              <span className="flex items-center gap-2 font-semibold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-pink-600" />
                18+ Adult ID Check
              </span>
              <span className="text-[11px] font-bold text-emerald-600">✓ 18+ Passed</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SCHEDULED FESTIVAL EVENTS */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-purple-950 font-heading">
            My Registered Festival Events
          </h3>
          <Link to="/events" className="text-xs font-bold text-pink-600 hover:text-pink-700">
            Browse More Events →
          </Link>
        </div>

        {joinedEventObjects.length === 0 ? (
          <p className="text-xs text-slate-500 py-4">No events joined yet. Explore the events tab to add to your schedule.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {joinedEventObjects.map((ev) => (
              <div
                key={ev.id}
                className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">{ev.title}</h4>
                  <span className="text-[11px] text-slate-500 block">{ev.displayDate} · {ev.venue}</span>
                </div>
                <Link
                  to={`/events/${ev.id}`}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-[11px] font-bold"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
