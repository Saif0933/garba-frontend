import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  MapPin,
  Lock,
  DollarSign,
  PhoneCall,
  AlertTriangle,
  Users,
  CheckCircle2,
  HeartHandshake,
  ExternalLink
} from 'lucide-react';

export const SafetyPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Safety & Trust Center
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-purple-950 font-heading">
          Your Safety Comes First
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          GarbaMitra is dedicated to creating a secure, respectful, and joyful festival discovery environment for all verified dancers.
        </p>
      </div>

      {/* Emergency Helpline Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-600 via-rose-700 to-purple-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-black tracking-wider uppercase text-rose-200 block">
            Official Indian Emergency Desks
          </span>
          <h3 className="text-2xl font-black font-heading">
            Need Immediate Assistance?
          </h3>
          <p className="text-xs text-rose-100">
            For emergencies during public events, contact local authorities directly:
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
            <span className="text-[10px] uppercase font-bold text-rose-200 block">Police Emergency</span>
            <span className="text-2xl font-black font-heading text-white">112</span>
          </div>
          <div className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
            <span className="text-[10px] uppercase font-bold text-rose-200 block">Cyber Helpline</span>
            <span className="text-2xl font-black font-heading text-white">1930</span>
          </div>
        </div>
      </div>

      {/* 5 Core Safety Pillars Cards */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-purple-950 font-heading text-center">
          5 Essential Festival Safety Guidelines
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Meet in Public */}
          <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              1. Meet in Public
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Always schedule your first meetup inside the registered, ticketed public festival ground (near the main entrance, food court, or GarbaMitra lounge). Never meet in private or secluded locations.
            </p>
          </div>

          {/* Card 2: Protect Your Information */}
          <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-700 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              2. Protect Your Information
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Never share passwords, bank details, OTPs, or exact residential addresses. Use our in-app messaging system until you have met and feel comfortable.
            </p>
          </div>

          {/* Card 3: Never Send Money */}
          <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              3. Never Send Money
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Do not transfer money to another user for passes, rides, or personal favors. Purchase event tickets solely through official organizers and verified portals.
            </p>
          </div>

          {/* Card 4: Tell Someone */}
          <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              4. Tell Someone Your Plan
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Inform a friend or family member about the festival event you are attending, who your dance partner is, and your expected return time.
            </p>
          </div>

          {/* Card 5: Report Suspicious Behaviour */}
          <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-3 md:col-span-2 lg:col-span-2">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              5. Report & Block Immediately
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              If anyone engages in harassment, offensive language, fake identity claims, or makes you feel unsafe, use our in-app <strong>Report User</strong> and <strong>Block User</strong> buttons. Our moderation team reviews flagged reports 24x7.
            </p>
          </div>
        </div>
      </div>

      {/* Safety Actions & Community Link */}
      <div className="p-8 rounded-3xl bg-purple-50/80 border border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-slate-900">
            Encountered a suspicious profile or behavior?
          </h4>
          <p className="text-xs text-slate-600">
            Submit a confidential incident report to our trust and safety moderators.
          </p>
        </div>

        <div className="flex gap-3 flex-shrink-0">
          <Link
            to="/safety/report"
            className="py-2.5 px-5 rounded-xl font-bold text-xs text-white bg-rose-600 hover:bg-rose-700 shadow-md"
          >
            Report an Incident
          </Link>
          <Link
            to="/community-guidelines"
            className="py-2.5 px-5 rounded-xl font-bold text-xs text-purple-900 bg-white border border-purple-200 hover:bg-purple-100"
          >
            Community Guidelines
          </Link>
        </div>
      </div>
    </div>
  );
};
