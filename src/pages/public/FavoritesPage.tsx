import React from 'react';
import { useApp } from '../../context/AppContext';
import { PartnerCard } from '../../components/partner/PartnerCard';
import { EmptyState } from '../../components/common/EmptyState';
import { Heart, Sparkles } from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const { favorites, users } = useApp();

  const favoriteUsers = users.filter((u) => favorites.includes(u.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider mb-1">
            <Heart className="w-3.5 h-3.5 fill-pink-600 text-pink-600" />
            Bookmarked Dancers
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-purple-950 font-heading">
            Your Saved Partners
          </h1>
        </div>
        <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-full border border-purple-100 shadow-sm">
          {favoriteUsers.length} Saved Profiles
        </span>
      </div>

      {favoriteUsers.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 border border-purple-100 shadow-sm">
          <EmptyState
            type="favorites"
            title="No saved festival partners yet."
            description="When browsing candidate cards, tap the heart icon to save dancers you'd like to partner with."
            actionText="Browse Partners"
            actionUrl="/find-partner"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteUsers.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      )}
    </div>
  );
};
