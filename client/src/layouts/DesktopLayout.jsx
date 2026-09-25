import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/desktop/Sidebar';
import TopBar from '../components/desktop/TopBar';
import Footer from '../components/Footer';

const DesktopLayout = ({ children }) => {
  const location = useLocation();

  const getPageTitle = (pathname) => {
    if (pathname.startsWith('/dashboard')) return 'Dashboard';
    if (pathname.startsWith('/search')) return 'Explore Scholarships';
    if (pathname.startsWith('/saved')) return 'Saved Scholarships';
    if (pathname.startsWith('/applications')) return 'My Applications';
    if (pathname.startsWith('/profile')) return 'Student Profile';
    if (pathname.startsWith('/admin')) return 'Admin Panel';
    if (pathname.startsWith('/results')) return 'Search Results';
    if (pathname.startsWith('/scholarship/')) return 'Scholarship Details';
    return 'ScholarSeek';
  };

  const pageTitle = getPageTitle(location.pathname);

  return (
    <div className="flex min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <Sidebar />
      <div className="flex-1 ml-60 flex flex-col">
        <TopBar title={pageTitle} />
        <main className="flex-1 overflow-y-auto bg-white dark:bg-slate-950">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DesktopLayout;
