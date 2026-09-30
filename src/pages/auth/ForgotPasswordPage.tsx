import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GarbaLogo } from '../../components/common/GarbaLogo';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('user@garbamitra.com');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-purple-100 shadow-2xl space-y-6 text-center">
        <div className="flex justify-center mb-2">
          <GarbaLogo size="lg" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-black text-purple-950 font-heading">
            Reset Your Password
          </h1>
          <p className="text-xs text-slate-500">
            Enter your registered email address to receive password recovery instructions.
          </p>
        </div>

        {sent ? (
          <div className="py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">Reset Link Sent</h3>
            <p className="text-xs text-slate-600">
              We've sent a recovery link to <strong>{email}</strong>. Please check your inbox.
            </p>
            <div className="pt-2">
              <Link
                to="/login"
                className="inline-block py-2.5 px-6 rounded-full font-bold text-xs text-purple-900 bg-purple-50"
              >
                Back to Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs text-left">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@garbamitra.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl font-bold text-sm text-white festive-gradient hover:opacity-95 shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2"
            >
              <span>Send Recovery Link</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="pt-2 border-t border-purple-50 text-xs text-slate-500">
          <Link to="/login" className="font-bold text-purple-700 hover:text-purple-900">
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
