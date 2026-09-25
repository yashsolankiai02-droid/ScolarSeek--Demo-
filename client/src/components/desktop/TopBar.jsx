import React from 'react';
import { Search, Bell, LogOut, Sun, Moon, Globe } from 'lucide-react';
import { useProfile } from '../../contexts/ProfileContext';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

const TopBar = ({ title }) => {
  const { profile } = useProfile();
  const { logout } = useAuth();
  const { lang, setLang, darkMode, toggleDarkMode } = useLanguage();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="sticky top-0 z-20 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 h-16 flex items-center justify-between px-8 transition-colors">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h1>

      <div className="flex items-center gap-3">
        
        {/* Language Selector */}
        <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-900 border border-transparent dark:border-gray-800 px-2.5 py-1.5 rounded-xl text-xs font-semibold">
          <Globe className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-transparent text-gray-700 dark:text-gray-200 outline-none cursor-pointer"
          >
            <option value="English" className="dark:bg-black text-gray-900 dark:text-white">English</option>
            <option value="Hindi" className="dark:bg-black text-gray-900 dark:text-white">हिन्दी</option>
            <option value="Gujarati" className="dark:bg-black text-gray-900 dark:text-white">ગુજરાતી</option>
          </select>
        </div>

        {/* Dark / Normal Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 border border-transparent dark:border-gray-800 text-xs font-bold text-gray-700 dark:text-gray-200 rounded-xl transition-colors cursor-pointer"
        >
          {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-brand-600" />}
          <span>{darkMode ? 'Dark' : 'Light'}</span>
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white dark:border-black"></span>
        </button>

        {/* User Profile & Logout */}
        <div className="flex items-center gap-3 border-l border-gray-200 dark:border-gray-800 pl-4">
          <div className="w-9 h-9 rounded-full bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 flex items-center justify-center font-bold text-sm">
            {getInitials(profile?.name)}
          </div>
          <button
            onClick={logout}
            title="Logout"
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors flex items-center gap-1 text-sm font-medium"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
