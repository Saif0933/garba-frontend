import React from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, Sparkles, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const AdminMatchesPage: React.FC = () => {
  const { matches } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white font-heading">
            Live Mutual Matches Audit Log
          </h1>
          <p className="text-xs text-slate-400">
            Real-time pairs formed across all registered festival grounds.
          </p>
        </div>

        <div className="text-xs font-bold text-pink-400 bg-pink-950/60 border border-pink-800 px-3 py-1.5 rounded-xl">
          Total Matches: {matches.length}
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Matched Pair</th>
                <th className="p-4">Festival Event</th>
                <th className="p-4">City</th>
                <th className="p-4">Event Date</th>
                <th className="p-4">Compatibility Score</th>
                <th className="p-4">Match Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {matches.map((m) => (
                <tr key={m.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2 font-bold text-white">
                      <span>Aarohi Verma</span>
                      <span className="text-pink-400">❤</span>
                      <span>{m.partner.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Pair ID: {m.id}</span>
                  </td>

                  <td className="p-4 font-semibold text-purple-300">
                    {m.eventName}
                  </td>

                  <td className="p-4 text-slate-300">
                    {m.partner.city}
                  </td>

                  <td className="p-4 text-slate-400">
                    {m.eventDate}
                  </td>

                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-pink-950 text-pink-300 font-black border border-pink-800">
                      {m.matchPercentage}% Score
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
