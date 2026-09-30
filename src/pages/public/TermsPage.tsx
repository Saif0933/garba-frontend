import React from 'react';
import { ShieldCheck, FileText } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex items-center gap-3 pb-4 border-b border-purple-100">
        <div className="p-3 rounded-2xl bg-purple-100 text-purple-700">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-purple-950 font-heading">
            Terms & Conditions of Service
          </h1>
          <p className="text-xs text-slate-500">Last updated: September 2026</p>
        </div>
      </div>

      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-purple-100 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h3 className="text-base font-bold text-slate-900">1. Eligibility & 18+ Age Requirement</h3>
          <p>
            You must be at least 18 years old to register for an account and participate in partner discovery on GarbaMitra. Any user found to misrepresent their age will have their account immediately terminated.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-slate-900">2. Festival Platform Purpose</h3>
          <p>
            GarbaMitra is designed solely as a festival discovery tool to assist attendees in matching with partners and groups for public events. GarbaMitra does not organize the physical festival venues unless explicitly stated.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-slate-900">3. Conduct & Public Ground Safety</h3>
          <p>
            All physical meetups must take place inside public event grounds. Users are solely responsible for verifying the authenticity of individuals they interact with. Zero tolerance is enforced for harassment, non-consensual behavior, or financial solicitations.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-slate-900">4. Payments & Subscriptions</h3>
          <p>
            Festival passes provide enhanced digital matching features (such as priority spotlight and unlimited requests). Digital pass purchases are non-refundable once activated for a festival season.
          </p>
        </section>
      </div>
    </div>
  );
};
