import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Users, Calendar, Plus } from 'lucide-react';

export const AdminCitiesPage: React.FC = () => {
  const { cities } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white font-heading">
            City Hubs & Geographic Availability
          </h1>
          <p className="text-xs text-slate-400">
            15 active festival cities configured for Navratri partner matching.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.map((city) => (
          <div key={city.id} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex items-center gap-4">
            <img
              src={city.image}
              alt={city.name}
              className="w-16 h-16 rounded-2xl object-cover ring-1 ring-purple-500 flex-shrink-0"
            />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-pink-500" />
                {city.name}
              </h3>
              <span className="text-xs text-slate-400 block">{city.state}</span>
              <div className="flex items-center gap-3 text-[11px] font-bold text-purple-400">
                <span>{city.partnerCount}+ Dancers</span>
                <span>·</span>
                <span>{city.eventCount} Events</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
