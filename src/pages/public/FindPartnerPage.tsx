import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { PartnerCard } from '../../components/partner/PartnerCard';
import { EmptyState } from '../../components/common/EmptyState';
import { calculateMatchScore } from '../../utils/matching';
import {
  MapPin,
  Calendar,
  Sparkles,
  Music
} from 'lucide-react';
import { LookingFor } from '../../types';

export const FindPartnerPage: React.FC = () => {
  const {
    users,
    events,
    cities,
    selectedCity,
    setSelectedCity,
    currentUser,
    searchFilters,
    setSearchFilters,
    resetFilters
  } = useApp();

  const [searchParams] = useSearchParams();

  // Sync URL search params with state
  useEffect(() => {
    const cityParam = searchParams.get('city');
    const eventParam = searchParams.get('event');
    const dateParam = searchParams.get('date');

    if (cityParam) {
      setSelectedCity(cityParam);
      setSearchFilters((prev) => ({ ...prev, city: cityParam }));
    }
    if (eventParam) {
      setSearchFilters((prev) => ({ ...prev, eventId: eventParam }));
    }
    if (dateParam) {
      setSearchFilters((prev) => ({ ...prev, date: dateParam }));
    }
  }, [searchParams]);

  // Active event object
  const activeEvent =
    events.find((e) => e.id === searchFilters.eventId) ||
    events.find((e) => e.city.toLowerCase() === searchFilters.city.toLowerCase()) ||
    events[0];

  // Filter & Search computation
  const filteredPartners = users.filter((u) => {
    // Exclude current logged in user
    if (currentUser && u.id === currentUser.id) return false;

    // Filter by tab
    if (searchFilters.tab === 'need_partner' && !u.lookingFor.includes('Partner')) return false;
    if (searchFilters.tab === 'groups' && !u.lookingFor.includes('Group')) return false;
    if (searchFilters.tab === 'new_friends' && !u.lookingFor.includes('New Friends')) return false;

    // Filter by gender preference
    if (searchFilters.genderPreference !== 'Any' && u.gender !== searchFilters.genderPreference) {
      return false;
    }

    // Filter by age range
    if (u.age < searchFilters.ageRange[0] || u.age > searchFilters.ageRange[1]) {
      return false;
    }

    // Filter by dance level
    if (searchFilters.danceLevel !== 'All' && u.garbaLevel !== searchFilters.danceLevel) {
      return false;
    }

    // Filter by looking for
    if (searchFilters.lookingFor !== 'All' && !u.lookingFor.includes(searchFilters.lookingFor as LookingFor)) {
      return false;
    }

    // Filter by style
    if (searchFilters.style !== 'All' && u.danceStyle !== searchFilters.style && u.danceStyle !== 'All Styles') {
      return false;
    }

    // Filter only verified
    if (searchFilters.onlyVerified && !u.isVerified.photo) {
      return false;
    }

    return true;
  });

  // Sort candidates by match score
  const sortedPartners = [...filteredPartners].sort((a, b) => {
    const scoreA = calculateMatchScore(currentUser, a, activeEvent).score;
    const scoreB = calculateMatchScore(currentUser, b, activeEvent).score;
    if (searchFilters.sortBy === 'match') {
      return scoreB - scoreA;
    }
    return 0;
  });

  const availableEventsInCity = events.filter(
    (e) => e.city.toLowerCase() === searchFilters.city.toLowerCase()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* 1. TOP HEADER & SEARCH BAR */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#280c44] via-[#3b1260] to-[#1d0733] text-white shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold uppercase tracking-wider mb-2 border border-pink-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Event-Based Partner Discovery
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading">
              Find Your Garba & Dandiya Partner
            </h1>
            <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
              Showing verified dancers attending <strong className="text-amber-300">{activeEvent?.title}</strong> in {searchFilters.city}.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-purple-300/30 text-xs font-bold text-pink-200">
              <span className="text-white text-base font-black mr-1">{activeEvent?.registeredCount || 128}</span>
              Dancers registered for this event
            </div>
          </div>
        </div>

        {/* Top Search Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
          {/* City */}
          <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <label className="block text-[10px] font-bold text-purple-200 uppercase mb-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-pink-400" />
              City
            </label>
            <select
              value={searchFilters.city}
              onChange={(e) => {
                const newCity = e.target.value;
                setSelectedCity(newCity);
                const firstEvent = events.find((ev) => ev.city.toLowerCase() === newCity.toLowerCase());
                setSearchFilters((prev) => ({
                  ...prev,
                  city: newCity,
                  eventId: firstEvent ? firstEvent.id : prev.eventId
                }));
              }}
              className="w-full bg-transparent font-bold text-xs sm:text-sm text-white focus:outline-none cursor-pointer"
            >
              {cities.map((c) => (
                <option key={c.id} value={c.name} className="text-slate-900">
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Event */}
          <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 sm:col-span-2 lg:col-span-2">
            <label className="block text-[10px] font-bold text-purple-200 uppercase mb-0.5 flex items-center gap-1">
              <Music className="w-3 h-3 text-purple-300" />
              Event
            </label>
            <select
              value={searchFilters.eventId}
              onChange={(e) => setSearchFilters((prev) => ({ ...prev, eventId: e.target.value }))}
              className="w-full bg-transparent font-bold text-xs sm:text-sm text-white focus:outline-none cursor-pointer truncate"
            >
              {availableEventsInCity.length > 0 ? (
                availableEventsInCity.map((ev) => (
                  <option key={ev.id} value={ev.id} className="text-slate-900">
                    {ev.title} ({ev.displayDate})
                  </option>
                ))
              ) : (
                events.map((ev) => (
                  <option key={ev.id} value={ev.id} className="text-slate-900">
                    {ev.title} ({ev.city})
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Date */}
          <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <label className="block text-[10px] font-bold text-purple-200 uppercase mb-0.5 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-amber-400" />
              Date
            </label>
            <input
              type="date"
              value={searchFilters.date}
              onChange={(e) => setSearchFilters((prev) => ({ ...prev, date: e.target.value }))}
              className="w-full bg-transparent font-bold text-xs sm:text-sm text-white focus:outline-none cursor-pointer"
            />
          </div>
        </div>

        {/* 2. TABS (All, Need Partner, Groups, New Friends) */}
        <div className="flex items-center justify-between pt-2 border-t border-purple-800/60 flex-wrap gap-3">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-purple-950/60 border border-purple-800/60 overflow-x-auto">
            {[
              { key: 'all', label: 'All Dancers' },
              { key: 'need_partner', label: 'Looking for Partner' },
              { key: 'groups', label: 'Squad Groups' },
              { key: 'new_friends', label: 'New Friends' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSearchFilters((prev) => ({ ...prev, tab: tab.key as any }))}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  searchFilters.tab === tab.key
                    ? 'bg-pink-600 text-white shadow-md'
                    : 'text-purple-200/80 hover:text-white hover:bg-purple-900/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. PARTNER CARDS RESULTS GRID */}
      <main className="w-full space-y-6">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-semibold text-slate-700">
            Found <strong className="text-purple-950">{sortedPartners.length}</strong> compatible partners
          </span>
          <span className="text-[11px] text-pink-600 font-bold bg-pink-50 px-2.5 py-1 rounded-full">
            ✨ 9-factor Mutual Scoring Active
          </span>
        </div>

        {sortedPartners.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 border border-purple-100 shadow-sm">
            <EmptyState
              type="partners"
              title="No partners found matching your search."
              description="Try switching tabs or selecting another event or date to see more dancers."
              actionText="Reset Filters"
              onActionClick={resetFilters}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedPartners.map((candidate) => (
              <PartnerCard
                key={candidate.id}
                partner={candidate}
                currentEvent={activeEvent}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
