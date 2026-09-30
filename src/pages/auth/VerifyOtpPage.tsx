import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { GarbaLogo } from '../../components/common/GarbaLogo';
import { ShieldCheck, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const VerifyOtpPage: React.FC = () => {
  const { registerUser } = useApp();
  const navigate = useNavigate();

  const [otp, setOtp] = useState('123456');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otp !== '123456') {
      setError('Invalid OTP code. Please enter 123456 for the demo.');
      return;
    }

    setIsVerifying(true);
    const pendingData = sessionStorage.getItem('garbamitra_pending_reg');
    const userData = pendingData ? JSON.parse(pendingData) : { name: 'Festival Dancer', email: 'user@garbamitra.com', city: 'Ranchi', age: 23 };

    await registerUser(userData);
    sessionStorage.removeItem('garbamitra_pending_reg');
    navigate('/profile/edit'); // Direct to profile completion wizard
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-purple-100 shadow-2xl space-y-6 text-center">
        <div className="flex justify-center mb-2">
          <GarbaLogo size="lg" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-black text-purple-950 font-heading">
            Verify Mobile Number
          </h1>
          <p className="text-xs text-slate-500">
            We sent a 6-digit verification code to your phone.
          </p>
        </div>

        {/* Demo OTP Helper Box */}
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            Demo OTP Code:
          </span>
          <code className="text-base font-black tracking-widest bg-amber-200/80 px-2 py-0.5 rounded-lg text-amber-950">
            123456
          </code>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              className="w-full text-center text-2xl font-black tracking-widest py-3.5 rounded-2xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full py-3.5 rounded-2xl font-bold text-sm text-white festive-gradient hover:opacity-95 shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
          >
            <span>{isVerifying ? 'Verifying...' : 'Verify & Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[11px] text-slate-400">
          Didn't receive code? <button type="button" onClick={() => setOtp('123456')} className="text-pink-600 font-bold underline">Resend Demo OTP</button>
        </p>
      </div>
    </div>
  );
};
