import React from 'react';
import { User } from '../../types';
import { useApp } from '../../context/AppContext';
import { Ban, X } from 'lucide-react';

interface BlockModalProps {
  userToBlock: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BlockModal: React.FC<BlockModalProps> = ({ userToBlock, isOpen, onClose }) => {
  const { blockUser } = useApp();

  if (!isOpen || !userToBlock) return null;

  const handleConfirmBlock = () => {
    blockUser(userToBlock.id);
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

        <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <Ban className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 font-heading mb-2">
          Block {userToBlock.name}?
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
          Blocked users cannot view your festival profile, send you partner requests, or exchange messages.
        </p>

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
            onClick={handleConfirmBlock}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-500/20 transition-colors"
          >
            Block User
          </button>
        </div>
      </div>
    </div>
  );
};
