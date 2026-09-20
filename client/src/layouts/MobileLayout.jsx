import React from 'react';
import MobileHeader from '../components/mobile/MobileHeader';
import BottomNav from '../components/mobile/BottomNav';

const MobileLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors antialiased selection:bg-brand-500 selection:text-white">
      <MobileHeader />
      <main className="flex-1 pb-24 bg-slate-50 dark:bg-slate-950 transition-colors">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default MobileLayout;
