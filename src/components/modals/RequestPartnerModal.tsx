import React, { useState } from 'react';
import { User, FestivalEvent } from '../../types';
import { useApp } from '../../context/AppContext';
import { Send, X, ShieldCheck, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

interface RequestPartnerModalProps {
  candidate: User | null;
  event: FestivalEvent | null;
  isOpen: boolean;
  onClose: () => void;
  matchScore?: number;
}

export const RequestPartnerModal: React.FC<RequestPartnerModalProps> = ({
  candidate,
  event,
  isOpen,
  onClose,
  matchScore = 92
}) => {
  const { sendPartnerRequest, isLoggedIn } = useApp();
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !candidate) return null;

  const defaultMsg = `Hey ${candidate.name}! I saw you're attending ${event?.title || 'Garba Night'}. I’d love to connect as a festival dance partner!`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;

    setIsSubmitting(true);
    await sendPartnerRequest(candidate.id, event.id, message || defaultMsg);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-100 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-purple-50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-2xl festive-gradient text-white shadow-md shadow-pink-500/20">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-purple-950 font-heading">Send Partner Request</h3>
            <p className="text-xs text-slate-500">Mutual match unlocks secure in-app messaging</p>
          </div>
        </div>

        {/* Candidate Profile Preview */}
        <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 mb-5">
          <img
            src={candidate.avatar}
            alt={candidate.name}
            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-pink-500 flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold text-slate-900 truncate">{candidate.name}, {candidate.age}</h4>
              <CheckCircle2 className="w-4 h-4 text-pink-600 fill-pink-100" />
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-600 mt-0.5">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-purple-600" />
                {candidate.city}
              </span>
              <span className="font-semibold text-pink-600">{matchScore}% Match</span>
            </div>
            <div className="text-[11px] text-purple-800 font-medium mt-1">
              Garba: {candidate.garbaLevel} · Dandiya: {candidate.dandiyaLevel}
            </div>
          </div>
        </div>

        {/* Selected Event Details */}
        {event && (
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 mb-5 flex items-start gap-2 text-xs text-slate-700">
            <Calendar className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-bold text-slate-900">{event.title}</span>
              <span className="text-slate-500 block">{event.displayDate} · {event.venue}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Add a Friendly Icebreaker Message (Optional)
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={defaultMsg}
              className="w-full text-xs sm:text-sm p-3.5 rounded-2xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
            />
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>18+ verified platform. Your phone number is never shared automatically.</span>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white festive-gradient hover:opacity-95 shadow-md shadow-pink-500/20 flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? 'Sending...' : 'Send Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
