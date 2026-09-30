import React from 'react';

export const PartnerCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-3xl overflow-hidden border border-purple-100 shadow-sm animate-pulse flex flex-col">
    <div className="aspect-[4/3] w-full bg-slate-200" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-slate-200 rounded-md w-3/4" />
      <div className="h-3 bg-slate-200 rounded-md w-1/2" />
      <div className="grid grid-cols-2 gap-2 pt-2">
        <div className="h-10 bg-slate-200 rounded-xl" />
        <div className="h-10 bg-slate-200 rounded-xl" />
      </div>
      <div className="h-10 bg-slate-200 rounded-2xl mt-4" />
    </div>
  </div>
);

export const EventCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-3xl overflow-hidden border border-purple-100 shadow-sm animate-pulse flex flex-col">
    <div className="aspect-[16/10] w-full bg-slate-200" />
    <div className="p-5 space-y-3">
      <div className="h-5 bg-slate-200 rounded-md w-4/5" />
      <div className="h-3 bg-slate-200 rounded-md w-2/3" />
      <div className="h-8 bg-slate-200 rounded-xl" />
      <div className="grid grid-cols-2 gap-2 pt-2">
        <div className="h-10 bg-slate-200 rounded-xl" />
        <div className="h-10 bg-slate-200 rounded-xl" />
      </div>
    </div>
  </div>
);

export const ChatSkeleton: React.FC = () => (
  <div className="space-y-4 p-4 animate-pulse">
    <div className="flex items-start gap-2.5 max-w-[70%]">
      <div className="w-8 h-8 rounded-full bg-slate-200" />
      <div className="p-4 rounded-2xl bg-slate-200 flex-1 h-16" />
    </div>
    <div className="flex items-start gap-2.5 max-w-[70%] ml-auto flex-row-reverse">
      <div className="w-8 h-8 rounded-full bg-purple-200" />
      <div className="p-4 rounded-2xl bg-purple-200 flex-1 h-12" />
    </div>
    <div className="flex items-start gap-2.5 max-w-[70%]">
      <div className="w-8 h-8 rounded-full bg-slate-200" />
      <div className="p-4 rounded-2xl bg-slate-200 flex-1 h-20" />
    </div>
  </div>
);

export const DashboardSkeleton: React.FC = () => (
  <div className="space-y-6 animate-pulse p-4 max-w-7xl mx-auto">
    <div className="h-28 bg-slate-200 rounded-3xl" />
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="h-24 bg-slate-200 rounded-2xl" />
      <div className="h-24 bg-slate-200 rounded-2xl" />
      <div className="h-24 bg-slate-200 rounded-2xl" />
      <div className="h-24 bg-slate-200 rounded-2xl" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="h-80 bg-slate-200 rounded-3xl md:col-span-2" />
      <div className="h-80 bg-slate-200 rounded-3xl" />
    </div>
  </div>
);
