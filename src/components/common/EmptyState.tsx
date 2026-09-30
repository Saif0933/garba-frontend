import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Users, Heart, MessageCircle, Calendar, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  type: 'partners' | 'matches' | 'messages' | 'events' | 'favorites' | 'requests' | 'generic';
  title?: string;
  description?: string;
  actionText?: string;
  actionUrl?: string;
  onActionClick?: () => void;
  secondaryActionText?: string;
  onSecondaryActionClick?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  title,
  description,
  actionText,
  actionUrl,
  onActionClick,
  secondaryActionText,
  onSecondaryActionClick
}) => {
  const getDefaults = () => {
    switch (type) {
      case 'partners':
        return {
          icon: <Users className="w-8 h-8 text-pink-500" />,
          title: title || 'No partners found for this event yet.',
          description: description || 'Try loosening your dance level or age filters to see more festival dancers ready to connect.',
          actionText: actionText || 'Change Filters',
          actionUrl: actionUrl,
          secondaryActionText: secondaryActionText || 'Try Another Event'
        };
      case 'matches':
        return {
          icon: <Heart className="w-8 h-8 text-rose-500" />,
          title: title || 'Your Garba story hasn’t started yet.',
          description: description || 'Send partner requests to dancers attending your event. Once they accept, your mutual match will appear here!',
          actionText: actionText || 'Find Partners Now',
          actionUrl: actionUrl || '/find-partner'
        };
      case 'messages':
        return {
          icon: <MessageCircle className="w-8 h-8 text-purple-600" />,
          title: title || 'No conversations yet.',
          description: description || 'Once you match with a festival partner, you can chat safely here to coordinate your event meetup.',
          actionText: actionText || 'Find a Partner',
          actionUrl: actionUrl || '/find-partner'
        };
      case 'events':
        return {
          icon: <Calendar className="w-8 h-8 text-amber-500" />,
          title: title || 'No events matched your search.',
          description: description || 'Check back soon or explore events happening in top festival cities like Ranchi or Ahmedabad.',
          actionText: actionText || 'View All Events',
          actionUrl: actionUrl || '/events'
        };
      case 'favorites':
        return {
          icon: <Heart className="w-8 h-8 text-pink-500" />,
          title: title || 'No saved partners yet.',
          description: description || 'Tap the heart icon on any dancer profile card to bookmark them for later.',
          actionText: actionText || 'Explore Partners',
          actionUrl: actionUrl || '/find-partner'
        };
      default:
        return {
          icon: <Sparkles className="w-8 h-8 text-purple-600" />,
          title: title || 'Nothing found here',
          description: description || 'Please check back later or try different search criteria.',
          actionText: actionText || 'Go Home',
          actionUrl: actionUrl || '/'
        };
    }
  };

  const config = getDefaults();

  return (
    <div className="text-center py-16 px-4 max-w-md mx-auto flex flex-col items-center">
      <div className="w-20 h-20 rounded-3xl bg-purple-50 border border-purple-100/80 flex items-center justify-center shadow-inner mb-5 animate-float">
        {config.icon}
      </div>

      <h3 className="text-xl font-bold text-slate-900 font-heading mb-2">
        {config.title}
      </h3>

      <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
        {config.description}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {config.actionUrl ? (
          <Link
            to={config.actionUrl}
            className="py-2.5 px-5 rounded-full font-bold text-xs sm:text-sm text-white festive-gradient hover:opacity-95 shadow-md shadow-pink-500/20 transition-transform active:scale-95"
          >
            {config.actionText}
          </Link>
        ) : onActionClick ? (
          <button
            onClick={onActionClick}
            className="py-2.5 px-5 rounded-full font-bold text-xs sm:text-sm text-white festive-gradient hover:opacity-95 shadow-md shadow-pink-500/20 transition-transform active:scale-95"
          >
            {config.actionText}
          </button>
        ) : null}

        {config.secondaryActionText && (
          <button
            onClick={onSecondaryActionClick}
            className="py-2.5 px-5 rounded-full font-bold text-xs sm:text-sm text-purple-900 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors"
          >
            {config.secondaryActionText}
          </button>
        )}
      </div>
    </div>
  );
};
