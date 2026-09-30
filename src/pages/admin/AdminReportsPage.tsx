import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SafetyReport } from '../../types';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  Ban,
  UserCheck,
  Search,
  Filter
} from 'lucide-react';

export const AdminReportsPage: React.FC = () => {
  const { reports, showToast } = useApp();
  const [selectedReport, setSelectedReport] = useState<SafetyReport | null>(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredReports = reports.filter((r) => {
    if (statusFilter !== 'All' && r.status !== statusFilter) return false;
    return true;
  });

  const handleResolve = (repId: string) => {
    showToast('Report Status: Resolved', `Report ${repId} marked as completed`, 'success');
  };

  const handleBanUser = (userName: string) => {
    showToast('User Banned & Blacklisted', `${userName} has been permanently removed`, 'info');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white font-heading">
            Safety & Moderation Queue
          </h1>
          <p className="text-xs text-slate-400">
            Review user-submitted incident reports and enforce 18+ community safety.
          </p>
        </div>

        <div className="text-xs font-bold text-rose-400 bg-rose-950/60 border border-rose-800 px-3 py-1.5 rounded-xl">
          Active Safety Queue: {reports.length} Incidents
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Reported User</th>
                <th className="p-4">Filed By</th>
                <th className="p-4">Reason Category</th>
                <th className="p-4">Report Date</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredReports.map((rep) => (
                <tr key={rep.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-white">
                    {rep.reportedUserName}
                  </td>

                  <td className="p-4 text-slate-400">
                    {rep.reporterName}
                  </td>

                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-lg bg-rose-950 text-rose-300 font-semibold border border-rose-800 text-[11px]">
                      {rep.reason}
                    </span>
                  </td>

                  <td className="p-4 text-slate-400">
                    {rep.createdAt}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        rep.priority === 'Urgent'
                          ? 'bg-rose-900 text-rose-200'
                          : 'bg-amber-900 text-amber-200'
                      }`}
                    >
                      {rep.priority}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        rep.status === 'Resolved'
                          ? 'bg-emerald-900/60 text-emerald-300'
                          : 'bg-amber-900/60 text-amber-300'
                      }`}
                    >
                      {rep.status}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedReport(rep)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                        title="Read Report Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleBanUser(rep.reportedUserName)}
                        className="p-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-400 border border-rose-800"
                        title="Ban Reported User"
                      >
                        <Ban className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleResolve(rep.id)}
                        className="p-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-800"
                        title="Mark Resolved"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Incident Details Inspector */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base flex items-center gap-2 text-rose-400">
                <ShieldAlert className="w-5 h-5" />
                Report Details: {selectedReport.reason}
              </h3>
              <button onClick={() => setSelectedReport(null)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <p><strong>Reported User:</strong> {selectedReport.reportedUserName}</p>
              <p><strong>Filed By:</strong> {selectedReport.reporterName}</p>
              <p><strong>Timestamp:</strong> {selectedReport.createdAt}</p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 mt-2">
                <span className="font-bold text-slate-200 block mb-1">User Statement:</span>
                <p className="text-slate-400 italic">"{selectedReport.description}"</p>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  handleBanUser(selectedReport.reportedUserName);
                  setSelectedReport(null);
                }}
                className="flex-1 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white"
              >
                Ban User
              </button>
              <button
                onClick={() => {
                  handleResolve(selectedReport.id);
                  setSelectedReport(null);
                }}
                className="flex-1 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Resolve Case
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
