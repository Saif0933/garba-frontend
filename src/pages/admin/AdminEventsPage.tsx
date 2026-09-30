import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FestivalEvent } from '../../types';
import {
  Calendar,
  Plus,
  Search,
  MapPin,
  CheckCircle2,
  X,
  Edit,
  Trash2,
  Sparkles,
  Ticket
} from 'lucide-react';

export const AdminEventsPage: React.FC = () => {
  const { events, addNewEvent, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('Ranchi');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('2026-10-18');
  const [price, setPrice] = useState(499);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<FestivalEvent['category']>('Garba Night');

  const filteredEvents = events.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.city.toLowerCase().includes(search.toLowerCase()) ||
      e.venue.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: FestivalEvent = {
      id: `event-${Date.now()}`,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title,
      tagline: 'Premier Festival Celebration 2026',
      bannerImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
      city,
      venue,
      address: `${venue}, ${city}`,
      date,
      displayDate: '18 October 2026',
      startTime: '19:00',
      endTime: '23:30',
      price: Number(price),
      isFeatured: true,
      organizer: {
        name: 'City Cultural Committee',
        verified: true
      },
      description,
      rules: ['Traditional wear mandatory', 'Strictly 18+ for partner discovery'],
      whatToExpect: ['Live Dhol orchestra', 'Massive dance ground'],
      safetyInfo: ['On-site medical desk and police liaison'],
      registeredCount: 45,
      lookingForPartnerCount: 18,
      groupsCount: 4,
      category
    };

    addNewEvent(newEvent);
    setIsCreateOpen(false);
    setTitle('');
    setVenue('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white font-heading">
            Festival Event Management
          </h1>
          <p className="text-xs text-slate-400">
            Publish, curate, and monitor festival grounds across all cities.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="py-2.5 px-5 rounded-xl font-bold text-xs text-white festive-gradient hover:opacity-95 shadow-md flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Create New Event
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search event by name, ground, or city..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 text-xs text-white border border-slate-800 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Event & Category</th>
                <th className="p-4">City / Venue</th>
                <th className="p-4">Date & Timing</th>
                <th className="p-4">Registered Dancers</th>
                <th className="p-4">Price</th>
                <th className="p-4">Featured</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredEvents.map((ev) => (
                <tr key={ev.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-white leading-tight">{ev.title}</div>
                    <span className="text-[10px] text-purple-400">{ev.category}</span>
                  </td>

                  <td className="p-4">
                    <div className="font-semibold text-slate-200">{ev.city}</div>
                    <span className="text-[10px] text-slate-500 truncate block max-w-xs">{ev.venue}</span>
                  </td>

                  <td className="p-4">
                    <div>{ev.displayDate}</div>
                    <span className="text-[10px] text-slate-400">{ev.startTime} - {ev.endTime}</span>
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-white">{ev.registeredCount} attendees</span>
                    <span className="text-[10px] text-pink-400 block font-semibold">{ev.lookingForPartnerCount} need partner</span>
                  </td>

                  <td className="p-4 font-bold text-emerald-400">
                    ₹{ev.price}
                  </td>

                  <td className="p-4">
                    {ev.isFeatured ? (
                      <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 text-[10px] font-bold border border-amber-800">
                        Featured ★
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[10px]">Standard</span>
                    )}
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => showToast('Event edit modal ready', ev.title, 'info')}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 mr-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Event Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-lg">Create Festival Event</h3>
              <button onClick={() => setIsCreateOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Ranchi Mega Dandiya Raas 2026"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold"
                  >
                    <option value="Garba Night">Garba Night</option>
                    <option value="Dandiya Raas">Dandiya Raas</option>
                    <option value="Mega Utsav">Mega Utsav</option>
                    <option value="Traditional Mandli">Traditional Mandli</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Venue Address</label>
                <input
                  type="text"
                  required
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="e.g. Morabadi Football Ground"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Event Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Pass Price (₹)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value) || 499)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Event Description</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Details on live band, sound setup, and rules..."
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl font-bold text-white festive-gradient"
                >
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
