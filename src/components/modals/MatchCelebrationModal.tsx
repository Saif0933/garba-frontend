import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Sparkles, MessageCircle, Heart, X, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const MatchCelebrationModal: React.FC = () => {
  const { newMatchModalData, closeMatchModal, currentUser } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (newMatchModalData) {
      // Fire festive colorful confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6B21A8', '#EC4899', '#F59E0B', '#10B981', '#F43F5E']
        });
      } catch (e) {
        console.error('Confetti error:', e);
      }
    }
  }, [newMatchModalData]);

  if (!newMatchModalData) return null;

  const { partner, eventName } = newMatchModalData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-100 text-center animate-in zoom-in-95 duration-250">
        {/* Close button */}
        <button
          onClick={closeMatchModal}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-purple-50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Festive Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-black uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>It's a Festival Match!</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-purple-950 font-heading mb-2">
          🎉 You Found a Garba Partner!
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 mb-6">
          You and <strong className="text-purple-900">{partner.name}</strong> are both ready to dance at{' '}
          <span className="text-pink-600 font-bold">{eventName}</span>.
        </p>

        {/* Visual Pair Avatars */}
        <div className="flex items-center justify-center gap-4 my-6">
          <div className="relative">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
              alt="You"
              className="w-20 h-20 rounded-full object-cover ring-4 ring-purple-600 shadow-xl"
            />
            <span className="absolute -bottom-2 -left-1 px-2 py-0.5 rounded-full bg-purple-700 text-white text-[10px] font-bold">
              You
            </span>
          </div>

          <div className="w-10 h-10 rounded-full festive-gradient flex items-center justify-center text-white shadow-lg animate-bounce">
            <Heart className="w-5 h-5 fill-white" />
          </div>

          <div className="relative">
            <img
              src={partner.avatar}
              alt={partner.name}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-pink-500 shadow-xl"
            />
            <span className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full bg-pink-600 text-white text-[10px] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5" />
              18+ Verified
            </span>
          </div>
        </div>

        {/* Safety Note */}
        <div className="p-3 rounded-2xl bg-purple-50/80 border border-purple-100 text-left text-xs text-purple-900/80 mb-6 space-y-1">
          <p className="font-bold flex items-center gap-1.5 text-purple-950">
            🛡️ Safe Festival Meetup Tip:
          </p>
          <p className="text-[11px] text-slate-600">
            Coordinate your meetup inside the registered public venue. In-app chat is active!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              closeMatchModal();
              navigate('/messages');
            }}
            className="flex-1 py-3 px-5 rounded-2xl font-bold text-sm text-white festive-gradient hover:opacity-95 shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            Start Chat
          </button>
          <button
            onClick={() => {
              closeMatchModal();
              navigate('/matches');
            }}
            className="py-3 px-5 rounded-2xl font-bold text-sm text-purple-900 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors"
          >
            View Matches
          </button>
        </div>
      </div>
    </div>
  );
};
