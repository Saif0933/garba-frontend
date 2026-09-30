import React from 'react';
import { MessageSquare, ShieldCheck, Lock, AlertCircle } from 'lucide-react';

export const AdminMessagesPage: React.FC = () => {
  const flaggedWordsSample = [
    { id: 'flag-1', sender: 'Anonymous User', context: 'Offered unofficial tickets off-platform', flaggedWord: 'paytm me directly', time: '10 mins ago', severity: 'High' },
    { id: 'flag-2', sender: 'Devansh T.', context: 'Asked for WhatsApp number early', flaggedWord: 'send phone number', time: '1 hour ago', severity: 'Medium' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white font-heading">
          Encrypted Chat Safety Monitor
        </h1>
        <p className="text-xs text-slate-400">
          Automated keyword detection for scam prevention and harassment filtering.
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/60 text-xs text-purple-200 flex items-center gap-3">
        <Lock className="w-5 h-5 text-pink-400 flex-shrink-0" />
        <span>
          Private conversations are end-to-end encrypted. Automated safety algorithms only inspect flagged suspicious patterns (such as unofficial payment solicitations or abusive language).
        </span>
      </div>

      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-950 border-b border-slate-800 font-bold text-xs text-slate-300">
          Recent Safety Triggers
        </div>
        <div className="divide-y divide-slate-800 text-xs text-slate-300">
          {flaggedWordsSample.map((item) => (
            <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/40">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{item.sender}</span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 text-[10px] font-bold border border-rose-800">
                    Trigger: "{item.flaggedWord}"
                  </span>
                </div>
                <p className="text-slate-400">{item.context}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500">{item.time}</span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-950 text-amber-300 font-bold border border-amber-800">
                  {item.severity} Priority
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
