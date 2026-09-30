import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  Heart,
  MessageSquare,
  MessageCircle,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Sparkles,
  Zap,
  Crown,
  Send,
  Camera,
  Check,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RequestPartnerModal } from '../../components/modals/RequestPartnerModal';
import { User } from '../../types';

export const DashboardPage: React.FC = () => {
  const {
    currentUser,
    events,
    users,
    matches,
    partnerRequests,
    userEvents,
    conversations,
    favorites,
    toggleFavorite,
    hasRequestedPartner
  } = useApp();

  const navigate = useNavigate();

  // Selected candidate for request modal
  const [selectedPartner, setSelectedPartner] = useState<User | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  // KPI Counts matching reference UI
  const pendingRequestsCount = 12;
  const matchesCount = 4;
  const messagesCount = 8;
  const upcomingEventsCount = 2;

  // 4 Curated Recommended Partners matching screenshot 100%
  const recommendedList = [
    {
      id: 'user-riya',
      name: 'Riya',
      age: 22,
      city: 'Ranchi',
      garbaLevel: 'Intermediate',
      dandiyaLevel: 'Beginner',
      date: '18 Oct • 7 PM',
      matchScore: '92% Match',
      matchColor: 'bg-[#0D9488]', // teal/emerald
      tag: { label: 'Partner', color: 'bg-pink-50 text-[#FF1E6A]', hasStar: true },
      online: true,
      photosCount: '5+ Photos',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      originalUser: users.find((u) => u.name.toLowerCase().includes('riya')) || users[0]
    },
    {
      id: 'user-rahul',
      name: 'Rahul',
      age: 24,
      city: 'Ranchi',
      garbaLevel: 'Beginner',
      dandiyaLevel: 'Intermediate',
      date: '18 Oct • 7 PM',
      matchScore: '87% Match',
      matchColor: 'bg-[#F59E0B]', // amber
      tag: { label: 'Group', color: 'bg-sky-50 text-[#0284C7]', hasStar: false },
      online: true,
      photosCount: '4+ Photos',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
      originalUser: users.find((u) => u.name.toLowerCase().includes('rahul')) || users[1] || users[0]
    },
    {
      id: 'user-neha',
      name: 'Neha',
      age: 23,
      city: 'Ranchi',
      garbaLevel: 'Intermediate',
      dandiyaLevel: 'Intermediate',
      date: '18 Oct • 7 PM',
      matchScore: '84% Match',
      matchColor: 'bg-[#6366F1]', // indigo/purple
      tag: { label: 'New Friends', color: 'bg-pink-50 text-[#FF1E6A]', hasStar: false },
      online: true,
      photosCount: '6+ Photos',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
      originalUser: users.find((u) => u.name.toLowerCase().includes('neha')) || users[2] || users[0]
    },
    {
      id: 'user-aditya',
      name: 'Aditya',
      age: 25,
      city: 'Ranchi',
      garbaLevel: 'Expert',
      dandiyaLevel: 'Beginner',
      date: '18 Oct • 7 PM',
      matchScore: '82% Match',
      matchColor: 'bg-[#10B981]', // green
      tag: { label: 'Group', color: 'bg-sky-50 text-[#0284C7]', hasStar: false },
      online: true,
      photosCount: '3+ Photos',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      originalUser: users.find((u) => u.name.toLowerCase().includes('aditya')) || users[3] || users[0]
    }
  ];

  const handleOpenRequest = (partnerItem: typeof recommendedList[0]) => {
    const userToRequest = partnerItem.originalUser || {
      id: partnerItem.id,
      name: `${partnerItem.name} Verma`,
      email: `${partnerItem.name.toLowerCase()}@example.com`,
      avatar: partnerItem.avatar,
      age: partnerItem.age,
      city: partnerItem.city,
      garbaLevel: partnerItem.garbaLevel,
      dandiyaLevel: partnerItem.dandiyaLevel,
      danceStyle: 'Traditional',
      lookingFor: ['Partner'],
      bio: `Attending Garba night in ${partnerItem.city}! Looking for enthusiastic dance partner.`,
      isVerified: { mobile: true, email: true, photo: true },
      role: 'user',
      isPremium: true,
      profileCompletion: 90,
      joinedAt: '2026-09-01',
      status: 'active'
    } as User;

    setSelectedPartner(userToRequest);
    setIsRequestModalOpen(true);
  };

  // Events list for horizontal auto-scrolling carousel
  const upcomingEventsList = events.slice(0, 5);
  const [currentEventSlide, setCurrentEventSlide] = useState(0);
  const [isEventAutoScrollPaused, setIsEventAutoScrollPaused] = useState(false);

  // Automatic horizontal scrolling timer (advances every 3.5 seconds)
  React.useEffect(() => {
    if (isEventAutoScrollPaused || upcomingEventsList.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentEventSlide((prev) => (prev + 1) % upcomingEventsList.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isEventAutoScrollPaused, upcomingEventsList.length]);

  const handlePrevEvent = () => {
    setCurrentEventSlide((prev) => (prev - 1 + upcomingEventsList.length) % upcomingEventsList.length);
  };

  const handleNextEvent = () => {
    setCurrentEventSlide((prev) => (prev + 1) % upcomingEventsList.length);
  };

  return (
    <div className="w-full max-w-[1550px] mx-auto px-3 sm:px-6 lg:px-8 py-5 space-y-7">
      {/* 1. HERO FESTIVE BANNER IMAGE */}
      <div className="w-full relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-pink-100 bg-slate-900">
        <img
          src="/dashboard-hero.png"
          alt="Navratri Garba Celebration"
          className="w-full h-auto min-h-[220px] max-h-[520px] object-cover object-center block transition-all"
        />
      </div>

      {/* 2. FOUR KPI STATS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Stat 1: Partner Requests */}
        <Link
          to="/requests"
          className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#FF1E6A] text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-pink-500/20">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 leading-none">
                {pendingRequestsCount}
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">
                Partner Requests
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#FF1E6A] group-hover:translate-x-0.5 transition-all" />
        </Link>

        {/* Stat 2: Matches */}
        <Link
          to="/matches"
          className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#7C3AED] text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-purple-500/20">
              <Heart className="w-6 h-6 fill-white" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 leading-none">
                {matchesCount}
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">
                Matches
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#7C3AED] group-hover:translate-x-0.5 transition-all" />
        </Link>

        {/* Stat 3: New Messages */}
        <Link
          to="/messages"
          className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#0284C7] text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-500/20">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 leading-none">
                {messagesCount}
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">
                New Messages
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#0284C7] group-hover:translate-x-0.5 transition-all" />
        </Link>

        {/* Stat 4: Upcoming Events */}
        <Link
          to="/events/my-events"
          className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#F59E0B] text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-amber-500/20">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 leading-none">
                {upcomingEventsCount}
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">
                Upcoming Events
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#F59E0B] group-hover:translate-x-0.5 transition-all" />
        </Link>
      </div>

      {/* 3. YOUR UPCOMING EVENT SECTION (HORIZONTAL AUTO-SCROLLING CAROUSEL) */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Your Upcoming Event
            </h2>
            {/* Slide counter pill badge */}
            <span className="px-2 py-0.5 rounded-full bg-pink-50 text-[#FF1E6A] text-[11px] font-bold">
              {currentEventSlide + 1} / {upcomingEventsList.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Manual Left/Right Controls */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={handlePrevEvent}
                className="p-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors shadow-sm"
                aria-label="Previous Event"
                title="Previous event"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
              <button
                onClick={handleNextEvent}
                className="p-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors shadow-sm"
                aria-label="Next Event"
                title="Next event"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <Link
              to="/events"
              className="text-xs font-semibold text-[#FF1E6A] hover:underline flex items-center gap-1"
            >
              <span>View All Events</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-sm"
          onMouseEnter={() => setIsEventAutoScrollPaused(true)}
          onMouseLeave={() => setIsEventAutoScrollPaused(false)}
          onTouchStart={() => setIsEventAutoScrollPaused(true)}
          onTouchEnd={() => setIsEventAutoScrollPaused(false)}
        >
          {/* Horizontal Sliding Track */}
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentEventSlide * 100}%)` }}
          >
            {upcomingEventsList.map((event) => {
              const isFav = favorites.includes(event.id);

              return (
                <div key={event.id} className="w-full flex-shrink-0">
                  <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-slate-100 flex flex-col md:flex-row items-center gap-5">
                    {/* Left Event Image with Badges */}
                    <div className="relative w-full md:w-80 h-44 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-900">
                      <img
                        src={event.bannerImage || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80'}
                        alt={event.title}
                        className="w-full h-full object-cover object-center"
                      />
                      {/* Top Left: Joined Badge */}
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#10B981] text-white text-xs font-bold flex items-center gap-1 shadow-sm">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Joined</span>
                      </div>

                      {/* Top Right: Favorite Heart Button */}
                      <button
                        onClick={() => toggleFavorite(event.id)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white text-[#FF1E6A] shadow-md flex items-center justify-center hover:scale-105 transition-transform"
                        title="Save Event"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-[#FF1E6A]' : ''}`} />
                      </button>
                    </div>

                    {/* Right Event Info */}
                    <div className="flex-1 w-full space-y-3">
                      {/* Title & Featured Badge */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                          {event.title}
                        </h3>
                        {event.isFeatured && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#FF1E6A] text-white text-[11px] font-semibold flex items-center gap-1 shadow-sm">
                            <Sparkles className="w-3 h-3" />
                            Featured
                          </span>
                        )}
                      </div>

                      {/* Date & Time */}
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-[#FF1E6A]" />
                        <span>{event.displayDate}</span>
                        <span>•</span>
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{event.startTime} - {event.endTime}</span>
                      </div>

                      {/* Venue Location */}
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-[#FF1E6A]" />
                        <span>{event.venue}</span>
                      </div>

                      {/* Attendees Stack & Looking for Partner Badge */}
                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2 overflow-hidden">
                            <img
                              className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                              alt="Attendee"
                            />
                            <img
                              className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80"
                              alt="Attendee"
                            />
                            <img
                              className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                              alt="Attendee"
                            />
                          </div>
                          <span className="text-xs font-semibold text-slate-600">
                            +{event.registeredCount || 128} people going
                          </span>
                        </div>

                        <span className="px-3 py-1 rounded-full bg-pink-50 text-[#FF1E6A] border border-pink-100 text-xs font-semibold">
                          {event.lookingForPartnerCount || 42} looking for partner
                        </span>
                      </div>

                      {/* Bottom Buttons */}
                      <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                        <Link
                          to={`/events/${event.id}`}
                          className="px-5 py-2 rounded-xl border border-pink-200 text-[#FF1E6A] hover:bg-pink-50 text-xs font-semibold transition-colors"
                        >
                          View Event Details
                        </Link>
                        <Link
                          to={`/find-partner?event=${event.id}`}
                          className="px-5 py-2.5 rounded-xl bg-[#FF1E6A] hover:bg-[#E1145A] text-white text-xs font-semibold shadow-md shadow-pink-500/20 flex items-center gap-1.5 transition-transform active:scale-95"
                        >
                          <span>Find Partners Going</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dot Pagination Indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-full pointer-events-auto">
            {upcomingEventsList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentEventSlide(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  currentEventSlide === idx ? 'w-5 bg-[#FF1E6A]' : 'w-1.5 bg-white/70 hover:bg-white'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 4. RECOMMENDED PARTNERS FOR YOU SECTION */}
      <div className="relative space-y-4 pt-2">
        {/* Section Header with 3D Heart, Center Festive crossed dandiya badge, and View All */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left Title & Heart Icon */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#FF1E6A] via-pink-500 to-rose-400 flex items-center justify-center text-white shadow-md shadow-pink-500/25 flex-shrink-0">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-white drop-shadow-sm" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-heading flex items-center gap-1.5">
                <span>Recommended</span>
                <span className="text-[#FF1E6A]">Partners</span>
                <span>for You</span>
                <span className="text-amber-400 text-lg">✨</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                People attending the same events and matching your preferences.
              </p>
            </div>
          </div>

          {/* Center Decorative Freestyle Crossed Dandiya + Attractive Calligraphy Script (No Card Box) */}
          <div className="hidden lg:flex items-center gap-3 select-none transform -rotate-1 hover:rotate-0 transition-transform duration-300">
            {/* Dandiya Sticks Graphic */}
            <div className="relative flex-shrink-0">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
                {/* Dandiya Stick 1 (Pink with Gold Accents) */}
                <line x1="8" y1="36" x2="36" y2="8" stroke="#FF1E6A" strokeWidth="4" strokeLinecap="round" />
                <line x1="29" y1="15" x2="36" y2="8" stroke="#FDE047" strokeWidth="4" strokeLinecap="round" />
                
                {/* Dandiya Stick 2 (Gold with Pink Accents) */}
                <line x1="10" y1="8" x2="36" y2="34" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
                <line x1="10" y1="8" x2="17" y2="15" stroke="#FF1E6A" strokeWidth="4" strokeLinecap="round" />
                
                {/* Center Jewel */}
                <circle cx="22" cy="21" r="3.5" fill="#E11D48" />
                <circle cx="22" cy="21" r="1.5" fill="#FFFBEB" />
              </svg>
            </div>

            {/* Stylish Handwritten Script */}
            <div className="font-script text-lg sm:text-xl text-slate-800 font-bold leading-tight">
              <span className="text-slate-700 block">Same Events</span>
              <span className="flex items-center gap-1.5">
                <span className="text-slate-800">Same Vibe</span>
                <span className="text-[#FF1E6A] font-extrabold flex items-center gap-0.5">
                  Better Matches! <span className="inline-block animate-pulse text-base">💖</span>
                </span>
              </span>
            </div>
          </div>

          {/* Right Action: View All */}
          <div className="flex items-center self-end md:self-center">
            <Link
              to="/find-partner"
              className="text-xs sm:text-sm font-bold text-[#FF1E6A] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 4 Partner Cards Grid with Left & Right Circular Nav Arrows */}
        <div className="relative">
          {/* Left Arrow Button */}
          <button
            onClick={() => {
              const el = document.getElementById('partners-grid-container');
              if (el) el.scrollBy({ left: -300, behavior: 'smooth' });
            }}
            className="hidden xl:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white hover:bg-pink-50 text-slate-500 hover:text-[#FF1E6A] border border-pink-200/80 shadow-md items-center justify-center transition-all hover:scale-105 active:scale-95"
            aria-label="Previous partners"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => {
              const el = document.getElementById('partners-grid-container');
              if (el) el.scrollBy({ left: 300, behavior: 'smooth' });
            }}
            className="hidden xl:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white hover:bg-pink-50 text-slate-500 hover:text-[#FF1E6A] border border-pink-200/80 shadow-md items-center justify-center transition-all hover:scale-105 active:scale-95"
            aria-label="Next partners"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* 4 Cards Grid */}
          <div
            id="partners-grid-container"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
          >
            {recommendedList.map((partner) => {
              const isFav = favorites.includes(partner.id);
              const isRequested = hasRequestedPartner(partner.id, 'event-ranchi-01');

              return (
                <div
                  key={partner.id}
                  className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  {/* Top Image Section */}
                  <div className="relative h-48 sm:h-44 w-full overflow-hidden bg-slate-900">
                    <img
                      src={partner.avatar}
                      alt={partner.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Gradient Shade on Image for Bottom Badges */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                    {/* Top Left: Match Percentage Badge */}
                    <div className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full ${partner.matchColor} text-white text-[11px] font-extrabold flex items-center gap-1 shadow-md`}>
                      <Zap className="w-3 h-3 fill-white" />
                      <span>{partner.matchScore}</span>
                    </div>

                    {/* Top Right: Favorite Heart Button */}
                    <button
                      onClick={() => toggleFavorite(partner.id)}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white text-[#FF1E6A] shadow-md flex items-center justify-center hover:scale-110 active:scale-90 transition-transform"
                      title="Favorite partner"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-[#FF1E6A]' : ''}`} />
                    </button>

                    {/* Bottom Left: Online Status */}
                    <div className="absolute bottom-2 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold flex items-center gap-1.5 border border-white/10">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Online</span>
                    </div>

                    {/* Bottom Right: Photos count */}
                    <div className="absolute bottom-2 right-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold flex items-center gap-1 border border-white/10">
                      <Camera className="w-3 h-3" />
                      <span>{partner.photosCount}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      {/* Name, Blue Verified Badge & Looking-For Tag */}
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                            {partner.name}, {partner.age}
                          </h4>
                          {/* Verified Blue Badge */}
                          <svg className="w-4 h-4 text-[#0284C7] fill-[#0284C7] flex-shrink-0" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                        </div>

                        {/* Tag (Partner / Group / New Friends) */}
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold flex-shrink-0 ${partner.tag.color}`}>
                          {partner.tag.hasStar ? '★ ' : ''}{partner.tag.label}
                        </span>
                      </div>

                      {/* Location Line */}
                      <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#FF1E6A]" />
                        <span>{partner.city}</span>
                      </div>

                      {/* Level & Schedule Row */}
                      <div className="grid grid-cols-3 gap-1 pt-1 text-[11px] text-slate-600 font-semibold border-t border-slate-50">
                        {/* Garba Level with Crown */}
                        <div className="flex items-center gap-1 truncate" title={`Garba: ${partner.garbaLevel}`}>
                          <Crown className="w-3.5 h-3.5 text-[#FF1E6A] flex-shrink-0" />
                          <span className="truncate">{partner.garbaLevel}</span>
                        </div>

                        {/* Dandiya Level with Crossed Sticks */}
                        <div className="flex items-center gap-1 truncate" title={`Dandiya: ${partner.dandiyaLevel}`}>
                          <svg className="w-3.5 h-3.5 text-[#FF1E6A] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <line x1="4" y1="20" x2="20" y2="4" />
                            <line x1="4" y1="4" x2="20" y2="20" />
                          </svg>
                          <span className="truncate">{partner.dandiyaLevel}</span>
                        </div>

                        {/* Event Date */}
                        <div className="flex items-center gap-1 truncate justify-end" title={partner.date}>
                          <Calendar className="w-3.5 h-3.5 text-[#FF1E6A] flex-shrink-0" />
                          <span className="truncate">{partner.date.split('•')[0]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Row: Request Partner + Chat Button */}
                    <div className="pt-2 flex items-center gap-2">
                      {isRequested ? (
                        <button
                          disabled
                          className="flex-1 py-2.5 px-3 rounded-xl bg-purple-100 text-purple-700 text-xs font-bold cursor-default flex items-center justify-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Requested</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleOpenRequest(partner)}
                          className="flex-1 py-2.5 px-3 rounded-xl bg-[#FF1E6A] hover:bg-[#E1145A] text-white text-xs font-bold shadow-md shadow-pink-500/20 flex items-center justify-center gap-1.5 transition-transform active:scale-95"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Request Partner</span>
                        </button>
                      )}

                      {/* Chat Message Bubble Button */}
                      <Link
                        to="/messages"
                        className="w-10 h-10 rounded-xl bg-white hover:bg-pink-50 text-[#FF1E6A] border border-pink-200 flex items-center justify-center shadow-sm transition-colors flex-shrink-0"
                        title="Send Message"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Request Partner Modal */}
      <RequestPartnerModal
        candidate={selectedPartner}
        event={events[0]}
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        matchScore={92}
      />
    </div>
  );
};
