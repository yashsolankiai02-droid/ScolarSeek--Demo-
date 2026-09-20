import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Bookmark, FileText, User, AlertCircle, Sparkles, 
  ArrowRight, ShieldCheck, Clock, Award, GraduationCap, Trophy, 
  Palette, Stethoscope, Briefcase, FlaskConical, Sprout, HeartHandshake,
  CheckCircle2, PlusCircle, ExternalLink
} from 'lucide-react';
import { useProfile } from '../../contexts/ProfileContext';
import { useSaved } from '../../contexts/SavedContext';
import { useApplications } from '../../contexts/ApplicationsContext';
import { useLanguage } from '../../contexts/LanguageContext';
import ScholarshipCard from '../../components/ScholarshipCard';
import axios from 'axios';
import seedScholarships from '../../data/seedData';

const sectorChips = [
  { id: 'All', label: 'All Sectors', icon: Sparkles, gradient: 'from-brand-600 to-indigo-600' },
  { id: 'Educational', label: 'Education', icon: GraduationCap, gradient: 'from-blue-600 to-indigo-600' },
  { id: 'Sports', label: 'Sports', icon: Trophy, gradient: 'from-amber-500 to-orange-600' },
  { id: 'Arts & Culture', label: 'Arts', icon: Palette, gradient: 'from-purple-600 to-pink-600' },
  { id: 'Healthcare', label: 'Medical', icon: Stethoscope, gradient: 'from-emerald-600 to-teal-600' },
  { id: 'Business & Entrepreneurship', label: 'Business', icon: Briefcase, gradient: 'from-sky-600 to-blue-700' },
  { id: 'Research & Innovation', label: 'Research', icon: FlaskConical, gradient: 'from-indigo-600 to-violet-700' },
  { id: 'Agricultural', label: 'Agri', icon: Sprout, gradient: 'from-lime-600 to-emerald-700' },
  { id: 'Social Sector', label: 'Social', icon: HeartHandshake, gradient: 'from-rose-600 to-pink-700' },
];

const MobileDashboard = () => {
  const { profile, completionPercentage } = useProfile();
  const { savedScholarships } = useSaved();
  const { applications } = useApplications();
  const { t } = useLanguage();
  const [selectedSector, setSelectedSector] = useState('All');
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(false);

  let recentlyViewed = [];
  try {
    recentlyViewed = JSON.parse(localStorage.getItem('recently_viewed') || '[]');
  } catch (e) {}

  const firstName = profile?.name ? profile.name.split(' ')[0] : 'Student';

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/scholarships');
      if (res.data && res.data.success && res.data.data.length > 0) {
        setScholarships(res.data.data);
      } else {
        setScholarships(seedScholarships);
      }
    } catch (e) {
      setScholarships(seedScholarships);
    } finally {
      setLoading(false);
    }
  };

  const filteredScholarships = scholarships.filter(s => {
    if (selectedSector === 'All') return true;
    return s.sector && s.sector.toLowerCase() === selectedSector.toLowerCase();
  });

  return (
    <div className="px-4 py-5 space-y-6 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors pb-28">
      
      {/* Dynamic Glassmorphic Hero Banner */}
      <div className="relative rounded-[32px] p-6 text-white overflow-hidden bg-gradient-to-br from-brand-600 via-indigo-700 to-purple-900 shadow-[0_15px_35px_-10px_rgba(37,99,235,0.4)]">
        
        {/* Animated Background Mesh Orbs */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between relative z-10 mb-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold text-brand-200 uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Unified Student Mobile</span>
            </div>
            <h2 className="text-2xl font-extrabold mt-2 tracking-tight leading-snug">
              Welcome, {firstName}! 👋
            </h2>
          </div>
          
          {/* Circular Matching Gauge */}
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 shadow-inner">
            <svg className="w-14 h-14 transform -rotate-90">
              <circle cx="28" cy="28" r="23" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/20" />
              <circle cx="28" cy="28" r="23" stroke="currentColor" strokeWidth="4" fill="transparent" 
                strokeDasharray={144} 
                strokeDashoffset={144 - (144 * completionPercentage) / 100}
                className="text-white transition-all duration-1000 ease-out" 
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-white">
              {completionPercentage}%
            </span>
          </div>
        </div>

        <p className="text-xs text-brand-100/90 leading-relaxed mb-5 relative z-10 max-w-[280px]">
          Discover matched scholarships, verify credentials via DigiLocker, and apply to official portals.
        </p>

        {completionPercentage < 100 ? (
          <Link 
            to="/profile" 
            className="inline-flex items-center justify-center w-full py-3 bg-white text-brand-800 font-extrabold text-xs rounded-2xl shadow-md hover:bg-brand-50 transition-all relative z-10 space-x-1.5 active:scale-95"
          >
            <span>Complete Profile to Match Schemes ({completionPercentage}% done)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 rounded-2xl text-xs font-bold relative z-10">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Profile Verified &amp; Ready for Automated Matching</span>
          </div>
        )}
      </div>

      {/* Quick Action Dock */}
      <div>
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 px-1">
          Quick Access Portal
        </h3>
        <div className="grid grid-cols-4 gap-3">
          <Link to="/search" className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-3.5 rounded-2xl flex flex-col items-center shadow-xs hover:border-brand-500 transition-all active:scale-95">
            <div className="w-11 h-11 rounded-2xl bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-1.5 shadow-xs">
              <Search className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">{t('explore')}</span>
          </Link>

          <Link to="/saved" className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-3.5 rounded-2xl flex flex-col items-center shadow-xs hover:border-amber-500 transition-all active:scale-95">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-1.5 shadow-xs">
              <Bookmark className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">{t('saved')}</span>
          </Link>

          <Link to="/applications" className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-3.5 rounded-2xl flex flex-col items-center shadow-xs hover:border-purple-500 transition-all active:scale-95">
            <div className="w-11 h-11 rounded-2xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-1.5 shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Apps</span>
          </Link>

          <Link to="/profile" className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-3.5 rounded-2xl flex flex-col items-center shadow-xs hover:border-emerald-500 transition-all active:scale-95">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-1.5 shadow-xs">
              <User className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">{t('profile')}</span>
          </Link>
        </div>
      </div>

      {/* Sector Category Explorer Carousel */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Sector Filter Hub
          </h3>
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
            {filteredScholarships.length} Schemes Available
          </span>
        </div>

        <div className="flex space-x-2.5 overflow-x-auto no-scrollbar pb-1">
          {sectorChips.map(chip => {
            const Icon = chip.icon;
            const isSelected = selectedSector === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => setSelectedSector(chip.id)}
                className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-2 shrink-0 transition-all ${
                  isSelected
                    ? `bg-gradient-to-r ${chip.gradient} text-white shadow-md scale-105`
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Needed Banner */}
      {completionPercentage < 100 && (
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-3xl p-4 flex items-start space-x-3 backdrop-blur-sm">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-xs font-extrabold text-amber-900 dark:text-amber-200">Complete Verification Details</h4>
            <p className="text-xs text-amber-700 dark:text-amber-300 mt-0.5 leading-relaxed">
              Fill remaining academic &amp; income criteria to auto-unlock eligibility fit score for all schemes.
            </p>
          </div>
          <Link to="/profile" className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shrink-0 shadow-xs">
            Edit Profile
          </Link>
        </div>
      )}

      {/* Applications Tracker */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center">
            <FileText className="w-4 h-4 mr-1.5 text-brand-600 dark:text-brand-400" />
            Active Applications ({applications.length})
          </h3>
          <Link to="/applications" className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline">View Tracker</Link>
        </div>

        {applications.length > 0 ? (
          <div className="space-y-3">
            {applications.slice(0, 2).map(app => (
              <div key={app.id} className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-3xl shadow-xs flex items-center justify-between">
                <div className="min-w-0 pr-3">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">{app.id}</div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate mt-0.5">{app.scholarshipName}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Deadline: {app.deadline}</p>
                </div>
                <span className={`px-3 py-1.5 rounded-2xl text-[10px] font-extrabold shrink-0 border ${
                  app.formFilledOnOfficialSite 
                    ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30' 
                    : 'bg-amber-500/10 text-amber-600 border-amber-500/30'
                }`}>
                  {app.formFilledOnOfficialSite ? '✅ Submitted' : '⏳ In Prep'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 text-center shadow-xs">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">No active application preparations logged.</p>
            <Link to="/search" className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline">
              Start Application Preparation →
            </Link>
          </div>
        )}
      </div>

      {/* Featured / Filtered Scholarships List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center">
            <Award className="w-4 h-4 mr-1.5 text-brand-600 dark:text-brand-400" />
            {selectedSector === 'All' ? 'Featured Scholarships' : `${selectedSector} Schemes`}
          </h3>
          <Link to="/search" className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline">Explore All</Link>
        </div>

        {loading ? (
          <div className="text-center py-10 text-xs text-slate-500">Loading schemes...</div>
        ) : filteredScholarships.length > 0 ? (
          <div className="space-y-4">
            {filteredScholarships.map(s => (
              <ScholarshipCard key={s._id} scholarship={s} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 text-center shadow-xs">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">No scholarships found for "{selectedSector}".</p>
            <button 
              onClick={() => setSelectedSector('All')}
              className="inline-flex items-center px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl transition-colors"
            >
              Reset Sector Filter
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default MobileDashboard;
