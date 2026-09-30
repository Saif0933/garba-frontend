import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { DanceLevel, LookingFor, GenderPreference } from '../../types';
import { Sparkles, ArrowRight, ArrowLeft, Check, User, Music, Users, Clock, Camera } from 'lucide-react';

export const EditProfilePage: React.FC = () => {
  const { currentUser, updateUserProfile, cities } = useApp();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [name, setName] = useState(currentUser?.name || 'Aarohi Verma');
  const [dob, setDob] = useState(currentUser?.dateOfBirth || '2003-05-14');
  const [gender, setGender] = useState(currentUser?.gender || 'Female');
  const [city, setCity] = useState(currentUser?.city || 'Ranchi');
  const [area, setArea] = useState(currentUser?.area || 'Morabadi / Lalpur');

  const [garbaLevel, setGarbaLevel] = useState<DanceLevel>(currentUser?.garbaLevel || 'Intermediate');
  const [dandiyaLevel, setDandiyaLevel] = useState<DanceLevel>(currentUser?.dandiyaLevel || 'Intermediate');
  const [danceStyle, setDanceStyle] = useState(currentUser?.danceStyle || 'Traditional');

  const [preferredGender, setPreferredGender] = useState<GenderPreference>(currentUser?.preferredGender || 'Any');
  const [ageMin, setAgeMin] = useState(currentUser?.preferredAgeMin || 20);
  const [ageMax, setAgeMax] = useState(currentUser?.preferredAgeMax || 30);
  const [lookingFor, setLookingFor] = useState<LookingFor[]>(currentUser?.lookingFor || ['Partner', 'Group']);

  const [availabilityDate, setAvailabilityDate] = useState('2026-10-18');
  const [startTime, setStartTime] = useState(currentUser?.availability?.startTime || '19:00');
  const [endTime, setEndTime] = useState(currentUser?.availability?.endTime || '23:30');

  const [bio, setBio] = useState(currentUser?.bio || 'Passionate about traditional 3-Taali & Dodhiya!');
  const [avatar, setAvatar] = useState(currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80');

  const toggleLookingFor = (item: LookingFor) => {
    if (lookingFor.includes(item)) {
      if (lookingFor.length > 1) {
        setLookingFor(lookingFor.filter((i) => i !== item));
      }
    } else {
      setLookingFor([...lookingFor, item]);
    }
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save full profile
      updateUserProfile({
        name,
        dateOfBirth: dob,
        gender: gender as any,
        city,
        area,
        garbaLevel,
        dandiyaLevel,
        danceStyle: danceStyle as any,
        preferredGender,
        preferredAgeMin: ageMin,
        preferredAgeMax: ageMax,
        lookingFor,
        availability: {
          dates: [availabilityDate],
          startTime,
          endTime
        },
        bio,
        avatar,
        profileCompletion: 100
      });
      navigate('/profile');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80'
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Wizard Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-pink-600" />
          Multi-Step Profile Wizard
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-purple-950 font-heading">
          Edit Festival Profile
        </h1>
        <p className="text-xs text-slate-500">
          Step {currentStep} of 5 · Keep your dance style and event preferences up to date.
        </p>
      </div>

      {/* Progress Indicator Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
          <span>Step {currentStep} of 5</span>
          <span>{currentStep * 20}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-purple-100 overflow-hidden">
          <div
            className="h-full festive-gradient transition-all duration-300"
            style={{ width: `${currentStep * 20}%` }}
          />
        </div>
      </div>

      {/* Main Step Content Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl space-y-6">
        {/* STEP 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-purple-50">
              <User className="w-5 h-5 text-purple-600" />
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Step 1: Basic Information
              </h3>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-xl border border-purple-200 bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full p-3 rounded-xl border border-purple-200 bg-white"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full p-3 rounded-xl border border-purple-200 bg-white font-semibold"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Non-Binary">Non-Binary</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-3 rounded-xl border border-purple-200 bg-white font-semibold"
                >
                  {cities.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Area / Neighborhood</label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. Morabadi"
                  className="w-full p-3 rounded-xl border border-purple-200 bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Dance Preferences */}
        {currentStep === 2 && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-purple-50">
              <Music className="w-5 h-5 text-pink-600" />
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Step 2: Dance Preferences & Skill Levels
              </h3>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Garba Skill Level</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Beginner', 'Intermediate', 'Expert'] as DanceLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setGarbaLevel(lvl)}
                    className={`py-2.5 rounded-xl font-bold transition-colors ${
                      garbaLevel === lvl ? 'bg-purple-900 text-white shadow-sm' : 'bg-purple-50 text-slate-700 hover:bg-purple-100'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Dandiya Raas Skill Level</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Beginner', 'Intermediate', 'Expert'] as DanceLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setDandiyaLevel(lvl)}
                    className={`py-2.5 rounded-xl font-bold transition-colors ${
                      dandiyaLevel === lvl ? 'bg-pink-600 text-white shadow-sm' : 'bg-pink-50 text-slate-700 hover:bg-pink-100'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Preferred Dance / Outfit Style</label>
              <select
                value={danceStyle}
                onChange={(e) => setDanceStyle(e.target.value as any)}
                className="w-full p-3 rounded-xl border border-purple-200 bg-white font-semibold"
              >
                <option value="Traditional">Traditional Gujarati / Kutchi</option>
                <option value="Modern Bollywood">Modern Bollywood Beats</option>
                <option value="Fusion">Fusion</option>
                <option value="All Styles">All Styles</option>
              </select>
            </div>
          </div>
        )}

        {/* STEP 3: Partner Preferences */}
        {currentStep === 3 && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-purple-50">
              <Users className="w-5 h-5 text-amber-600" />
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Step 3: Partner Matching Preferences
              </h3>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Preferred Partner Gender</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Any', 'Female', 'Male'] as GenderPreference[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setPreferredGender(g)}
                    className={`py-2.5 rounded-xl font-bold transition-colors ${
                      preferredGender === g ? 'bg-purple-900 text-white' : 'bg-purple-50 text-slate-700'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Looking For (Select multiple)</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Partner', 'Group', 'New Friends'] as LookingFor[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleLookingFor(item)}
                    className={`py-2.5 rounded-xl font-bold transition-colors ${
                      lookingFor.includes(item) ? 'bg-pink-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Preferred Min Age</label>
                <input
                  type="number"
                  min={18}
                  max={40}
                  value={ageMin}
                  onChange={(e) => setAgeMin(parseInt(e.target.value) || 18)}
                  className="w-full p-2.5 rounded-xl border border-purple-200 bg-white"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Preferred Max Age</label>
                <input
                  type="number"
                  min={18}
                  max={50}
                  value={ageMax}
                  onChange={(e) => setAgeMax(parseInt(e.target.value) || 35)}
                  className="w-full p-2.5 rounded-xl border border-purple-200 bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Availability */}
        {currentStep === 4 && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-purple-50">
              <Clock className="w-5 h-5 text-purple-600" />
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Step 4: Festival Availability & Timing
              </h3>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Main Festival Date</label>
              <input
                type="date"
                value={availabilityDate}
                onChange={(e) => setAvailabilityDate(e.target.value)}
                className="w-full p-3 rounded-xl border border-purple-200 bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Arrival Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full p-3 rounded-xl border border-purple-200 bg-white"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Departure Time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full p-3 rounded-xl border border-purple-200 bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Bio & Photo */}
        {currentStep === 5 && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-purple-50">
              <Camera className="w-5 h-5 text-pink-600" />
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Step 5: Bio & Profile Photo
              </h3>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">About You / Festival Bio</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell potential partners about your favorite steps, songs, and what makes you excited for Navratri..."
                className="w-full p-3 rounded-xl border border-purple-200 bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Select Profile Photo</label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {sampleAvatars.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt="avatar option"
                    onClick={() => setAvatar(url)}
                    className={`aspect-square rounded-2xl object-cover cursor-pointer transition-all ${
                      avatar === url ? 'ring-4 ring-pink-500 scale-105' : 'opacity-70 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-purple-50">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="py-2.5 px-5 rounded-xl font-bold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Previous
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNext}
            className="py-2.5 px-6 rounded-xl font-bold text-xs sm:text-sm text-white festive-gradient hover:opacity-95 shadow-md shadow-pink-500/20 flex items-center gap-1.5 transition-transform active:scale-95"
          >
            <span>{currentStep === 5 ? 'Save & Finish' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
