import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SafetyReport } from '../../types';
import { ShieldAlert, CheckCircle2, AlertTriangle, Send } from 'lucide-react';

export const SafetyReportPage: React.FC = () => {
  const { submitReport, users, currentUser } = useApp();
  const [reportedUserName, setReportedUserName] = useState('');
  const [reason, setReason] = useState<SafetyReport['reason']>('Inappropriate Behaviour');
  const [description, setDescription] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReport({
      reportedUserName: reportedUserName || 'Flagged User',
      reportedUserId: 'flagged-manual',
      reason,
      description,
      evidenceUrl
    });
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-100 shadow-xl space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-purple-50">
          <div className="p-3 rounded-2xl bg-rose-100 text-rose-600">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-purple-950 font-heading">
              Safety Incident Report
            </h1>
            <p className="text-xs text-slate-500">
              Confidential report reviewed 24x7 by GarbaMitra Safety Officers
            </p>
          </div>
        </div>

        {isSubmitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-heading">
              Report Successfully Submitted
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
              Thank you. Our moderation team has received this report and is actively reviewing the account details.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setDescription('');
                setReportedUserName('');
              }}
              className="py-2.5 px-6 rounded-full font-bold text-xs text-purple-900 bg-purple-50 hover:bg-purple-100"
            >
              Submit Another Report
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Name / Profile of Reported User
              </label>
              <input
                type="text"
                required
                value={reportedUserName}
                onChange={(e) => setReportedUserName(e.target.value)}
                placeholder="e.g. Rahul S. / Profile Name / City"
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Primary Violation Reason
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value as SafetyReport['reason'])}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
              >
                <option value="Harassment">Harassment / Bullying</option>
                <option value="Fake Profile">Fake Profile / Impersonation</option>
                <option value="Offensive Content">Offensive Content / Language</option>
                <option value="Scam">Scam / Unofficial Ticket Selling</option>
                <option value="Unwanted Messages">Unwanted Repeated Messages</option>
                <option value="Inappropriate Behaviour">Inappropriate / Unsafe Behavior</option>
                <option value="Other">Other Violation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Detailed Description of Incident
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please include details such as event venue, message context, or what transpired..."
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Evidence / Screenshot URL (Optional)
              </label>
              <input
                type="url"
                value={evidenceUrl}
                onChange={(e) => setEvidenceUrl(e.target.value)}
                placeholder="https://..."
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
              />
            </div>

            <div className="p-3 rounded-xl bg-purple-50 text-[11px] text-purple-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>
                All submissions are strictly confidential. We take immediate action against offenders including account suspension and ground security alerts.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-2xl font-bold text-sm text-white bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit Incident Report
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
