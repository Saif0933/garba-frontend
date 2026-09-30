import React from 'react';
import { Link } from 'react-router-dom';
import { CityInfo } from '../../types';
import { MapPin, Users, Calendar, ArrowRight } from 'lucide-react';

interface CityCardProps {
  city: CityInfo;
}

export const CityCard: React.FC<CityCardProps> = ({ city }) => {
  return (
    <Link
      to={`/cities/${city.slug}`}
      className="group relative flex-shrink-0 w-64 sm:w-72 rounded-3xl overflow-hidden bg-white border border-purple-100 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-purple-950">
        <img
          src={city.image}
          alt={city.name}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/90 via-purple-950/30 to-transparent" />

        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-full bg-purple-950/80 backdrop-blur-md border border-purple-400/40 text-amber-300 text-[11px] font-extrabold flex items-center gap-1">
            <Users className="w-3 h-3" />
            {city.partnerCount}+ Partners
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h4 className="text-xl font-bold font-heading drop-shadow-sm flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-pink-500" />
            {city.name}
          </h4>
          <span className="text-xs text-purple-200/90">{city.state}</span>
        </div>
      </div>

      <div className="p-4 flex items-center justify-between bg-white text-xs font-bold text-purple-900 group-hover:text-pink-600 transition-colors">
        <div className="flex items-center gap-1 text-slate-500 text-[11px] font-medium">
          <Calendar className="w-3.5 h-3.5 text-purple-600" />
          <span>{city.eventCount} Active Events</span>
        </div>
        <span className="flex items-center gap-1">
          Explore City
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
};
