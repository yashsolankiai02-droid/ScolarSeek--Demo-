import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Search, Bookmark, FileText, User, GraduationCap, LogOut, Sun, Moon } from 'lucide-react';
import { useProfile } from '../../contexts/ProfileContext';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

const Sidebar = () => {
  const location = useLocation();
  const { completionPercentage } = useProfile();
  const { logout } = useAuth();
  const { t, darkMode, toggleDarkMode } = useLanguage();

  const navItems = [
    { path: '/dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { path: '/search', label: t('explore'), icon: Search },
    { path: '/saved', label: t('saved'), icon: Bookmark },
    { path: '/applications', label: t('applications'), icon: FileText },
    { path: '/profile', label: t('profile'), icon: User },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 z-30 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 flex flex-col transition-colors">
      <div className="flex items-center gap-2 p-6 border-b border-gray-200 dark:border-gray-800">
        <GraduationCap className="h-8 w-8 text-brand-600 dark:text-brand-400" />
        <span className="text-xl font-bold text-gray-900 dark:text-white">ScholarSeek</span>
      </div>

      <nav className="flex-1 py-6 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-6 py-3 mx-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 font-semibold border-r-2 border-brand-600'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-gray-200 dark:border-gray-800 space-y-4">
        {/* Theme Switcher Button */}
        <button
          onClick={toggleDarkMode}
          className="flex items-center justify-between w-full px-3 py-2 text-xs font-bold rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <span className="flex items-center space-x-2">
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-brand-600" />}
            <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
          </span>
          <span className="text-[10px] text-gray-400 uppercase font-bold">Toggle</span>
        </button>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('profileCompletion')}</span>
            <span className="text-sm font-bold text-brand-600 dark:text-brand-400">{completionPercentage || 0}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
            <div
              className="bg-brand-600 h-2 rounded-full transition-all"
              style={{ width: `${completionPercentage || 0}%` }}
            ></div>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>{t('logout')}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
