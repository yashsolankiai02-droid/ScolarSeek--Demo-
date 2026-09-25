import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Search, Bookmark, FileText, User } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const BottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useLanguage();

  const tabs = [
    { name: t('dashboard'), path: '/dashboard', icon: LayoutDashboard },
    { name: t('explore'), path: '/search', icon: Search },
    { name: t('saved'), path: '/saved', icon: Bookmark },
    { name: t('applications'), path: '/applications', icon: FileText },
    { name: t('profile'), path: '/profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 shadow-2xl pb-[env(safe-area-inset-bottom)] transition-colors">
      <div className="flex h-16 items-center px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentPath === tab.path;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-all ${
                isActive 
                  ? 'text-brand-600 dark:text-brand-400 font-bold scale-105' 
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              <div className={`p-1 rounded-xl transition-all ${
                isActive ? 'bg-brand-50 dark:bg-brand-950/60' : 'bg-transparent'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5 font-medium truncate px-1">{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
