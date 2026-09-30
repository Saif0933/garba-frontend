import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { PartnerCard } from '../../components/partner/PartnerCard';
import { EmptyState } from '../../components/common/EmptyState';
import { calculateMatchScore } from '../../utils/matching';
import {
  MapPin,
  Calendar,
  Sparkles,
  Music,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check
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
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isEventOpen, setIsEventOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);

  const cityRef = useRef<HTMLDivElement>(null);
  const eventRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  // Calendar View State (Default October 2026 for Navratri)
  const [calendarMonth, setCalendarMonth] = useState(9); // 0-indexed: 9 = October
  const [calendarYear, setCalendarYear] = useState(2026);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(event.target as Node)) {
        setIsCityOpen(false);
      }
      if (eventRef.current && !eventRef.current.contains(event.target as Node)) {
        setIsEventOpen(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setIsDateOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format date display for input button
  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return 'Select Date';
    try {
      const [year, month, day] = dateStr.split('-').map(Number);
      if (!year || !month || !day) return dateStr;
      const dateObj = new Date(year, month - 1, day);
      return dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  // Helper to get calendar days for the active month
  const getCalendarDays = () => {
    const firstDayIndex = new Date(calendarYear, calendarMonth, 1).getDay();
    const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear((prev) => prev - 1);
    } else {
      setCalendarMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear((prev) => prev + 1);
    } else {
      setCalendarMonth((prev) => prev + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const formattedMonth = String(calendarMonth + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const newDate = `${calendarYear}-${formattedMonth}-${formattedDay}`;
    setSearchFilters((prev) => ({ ...prev, date: newDate }));
    setIsDateOpen(false);
  };

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
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-5 sm:space-y-6">
      {/* 1. TOP HEADER & SEARCH BAR */}
      <div className="w-full max-w-full relative z-20 p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#280c44] via-[#3b1260] to-[#1d0733] text-white shadow-xl space-y-4 sm:space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2 border border-pink-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Event-Based Partner Discovery
            </div>
            <h1 className="text-xl sm:text-2xl md:text-4xl font-black font-heading tracking-tight leading-tight">
              Find Your Garba &amp; Dandiya Partner
            </h1>
            <p className="text-xs sm:text-sm text-purple-200/80 mt-1 leading-relaxed">
              Showing verified dancers attending <strong className="text-amber-300">{activeEvent?.title}</strong> in {searchFilters.city}.
            </p>
          </div>

          <div className="flex items-center self-start md:self-auto flex-shrink-0">
            <div className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-purple-300/30 text-xs font-bold text-pink-200">
              <span className="text-white text-sm sm:text-base font-black mr-1">{activeEvent?.registeredCount || 128}</span>
              Dancers registered
            </div>
          </div>
        </div>

        {/* Top Search Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 pt-1">
          {/* City Custom Dropdown */}
          <div ref={cityRef} className={`relative p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 ${isCityOpen ? 'z-50' : 'z-30'}`}>
            <label className="block text-[10px] font-bold text-purple-200 uppercase mb-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-pink-400" />
              City
            </label>
            <button
              type="button"
              onClick={() => {
                setIsCityOpen((prev) => !prev);
                setIsEventOpen(false);
              }}
              className="w-full flex items-center justify-between text-left font-bold text-xs sm:text-sm text-white focus:outline-none"
            >
              <span className="truncate">{searchFilters.city || selectedCity || 'Select City'}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-purple-300 transition-transform ${isCityOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* City Dropdown Menu */}
            {isCityOpen && (
              <div className="absolute left-0 top-full mt-2 w-full min-w-[200px] max-w-[calc(100vw-32px)] bg-[#1e0a35] border border-pink-500/40 rounded-2xl shadow-2xl z-50 overflow-hidden py-1.5 animate-in fade-in zoom-in-95 duration-150">
                <div className="max-h-56 overflow-y-auto no-scrollbar divide-y divide-purple-900/40">
                  {cities.map((c) => {
                    const isSelected = c.name.toLowerCase() === searchFilters.city.toLowerCase();
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          setSelectedCity(c.name);
                          const firstEvent = events.find((ev) => ev.city.toLowerCase() === c.name.toLowerCase());
                          setSearchFilters((prev) => ({
                            ...prev,
                            city: c.name,
                            eventId: firstEvent ? firstEvent.id : prev.eventId
                          }));
                          setIsCityOpen(false);
                        }}
                        className={`w-full px-3.5 py-2.5 text-left text-xs sm:text-sm flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-pink-600/40 text-pink-300 font-bold'
                            : 'text-slate-200 hover:bg-white/10 font-medium'
                        }`}
                      >
                        <span>{c.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-pink-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Event Custom Dropdown */}
          <div ref={eventRef} className={`relative p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 sm:col-span-2 lg:col-span-2 ${isEventOpen ? 'z-50' : 'z-20'}`}>
            <label className="block text-[10px] font-bold text-purple-200 uppercase mb-0.5 flex items-center gap-1">
              <Music className="w-3 h-3 text-purple-300" />
              Event
            </label>
            <button
              type="button"
              onClick={() => {
                setIsEventOpen((prev) => !prev);
                setIsCityOpen(false);
              }}
              className="w-full flex items-center justify-between text-left font-bold text-xs sm:text-sm text-white focus:outline-none"
            >
              <span className="truncate">
                {activeEvent ? `${activeEvent.title} (${activeEvent.displayDate})` : 'Select Event'}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-purple-300 transition-transform ${isEventOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Event Dropdown Menu */}
            {isEventOpen && (
              <div className="absolute left-0 top-full mt-2 w-full min-w-[260px] max-w-[calc(100vw-32px)] bg-[#1e0a35] border border-pink-500/40 rounded-2xl shadow-2xl z-50 overflow-hidden py-1.5 animate-in fade-in zoom-in-95 duration-150">
                <div className="max-h-56 overflow-y-auto no-scrollbar divide-y divide-purple-900/40">
                  {(availableEventsInCity.length > 0 ? availableEventsInCity : events).map((ev) => {
                    const isSelected = ev.id === searchFilters.eventId;
                    return (
                      <button
                        key={ev.id}
                        type="button"
                        onClick={() => {
                          setSearchFilters((prev) => ({ ...prev, eventId: ev.id }));
                          setIsEventOpen(false);
                        }}
                        className={`w-full px-3.5 py-2.5 text-left text-xs sm:text-sm flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-pink-600/40 text-pink-300 font-bold'
                            : 'text-slate-200 hover:bg-white/10 font-medium'
                        }`}
                      >
                        <div className="truncate mr-2">
                          <div className="font-semibold text-white truncate">{ev.title}</div>
                          <div className="text-[11px] text-purple-300/80 truncate">{ev.venue} • {ev.displayDate}</div>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Date Custom Dropdown */}
          <div ref={dateRef} className={`relative p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 ${isDateOpen ? 'z-50' : 'z-20'}`}>
            <label className="block text-[10px] font-bold text-purple-200 uppercase mb-0.5 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-amber-400" />
              Date
            </label>
            <button
              type="button"
              onClick={() => {
                setIsDateOpen((prev) => !prev);
                setIsCityOpen(false);
                setIsEventOpen(false);
              }}
              className="w-full flex items-center justify-between text-left font-bold text-xs sm:text-sm text-white focus:outline-none"
            >
              <span className="truncate">{formatDisplayDate(searchFilters.date)}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-purple-300 transition-transform ${isDateOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Date Custom Popover Calendar */}
            {isDateOpen && (
              <div className="absolute right-0 sm:left-auto top-full mt-2 w-full min-w-[280px] max-w-[calc(100vw-32px)] bg-[#1e0a35] border border-pink-500/40 rounded-2xl shadow-2xl z-50 p-3.5 animate-in fade-in zoom-in-95 duration-150">
                {/* Month & Year Navigation Header */}
                <div className="flex items-center justify-between pb-2 border-b border-purple-900/50 mb-2">
                  <div className="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-pink-400" />
                    <span>{monthNames[calendarMonth]} {calendarYear}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handlePrevMonth}
                      className="p-1 rounded-lg hover:bg-white/10 text-purple-200 transition-colors"
                      aria-label="Previous Month"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="p-1 rounded-lg hover:bg-white/10 text-purple-200 transition-colors"
                      aria-label="Next Month"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Weekday Headers */}
                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-purple-300 mb-1">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                    <div key={d} className="py-0.5">{d}</div>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1 text-center">
                  {getCalendarDays().map((day, idx) => {
                    if (day === null) {
                      return <div key={`empty-${idx}`} className="h-7 w-7 sm:h-8 sm:w-8" />;
                    }
                    const formattedMonth = String(calendarMonth + 1).padStart(2, '0');
                    const formattedDay = String(day).padStart(2, '0');
                    const dateVal = `${calendarYear}-${formattedMonth}-${formattedDay}`;
                    const isSelected = searchFilters.date === dateVal;
                    const isNavratriSpecial = calendarMonth === 9 && calendarYear === 2026 && day >= 15 && day <= 24;

                    return (
                      <button
                        key={`day-${day}`}
                        type="button"
                        onClick={() => handleSelectDay(day)}
                        className={`h-7 w-7 sm:h-8 sm:w-8 mx-auto rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center relative ${
                          isSelected
                            ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-md shadow-pink-500/30 font-extrabold scale-105'
                            : isNavratriSpecial
                            ? 'bg-purple-900/50 hover:bg-pink-500/20 text-pink-200 border border-pink-500/30'
                            : 'text-slate-200 hover:bg-white/10'
                        }`}
                      >
                        <span>{day}</span>
                        {isNavratriSpecial && !isSelected && (
                          <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-amber-400" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Quick Shortcuts: Navratri Mega Night (18 Oct) & Clear */}
                <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-purple-900/50 text-[11px]">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchFilters((prev) => ({ ...prev, date: '2026-10-18' }));
                      setCalendarMonth(9);
                      setCalendarYear(2026);
                      setIsDateOpen(false);
                    }}
                    className="text-amber-300 hover:underline font-bold flex items-center gap-1"
                  >
                    ✨ 18 Oct Mega Night
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchFilters((prev) => ({ ...prev, date: '' }));
                      setIsDateOpen(false);
                    }}
                    className="text-purple-300 hover:text-white font-semibold"
                  >
                    All Dates
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 2. TABS (All, Need Partner, Groups, New Friends) */}
        <div className="w-full pt-2 border-t border-purple-800/60 overflow-x-auto no-scrollbar">
          <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1 rounded-2xl bg-purple-950/60 border border-purple-800/60 min-w-max">
            {[
              { key: 'all', label: 'All Dancers' },
              { key: 'need_partner', label: 'Looking for Partner' },
              { key: 'groups', label: 'Squad Groups' },
              { key: 'new_friends', label: 'New Friends' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSearchFilters((prev) => ({ ...prev, tab: tab.key as any }))}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
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
      <main className="w-full space-y-4 sm:space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
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
