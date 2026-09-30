import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { GarbaLogo } from '../../components/common/GarbaLogo';
import { User, Mail, Phone, Calendar, MapPin, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { registerUser, cities } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('2002-08-15');
  const [city, setCity] = useState('Ranchi');
  const [is18Plus, setIs18Plus] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [error, setError] = useState('');

  // Calculate age from DOB
  const calculateAge = (dobString: string): number => {
    const birthDate = new Date(dobString);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const calculatedAge = calculateAge(dob);
    if (calculatedAge < 18 || !is18Plus) {
      setError('GarbaMitra Partner Matching is strictly available for users 18+.');
      return;
    }

    if (!agreeTerms || !agreePrivacy) {
      setError('You must agree to the Terms & Conditions and Privacy Policy.');
      return;
    }

    // Save temporary registration state in sessionStorage & navigate to OTP
    sessionStorage.setItem(
      'garbamitra_pending_reg',
      JSON.stringify({
        name,
        mobile,
        email,
        age: calculatedAge,
        dateOfBirth: dob,
        city
      })
    );

    navigate('/verify-otp');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-3xl p-8 sm:p-10 border border-purple-100 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <GarbaLogo size="lg" />
          </div>
          <h1 className="text-2xl font-black text-purple-950 font-heading">
            Join the Festival Community
          </h1>
          <p className="text-xs text-slate-500">
            Create your account to discover verified festival dance partners.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4 text-xs">
          {/* Name */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aarohi Verma"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
              />
            </div>
          </div>

          {/* Mobile & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Mobile Number (Private)</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
                />
              </div>
            </div>
          </div>

          {/* DOB (18+) & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Date of Birth (18+)</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Festival City</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white font-semibold cursor-pointer"
                >
                  {cities.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Mandatory Checkboxes */}
          <div className="space-y-2.5 pt-2 border-t border-purple-100">
            <label className="flex items-start gap-2.5 cursor-pointer text-[11px] text-slate-700">
              <input
                type="checkbox"
                required
                checked={is18Plus}
                onChange={(e) => setIs18Plus(e.target.checked)}
                className="w-4 h-4 rounded text-pink-600 accent-pink-600 mt-0.5 cursor-pointer"
              />
              <span className="font-bold">
                I am 18 years of age or older. (Mandatory for festival partner matching)
              </span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer text-[11px] text-slate-700">
              <input
                type="checkbox"
                required
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 rounded text-pink-600 accent-pink-600 mt-0.5 cursor-pointer"
              />
              <span>
                I agree to the <Link to="/terms" className="text-pink-600 font-bold underline">Terms & Conditions</Link>.
              </span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer text-[11px] text-slate-700">
              <input
                type="checkbox"
                required
                checked={agreePrivacy}
                onChange={(e) => setAgreePrivacy(e.target.checked)}
                className="w-4 h-4 rounded text-pink-600 accent-pink-600 mt-0.5 cursor-pointer"
              />
              <span>
                I have read the <Link to="/privacy" className="text-pink-600 font-bold underline">Privacy Policy</Link>.
              </span>
            </label>

            {/* Separate optional marketing checkbox */}
            <label className="flex items-start gap-2.5 cursor-pointer text-[11px] text-slate-500 pt-1">
              <input
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                className="w-4 h-4 rounded text-pink-600 accent-pink-600 mt-0.5 cursor-pointer"
              />
              <span>Send me festival passes and exclusive event alerts. (Optional)</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl font-bold text-sm text-white festive-gradient hover:opacity-95 shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <span>Continue to OTP Verification</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-purple-50 text-xs text-slate-500">
          <span>Already have an account? </span>
          <Link to="/login" className="font-bold text-pink-600 hover:text-pink-700">
            Sign In →
          </Link>
        </div>
      </div>
    </div>
  );
};
