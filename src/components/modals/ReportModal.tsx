import React, { useState } from 'react';
import { User, SafetyReport } from '../../types';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, X, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface ReportModalProps {
  userToReport: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ userToReport, isOpen, onClose }) => {
  const { submitReport } = useApp();
  const [reason, setReason] = useState<SafetyReport['reason']>('Inappropriate Behaviour');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !userToReport) return null;

  const reasons: SafetyReport['reason'][] = [
    'Harassment',
    'Fake Profile',
    'Offensive Content',
    'Scam',
    'Unwanted Messages',
    'Inappropriate Behaviour',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReport({
      reportedUserId: userToReport.id,
      reportedUserName: userToReport.name,
      reason,
      description
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setDescription('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-100 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-purple-50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-heading">Report Received</h3>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Thank you for keeping our festival community safe. Our moderation team will review this report promptly.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-2xl bg-rose-100 text-rose-600">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-heading">Report User</h3>
                <p className="text-xs text-slate-500">Report {userToReport.name} for community violations</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Reason
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value as SafetyReport['reason'])}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                >
                  {reasons.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Tell us what happened
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please describe the behavior, unwanted messages, or suspicious actions..."
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                />
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-50/70 border border-rose-100 text-[11px] text-rose-800">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                <span>Reports are confidential. The user will not know who reported them.</span>
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
                  className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-500/20 transition-colors"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
