import React from 'react';
import { useProfile } from '../contexts/ProfileContext';
import { useSaved } from '../contexts/SavedContext';
import { useApplications } from '../contexts/ApplicationsContext';
import { Link } from 'react-router-dom';
import { User, Bookmark, FileText, AlertCircle, ArrowRight, LayoutDashboard, Clock } from 'lucide-react';
import ScholarshipCard from '../components/ScholarshipCard';

export default function Dashboard() {
  const { profile, completionPercentage } = useProfile();
  const { savedScholarships } = useSaved();
  const { applications } = useApplications();

  // Simple hardcoded pending actions based on state
  const pendingActions = [];
  if (completionPercentage < 100) {
    pendingActions.push({ msg: 'Complete your profile to improve scholarship matching.', link: '/profile', icon: <User className="w-4 h-4 text-brand-600" /> });
  }
  if (applications.some(app => app.documents.some(d => d.status !== 'Ready'))) {
    pendingActions.push({ msg: 'Upload pending documents for your active applications.', link: '/applications', icon: <FileText className="w-4 h-4 text-brand-600" /> });
  }
  if (profile.verificationStatus.income === 'manual_review') {
    pendingActions.push({ msg: 'Income verification requires manual review. Please upload an official certificate.', link: '/profile', icon: <AlertCircle className="w-4 h-4 text-amber-600" /> });
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Welcome Banner */}
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            Welcome back{profile.name ? `, ${profile.name.split(' ')[0]}` : ''}!
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            This is your unified dashboard. Manage your profile, track application deadlines, and monitor your document readiness all in one place.
          </p>
        </div>
        <div className="shrink-0 flex items-center space-x-4">
           <div className="text-right">
              <div className="text-sm font-bold text-gray-900">Profile Completion</div>
              <div className="text-xs text-gray-500">{completionPercentage}% Completed</div>
           </div>
           <div className="w-16 h-16 relative">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-100" />
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" 
                  strokeDasharray={176} 
                  strokeDashoffset={176 - (176 * completionPercentage) / 100}
                  className="text-brand-600" 
                />
              </svg>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Pending Actions */}
          {pendingActions.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-amber-600" /> Pending Actions
              </h2>
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <ul className="divide-y divide-gray-100">
                  {pendingActions.map((action, idx) => (
                    <li key={idx}>
                      <Link to={action.link} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                            {action.icon}
                          </div>
                          <span className="text-sm font-medium text-gray-900">{action.msg}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Saved / Upcoming Deadlines */}
          <section>
            <div className="flex items-center justify-between mb-4">
               <h2 className="text-lg font-bold text-gray-900 flex items-center">
                 <Bookmark className="w-5 h-5 mr-2 text-brand-600" /> Upcoming Deadlines
               </h2>
               <Link to="/saved" className="text-sm font-semibold text-brand-600 hover:text-brand-700">View all saved</Link>
            </div>
            {savedScholarships.length === 0 ? (
               <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm">
                 <p className="text-sm text-gray-500 mb-4">You have no saved scholarships.</p>
                 <Link to="/search" className="px-4 py-2 bg-brand-50 text-brand-700 font-semibold rounded-lg hover:bg-brand-100 transition-colors">Find Scholarships</Link>
               </div>
            ) : (
               <div className="space-y-4">
                 {savedScholarships.slice(0, 3).map(s => (
                   <ScholarshipCard key={s._id} scholarship={s} />
                 ))}
               </div>
            )}
          </section>

          {/* Recently Viewed Scholarships */}
          {(() => {
            let recent = [];
            try {
              recent = JSON.parse(localStorage.getItem('recently_viewed') || '[]');
            } catch (e) {}
            if (recent.length === 0) return null;

            return (
              <section className="pt-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-brand-600" /> Recently Viewed
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {recent.slice(0, 4).map(s => (
                    <ScholarshipCard key={s._id} scholarship={s} />
                  ))}
                </div>
              </section>
            );
          })()}

        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          
          {/* My Applications Summary */}
          <section>
            <div className="flex items-center justify-between mb-4">
               <h2 className="text-lg font-bold text-gray-900 flex items-center">
                 <LayoutDashboard className="w-5 h-5 mr-2 text-brand-600" /> My Applications
               </h2>
               <Link to="/applications" className="text-sm font-semibold text-brand-600 hover:text-brand-700">Manage</Link>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
              {applications.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">No active applications.</p>
              ) : (
                applications.map(app => (
                  <div key={app.id} className="flex justify-between items-center border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                    <div className="truncate pr-4">
                      <div className="text-sm font-bold text-gray-900 truncate">{app.scholarshipName}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{app.status}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Quick Links / Explore */}
          <section className="bg-brand-600 rounded-xl p-6 shadow-md text-white">
            <h3 className="text-lg font-bold mb-2">Looking for more?</h3>
            <p className="text-brand-100 text-sm mb-6">Our database is updated regularly with new government and private schemes.</p>
            <Link to="/search" className="block w-full text-center px-4 py-2.5 bg-white text-brand-600 font-bold rounded-lg shadow hover:bg-gray-50 transition-colors">
              Explore Scholarships
            </Link>
          </section>

        </div>

      </div>
    </div>
  );
}
