import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Partner Discovery Support');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    showToast('Message Sent Successfully! 📨', 'Our support desk will respond within 24 hours.', 'success');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-black text-purple-950 font-heading">
          Get in Touch with GarbaMitra
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Have a question about partner matching, organizer partnerships, or safety? We’re here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-900 via-[#370e5a] to-[#1d0733] text-white shadow-xl space-y-6">
          <h3 className="text-xl font-bold font-heading">Support & Partnerships</h3>
          <p className="text-xs text-purple-200/80 leading-relaxed">
            Reach out to our dedicated operations and festival venue coordination team.
          </p>

          <div className="space-y-4 text-xs text-purple-100">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-pink-400 mt-0.5" />
              <div>
                <span className="block font-bold">Email Support</span>
                <span>support@garbamitra.com</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-amber-400 mt-0.5" />
              <div>
                <span className="block font-bold">Organizer Helpline</span>
                <span>+91 98111 22334 (Mon-Sat, 10 AM - 8 PM)</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-purple-400 mt-0.5" />
              <div>
                <span className="block font-bold">Headquarters</span>
                <span>Festival Arts Innovation Hub, Morabadi, Ranchi 834008</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-purple-100 shadow-sm">
          {sent ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">Message Delivered!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you for contacting GarbaMitra. Our team will get back to you shortly.
              </p>
              <button
                onClick={() => setSent(false)}
                className="py-2.5 px-6 rounded-full font-bold text-xs text-purple-900 bg-purple-50"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aarohi Verma"
                    className="w-full p-3 rounded-xl border border-purple-200 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full p-3 rounded-xl border border-purple-200 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Inquiry Type</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-3 rounded-xl border border-purple-200 bg-white"
                >
                  <option value="Partner Discovery Support">Partner Discovery Support</option>
                  <option value="Event Organizer Tie-Up">Event Organizer Tie-Up / Listing</option>
                  <option value="Safety & Verification Issue">Safety & Verification Issue</option>
                  <option value="Press & Media">Press & Media</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help make your festival experience smoother?"
                  className="w-full p-3 rounded-xl border border-purple-200 bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl font-bold text-sm text-white festive-gradient hover:opacity-95 shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
