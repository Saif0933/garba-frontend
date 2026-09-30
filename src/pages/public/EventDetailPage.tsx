import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  CheckCircle2,
  Check,
  Sparkles,
  ArrowRight,
  Ticket,
  Share2,
  Heart,
  Music,
  Camera,
  Gift,
  Utensils,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  FileText,
  Building2,
  ParkingCircle,
  UserCheck,
  Zap
} from 'lucide-react';

export const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { events, users, joinEvent, leaveEvent, isEventJoined, setSearchFilters, setSelectedCity, showToast, favorites, toggleFavorite } = useApp();
  const navigate = useNavigate();

  const event = events.find((e) => e.id === eventId || e.slug === eventId) || events[0];
  const joined = isEventJoined(event.id);
  const isFav = favorites.includes(event.id);

  // Active Tab State
  const [activeTab, setActiveTab] = useState<'about' | 'highlights' | 'schedule' | 'rules' | 'location' | 'organizer' | 'faqs'>('about');

  // Gallery Photos
  const galleryPhotos = [
    event.bannerImage || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'
  ];

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const handleJoin = () => {
    if (joined) {
      leaveEvent(event.id);
      showToast('Left Event', 'You have removed this event from your schedule.', 'info');
    } else {
      joinEvent(event.id);
      showToast('Joined Event! 🎉', 'You are now registered for this festival night.', 'success');
    }
  };

  const handleFindPartners = () => {
    setSelectedCity(event.city);
    setSearchFilters((prev) => ({
      ...prev,
      city: event.city,
      eventId: event.id,
      date: event.date
    }));
    navigate(`/find-partner?city=${encodeURIComponent(event.city)}&event=${encodeURIComponent(event.id)}&date=${encodeURIComponent(event.date)}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Join me at ${event.title} on GarbaMitra!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied!', 'Event link copied to clipboard.', 'info');
    }
  };

  const tabs = [
    { id: 'about', label: 'About Event' },
    { id: 'highlights', label: 'Highlights' },
    { id: 'schedule', label: 'Event Schedule' },
    { id: 'rules', label: 'Rules & Guidelines' },
    { id: 'location', label: 'Location' },
    { id: 'organizer', label: 'Organizer' },
    { id: 'faqs', label: 'FAQs' }
  ];

  return (
    <div className="w-full max-w-[1550px] mx-auto px-3 sm:px-6 lg:px-8 py-5 space-y-6">
      {/* 1. TOP BREADCRUMB & SAVE / SHARE BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-slate-500 font-medium">
          <Link to="/dashboard" className="hover:text-[#FF1E6A] transition-colors">Home</Link>
          <span>&gt;</span>
          <Link to="/events" className="hover:text-[#FF1E6A] transition-colors">Events</Link>
          <span>&gt;</span>
          <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-none">{event.title}</span>
        </div>

        {/* Right Actions: Save & Share */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => toggleFavorite(event.id)}
            className={`px-4 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm ${
              isFav
                ? 'bg-rose-50 border-rose-200 text-[#FF1E6A]'
                : 'bg-white border-pink-200 text-[#FF1E6A] hover:bg-pink-50'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-[#FF1E6A]' : ''}`} />
            <span>{isFav ? 'Saved' : 'Save Event'}</span>
          </button>

          <button
            onClick={handleShare}
            className="px-4 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN CONTENT GRID (LEFT GALLERY & CONTENT + RIGHT STICKY BOOKING PANEL) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* LEFT COLUMN (8 COLS) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Hero Gallery Showcase */}
          <div className="space-y-3">
            {/* Big Main Banner Image Container */}
            <div className="relative w-full h-[320px] sm:h-[400px] md:h-[440px] rounded-3xl overflow-hidden shadow-sm bg-slate-900 group">
              <img
                src={galleryPhotos[activePhotoIdx]}
                alt={event.title}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />

              {/* Gradient Shading */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* Top Left: Featured Event Badge */}
              <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-[#FF1E6A] text-white text-xs font-bold flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Event</span>
              </div>

              {/* Top Right: Calligraphy Overlay */}
              <div className="absolute top-4 right-5 text-right font-script text-white text-lg sm:text-xl font-bold drop-shadow-md select-none hidden sm:block leading-tight">
                <div>Garba</div>
                <div className="flex items-center justify-end gap-1">
                  <span>Dance</span>
                  <span className="text-amber-300">⚔️</span>
                </div>
                <div>Connect</div>
                <div className="flex items-center justify-end gap-1">
                  <span>Celebrate</span>
                  <span className="text-[#FF1E6A]">💖</span>
                </div>
              </div>

              {/* Bottom Left: Photo Counter Badge */}
              <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold border border-white/10">
                {activePhotoIdx + 1} / {galleryPhotos.length + 6}
              </div>

              {/* Left & Right Nav Buttons */}
              <button
                onClick={() => setActivePhotoIdx((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setActivePhotoIdx((prev) => (prev + 1) % galleryPhotos.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* 6 Thumbnails Row */}
            <div className="grid grid-cols-6 gap-2 sm:gap-3">
              {galleryPhotos.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden transition-all ${
                    activePhotoIdx === idx
                      ? 'ring-2 ring-[#FF1E6A] shadow-md scale-[1.02]'
                      : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  <img src={photo} alt="thumbnail" className="w-full h-full object-cover object-center" />
                  {idx === 5 && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] text-white flex flex-col items-center justify-center p-1 text-center">
                      <span className="text-[11px] sm:text-xs font-bold leading-tight">+8</span>
                      <span className="text-[9px] font-medium leading-none hidden sm:inline">More Photos</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Navigation Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#FF1E6A] text-white shadow-md shadow-pink-500/20'
                    : 'bg-white hover:bg-pink-50 text-slate-600 border border-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: About This Event */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              {/* Split Cards: About Description & Festive Art Card */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-stretch">
                
                {/* Left: About Text & Amenities (7 Cols) */}
                <div className="md:col-span-7 bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <h3 className="text-lg font-bold text-slate-900 font-heading">
                      About This Event
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {event.description ||
                        'Ranchi Garba Night 2026 is one of the biggest Navratri celebrations in the city. Enjoy a memorable evening of traditional Garba and Dandiya with energetic music, vibrant décor, delicious food stalls and a large festive crowd. Whether you’re coming with friends or looking for a Garba partner, this event is perfect to celebrate the spirit of Navratri.'}
                    </p>
                  </div>

                  {/* 5 Features / Amenities Icons Row */}
                  <div className="grid grid-cols-5 gap-2 pt-3 border-t border-slate-50 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-8 h-8 rounded-full bg-pink-50 text-[#FF1E6A] flex items-center justify-center">
                        <Music className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-700 leading-tight">Live DJ & Music</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <div className="w-8 h-8 rounded-full bg-pink-50 text-[#FF1E6A] flex items-center justify-center">
                        <span className="text-sm">💃</span>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-700 leading-tight">Traditional Garba</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <div className="w-8 h-8 rounded-full bg-pink-50 text-[#FF1E6A] flex items-center justify-center">
                        <Utensils className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-700 leading-tight">Food Stalls</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <div className="w-8 h-8 rounded-full bg-pink-50 text-[#FF1E6A] flex items-center justify-center">
                        <Camera className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-700 leading-tight">Photo Booth</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <div className="w-8 h-8 rounded-full bg-pink-50 text-[#FF1E6A] flex items-center justify-center">
                        <Gift className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-700 leading-tight">Giveaways</span>
                    </div>
                  </div>
                </div>

                {/* Right: Festive Art Card (5 Cols) */}
                <div className="md:col-span-5 rounded-3xl bg-gradient-to-br from-[#FFF0F5] via-[#FFE4EC] to-[#FFDDE8] border border-pink-100 p-5 sm:p-6 flex items-center justify-between relative overflow-hidden shadow-sm">
                  <div className="space-y-1 z-10">
                    <div className="font-script text-2xl sm:text-3xl text-slate-900 font-bold leading-tight">
                      Feel the<br />
                      <span className="text-[#FF1E6A]">Navratri</span><br />
                      Vibes! 💖
                    </div>
                    <p className="text-[11px] text-slate-600 font-semibold pt-1">
                      Dance Together<br />Celebrate Together
                    </p>
                  </div>

                  {/* Dancer graphic */}
                  <div className="w-28 sm:w-32 h-36 relative flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80"
                      alt="Dancers"
                      className="w-full h-full object-cover rounded-2xl mix-blend-multiply opacity-90 shadow"
                    />
                  </div>
                </div>
              </div>

              {/* Event Gallery Section */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                    Event Gallery
                  </h3>
                  <button
                    onClick={() => showToast('Gallery', 'Opening full photo gallery...', 'info')}
                    className="text-xs font-semibold text-[#FF1E6A] hover:underline flex items-center gap-1"
                  >
                    <span>View All Photos</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 5 Photo Tiles Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {galleryPhotos.slice(0, 5).map((photo, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActivePhotoIdx(idx)}
                      className="aspect-square rounded-2xl overflow-hidden shadow-sm cursor-pointer group relative bg-slate-900"
                    >
                      <img
                        src={photo}
                        alt="gallery"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Highlights */}
          {activeTab === 'highlights' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 font-heading">Event Highlights & What to Expect</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {event.whatToExpect?.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-pink-50/50 border border-pink-100 text-xs text-slate-700">
                    <Sparkles className="w-4 h-4 text-[#FF1E6A] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Event Schedule */}
          {activeTab === 'schedule' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 font-heading">Festival Night Schedule</h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <Clock className="w-4 h-4 text-[#FF1E6A] flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">7:00 PM - Gates Open & Aarti Ceremony</span>
                    <span className="text-slate-500">Traditional welcome, Aarti and devotional prayer songs.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <Clock className="w-4 h-4 text-[#FF1E6A] flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">7:45 PM - Traditional 2-Taali & 3-Taali Circle Rounds</span>
                    <span className="text-slate-500">Slow to medium rhythmic circular Garba for all participants.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <Clock className="w-4 h-4 text-[#FF1E6A] flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">9:00 PM - High Octane Dandiya Raas & DJ Beats</span>
                    <span className="text-slate-500">Fast tempo spins, partner rounds and squad competitions.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <Clock className="w-4 h-4 text-[#FF1E6A] flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">10:45 PM - Best Dressed Awards & Grand Sanedo Finale</span>
                    <span className="text-slate-500">Prizes for best dancer duo, authentic Chaniya Cholis and final celebrations.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Rules & Guidelines */}
          {activeTab === 'rules' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 font-heading">Rules & Ground Guidelines</h3>
              <ul className="space-y-2.5">
                {event.rules?.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#FF1E6A] flex-shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* TAB 5: Location */}
          {activeTab === 'location' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 font-heading">Venue & Location Details</h3>
              <div className="space-y-2 text-xs text-slate-700">
                <p><strong>Venue:</strong> {event.venue}</p>
                <p><strong>Address:</strong> {event.address || `${event.venue}, ${event.city}`}</p>
                <p><strong>City:</strong> {event.city}</p>
              </div>
            </div>
          )}

          {/* TAB 6: Organizer */}
          {activeTab === 'organizer' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 font-heading">Event Organizer</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF1E6A] to-amber-400 text-white flex items-center justify-center font-bold text-lg">
                  {event.organizer?.name?.charAt(0) || 'G'}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{event.organizer?.name || 'Festival Arts Committee'}</h4>
                  <span className="text-xs text-[#FF1E6A] font-semibold">Verified Festival Organizer ✓</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: FAQs */}
          {activeTab === 'faqs' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="font-bold text-slate-900">Are Dandiya sticks provided at the venue?</p>
                <p className="text-slate-600 mt-1">Yes! Complimentary wooden dandiya sticks are provided with each digital entry pass.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="font-bold text-slate-900">Can I find a partner at the venue if I come alone?</p>
                <p className="text-slate-600 mt-1">Absolutely! Use the GarbaMitra app to connect with solo dancers attending this exact event.</p>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: STICKY EVENT OVERVIEW & BOOKING PANEL (4 COLS) */}
        <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-20">
          
          {/* Main Booking Card */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-md space-y-4">
            {/* Top Badges: Navratri Special & Verified */}
            <div className="flex items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-[#FF1E6A] text-white text-[11px] font-bold shadow-sm">
                Navratri Special
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold flex items-center gap-1">
                <Check className="w-3 h-3 stroke-[3]" />
                Verified Event
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading leading-tight">
                {event.title}
              </h2>
              <p className="text-xs font-semibold text-slate-600">
                {event.tagline || 'Biggest Garba & Dandiya Celebration in Ranchi!'}
              </p>
            </div>

            {/* Description snippet */}
            <p className="text-xs text-slate-500 leading-relaxed">
              Join us for a vibrant night of music, dance and devotion. Experience the magic of Navratri with live DJ, traditional Garba, Dandiya sticks, food stalls and an amazing festive atmosphere.
            </p>

            {/* Schedule & Venue Box */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5 text-xs text-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#FF1E6A]" />
                  <span className="font-bold text-slate-900">{event.displayDate}</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">Saturday</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FF1E6A]" />
                  <span>{event.startTime} - {event.endTime}</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">(4 Hours)</span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                <div className="flex items-center gap-2 truncate max-w-[170px]">
                  <MapPin className="w-4 h-4 text-[#FF1E6A] flex-shrink-0" />
                  <span className="truncate">{event.venue}</span>
                </div>
                <button
                  onClick={() => setActiveTab('location')}
                  className="text-[11px] font-bold text-[#FF1E6A] hover:underline whitespace-nowrap"
                >
                  View on Map →
                </button>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="space-y-1 pt-1">
              <span className="text-[11px] text-slate-400 font-medium block">Starting from</span>
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl font-black text-slate-900 font-heading">₹{event.price || 499}</span>
                <span className="text-sm text-slate-400 line-through">₹{event.originalPrice || 699}</span>
                <span className="px-2 py-0.5 rounded-full bg-pink-50 text-[#FF1E6A] text-xs font-bold border border-pink-100">
                  28% OFF
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-1">
              {/* Join Event Button */}
              <button
                onClick={handleJoin}
                className={`w-full py-3 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                  joined
                    ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                    : 'bg-[#FF1E6A] hover:bg-[#E1145A] text-white shadow-pink-500/25 active:scale-[0.98]'
                }`}
              >
                <Ticket className="w-4 h-4" />
                <span>{joined ? 'Joined Event ✓' : 'Join Event'}</span>
              </button>

              {/* Find Partners Going */}
              <button
                onClick={handleFindPartners}
                className="w-full py-3 rounded-2xl bg-white hover:bg-pink-50 text-[#FF1E6A] border border-pink-200 font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Users className="w-4 h-4" />
                <span>Find Partners Going</span>
              </button>
            </div>

            {/* Trust Badges: 4 icons */}
            <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-100 text-center">
              <div className="flex flex-col items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-[9px] font-semibold text-slate-600 leading-tight">Verified Organiser</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span className="text-[9px] font-semibold text-slate-600 leading-tight">Safe & Secure Event</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <UserCheck className="w-4 h-4 text-indigo-600" />
                <span className="text-[9px] font-semibold text-slate-600 leading-tight">18+ Entry Only</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <ParkingCircle className="w-4 h-4 text-slate-700" />
                <span className="text-[9px] font-semibold text-slate-600 leading-tight">Free Parking</span>
              </div>
            </div>
          </div>

          {/* People Going Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 font-heading">People Going</h3>
              <span className="text-xs text-slate-500 font-medium">+{event.registeredCount || 128} people going</span>
            </div>

            {/* Avatar Stack */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              <img className="w-8 h-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Person" />
              <img className="w-8 h-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80" alt="Person" />
              <img className="w-8 h-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80" alt="Person" />
              <img className="w-8 h-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" alt="Person" />
              <img className="w-8 h-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80" alt="Person" />
              <img className="w-8 h-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80" alt="Person" />
              <div className="w-8 h-8 rounded-full bg-pink-100 text-[#FF1E6A] font-bold text-xs flex items-center justify-center flex-shrink-0">
                +122
              </div>
            </div>

            {/* 3 Metric Badges */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="p-2.5 rounded-2xl bg-pink-50/70 border border-pink-100/60">
                <span className="text-base font-black text-[#FF1E6A] block leading-tight">{event.lookingForPartnerCount || 72}</span>
                <span className="text-[10px] text-slate-500 font-semibold leading-tight block mt-0.5">Looking for Partner</span>
              </div>

              <div className="p-2.5 rounded-2xl bg-purple-50/70 border border-purple-100/60">
                <span className="text-base font-black text-[#7C3AED] block leading-tight">{event.groupsCount || 36}</span>
                <span className="text-[10px] text-slate-500 font-semibold leading-tight block mt-0.5">Coming in Group</span>
              </div>

              <div className="p-2.5 rounded-2xl bg-sky-50/70 border border-sky-100/60">
                <span className="text-base font-black text-[#0284C7] block leading-tight">20</span>
                <span className="text-[10px] text-slate-500 font-semibold leading-tight block mt-0.5">New to Garba</span>
              </div>
            </div>
          </div>

          {/* Location Map Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 font-heading">Location</h3>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(event.venue + ', ' + event.city)}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-[#FF1E6A] hover:underline"
              >
                View on Google Maps →
              </a>
            </div>

            {/* Map Preview Box */}
            <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 opacity-90" />
              
              {/* Map road lines illustration */}
              <svg className="absolute inset-0 w-full h-full text-slate-300 opacity-60" viewBox="0 0 300 150">
                <path d="M0 40 Q100 80 200 30 T300 90" fill="none" stroke="currentColor" strokeWidth="6" />
                <path d="M40 0 Q60 100 220 150" fill="none" stroke="currentColor" strokeWidth="4" />
                <path d="M180 0 Q160 80 300 120" fill="none" stroke="currentColor" strokeWidth="4" />
              </svg>

              {/* Marker pin pill */}
              <div className="relative z-10 px-3.5 py-1.5 rounded-2xl bg-white shadow-lg border border-pink-200 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#FF1E6A] text-white flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block leading-tight">{event.venue}</span>
                  <span className="text-[10px] text-slate-500 leading-none">{event.city}, Jharkhand</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
