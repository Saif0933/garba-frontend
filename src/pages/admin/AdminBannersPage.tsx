import React from 'react';
import { Image as ImageIcon, Sparkles, Plus } from 'lucide-react';

export const AdminBannersPage: React.FC = () => {
  const banners = [
    { id: 'ban-1', title: 'Navratri 2026 Season Launch', tag: 'Hero Section', city: 'All Cities', status: 'Active' },
    { id: 'ban-2', title: 'Ranchi Morabadi Mega Night 2026', tag: 'Featured Event', city: 'Ranchi', status: 'Active' },
    { id: 'ban-3', title: 'United Way Ahmedabad Exclusive Pass', tag: 'City Hub', city: 'Ahmedabad', status: 'Active' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white font-heading">
            Promotional Banners & Campaigns
          </h1>
          <p className="text-xs text-slate-400">
            Curate hero banners, event promotions, and sponsor highlights.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {banners.map((ban) => (
          <div key={ban.id} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <span className="text-[10px] font-black uppercase text-pink-400 bg-pink-950 px-2 py-0.5 rounded-md border border-pink-800">
              {ban.tag}
            </span>
            <h3 className="font-bold text-white text-sm leading-tight">{ban.title}</h3>
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
              <span>Target: {ban.city}</span>
              <span className="text-emerald-400 font-bold">✓ {ban.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
