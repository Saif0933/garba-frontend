import React, { useState } from 'react';
import { User, FestivalEvent } from '../../types';
import { useApp } from '../../context/AppContext';
import { calculateMatchScore, formatMatchLabel } from '../../utils/matching';
import { RequestPartnerModal } from '../modals/RequestPartnerModal';
import { ReportModal } from '../modals/ReportModal';
import { BlockModal } from '../modals/BlockModal';
import {
  Heart,
  MapPin,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  Send,
  MoreVertical,
  Flag,
  Ban,
  Check,
  Zap,
  Music,
  UserCheck
} from 'lucide-react';

interface PartnerCardProps {
  partner: User;
  currentEvent?: FestivalEvent | null;
  onSkip?: () => void;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({ partner, currentEvent, onSkip }) => {
  const {
    currentUser,
    hasRequestedPartner,
    isFavorite,
    toggleFavorite,
    events,
    matches,
    isUserBlocked
  } = useApp();

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // If user is blocked, do not render
  if (isUserBlocked(partner.id)) return null;

  // Resolve active event for candidate
  const candidateEvent =
    currentEvent ||
    events.find((e) => partner.preferredEvents?.includes(e.id)) ||
    events[0];

  // Calculate matching score
  const matchResult = calculateMatchScore(currentUser, partner, candidateEvent);
  const isAlreadyRequested = candidateEvent ? hasRequestedPartner(partner.id, candidateEvent.id) : false;
  const isAlreadyMatched = matches.some((m) => m.users.includes(partner.id));
  const isFav = isFavorite(partner.id);

  return (
    <>
      <div className="group relative bg-white rounded-3xl overflow-hidden border border-purple-100 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1">
        {/* Top Image Section */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-purple-950">
          <img
            src={partner.avatar}
            alt={partner.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Dark Gradient Overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-950/90 via-purple-950/20 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
            {/* Compatibility Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-md text-xs font-black text-purple-900 border border-purple-100">
              <Sparkles className="w-3.5 h-3.5 text-pink-600 fill-pink-500" />
              <span>{matchResult.score}% Event Match</span>
            </div>

            {/* Favorite Button & More Menu */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => toggleFavorite(partner.id)}
                className={`p-2 rounded-full backdrop-blur-md shadow-md transition-all active:scale-90 ${
                  isFav
                    ? 'bg-rose-500 text-white'
                    : 'bg-white/80 hover:bg-white text-slate-700 hover:text-rose-500'
                }`}
                title={isFav ? 'Remove from favorites' : 'Save to favorites'}
                aria-label="Favorite partner"
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
              </button>

              {/* More Actions Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
                  aria-label="More actions"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-white shadow-2xl border border-purple-100 p-1.5 z-30 text-xs font-semibold">
                    <button
                      onClick={() => {
                        setIsReportModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                    >
                      <Flag className="w-3.5 h-3.5" />
                      Report
                    </button>
                    <button
                      onClick={() => {
                        setIsBlockModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                    >
                      <Ban className="w-3.5 h-3.5" />
                      Block
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Name & City Banner on Image Bottom */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="flex items-center gap-1.5">
              <h3 className="text-xl font-bold font-heading tracking-tight drop-shadow-sm">
                {partner.name}, {partner.age}
              </h3>
              {partner.isVerified && (
                <div className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-pink-500/90 text-white text-[10px] font-extrabold tracking-wide">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-purple-200/90 mt-0.5">
              <MapPin className="w-3 h-3 text-pink-400" />
              <span>{partner.city} · {partner.area}</span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 space-y-3.5 flex-1 flex flex-col justify-between">
          {/* Bio snippet */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            "{partner.bio}"
          </p>

          {/* Dance Experience Grid */}
          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-2xl bg-purple-50/70 border border-purple-100/80 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-pink-100 text-pink-700 flex items-center justify-center font-bold text-[10px]">
                💃
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Garba</span>
                <span className="font-bold text-purple-950">{partner.garbaLevel}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-[10px]">
                🥢
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Dandiya</span>
                <span className="font-bold text-purple-950">{partner.dandiyaLevel}</span>
              </div>
            </div>
          </div>

          {/* Event info & Looking for tags */}
          <div className="space-y-2">
            {candidateEvent && (
              <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-100">
                <div className="flex items-center gap-1.5 truncate max-w-[170px]">
                  <Calendar className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                  <span className="truncate font-semibold text-slate-900">{candidateEvent.title}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 flex-shrink-0">
                  <Clock className="w-3 h-3 text-pink-500" />
                  <span>{candidateEvent.displayDate.split(' ')[0]} {candidateEvent.displayDate.split(' ')[1]}</span>
                </div>
              </div>
            )}

            {/* Looking for badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {partner.lookingFor.map((item) => (
                <span
                  key={item}
                  className="px-2 py-0.5 rounded-lg bg-purple-100/70 text-purple-900 text-[10px] font-bold"
                >
                  Looking for: {item}
                </span>
              ))}
              <span className="px-2 py-0.5 rounded-lg bg-pink-50 text-pink-700 text-[10px] font-semibold">
                {partner.danceStyle}
              </span>
            </div>
          </div>

          {/* Card Action Buttons */}
          <div className="pt-2 flex items-center gap-2">
            {isAlreadyMatched ? (
              <div className="w-full py-2.5 px-4 rounded-2xl bg-emerald-100 text-emerald-800 text-xs font-bold text-center flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4" />
                Matched Partner 🎉
              </div>
            ) : isAlreadyRequested ? (
              <button
                disabled
                className="w-full py-2.5 px-4 rounded-2xl bg-purple-100 text-purple-700 text-xs font-bold cursor-default flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4 text-purple-600" />
                Request Sent
              </button>
            ) : (
              <>
                {onSkip && (
                  <button
                    onClick={onSkip}
                    className="py-2.5 px-3 rounded-2xl text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 transition-colors"
                    title="Skip candidate"
                  >
                    Skip
                  </button>
                )}
                <button
                  onClick={() => setIsRequestModalOpen(true)}
                  className="flex-1 py-2.5 px-4 rounded-2xl font-bold text-xs text-white festive-gradient hover:opacity-95 shadow-md shadow-pink-500/20 flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  Request Partner
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Modals */}
      <RequestPartnerModal
        candidate={partner}
        event={candidateEvent}
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        matchScore={matchResult.score}
      />

      <ReportModal
        userToReport={partner}
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      <BlockModal
        userToBlock={partner}
        isOpen={isBlockModalOpen}
        onClose={() => setIsBlockModalOpen(false)}
      />
    </>
  );
};
