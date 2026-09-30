import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Shield, Ban, Lock, Bell, Trash2, CheckCircle2 } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { currentUser, blockedUsers, unblockUser, users, showToast } = useApp();
  const [incognito, setIncognito] = useState(false);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const blockedUserObjects = users.filter((u) => blockedUsers.includes(u.id));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center gap-3 pb-4 border-b border-purple-100">
        <div className="p-3 rounded-2xl bg-purple-100 text-purple-700">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-purple-950 font-heading">
            Account & Safety Settings
          </h1>
          <p className="text-xs text-slate-500">Manage your festival privacy and blocked contacts</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Privacy & Visibility */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
            <Lock className="w-4 h-4 text-purple-600" />
            <span>Privacy & Visibility</span>
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-2xl bg-purple-50/50 cursor-pointer">
              <div>
                <span className="font-bold text-slate-900 block">Hide Online / Active Status</span>
                <span className="text-[11px] text-slate-500">Do not display green online indicator in chats</span>
              </div>
              <input
                type="checkbox"
                checked={incognito}
                onChange={(e) => {
                  setIncognito(e.target.checked);
                  showToast('Privacy setting updated', '', 'info');
                }}
                className="w-4 h-4 accent-pink-600"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-purple-50/50 cursor-pointer">
              <div>
                <span className="font-bold text-slate-900 block">Push Notifications for Matches</span>
                <span className="text-[11px] text-slate-500">Receive instant alerts when someone matches with you</span>
              </div>
              <input
                type="checkbox"
                checked={pushNotifs}
                onChange={(e) => setPushNotifs(e.target.checked)}
                className="w-4 h-4 accent-pink-600"
              />
            </label>
          </div>
        </div>

        {/* Blocked Users Management */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
            <Ban className="w-4 h-4 text-rose-600" />
            <span>Blocked Users ({blockedUsers.length})</span>
          </h3>

          {blockedUsers.length === 0 ? (
            <p className="text-xs text-slate-500 py-2">
              You haven't blocked any users. Use the block button on any profile or chat to prevent contact.
            </p>
          ) : (
            <div className="space-y-2">
              {blockedUserObjects.map((user) => (
                <div
                  key={user.id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{user.name}</h4>
                      <span className="text-[10px] text-slate-500">{user.city}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => unblockUser(user.id)}
                    className="py-1.5 px-3 rounded-xl text-xs font-bold text-purple-700 hover:bg-purple-100 border border-purple-200"
                  >
                    Unblock
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Danger Zone */}
        <div className="bg-rose-50/50 p-6 sm:p-8 rounded-3xl border border-rose-100 space-y-3">
          <h3 className="text-base font-bold text-rose-900 font-heading flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-rose-600" />
            <span>Account Actions</span>
          </h3>
          <p className="text-xs text-rose-700">
            Permanently delete your festival profile and clear all chat history and active matching passes.
          </p>
          <button
            type="button"
            onClick={() => showToast('Account deletion is locked in demo mode', '', 'warning')}
            className="py-2.5 px-5 rounded-xl font-bold text-xs text-white bg-rose-600 hover:bg-rose-700"
          >
            Delete Account (Demo Protected)
          </button>
        </div>
      </div>
    </div>
  );
};
