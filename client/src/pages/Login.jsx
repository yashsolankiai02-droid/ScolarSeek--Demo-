import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { GraduationCap, Mail, Lock, User, Eye, EyeOff, ArrowRight, ShieldCheck, Sparkles, Sun, Moon, Globe } from 'lucide-react';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup } = useAuth();
  const { lang, setLang, darkMode, toggleDarkMode } = useLanguage();
  const navigate = useNavigate();

  const handleSuperAdminQuickLogin = async () => {
    setError('');
    setEmail('yashsolanki@scholarseek.ac.in');
    setPassword('saumya2');
    const result = await login('yashsolanki@scholarseek.ac.in', 'saumya2');
    if (result.success) {
      navigate('/admin');
    }
  };

  const handleStudentQuickLogin = async () => {
    setError('');
    setEmail('student@scholarseek.ac.in');
    setPassword('student123');
    const result = await login('student@scholarseek.ac.in', 'student123');
    if (result.success) {
      navigate('/dashboard');
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
        navigate('/profile');
      } else {
        setError(result.error || 'Registration failed.');
      }
    } else {
      if (!email.trim() || !password) { setError('Please enter email and password.'); setLoading(false); return; }
      
      const result = await login(email.trim(), password);
      if (result.success) {
        const userRole = (result.user?.role || '').toLowerCase();
        const userEmail = (result.user?.email || '').toLowerCase();
        const isAdminUser = userRole.includes('admin') || userRole.includes('administrator') || userRole.includes('super') || userEmail === 'yashsolanki@scholarseek.ac.in';
        
        if (isAdminUser) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(result.error || 'Login failed.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 text-slate-100 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden selection:bg-brand-500 selection:text-white transition-colors duration-300">
      
      {/* Top Controls: Dark Mode & Language Selector */}
      <div className="absolute top-5 right-5 z-20 flex items-center space-x-3">
        {/* Language Selector */}
        <div className="flex items-center space-x-1.5 bg-slate-800/80 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-200 shadow-md">
          <Globe className="w-3.5 h-3.5 text-indigo-400" />
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-transparent text-slate-100 outline-none cursor-pointer font-bold"
          >
            <option value="English" className="bg-slate-900 text-white">English</option>
            <option value="Hindi" className="bg-slate-900 text-white">हिन्दी</option>
            <option value="Gujarati" className="bg-slate-900 text-white">ગુજરાતી</option>
          </select>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleDarkMode}
          type="button"
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur-md border border-slate-700/80 text-xs font-black text-white rounded-xl transition-all shadow-md cursor-pointer active:scale-95"
        >
          {darkMode ? <Sun className="h-4 w-4 text-amber-400 animate-spin-slow" /> : <Moon className="h-4 w-4 text-indigo-400" />}
          <span>{darkMode ? 'Dark' : 'Light'}</span>
        </button>
      </div>

      {/* Decorative Vibrant Multi-Colored Ambient Gradient Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-brand-500/30 via-purple-600/30 to-pink-500/25 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/25 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/25 rounded-full blur-[110px] pointer-events-none" />

      {/* Brand Header */}
      <div className="relative z-10 flex items-center space-x-3.5 mb-8">
        <div className="p-3.5 bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-600 rounded-2xl text-white shadow-xl shadow-indigo-500/30 ring-2 ring-white/20">
          <GraduationCap className="w-8 h-8" />
        </div>
        <div>
          <span className="text-3xl font-black text-white tracking-tight flex items-center">
            Scholar<span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent ml-0.5">Seek</span>
          </span>
          <p className="text-xs font-bold text-slate-300 mt-0.5 tracking-wide">Unified Student Scholarship Platform</p>
        </div>
      </div>

      {/* Main Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-md bg-slate-900/90 backdrop-blur-2xl border border-slate-700/80 rounded-3xl shadow-2xl p-8 transition-all ring-1 ring-white/10">
        
        {/* Toggle Login vs Create Account */}
        <div className="flex bg-slate-950/80 rounded-2xl p-1.5 mb-6 border border-slate-800">
          <button
            onClick={() => { setIsSignUp(false); setError(''); }}
            type="button"
            className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
              !isSignUp 
                ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-600/40' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setIsSignUp(true); setError(''); }}
            type="button"
            className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
              isSignUp 
                ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-600/40' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* 1-Click Quick Demo Shortcuts Banner */}
        <div className="mb-6 p-4 bg-gradient-to-r from-slate-950 via-indigo-950/70 to-slate-950 border border-indigo-500/40 rounded-2xl space-y-3 shadow-inner">
          <span className="text-[11px] font-black uppercase tracking-wider text-indigo-300 flex items-center">
            <Sparkles className="w-4 h-4 mr-1.5 text-amber-400 animate-pulse" />
            Instant Demo Logins
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleSuperAdminQuickLogin}
              type="button"
              className="py-2.5 px-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white text-[11px] font-black rounded-xl shadow-lg shadow-indigo-600/40 flex items-center justify-center space-x-1.5 transition-all cursor-pointer border border-white/20 active:scale-95"
            >
              <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Super Admin</span>
            </button>
            <button
              onClick={handleStudentQuickLogin}
              type="button"
              className="py-2.5 px-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white text-[11px] font-black rounded-xl shadow-lg shadow-emerald-600/40 flex items-center justify-center space-x-1.5 transition-all cursor-pointer border border-white/20 active:scale-95"
            >
              <User className="w-4 h-4 text-emerald-200 shrink-0" />
              <span>Demo Student</span>
            </button>
          </div>
        </div>

        <h2 className="text-xl font-black text-white mb-1 tracking-tight">
          {isSignUp ? 'Create your account' : 'Welcome back'}
        </h2>
        <p className="text-xs font-semibold text-slate-300 mb-6">
          {isSignUp
            ? 'Sign up to match scholarships tailored to your eligibility profile.'
            : 'Enter credentials below or tap a quick login shortcut.'
          }
        </p>

        {/* Error Notification */}
        {error && (
          <div className="bg-red-950/80 border border-red-600 text-red-200 text-xs font-bold px-4 py-3 rounded-xl mb-6 flex items-center space-x-2 shadow-lg">
            <span>⚠️ {error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name (Sign Up only) */}
          {isSignUp && (
            <div>
              <label htmlFor="login-name-input" className="block text-xs font-bold text-slate-200 mb-1.5 cursor-pointer">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 pointer-events-none z-10" />
                <input
                  id="login-name-input"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Name"
                  className="w-full h-11 pl-10 pr-4 bg-slate-800/90 border border-slate-600 rounded-xl text-sm font-bold text-white placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all cursor-text relative z-0"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label htmlFor="login-email-input" className="block text-xs font-bold text-slate-200 mb-1.5 cursor-pointer">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 pointer-events-none z-10" />
              <input
                id="login-email-input"
                name="email"
                type="email"
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className="w-full h-11 pl-10 pr-4 bg-slate-800/90 border border-slate-600 rounded-xl text-sm font-bold text-white placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all cursor-text relative z-0"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="login-password-input" className="block text-xs font-bold text-slate-200 mb-1.5 cursor-pointer">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 pointer-events-none z-10" />
              <input
                id="login-password-input"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full h-11 pl-10 pr-11 bg-slate-800/90 border border-slate-600 rounded-xl text-sm font-bold text-white placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all cursor-text relative z-0"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white z-10 p-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 active:from-brand-700 text-white font-black rounded-xl flex items-center justify-center space-x-2 transition-all shadow-xl shadow-indigo-600/40 disabled:opacity-60 text-xs tracking-wider uppercase cursor-pointer mt-2 border border-white/20 active:scale-95"
          >
            <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Toggle */}
        <p className="text-center text-xs font-semibold text-slate-300 mt-6 pt-4 border-t border-slate-800">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button
            onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
            className="ml-1 text-indigo-400 font-extrabold hover:text-indigo-300 hover:underline cursor-pointer"
          >
            {isSignUp ? 'Sign In' : 'Create One'}
          </button>
        </p>
      </div>

    </div>
  );
}
