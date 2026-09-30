import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Heart, Users, MessageCircle, ArrowRight, CheckCircle2, Lock } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          The Complete Experience Flow
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-purple-950 font-heading">
          How GarbaMitra Works
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Meet → Match → Dance → Enjoy. We make festival partner discovery safe, authentic, and delightfully effortless.
        </p>
      </div>

      {/* Step by Step Breakdown */}
      <div className="space-y-12">
        {/* Step 1 */}
        <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-3xl border border-purple-100 shadow-sm">
          <div className="w-16 h-16 rounded-3xl festive-gradient text-white flex items-center justify-center font-black text-2xl font-heading flex-shrink-0 shadow-lg shadow-pink-500/20">
            01
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="text-xl font-bold text-slate-900 font-heading">
              1. Register & Complete 18+ Verification
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Create your account with mobile OTP and 18+ age verification. We verify attendees to maintain a safe, welcoming, and adult festival community.
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-xs text-purple-900 font-semibold">
              <span className="px-2.5 py-1 rounded-lg bg-purple-50">✓ Mobile OTP Verified</span>
              <span className="px-2.5 py-1 rounded-lg bg-purple-50">✓ Strict 18+ Age Check</span>
              <span className="px-2.5 py-1 rounded-lg bg-purple-50">✓ Private Phone Number Shield</span>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-3xl border border-purple-100 shadow-sm">
          <div className="w-16 h-16 rounded-3xl festive-gradient text-white flex items-center justify-center font-black text-2xl font-heading flex-shrink-0 shadow-lg shadow-pink-500/20">
            02
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="text-xl font-bold text-slate-900 font-heading">
              2. Choose Your Festival Event & Set Dance Style
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Select your city (e.g. Ranchi, Ahmedabad, Mumbai) and the specific ground you plan to attend. Set your Garba skill level (1-2 Taali, 3-Taali, Dodhiya, Fast Spins) and preferred timing.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-3xl border border-purple-100 shadow-sm">
          <div className="w-16 h-16 rounded-3xl festive-gradient text-white flex items-center justify-center font-black text-2xl font-heading flex-shrink-0 shadow-lg shadow-pink-500/20">
            03
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="text-xl font-bold text-slate-900 font-heading">
              3. Send Partner Requests & Match Mutually
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Browse candidate cards sorted by real event compatibility. Send a request with a friendly icebreaker. When the candidate accepts, you match mutually!
            </p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-3xl border border-purple-100 shadow-sm">
          <div className="w-16 h-16 rounded-3xl festive-gradient text-white flex items-center justify-center font-black text-2xl font-heading flex-shrink-0 shadow-lg shadow-pink-500/20">
            04
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="text-xl font-bold text-slate-900 font-heading">
              4. Chat Safely & Meet at the Public Event Ground
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Use in-app messaging to coordinate arrival times, outfit color themes, and meetup spots inside the registered venue. Meet, spin, dance, and celebrate Navratri with joy!
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-purple-800 via-pink-600 to-amber-500 text-white text-center space-y-4 shadow-xl">
        <h3 className="text-2xl sm:text-3xl font-black font-heading">
          Ready to experience Garba like never before?
        </h3>
        <p className="text-xs sm:text-sm text-purple-100 max-w-md mx-auto">
          Start matching with fellow festival dancers in your city right now.
        </p>
        <div className="pt-2">
          <Link
            to="/find-partner"
            className="inline-block py-3 px-8 rounded-full font-bold text-sm text-purple-950 bg-white hover:bg-purple-50 shadow-lg"
          >
            Find a Partner Now →
          </Link>
        </div>
      </div>
    </div>
  );
};
