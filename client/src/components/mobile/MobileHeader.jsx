import React from 'react';
import { GraduationCap, Bell, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useProfile } from '../../contexts/ProfileContext';

const MobileHeader = () => {
  const { logout } = useAuth();
  const { lang, setLang, darkMode, toggleDarkMode } = useLanguage();
  const { profile } = useProfile();

  const getInitials = (name) => {
    if (!name || typeof name !== 'string') return 'U';
    return name.split(' ').map((n) => n[0] || '').join('').toUpperCase().substring(0, 2) || 'U';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 h-14 flex items-center justify-between px-4 transition-colors">
      
      {/* Brand Logo */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-sm">
          <GraduationCap className="w-5 h-5" />
        </div>
        <span className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
          Scholar<span className="text-brand-600 dark:text-brand-400">Seek</span>
        </span>
      </div>

      {/* Right Action Bar */}
      <div className="flex items-center space-x-2">
        
        {/* Language selector */}
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 rounded-lg px-2 py-1 outline-none border border-transparent dark:border-slate-700 cursor-pointer"
        >
          <option value="English" className="dark:bg-slate-900">EN</option>
          <option value="Hindi" className="dark:bg-slate-900">HI</option>
          <option value="Gujarati" className="dark:bg-slate-900">GU</option>
        </select>

        {/* Dark mode */}
        <button
          onClick={toggleDarkMode}
          className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          title={darkMode ? "Light Mode" : "Dark Mode"}
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-brand-600" />}
        </button>

        {/* Notifications */}
        <button className="relative p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Avatar / Logout */}
        <div className="flex items-center space-x-1 pl-1.5 border-l border-slate-200 dark:border-slate-800">
          <div className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300 flex items-center justify-center font-bold text-xs">
            {getInitials(profile?.name)}
          </div>
          <button
            onClick={logout}
            title="Logout"
            className="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};

export default MobileHeader;
