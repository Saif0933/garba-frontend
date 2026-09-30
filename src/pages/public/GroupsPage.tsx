import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SquadGroup } from '../../types';
import { Users, Plus, Calendar, MapPin, Sparkles, Check, X } from 'lucide-react';

export const GroupsPage: React.FC = () => {
  const { groups, joinSquadGroup, createSquadGroup, currentUser, events } = useApp();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || 'event-ranchi-01');
  const [description, setDescription] = useState('');
  const [maxMembers, setMaxMembers] = useState(8);
  const [dressTheme, setDressTheme] = useState('Royal Blue & Gold');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ev = events.find((e) => e.id === selectedEventId) || events[0];
    createSquadGroup({
      name: groupName,
      eventId: ev.id,
      eventName: ev.title,
      city: ev.city,
      date: ev.displayDate,
      venue: ev.venue,
      description,
      maxMembers,
      dressTheme
    });
    setIsCreateModalOpen(false);
    setGroupName('');
    setDescription('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-purple-900 via-pink-900 to-purple-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider border border-pink-500/40">
            <Users className="w-3.5 h-3.5" />
            Festival Squads & Circles
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-heading">
            Garba & Dandiya Squad Groups
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80">
            Prefer dancing in a group? Join coordinated squad circles or create your own theme-based crew for your city’s Garba night.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm text-white festive-gradient hover:opacity-95 shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2 self-start md:self-auto transition-transform active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Create New Squad
        </button>
      </div>

      {/* Squad Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => {
          const isMember = currentUser && group.currentMembers.some((m) => m.id === currentUser.id);

          return (
            <div
              key={group.id}
              className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-heading leading-tight">
                      {group.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-purple-700 font-semibold mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-pink-600" />
                      <span>{group.city}</span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-900 text-xs font-black">
                    {group.currentMembers.length}/{group.maxMembers}
                  </span>
                </div>

                {/* Event info */}
                <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-100 text-xs space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-600" />
                    <span>{group.eventName}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">{group.date} · {group.venue}</div>
                  {group.dressTheme && (
                    <div className="text-[11px] text-pink-700 font-bold pt-1">
                      🎨 Theme: {group.dressTheme}
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {group.description}
                </p>

                {/* Members Avatars */}
                <div className="pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Squad Members ({group.currentMembers.length})
                  </span>
                  <div className="flex items-center -space-x-2 overflow-hidden py-1">
                    {group.currentMembers.map((member) => (
                      <img
                        key={member.id}
                        src={member.avatar}
                        alt={member.name}
                        title={`${member.name} (${member.role})`}
                        className="inline-block w-8 h-8 rounded-full ring-2 ring-white object-cover"
                      />
                    ))}
                    {group.lookingForCount > 0 && (
                      <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-700 text-[10px] font-black flex items-center justify-center ring-2 ring-white">
                        +{group.lookingForCount}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Join Action */}
              <div className="pt-2">
                {isMember ? (
                  <button
                    disabled
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4 text-emerald-600" />
                    You are in this Squad ✓
                  </button>
                ) : (
                  <button
                    onClick={() => joinSquadGroup(group.id)}
                    disabled={group.lookingForCount <= 0}
                    className="w-full py-2.5 rounded-xl font-bold text-xs text-white festive-gradient hover:opacity-95 shadow-md shadow-pink-500/20 flex items-center justify-center gap-1.5 transition-transform active:scale-95 disabled:opacity-50"
                  >
                    <Users className="w-3.5 h-3.5" />
                    {group.lookingForCount > 0 ? 'Request to Join Squad' : 'Squad Full'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE SQUAD MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-100 space-y-4">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-purple-50"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-purple-950 font-heading">
              Create a Garba Squad
            </h3>

            <form onSubmit={handleCreateSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Squad Name</label>
                <input
                  type="text"
                  required
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="e.g. Ranchi Raas Dandiya Warriors"
                  className="w-full p-2.5 rounded-xl border border-purple-200 bg-white font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Event</label>
                <select
                  value={selectedEventId}
                  onChange={(e) => setSelectedEventId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-purple-200 bg-white font-semibold"
                >
                  {events.map((ev) => (
                    <option key={ev.id} value={ev.id}>
                      {ev.title} ({ev.city})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Color / Outfit Theme</label>
                <input
                  type="text"
                  value={dressTheme}
                  onChange={(e) => setDressTheme(e.target.value)}
                  placeholder="e.g. Royal Blue & Golden Yellow"
                  className="w-full p-2.5 rounded-xl border border-purple-200 bg-white font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Max Dancers</label>
                  <input
                    type="number"
                    min={4}
                    max={20}
                    value={maxMembers}
                    onChange={(e) => setMaxMembers(parseInt(e.target.value) || 8)}
                    className="w-full p-2.5 rounded-xl border border-purple-200 bg-white font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Squad Description</label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your dance tempo, planned circular formations, or meeting details..."
                  className="w-full p-2.5 rounded-xl border border-purple-200 bg-white font-semibold"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl font-bold text-white festive-gradient shadow-md"
                >
                  Publish Squad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
