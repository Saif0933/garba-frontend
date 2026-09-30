import React from 'react';
import { ShieldCheck, Heart, Users, Sparkles, CheckCircle2, XCircle } from 'lucide-react';

export const CommunityGuidelinesPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-pink-600" />
          Code of Conduct
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-purple-950 font-heading">
          GarbaMitra Community Guidelines
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          GarbaMitra is built on mutual respect, cultural celebration, and genuine festival camaraderie. We expect every member to uphold these standards.
        </p>
      </div>

      <div className="space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-purple-100 shadow-sm">
        {/* Do's */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-lg font-heading">
            <CheckCircle2 className="w-5 h-5" />
            <span>The Festival Do's</span>
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
              <span><strong>Respect personal boundaries:</strong> Every dancer has their own comfort zone. Always ask before holding hands or starting paired spins.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
              <span><strong>Communicate clearly:</strong> Coordinate meetup points inside the festival arena and arrive on agreed schedule.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
              <span><strong>Be welcoming to beginners:</strong> Garba is inclusive. Encourage dancers who are still mastering 3-taali or Dodhiya steps.</span>
            </li>
          </ul>
        </div>

        {/* Don'ts */}
        <div className="space-y-4 pt-4 border-t border-purple-100">
          <div className="flex items-center gap-2 text-rose-600 font-bold text-lg font-heading">
            <XCircle className="w-5 h-5" />
            <span>Zero Tolerance Violations (Don'ts)</span>
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 flex-shrink-0" />
              <span><strong>No Harassment or Inappropriate Behavior:</strong> Any unsolicited sexual advances, aggressive messages, or stalking will lead to immediate account termination and police referral.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 flex-shrink-0" />
              <span><strong>No Unofficial Ticket Scalping or Scams:</strong> Offering or demanding unofficial pass sales in chat is strictly prohibited.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 flex-shrink-0" />
              <span><strong>No Minors:</strong> GarbaMitra partner matching is strictly 18+. Any account representing minors will be removed immediately.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
