import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_PRICING_PLANS } from '../../data/mockData';
import { paymentService } from '../../services/paymentService';
import { Sparkles, Check, Crown, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { currentUser, upgradeSubscription, showToast } = useApp();
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);

  const handleSelectPlan = async (planId: string, planName: string, amount: number) => {
    setProcessingPlanId(planId);
    try {
      const result = await paymentService.processPayment({
        planId,
        planName,
        amount,
        userName: currentUser?.name || 'Festival Dancer',
        userEmail: currentUser?.email || 'user@garbamitra.com',
        userPhone: currentUser?.phone || '9876543210'
      });

      if (result.success) {
        upgradeSubscription(planId);
      }
    } catch (e) {
      showToast('Payment processing error', 'Please try again', 'error');
    } finally {
      setProcessingPlanId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <Crown className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
          Festival Passes & Upgrades
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-purple-950 font-heading">
          Unlock Your Full Garba Experience
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          From a single high-energy Dandiya night to full 9-day Navratri festival passes, get unlimited partner matching, spotlight priority, and squad access.
        </p>
      </div>

      {/* Free vs Premium comparison overview */}
      <div className="p-6 rounded-3xl bg-purple-50/80 border border-purple-100 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h3 className="font-bold text-sm text-purple-950 uppercase tracking-wide">
            🌱 Free Starter Membership
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-600">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Create verified festival profile</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Browse attendees in your city</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Send up to 3 daily partner requests</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Safe in-app chat after mutual match</span>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-sm text-pink-700 uppercase tracking-wide flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>✨ Premium Festival Pass Benefits</span>
          </h3>
          <ul className="space-y-1.5 text-xs text-purple-950 font-medium">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-pink-600" />
              <span><strong>Unlimited</strong> partner requests across all cities</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-pink-600" />
              <span><strong>Profile Boost:</strong> 3x more visibility on event cards</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-pink-600" />
              <span><strong>Squad Access:</strong> Create and join unlimited dance squads</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-pink-600" />
              <span><strong>See Who Liked You:</strong> View requests instantly</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 4 Pricing Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_PRICING_PLANS.map((plan) => {
          const isFeatured = plan.isPopular;
          const isCurrentActive = currentUser?.isPremium && currentUser?.premiumPlan === plan.name;
          const isLoading = processingPlanId === plan.id;

          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between ${
                isFeatured
                  ? 'bg-gradient-to-b from-[#2e0e4c] to-[#1a052e] text-white shadow-2xl ring-2 ring-pink-500 transform lg:-translate-y-2'
                  : 'bg-white text-slate-900 border border-purple-100 shadow-sm hover:shadow-xl'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-pink-500 to-amber-500 text-white text-[11px] font-black uppercase tracking-wider shadow-md whitespace-nowrap">
                  {plan.badge}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className={`text-lg font-bold font-heading ${isFeatured ? 'text-white' : 'text-purple-950'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-xs mt-1 leading-relaxed ${isFeatured ? 'text-purple-200/80' : 'text-slate-500'}`}>
                    {plan.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="py-2 border-y border-purple-100/20">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black font-heading">₹{plan.price}</span>
                    <span className={`text-xs ${isFeatured ? 'text-purple-300' : 'text-slate-500'}`}>
                      / {plan.duration}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-2.5 pt-2 text-xs">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isFeatured ? 'text-amber-400' : 'text-emerald-600'}`} />
                      <span className={isFeatured ? 'text-purple-100' : 'text-slate-700'}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-6">
                {isCurrentActive ? (
                  <button
                    disabled
                    className="w-full py-3 rounded-2xl font-bold text-xs bg-emerald-100 text-emerald-800 flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4 text-emerald-600" />
                    Current Plan ✓
                  </button>
                ) : (
                  <button
                    onClick={() => handleSelectPlan(plan.id, plan.name, plan.price)}
                    disabled={isLoading}
                    className={`w-full py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm transition-transform active:scale-95 flex items-center justify-center gap-2 ${
                      isFeatured
                        ? 'festive-gradient text-white shadow-lg shadow-pink-500/30 hover:opacity-95'
                        : 'bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    {isLoading ? 'Activating...' : `Get ${plan.name}`}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Payment Security Assurance */}
      <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-sm max-w-2xl mx-auto text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-purple-900">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Instant Activation · 100% Encrypted Payment Service</span>
        </div>
        <p className="text-[11px] text-slate-500">
          Demo Mode: Clicking any pass instantly activates your simulated premium benefits with instant test transaction confirmation.
        </p>
      </div>
    </div>
  );
};
