import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FestivalEvent } from '../../types';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, MapPin, Users, Sparkles, Check, ArrowRight } from 'lucide-react';

interface EventCardProps {
  event: FestivalEvent;
  isCompact?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ event, isCompact = false }) => {
  const { joinEvent, leaveEvent, isEventJoined, setSearchFilters } = useApp();
  const navigate = useNavigate();
  const joined = isEventJoined(event.id);

  const handleJoinToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (joined) {
      leaveEvent(event.id);
    } else {
      joinEvent(event.id);
    }
  };

  const handleFindPartners = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSearchFilters((prev) => ({
      ...prev,
      city: event.city,
      eventId: event.id,
      date: event.date
    }));
    navigate(`/find-partner?city=${encodeURIComponent(event.city)}&event=${encodeURIComponent(event.id)}&date=${encodeURIComponent(event.date)}`);
  };

  return (
    <div className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-purple-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between w-full max-w-full">
      {/* Event Banner */}
      <Link to={`/events/${event.id}`} className="block relative aspect-[16/10] w-full overflow-hidden bg-purple-950">
        <img
          src={event.bannerImage}
          alt={event.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/90 via-purple-950/30 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 sm:top-3 sm:left-3 sm:right-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
            {event.isFeatured && (
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                Featured
              </span>
            )}
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white/90 backdrop-blur-md text-purple-900 text-[9px] sm:text-[10px] font-bold">
              {event.category}
            </span>
          </div>

          <div className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-purple-950/80 backdrop-blur-md border border-purple-400/40 text-amber-300 font-extrabold text-[11px] sm:text-xs">
            ₹{event.price}
          </div>
        </div>

        {/* Title on banner */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 text-white">
          <h3 className="text-base sm:text-lg lg:text-xl font-bold font-heading tracking-tight drop-shadow leading-tight line-clamp-1">
            {event.title}
          </h3>
          <p className="text-[11px] sm:text-xs text-purple-200/90 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" />
            <span className="truncate">{event.venue}</span>
          </p>
        </div>
      </Link>

      {/* Card Body */}
      <div className="p-3.5 sm:p-5 space-y-2.5 sm:space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2 text-xs text-slate-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-semibold text-slate-900 truncate">
              <Calendar className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
              <span className="truncate">{event.displayDate}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-500 flex-shrink-0">
              <Clock className="w-3.5 h-3.5 text-pink-500" />
              <span>{event.startTime}</span>
            </div>
          </div>

          {/* Dancers looking for partner stat */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-purple-50/80 border border-purple-100 text-purple-950 text-xs font-semibold gap-1">
            <div className="flex items-center gap-1.5 truncate">
              <Users className="w-3.5 h-3.5 text-pink-600 flex-shrink-0" />
              <span className="truncate">{event.registeredCount} Dancers</span>
            </div>
            <div className="text-[10px] sm:text-[11px] font-bold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full flex-shrink-0">
              {event.lookingForPartnerCount} need partner
            </div>
          </div>
        </div>

        {/* Actions (2-column responsive grid) */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          {/* Join Event Button */}
          <button
            onClick={handleJoinToggle}
            className={`py-2 px-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1 truncate ${
              joined
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-purple-100 hover:bg-purple-200/80 text-purple-900 border border-purple-200'
            }`}
          >
            {joined ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span className="truncate">Joined ✓</span>
              </>
            ) : (
              <span className="truncate">Join Event</span>
            )}
          </button>

          {/* Find Partners Going Button */}
          <button
            onClick={handleFindPartners}
            className="py-2 px-2.5 rounded-2xl font-bold text-xs text-white festive-gradient hover:opacity-95 shadow-md shadow-pink-500/20 flex items-center justify-center gap-1 transition-transform active:scale-95 truncate"
          >
            <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">Find Partner</span>
          </button>
        </div>
      </div>
    </div>
  );
};
