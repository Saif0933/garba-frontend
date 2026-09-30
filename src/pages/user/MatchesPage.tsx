import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { EmptyState } from '../../components/common/EmptyState';
import { Heart, MessageCircle, Calendar, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

export const MatchesPage: React.FC = () => {
  const { matches, setActiveConversationId, conversations } = useApp();
  const [activeTab, setActiveTab] = useState<'active' | 'new' | 'past'>('active');
  const navigate = useNavigate();

  const handleStartChat = (partnerId: string) => {
    const conv = conversations.find((c) => c.participantId === partnerId);
    if (conv) {
      setActiveConversationId(conv.id);
    }
    navigate('/messages');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider mb-1">
            <Heart className="w-3.5 h-3.5 fill-pink-600 text-pink-600" />
            Mutual Connections
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-purple-950 font-heading">
            Your Garba Matches
          </h1>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white border border-purple-100 shadow-sm">
          {[
            { key: 'active', label: `Active (${matches.length})` },
            { key: 'new', label: 'New Matches' },
            { key: 'past', label: 'Past Matches' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.key ? 'bg-purple-900 text-white shadow-sm' : 'text-slate-600 hover:bg-purple-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Matches Grid */}
      {matches.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 border border-purple-100 shadow-sm">
          <EmptyState
            type="matches"
            title="No mutual matches yet."
            description="Send partner requests to dancers in your city. When they accept, they will appear here ready to chat!"
            actionText="Find Festival Partners"
            actionUrl="/find-partner"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <div
              key={match.id}
              className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={match.partner.avatar}
                    alt={match.partner.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-pink-500 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-bold text-slate-900 truncate">
                        {match.partner.name}, {match.partner.age}
                      </h3>
                      <CheckCircle2 className="w-4 h-4 text-pink-600 fill-pink-100" />
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="w-3 h-3 text-purple-600" />
                      <span>{match.partner.city}</span>
                    </div>
                    <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-pink-50 text-pink-700 text-[10px] font-black">
                      <Sparkles className="w-3 h-3" />
                      {match.matchPercentage}% Compatibility
                    </div>
                  </div>
                </div>

                {/* Mutual Event Tag */}
                <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-100 text-xs space-y-1">
                  <div className="font-bold text-purple-950 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-pink-600" />
                    <span className="truncate">{match.eventName}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Matched for {match.eventDate}
                  </div>
                </div>

                {match.lastMessageSnippet && (
                  <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-xl line-clamp-2">
                    "{match.lastMessageSnippet}"
                  </p>
                )}
              </div>

              {/* Chat Action */}
              <button
                onClick={() => handleStartChat(match.partner.id)}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white festive-gradient hover:opacity-95 shadow-md shadow-pink-500/20 flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                Chat with {match.partner.name.split(' ')[0]}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
