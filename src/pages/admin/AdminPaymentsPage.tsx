import React from 'react';
import { CreditCard, ArrowUpRight, CheckCircle2, Download } from 'lucide-react';

export const AdminPaymentsPage: React.FC = () => {
  const transactions = [
    { id: 'TXN_GM_9921', user: 'Aarohi Verma', plan: 'Festival Pass', amount: 199, status: 'Completed', gateway: 'Razorpay PG', date: 'Today, 11:20 AM' },
    { id: 'TXN_GM_9920', user: 'Rahul Sen', plan: '3 Day Pass', amount: 99, status: 'Completed', gateway: 'UPI / Cashfree', date: 'Today, 10:45 AM' },
    { id: 'TXN_GM_9919', user: 'Simran Kaur', plan: 'Premium Pass', amount: 299, status: 'Completed', gateway: 'Razorpay PG', date: 'Yesterday, 08:30 PM' },
    { id: 'TXN_GM_9918', user: 'Arjun Desai', plan: 'Festival Pass', amount: 199, status: 'Completed', gateway: 'UPI / Razorpay', date: 'Yesterday, 06:14 PM' },
    { id: 'TXN_GM_9917', user: 'Aditya Raj', plan: '1 Day Pass', amount: 49, status: 'Completed', gateway: 'PayU PG', date: '28 Sep, 02:00 PM' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white font-heading">
            Payment Transactions & Revenue
          </h1>
          <p className="text-xs text-slate-400">
            Real-time gateway settlements, festival pass purchases, and receipts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-bold">
            Today's Gateway Total: <strong className="text-white">₹18,450</strong>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Transaction ID</th>
                <th className="p-4">User</th>
                <th className="p-4">Pass Tier</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Gateway</th>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-mono font-bold text-purple-400">
                    {txn.id}
                  </td>
                  <td className="p-4 font-bold text-white">
                    {txn.user}
                  </td>
                  <td className="p-4 font-semibold text-slate-200">
                    {txn.plan}
                  </td>
                  <td className="p-4 font-black text-emerald-400">
                    ₹{txn.amount}
                  </td>
                  <td className="p-4 text-slate-400">
                    {txn.gateway}
                  </td>
                  <td className="p-4 text-slate-400">
                    {txn.date}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800">
                      ✓ {txn.status}
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
