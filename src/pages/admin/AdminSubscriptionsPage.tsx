import React from 'react';
import { Crown, Sparkles, CheckCircle2 } from 'lucide-react';
import { MOCK_PRICING_PLANS } from '../../data/mockData';

export const AdminSubscriptionsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white font-heading">
          Festival Pass Tiers & Active Subscriptions
        </h1>
        <p className="text-xs text-slate-400">
          Monitor pricing configurations, active subscriber counts, and tier conversion rates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_PRICING_PLANS.map((plan) => (
          <div key={plan.id} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">{plan.name}</span>
              <span className="text-xs font-black text-amber-400">₹{plan.price}</span>
            </div>
            <p className="text-xs text-slate-400">{plan.tagline}</p>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Duration:</span>
              <span className="font-bold text-purple-300">{plan.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
