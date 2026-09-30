import React, { useState } from 'react';
import { ChevronDown, Sparkles, HelpCircle } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is GarbaMitra a dating website?',
      a: 'No. GarbaMitra is strictly an event-based festival social discovery platform. The focus is on finding verified dance partners and squads attending public festival venues (Garba, Dandiya, Durga Puja, etc.) together.'
    },
    {
      q: 'How does the mutual matching algorithm calculate compatibility score?',
      a: 'Our 7-factor algorithm calculates scores out of 100 based on: Same Event (+30), Same Festival Date (+20), Compatible Timing (+15), City Location Proximity (+15), Dance Level synergy (+5), Partner Preference fit (+10), and Age Range compatibility (+5).'
    },
    {
      q: 'Why is there a mandatory 18+ age verification?',
      a: 'To ensure adult festival safety, legal compliance, and community comfort, GarbaMitra requires all users participating in partner matching to be 18 or older.'
    },
    {
      q: 'Is my phone number shown publicly to everyone?',
      a: 'Never. Your contact number is strictly private. It is never displayed on profile cards or public pages. Phone numbers can only be shared inside a private chat window after a mutual match has been accepted.'
    },
    {
      q: 'Can I join a squad group if I do not want 1-on-1 partner matching?',
      a: 'Yes! You can explore the Groups section to join theme-coordinated Garba squads of 6 to 12 dancers for synchronized entries and concentric circles.'
    },
    {
      q: 'How does the demo mode work?',
      a: 'In demo mode, you can log in instantly with demo accounts (e.g. Aarohi or Admin), send requests, receive simulated match celebrations, test chat messages with simulated replies, and test pass upgrades.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
          Frequently Asked Questions
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-purple-950 font-heading">
          Everything You Need to Know
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
          Clear answers about festival partner discovery, verification, privacy, and safety.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-slate-900 hover:text-purple-950 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-purple-600 flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-purple-50">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
