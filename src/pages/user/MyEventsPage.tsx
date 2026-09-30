import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { EventCard } from '../../components/event/EventCard';
import { EmptyState } from '../../components/common/EmptyState';
import { Calendar, Sparkles } from 'lucide-react';

export const MyEventsPage: React.FC = () => {
  const { events, userEvents } = useApp();

  const joinedEvents = events.filter((e) => userEvents.includes(e.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-1">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            My Navratri Schedule
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-purple-950 font-heading">
            My Registered Festival Events
          </h1>
        </div>
        <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-full border border-purple-100 shadow-sm">
          {joinedEvents.length} Events on Schedule
        </span>
      </div>

      {joinedEvents.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 border border-purple-100 shadow-sm">
          <EmptyState
            type="events"
            title="You haven't joined any festival events yet."
            description="Browse upcoming Garba and Dandiya nights across your city and tap 'Join Event' to add them to your schedule."
            actionText="Explore Festival Events"
            actionUrl="/events"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {joinedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};
