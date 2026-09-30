import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EventCard } from '../../components/event/EventCard';
import { EmptyState } from '../../components/common/EmptyState';
import { Calendar, Search, MapPin, Sparkles, Filter, Music } from 'lucide-react';

export const EventsPage: React.FC = () => {
  const { events, cities, selectedCity, setSelectedCity } = useApp();
  const [cityFilter, setCityFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Garba Night', 'Dandiya Raas', 'Mega Utsav', 'Traditional Mandli'];

  const filteredEvents = events.filter((ev) => {
    if (cityFilter !== 'All' && ev.city.toLowerCase() !== cityFilter.toLowerCase()) return false;
    if (categoryFilter !== 'All' && ev.category !== categoryFilter) return false;
    if (
      searchQuery &&
      !ev.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !ev.venue.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-5 sm:space-y-8 overflow-hidden">
      {/* Header Banner */}
      <div className="w-full max-w-full overflow-hidden p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-purple-900 via-pink-900 to-purple-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/30 text-pink-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-pink-500/40">
            <Sparkles className="w-3.5 h-3.5" />
            Navratri 2026 Festival Grounds
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading tracking-tight leading-tight">
            Garba &amp; Dandiya Events
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
            Discover premier open-air grounds, stadium arenas, and luxury rooftop Dandiya nights across India. Connect with partners attending the same venue.
          </p>
        </div>

        {/* Quick Search */}
        <div className="w-full md:w-80">
          <div className="relative">
            <Search className="w-4 h-4 text-purple-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ground, city, venue..."
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-purple-300/40 text-xs sm:text-sm text-white placeholder:text-purple-300/60 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* City Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-2 no-scrollbar">
          <button
            onClick={() => setCityFilter('All')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              cityFilter === 'All'
                ? 'bg-purple-900 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-purple-50 border border-purple-100'
            }`}
          >
            All Cities
          </button>
          {cities.slice(0, 8).map((c) => (
            <button
              key={c.id}
              onClick={() => setCityFilter(c.name)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                cityFilter === c.name
                  ? 'bg-purple-900 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-purple-50 border border-purple-100'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="text-slate-500">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 rounded-xl border border-purple-200 bg-white font-semibold text-slate-800"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 border border-purple-100 shadow-sm">
          <EmptyState
            type="events"
            title="No festival events matched your search."
            description="Try changing the city or search term to see more Navratri celebrations."
            actionText="Clear Filters"
            onActionClick={() => {
              setCityFilter('All');
              setCategoryFilter('All');
              setSearchQuery('');
            }}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};
