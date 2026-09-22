import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap, Mail, Lock, User, Eye, EyeOff, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSuperAdminQuickLogin = async () => {
    setError('');
    setEmail('yashsolanki@scholarseek.ac.in');
    setPassword('saumya2');
    const result = await login('yashsolanki@scholarseek.ac.in', 'saumya2');
    if (result.success) {
      window.location.href = '/admin';
    }
  };

  const handleStudentQuickLogin = async () => {
    setError('');
    setEmail('student@scholarseek.ac.in');
    setPassword('student123');
    const result = await login('student@scholarseek.ac.in', 'student123');
    if (result.success) {
      window.location.href = '/dashboard';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isSignUp) {
      if (!name.trim()) { setError('Please enter your name.'); setLoading(false); return; }
      if (!email.trim()) { setError('Please enter your email.'); setLoading(false); return; }
      if (password.length < 4) { setError('Password must be at least 4 characters.'); setLoading(false); return; }
      
      const result = await signup(email.trim(), password, name.trim());
      if (result.success) {
        window.location.href = '/profile';
      } else {
        setError(result.error);
      }
    } else {
      if (!email.trim() || !password) { setError('Please enter email and password.'); setLoading(false); return; }
      
      const result = await login(email.trim(), password);
      if (result.success) {
        if (result.user?.role === 'super_admin' || result.user?.email?.includes('scholarseek.ac.in')) {
          window.location.href = '/admin';
        } else {
          window.location.href = '/dashboard';
        }
      } else {
        setError(result.error || 'Login failed.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-4 py-12 transition-colors selection:bg-brand-500 selection:text-white">
      
      {/* Brand Header */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-3 bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-600 rounded-2xl text-white shadow-lg">
          <GraduationCap className="w-8 h-8" />
        </div>
        <div>
          <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Scholar<span className="text-brand-600 dark:text-brand-400">Seek</span>
          </span>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">Unified Student Scholarship Portal</p>
        </div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-xl p-8 transition-colors">
        
        {/* Toggle Login vs Create Account */}
        <div className="flex bg-slate-100 dark:bg-slate-800/80 rounded-2xl p-1.5 mb-6">
          <button
            onClick={() => { setIsSignUp(false); setError(''); }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
              !isSignUp 
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setIsSignUp(true); setError(''); }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
              isSignUp 
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* 1-Click Quick Login Banner */}
        <div className="mb-6 p-3 bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 rounded-2xl space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-700 dark:text-brand-300 block flex items-center">
            <Sparkles className="w-3 h-3 mr-1 text-amber-500" />
            Quick Demo Login Shortcuts
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleSuperAdminQuickLogin}
              type="button"
              className="py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold rounded-xl shadow-xs flex items-center justify-center space-x-1 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Super Admin</span>
            </button>
            <button
              onClick={handleStudentQuickLogin}
              type="button"
              className="py-2 px-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 text-[11px] font-bold rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-center space-x-1 transition-colors"
            >
              <User className="w-3.5 h-3.5 text-brand-600" />
              <span>Demo Student</span>
            </button>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
          {isSignUp ? 'Create your account' : 'Welcome back'}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          {isSignUp
            ? 'Sign up to match scholarships tailored to your eligibility profile.'
            : 'Enter credentials below or tap a quick login shortcut.'
          }
        </p>

        {/* Error Notification */}
        {error && (
          <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name (Sign Up only) */}
          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Name"
                  className="w-full h-11 pl-10 pr-4 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className="w-full h-11 pl-10 pr-4 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full h-11 pl-10 pr-11 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-bold rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md disabled:opacity-60 text-xs"
          >
            <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Toggle */}
        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button
            onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
            className="ml-1 text-brand-600 dark:text-brand-400 font-bold hover:underline"
          >
            {isSignUp ? 'Sign In' : 'Create One'}
          </button>
        </p>
      </div>

    </div>
  );
}
