import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';
import { useAuth } from '../contexts/AuthContext';
import { User, BookOpen, Banknote, ShieldCheck, AlertCircle, Save, LogOut } from 'lucide-react';

export default function Profile() {
  const { profile, updateProfile, completionPercentage, runMockVerification } = useProfile();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert('Profile saved successfully! Searching scholarships matched for you...');
    navigate('/search');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      
      {/* Header & Completion */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Student Profile</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Complete your profile to unlock personalized scholarship matching.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl shadow-sm flex items-center space-x-4">
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 transform -rotate-90">
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-100 dark:text-gray-700" />
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" 
                strokeDasharray={125} 
                strokeDashoffset={125 - (125 * completionPercentage) / 100}
                className="text-brand-600 dark:text-brand-400 transition-all duration-1000 ease-out" 
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-900 dark:text-white">
              {completionPercentage}%
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900 dark:text-white">Profile Completion</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Based on required fields</div>
          </div>
        </div>
      </div>

      {/* Mock Verification Banner */}
      <div className="bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <ShieldCheck className="w-6 h-6 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Prototype Government Verification</h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
              Demonstrates integration with UIDAI, DigiLocker, and APAAR. Checks your entered details against official records.
            </p>
          </div>
        </div>
        <button 
          onClick={runMockVerification}
          className="shrink-0 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          Run Demo Verification
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Personal Info */}
        <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
            <User className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Personal Information</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input type="text" value={profile.name} onChange={e => updateProfile({name: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none" placeholder="As per Aadhaar" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Age</label>
                <input type="number" value={profile.age} onChange={e => updateProfile({age: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Gender</label>
                <select value={profile.gender} onChange={e => updateProfile({gender: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none">
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">State of Domicile</label>
              <select value={profile.state} onChange={e => updateProfile({state: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none">
                <option value="">Select State</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="UP">UP</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">District</label>
              <input type="text" value={profile.district} onChange={e => updateProfile({district: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none" />
            </div>
          </div>
          {profile.verificationStatus.identity === 'verified' && (
            <div className="mt-4 text-xs font-semibold text-emerald-600 dark:text-emerald-300 flex items-center bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 w-fit px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 mr-1.5" /> Identity Verified via Mock API
            </div>
          )}
        </section>

        {/* Education Info */}
        <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
            <BookOpen className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Current Education</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Education Level</label>
              <select value={profile.educationLevel} onChange={e => updateProfile({educationLevel: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none">
                <option value="">Select Level</option>
                <option value="Undergraduate">Undergraduate (UG)</option>
                <option value="Postgraduate">Postgraduate (PG)</option>
                <option value="Diploma">Diploma</option>
                <option value="Ph.D.">Ph.D.</option>
                <option value="Schooling">Schooling (Class 1-12)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Course / Degree</label>
              <input type="text" value={profile.course} onChange={e => updateProfile({course: e.target.value})} placeholder="e.g. B.Tech Computer Science" className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Institution Name</label>
              <input type="text" value={profile.institution} onChange={e => updateProfile({institution: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Current Year/Semester</label>
              <input type="text" value={profile.year} onChange={e => updateProfile({year: e.target.value})} placeholder="e.g. 2nd Year" className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none" />
            </div>
          </div>
          {profile.verificationStatus.academic === 'verified' && (
            <div className="mt-4 text-xs font-semibold text-emerald-600 dark:text-emerald-300 flex items-center bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 w-fit px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 mr-1.5" /> Academic Records Verified via Mock API
            </div>
          )}
        </section>

        {/* Eligibility Criteria */}
        <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
            <Banknote className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Eligibility Criteria</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Social Category</label>
              <select value={profile.category} onChange={e => updateProfile({category: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none">
                <option value="">Select Category</option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
              </select>
              {profile.verificationStatus.category === 'verified' && (
                <div className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-300 flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1" /> Category Verified
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Annual Family Income</label>
              <select value={profile.annualIncome} onChange={e => updateProfile({annualIncome: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none">
                <option value="">Select Range</option>
                <option value="< 3 Lakhs">Less than ₹3 Lakhs</option>
                <option value="3-6 Lakhs">₹3 - 6 Lakhs</option>
                <option value="6-10 Lakhs">₹6 - 10 Lakhs</option>
                <option value="10-15 Lakhs">₹10 - 15 Lakhs</option>
                <option value="> 15 Lakhs">More than ₹15 Lakhs</option>
              </select>
              {profile.verificationStatus.income === 'manual_review' && (
                <div className="mt-2 text-xs font-semibold text-amber-600 dark:text-amber-300 flex items-start bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-lg border border-amber-200 dark:border-amber-800">
                  <AlertCircle className="w-4 h-4 mr-1.5 shrink-0 mt-0.5" />
                  <span>Manual Review Required: Mock verification API could not automatically match income records. Please upload an official Income Certificate.</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Submit */}
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button type="submit" className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg shadow-sm flex items-center space-x-2 transition-colors">
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>

      </form>

      {/* Logout */}
      <div className="pt-6 border-t border-gray-200 mt-6">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout &amp; Clear Profile</span>
        </button>
      </div>
    </div>
  );
}
