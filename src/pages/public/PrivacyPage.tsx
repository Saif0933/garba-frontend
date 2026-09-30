import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex items-center gap-3 pb-4 border-b border-purple-100">
        <div className="p-3 rounded-2xl bg-pink-100 text-pink-700">
          <Lock className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-purple-950 font-heading">
            Privacy Policy & Data Shield
          </h1>
          <p className="text-xs text-slate-500">Your privacy and safety are paramount</p>
        </div>
      </div>

      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-purple-100 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h3 className="text-base font-bold text-slate-900">1. Information We Collect</h3>
          <p>
            We collect account information including name, verified mobile number, email, date of birth (for 18+ verification), dance skill levels, and preferred public festival events.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-slate-900">2. Contact Number Protection</h3>
          <p>
            Your phone number is never displayed on public profile cards or search indexes. It remains protected and can only be optionally shared by you directly inside a private chat after a mutual match is confirmed.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-slate-900">3. Location & Area Privacy</h3>
          <p>
            We only display approximate neighborhood or city center areas (e.g. "Morabadi, Ranchi") and never broadcast exact GPS coordinates or live residential addresses.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-slate-900">4. Account Deletion</h3>
          <p>
            You can request complete account and data deletion at any time through the Settings panel or by emailing support@garbamitra.com.
          </p>
        </section>
      </div>
    </div>
  );
};
