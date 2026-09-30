import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { showToast } = useApp();
  const [requirePhotoVerification, setRequirePhotoVerification] = useState(true);
  const [strict18PlusEnforcement, setStrict18PlusEnforcement] = useState(true);
  const [allowInstantDemoSwitch, setAllowInstantDemoSwitch] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Platform Settings Saved', 'Global safety thresholds updated', 'success');
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white font-heading">
          Platform Safety & Governance Settings
        </h1>
        <p className="text-xs text-slate-400">
          Configure matching thresholds, photo verification rules, and festival security settings.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 text-xs text-slate-300">
        <div className="space-y-4">
          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 cursor-pointer">
            <div>
              <span className="font-bold text-white block">Strict 18+ Verification Gate</span>
              <span className="text-[11px] text-slate-500">Block registration and matching for any applicant below 18 years</span>
            </div>
            <input
              type="checkbox"
              checked={strict18PlusEnforcement}
              onChange={(e) => setStrict18PlusEnforcement(e.target.checked)}
              className="w-4 h-4 accent-purple-600"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 cursor-pointer">
            <div>
              <span className="font-bold text-white block">Mandatory Photo Verification Badge</span>
              <span className="text-[11px] text-slate-500">Highlight photo-verified attendees in matching search</span>
            </div>
            <input
              type="checkbox"
              checked={requirePhotoVerification}
              onChange={(e) => setRequirePhotoVerification(e.target.checked)}
              className="w-4 h-4 accent-purple-600"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 cursor-pointer">
            <div>
              <span className="font-bold text-white block">Demo Account Quick-Switcher</span>
              <span className="text-[11px] text-slate-500">Enable 1-click user/admin switching in navbar for product demos</span>
            </div>
            <input
              type="checkbox"
              checked={allowInstantDemoSwitch}
              onChange={(e) => setAllowInstantDemoSwitch(e.target.checked)}
              className="w-4 h-4 accent-purple-600"
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-2xl font-bold text-xs bg-purple-600 hover:bg-purple-700 text-white shadow-md"
        >
          Save Platform Configurations
        </button>
      </form>
    </div>
  );
};
