import React from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, ShieldCheck, X } from 'lucide-react';

interface ShareContactModalProps {
  conversationId: string;
  partnerName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareContactModal: React.FC<ShareContactModalProps> = ({
  conversationId,
  partnerName,
  isOpen,
  onClose
}) => {
  const { shareContactInChat, currentUser } = useApp();

  if (!isOpen) return null;

  const handleConfirmShare = () => {
    shareContactInChat(conversationId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-100 text-center animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-purple-50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto mb-4">
          <Phone className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-bold text-purple-950 font-heading mb-2">
          Share Phone Number with {partnerName}?
        </h3>

        <div className="p-3.5 rounded-2xl bg-purple-50/80 border border-purple-100 text-xs text-slate-600 mb-6 text-left space-y-2">
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>
              Your verified number <strong>{currentUser?.phone || '+91 98765 43210'}</strong> will be displayed directly in this mutual chat window.
            </span>
          </div>
          <p className="text-[11px] text-purple-900/80">
            For safety, we recommend keeping conversations inside the GarbaMitra app until after meeting at the public event.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmShare}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white festive-gradient hover:opacity-95 shadow-md shadow-pink-500/20 transition-colors"
          >
            Share Number
          </button>
        </div>
      </div>
    </div>
  );
};
