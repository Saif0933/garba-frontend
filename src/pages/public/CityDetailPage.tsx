import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { EventCard } from '../../components/event/EventCard';
import { PartnerCard } from '../../components/partner/PartnerCard';
import {
  MapPin,
  Users,
  Calendar,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export const CityDetailPage: React.FC = () => {
  const { city: cityParam } = useParams<{ city: string }>();
  const { cities, events, users, setSelectedCity, setSearchFilters } = useApp();
  const navigate = useNavigate();

  // Find matching city
  const city =
    cities.find(
      (c) => c.slug.toLowerCase() === (cityParam || '').toLowerCase() || c.name.toLowerCase() === (cityParam || '').toLowerCase()
    ) || cities[0];

  const cityEvents = events.filter((e) => e.city.toLowerCase() === city.name.toLowerCase());
  const cityPartners = users.filter((u) => u.city.toLowerCase() === city.name.toLowerCase());

  const handleFindPartners = () => {
    setSelectedCity(city.name);
    setSearchFilters((prev) => ({
      ...prev,
      city: city.name,
      eventId: cityEvents.length > 0 ? cityEvents[0].id : prev.eventId
    }));
    navigate(`/find-partner?city=${encodeURIComponent(city.name)}`);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* 1. CITY HERO */}
      <div className="relative min-h-[45vh] bg-purple-950 flex items-end">
        <img
          src={city.image}
          alt={city.name}
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950 via-purple-950/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full text-white space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/40 text-pink-200 text-xs font-bold uppercase tracking-wider border border-pink-400/40">
            <MapPin className="w-3.5 h-3.5" />
            {city.state} Festival Hub
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight">
            Find Your Garba Partner in {city.name}
          </h1>

          <p className="text-sm sm:text-base text-purple-200 font-medium max-w-2xl">
            {city.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-purple-100 font-bold">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-pink-400" />
              <span>{city.partnerCount}+ Verified Partners in {city.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>{cityEvents.length || city.eventCount} Festival Events Scheduled</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. POPULAR LOCAL AREAS BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-3xl bg-white shadow-xl border border-purple-100 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span>Popular Garba & Dandiya Grounds in {city.name}</span>
            </h3>
            <button
              onClick={handleFindPartners}
              className="py-2 px-4 rounded-full font-bold text-xs text-white festive-gradient shadow-md"
            >
              Match in {city.name} →
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {city.popularAreas.map((area, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-950 text-xs font-bold border border-purple-100"
              >
                📍 {area}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. UPCOMING EVENTS IN THIS CITY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-purple-950 font-heading">
              Upcoming Events in {city.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Select an event to view dancers and form your festival dance pairing.
            </p>
          </div>
          <Link to="/events" className="text-xs sm:text-sm font-bold text-pink-600 hover:text-pink-700">
            View All Cities →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(cityEvents.length > 0 ? cityEvents : events.slice(0, 3)).map((ev) => (
            <EventCard key={ev.id} event={ev} />
          ))}
        </div>
      </div>

      {/* 4. RECOMMENDED PARTNERS IN THIS CITY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-purple-950 font-heading">
              Recommended Dancers in {city.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Verified 18+ profiles ready for Navratri 2026.
            </p>
          </div>
          <button
            onClick={handleFindPartners}
            className="text-xs sm:text-sm font-bold text-pink-600 hover:text-pink-700"
          >
            Filter All →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(cityPartners.length > 0 ? cityPartners : users.slice(0, 3)).map((p) => (
            <PartnerCard key={p.id} partner={p} />
          ))}
        </div>
      </div>

      {/* 5. LOCAL SAFETY & COMMUNITY INFORMATION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-purple-900 text-white shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-pink-300 text-xs font-bold uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>Festival Safety in {city.name}</span>
          </div>
          <h3 className="text-xl font-bold font-heading">
            Safe Celebrations in {city.name}
          </h3>
          <p className="text-xs sm:text-sm text-purple-200 leading-relaxed max-w-3xl">
            When attending festival grounds in {city.name}, always ensure you meet inside the registered ticketed boundary. GarbaMitra coordinates directly with venue organizers and emergency desks to ensure a safe, welcoming, and high-spirited festival atmosphere.
          </p>
        </div>
      </div>
    </div>
  );
};
