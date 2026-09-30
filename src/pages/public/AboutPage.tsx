import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ShieldCheck, Users, Globe, Target, Award } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Our Mission & Vision
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-purple-950 font-heading">
          Connecting Festival Lovers Across India
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          GarbaMitra is India’s first event-based festival discovery network. We believe no one should have to sit out Navratri just because they don’t have a partner to dance with.
        </p>
      </div>

      {/* Origin Story */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 font-heading">
          Why We Built GarbaMitra
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Every Navratri, millions of energetic dancers across India buy ethnic outfits, practice 3-Taali claps at home, but hesitate to attend large grounds alone. Traditional social apps are unsuited for festival matching—they lack event-level synchronization, dance level alignment, and public ground safety standards.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          GarbaMitra solves this with <strong>Event-Based Matching</strong>. You select the exact ground (like Morabadi Ground in Ranchi or GMDC in Ahmedabad), match on dance rhythm, and coordinate safe public meetups.
        </p>
      </div>

      {/* 3 Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-purple-50/80 border border-purple-100 space-y-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center mx-auto shadow-md">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-heading">Cultural Harmony</h3>
          <p className="text-xs text-slate-600">
            Celebrating traditional folk roots with modern social connectivity.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-pink-50/80 border border-pink-100 space-y-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-pink-600 text-white flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-heading">Safety by Design</h3>
          <p className="text-xs text-slate-600">
            Strict 18+ verification, private contact shielding, and 24x7 active moderation.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-amber-50/80 border border-amber-100 space-y-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center mx-auto shadow-md">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-heading">Pan-India Vision</h3>
          <p className="text-xs text-slate-600">
            Expanding from Navratri to Durga Puja, Diwali, Holi, and cultural sports events.
          </p>
        </div>
      </div>
    </div>
  );
};
