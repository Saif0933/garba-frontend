import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Bell, CheckCheck, Sparkles, Calendar, MessageCircle, Heart, ShieldAlert } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useApp();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-purple-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider mb-1">
            <Bell className="w-3.5 h-3.5 text-purple-600" />
            Activity Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-purple-950 font-heading">
            Notifications
          </h1>
        </div>

        <button
          onClick={markAllNotificationsAsRead}
          className="py-2 px-4 rounded-xl text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 flex items-center gap-1.5"
        >
          <CheckCheck className="w-4 h-4 text-purple-600" />
          Mark All Read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => {
              markNotificationAsRead(notif.id);
              if (notif.actionUrl) navigate(notif.actionUrl);
            }}
            className={`p-4 rounded-3xl transition-all cursor-pointer border flex items-start gap-4 ${
              notif.isRead
                ? 'bg-white border-purple-100 shadow-sm hover:bg-slate-50'
                : 'bg-purple-50/80 border-purple-200 shadow-md ring-1 ring-purple-300/50'
            }`}
          >
            {notif.senderAvatar ? (
              <img
                src={notif.senderAvatar}
                alt="avatar"
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-pink-500 flex-shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded-2xl festive-gradient text-white flex items-center justify-center font-bold text-base flex-shrink-0">
                GM
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 leading-tight">{notif.title}</h3>
                <span className="text-[10px] text-slate-400">{notif.timestamp}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">{notif.message}</p>
            </div>

            {!notif.isRead && (
              <span className="w-2.5 h-2.5 rounded-full bg-pink-600 flex-shrink-0 mt-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
