import React, { useState } from 'react';
import { MOCK_ADMIN_ANALYTICS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Calendar,
  Heart,
  CreditCard,
  Crown,
  ShieldCheck,
  TrendingUp,
  Activity,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const AdminDashboardPage: React.FC = () => {
  const { reports, matches, users, events } = useApp();
  const [timeRange, setTimeRange] = useState('7d');

  const { summary, dailyRegistrations, cityDistribution, revenueByPlan } = MOCK_ADMIN_ANALYTICS;

  const COLORS = ['#A855F7', '#EC4899', '#F59E0B', '#10B981'];

  return (
    <div className="space-y-8">
      {/* Top Welcome & Season Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
            Executive Overview & Safety Metrics
          </h1>
          <p className="text-xs text-slate-400">
            Real-time analytics for Navratri 2026 partner discovery platform.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          {['7d', '30d', '90d', 'Season'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                timeRange === range
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* 8 KPI Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Registered Users */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Registered Users</span>
            <div className="p-2 rounded-xl bg-purple-950 text-purple-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-heading">
            {summary.registeredUsers.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+24.8% this week</span>
          </div>
        </div>

        {/* Card 2: Active Users */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Active Daily Users</span>
            <div className="p-2 rounded-xl bg-pink-950 text-pink-400">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-heading">
            {summary.activeUsers.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.2% peak festival traffic</span>
          </div>
        </div>

        {/* Card 3: Verified Profiles */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Verified Profiles</span>
            <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-heading">
            {summary.verifiedProfiles.toLocaleString()}
          </div>
          <div className="text-[11px] text-purple-300 font-medium">
            81.2% ID Verification Rate
          </div>
        </div>

        {/* Card 4: Upcoming Events */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Festival Events</span>
            <div className="p-2 rounded-xl bg-amber-950 text-amber-400">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-heading">
            {summary.upcomingEvents}
          </div>
          <div className="text-[11px] text-slate-400">
            Across 15 top Indian cities
          </div>
        </div>

        {/* Card 5: Partner Requests */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Partner Requests</span>
            <div className="p-2 rounded-xl bg-purple-950 text-purple-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-heading">
            {summary.partnerRequests.toLocaleString()}
          </div>
          <div className="text-[11px] text-pink-400 font-bold">
            940 sent in last 24h
          </div>
        </div>

        {/* Card 6: Successful Matches */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Mutual Matches</span>
            <div className="p-2 rounded-xl bg-rose-950 text-rose-400">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-heading">
            {summary.successfulMatches.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-400 font-bold">
            34.4% Acceptance Rate
          </div>
        </div>

        {/* Card 7: Premium Users */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Premium Members</span>
            <div className="p-2 rounded-xl bg-amber-950 text-amber-400">
              <Crown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-heading">
            {summary.premiumUsers}
          </div>
          <div className="text-[11px] text-amber-400 font-bold">
            Festival Pass Most Popular
          </div>
        </div>

        {/* Card 8: Today's Revenue */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Today's Revenue</span>
            <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-heading">
            ₹{summary.todayRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400">
            Passes & Spotlight Upgrades
          </div>
        </div>
      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth & Matching Trends (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                Registrations & Mutual Matches Trajectory
              </h3>
              <p className="text-xs text-slate-400">Daily growth across Navratri festival season</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1 text-purple-400">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span>Requests</span>
              </div>
              <div className="flex items-center gap-1 text-pink-400">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                <span>Matches</span>
              </div>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyRegistrations}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMatches" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EC4899" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    border: '1px solid #334155',
                    borderRadius: '16px',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="requests" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorRequests)" />
                <Area type="monotone" dataKey="matches" stroke="#EC4899" fillOpacity={1} fill="url(#colorMatches)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* City Distribution (1 col) */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white font-heading">
              Top Festival Hubs
            </h3>
            <p className="text-xs text-slate-400">Active dancers per city</p>
          </div>

          <div className="space-y-3">
            {cityDistribution.map((item, idx) => (
              <div key={item.city} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">{item.city}</span>
                  <span className="text-purple-400 font-bold">{item.count} dancers ({item.percentage}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full festive-gradient"
                    style={{ width: `${item.percentage * 2}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
            💡 Ranchi & Ahmedabad leading highest partner request conversion rates this season.
          </div>
        </div>
      </div>
    </div>
  );
};
