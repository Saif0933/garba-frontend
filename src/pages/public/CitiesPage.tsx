import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CityCard } from '../../components/common/CityCard';
import { MapPin, Search, Sparkles } from 'lucide-react';

export const CitiesPage: React.FC = () => {
  const { cities } = useApp();
  const [search, setSearch] = useState('');

  const filteredCities = cities.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.state.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-purple-900 via-pink-900 to-purple-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider border border-pink-500/40">
            <Sparkles className="w-3.5 h-3.5" />
            15+ Indian Cities
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-heading">
            Festival Partner Hubs Across India
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80">
            From the mega grounds of Ranchi to the world-famous United Way in Ahmedabad and vibrant Mumbai arenas, find your Garba partner wherever you are.
          </p>
        </div>

        <div className="w-full md:w-80">
          <div className="relative">
            <Search className="w-4 h-4 text-purple-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search city or state..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-purple-300/40 text-xs sm:text-sm text-white placeholder:text-purple-300/60 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>
      </div>

      {/* Cities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCities.map((city) => (
          <CityCard key={city.id} city={city} />
        ))}
      </div>
    </div>
  );
};
