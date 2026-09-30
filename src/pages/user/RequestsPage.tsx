import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EmptyState } from '../../components/common/EmptyState';
import { Users, Check, X, Calendar, MapPin, Sparkles, Send, ArrowRight } from 'lucide-react';

export const RequestsPage: React.FC = () => {
  const { partnerRequests, acceptPartnerRequest, declinePartnerRequest, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');

  const receivedRequests = partnerRequests.filter(
    (r) => r.recipientId === currentUser?.id || r.recipientName === currentUser?.name
  );
  const sentRequests = partnerRequests.filter(
    (r) => r.senderId === currentUser?.id || r.senderName === currentUser?.name
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider mb-1">
            <Users className="w-3.5 h-3.5 text-pink-600" />
            Partner Invitations
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-purple-950 font-heading">
            Partner Requests
          </h1>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white border border-purple-100 shadow-sm">
          <button
            onClick={() => setActiveTab('received')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'received' ? 'bg-purple-900 text-white shadow-sm' : 'text-slate-600 hover:bg-purple-50'
            }`}
          >
            Received ({receivedRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('sent')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'sent' ? 'bg-purple-900 text-white shadow-sm' : 'text-slate-600 hover:bg-purple-50'
            }`}
          >
            Sent ({sentRequests.length})
          </button>
        </div>
      </div>

      {/* Received Requests List */}
      {activeTab === 'received' && (
        <div className="space-y-4">
          {receivedRequests.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 border border-purple-100 shadow-sm">
              <EmptyState
                type="requests"
                title="No incoming partner requests right now."
                description="Browse active festival events in your city and send partner invitations to get conversations flowing!"
                actionText="Find Festival Partners"
                actionUrl="/find-partner"
              />
            </div>
          ) : (
            receivedRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={req.senderAvatar}
                    alt={req.senderName}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-pink-500 flex-shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{req.senderName}, {req.senderAge}</h3>
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                        {req.senderCity}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-pink-600" />
                      <span className="font-semibold text-slate-800">{req.eventName} ({req.eventDate})</span>
                    </div>

                    {req.message && (
                      <p className="text-xs text-slate-600 italic bg-purple-50/70 p-2 rounded-xl mt-1">
                        "{req.message}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0">
                  {req.status === 'accepted' ? (
                    <span className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      Accepted & Matched
                    </span>
                  ) : req.status === 'declined' ? (
                    <span className="px-4 py-2 rounded-xl bg-slate-100 text-slate-500 text-xs font-bold">
                      Declined
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => declinePartnerRequest(req.id)}
                        className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 border border-slate-200"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => acceptPartnerRequest(req.id)}
                        className="py-2.5 px-5 rounded-xl text-xs font-bold text-white festive-gradient hover:opacity-95 shadow-md shadow-pink-500/20 flex items-center gap-1.5"
                      >
                        <Check className="w-4 h-4" />
                        Accept & Match 🎉
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Sent Requests List */}
      {activeTab === 'sent' && (
        <div className="space-y-4">
          {sentRequests.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 border border-purple-100 shadow-sm">
              <EmptyState
                type="requests"
                title="You haven't sent any partner requests yet."
                description="Explore dancers attending your event and send a friendly request to form your Navratri pair."
                actionText="Explore Partners"
                actionUrl="/find-partner"
              />
            </div>
          ) : (
            sentRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={req.recipientAvatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80'}
                    alt={req.recipientName}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-pink-500"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">To: {req.recipientName}</h4>
                    <div className="text-xs text-slate-500">{req.eventName} ({req.eventDate})</div>
                  </div>
                </div>

                <div>
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                      req.status === 'accepted'
                        ? 'bg-emerald-100 text-emerald-800'
                        : req.status === 'declined'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {req.status === 'accepted' ? 'Accepted ✓' : req.status === 'declined' ? 'Declined' : 'Pending Response'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
