import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { PartnerCard } from '../../components/partner/PartnerCard';
import { EventCard } from '../../components/event/EventCard';
import { Sparkles, MapPin, Search, Calendar, Users, ShieldCheck, ArrowRight } from 'lucide-react';

export const SeoCityPage: React.FC = () => {
  const location = useLocation();
  const { events, users, cities } = useApp();

  const path = location.pathname.toLowerCase();

  let cityName = 'Ranchi';
  let title = 'Find Your Garba & Dandiya Partner';
  let subtitle = 'Connect with verified 18+ dancers attending top Navratri events near you.';

  if (path.includes('ranchi')) {
    cityName = 'Ranchi';
    title = 'Find a Garba Partner in Ranchi (Navratri 2026)';
    subtitle = 'Discover dancers going to Morabadi Ground, Khelgaon Stadium, and Hotel Chanakya Rooftop.';
  } else if (path.includes('ahmedabad')) {
    cityName = 'Ahmedabad';
    title = 'Find a Garba Partner in Ahmedabad';
    subtitle = 'Match with dancers heading to GMDC, United Way, and Sindhu Bhavan venues.';
  } else if (path.includes('mumbai')) {
    cityName = 'Mumbai';
    title = 'Find a Dandiya Partner in Mumbai';
    subtitle = 'Discover verified partners for Borivali, Goregaon, and Dome mega Dandiya celebrations.';
  } else if (path.includes('dandiya')) {
    title = 'Find a Dandiya Raas Partner Near You';
    subtitle = 'Sync your spins and pair up for top stadium Dandiya events across Indian cities.';
  } else if (path.includes('events')) {
    title = 'Top Garba & Dandiya Events 2026';
    subtitle = 'Explore all upcoming open-air grounds and indoor festival arenas.';
  }

  const cityPartners = users.filter((u) => u.city.toLowerCase() === cityName.toLowerCase());
  const displayPartners = cityPartners.length > 0 ? cityPartners : users.slice(0, 3);

  const cityEvents = events.filter((e) => e.city.toLowerCase() === cityName.toLowerCase());
  const displayEvents = cityEvents.length > 0 ? cityEvents : events.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* SEO Hero Header */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-900 via-pink-900 to-purple-950 text-white shadow-xl space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider border border-pink-500/40">
          <Sparkles className="w-3.5 h-3.5" />
          Verified Partner Platform
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-heading leading-tight">
          {title}
        </h1>
        <p className="text-sm sm:text-base text-purple-200/90 max-w-2xl leading-relaxed">
          {subtitle}
        </p>

        <div className="pt-2 flex flex-wrap gap-4">
          <Link
            to={`/find-partner?city=${encodeURIComponent(cityName)}`}
            className="py-3 px-8 rounded-full font-bold text-xs sm:text-sm text-purple-950 bg-white hover:bg-purple-50 shadow-md flex items-center gap-2"
          >
            <Search className="w-4 h-4 text-pink-600" />
            Find {cityName} Partners Now
          </Link>
          <Link
            to="/events"
            className="py-3 px-6 rounded-full font-bold text-xs sm:text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20"
          >
            View {cityName} Schedule
          </Link>
        </div>
      </div>

      {/* Recommended Partners Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-purple-950 font-heading">
              Available Partners in {cityName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Verified 18+ profiles ready to attend registered public festival grounds.
            </p>
          </div>
          <Link
            to={`/find-partner?city=${encodeURIComponent(cityName)}`}
            className="text-xs sm:text-sm font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1"
          >
            View All ({cityPartners.length || 128}+) →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPartners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      </div>

      {/* Featured Events in this hub */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-purple-950 font-heading">
              Upcoming Events in {cityName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Join events to unlock fellow dancers looking for partners at the same ground.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayEvents.map((ev) => (
            <EventCard key={ev.id} event={ev} />
          ))}
        </div>
      </div>
    </div>
  );
};
