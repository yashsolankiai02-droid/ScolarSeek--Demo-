import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, Bookmark, BookmarkMinus, ExternalLink, ShieldCheck, Check, XCircle, 
  ChevronDown, ChevronUp, Calendar, IndianRupee, Share2, Flag, AlertCircle, FileText 
} from 'lucide-react';
import { useSaved } from '../../contexts/SavedContext';
import { useApplications } from '../../contexts/ApplicationsContext';
import { useProfile } from '../../contexts/ProfileContext';
import { useLanguage } from '../../contexts/LanguageContext';
import ReportModal from '../../components/ReportModal';
import seedScholarships from '../../data/seedData';

const MobileDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getLocalizedScholarship } = useLanguage();
  const [rawScholarship, setScholarship] = useState(null);
  const scholarship = getLocalizedScholarship ? getLocalizedScholarship(rawScholarship) : rawScholarship;
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showReport, setShowReport] = useState(false);
  
  const { isSaved, saveScholarship, unsaveScholarship } = useSaved();
  const { startApplication, getApplication } = useApplications();
  const { checkEligibility } = useProfile();
  
  const [reqsOpen, setReqsOpen] = useState(true);
  const [docsOpen, setDocsOpen] = useState(true);

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const addRecentlyViewed = (item) => {
    try {
      const existing = JSON.parse(localStorage.getItem('recently_viewed') || '[]');
      const filtered = existing.filter(s => String(s._id) !== String(item._id));
      const updated = [item, ...filtered].slice(0, 6);
      localStorage.setItem('recently_viewed', JSON.stringify(updated));
    } catch (e) {}
  };

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/scholarships/${id}`);
      if (response.data && response.data.success) {
        setScholarship(response.data.data);
        addRecentlyViewed(response.data.data);
      } else {
        const found = seedScholarships.find(s => String(s._id) === String(id));
        if (found) { setScholarship(found); addRecentlyViewed(found); }
      }
    } catch (error) {
      const found = seedScholarships.find(s => String(s._id) === String(id));
      if (found) { setScholarship(found); addRecentlyViewed(found); }
    } finally {
      setLoading(false);
    }
  };

  const formatINR = (val) => {
    if (!val) return 'Varies';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  if (loading) {
    return <div className="p-12 text-center text-xs font-semibold text-gray-500">Loading scholarship details...</div>;
  }

  if (!scholarship) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-sm text-gray-500">Scholarship not found.</p>
        <button onClick={() => navigate('/search')} className="px-4 py-2 bg-brand-600 text-white font-bold text-xs rounded-xl">
          Return to Search
        </button>
      </div>
    );
  }

  const saved = isSaved(scholarship._id);
  const activeApp = getApplication(scholarship._id);
  const eligibility = checkEligibility(scholarship);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-36 transition-colors">
      
      {/* Mobile Sticky Navigation Header */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-700 dark:text-gray-200 flex items-center text-xs font-bold">
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span>Back</span>
        </button>
        
        <span className="text-xs font-bold text-gray-900 dark:text-white truncate max-w-[180px]">
          {scholarship.name}
        </span>

        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setShowReport(true)}
            className="p-1.5 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-lg" 
            title="Report Issue"
          >
            <Flag className="w-4 h-4" />
          </button>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-4 py-5 space-y-5">

        {/* Title Card */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-card space-y-3">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">
            {scholarship.name}
          </h1>

          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="px-2.5 py-1 bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 rounded-lg border border-brand-200 dark:border-brand-800">
              {scholarship.provider || 'Official Authority'}
            </span>
            <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg">
              {scholarship.sector || 'Educational'}
            </span>
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed pt-1">
            {scholarship.description}
          </p>
        </div>

        {/* Amount & Deadline Stats Card */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-card">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Annual Amount</span>
            <div className="text-lg font-bold text-brand-600 dark:text-brand-400 mt-0.5">
              {formatINR(scholarship.annualAmount)}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-card">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Deadline</span>
            <div className="text-sm font-bold text-red-600 dark:text-red-400 mt-1 flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1" />
              <span>{scholarship.deadline}</span>
            </div>
          </div>
        </div>

        {/* Eligibility Matcher */}
        <div className={`p-4 rounded-2xl border shadow-card ${
          eligibility.isEligible 
            ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800' 
            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white flex items-center">
              <ShieldCheck className={`w-4 h-4 mr-1.5 ${eligibility.isEligible ? 'text-emerald-600' : 'text-gray-500'}`} />
              Eligibility Fit Score
            </h3>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
              eligibility.isEligible 
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200' 
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
            }`}>
              {eligibility.status}
            </span>
          </div>

          <div className="space-y-1.5">
            {eligibility.matches.map((m, idx) => (
              <div key={idx} className="flex items-start text-xs text-gray-700 dark:text-gray-300">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mr-1.5 mt-0.5" />
                <span>{m}</span>
              </div>
            ))}
            {eligibility.mismatches.map((m, idx) => (
              <div key={idx} className="flex items-start text-xs text-gray-700 dark:text-gray-300">
                <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mr-1.5 mt-0.5" />
                <span>{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Full Requirements */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-card">
          <button 
            onClick={() => setReqsOpen(!reqsOpen)}
            className="w-full p-4 flex items-center justify-between font-bold text-xs text-gray-900 dark:text-white uppercase tracking-wider"
          >
            <span>Full Requirements</span>
            {reqsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {reqsOpen && (
            <div className="px-4 pb-4 text-xs text-gray-700 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-3">
              <p>{scholarship.eligibility}</p>
              <div className="mt-3 space-y-1 font-medium">
                <div>Category: <span className="font-bold">{Array.isArray(scholarship.category) ? scholarship.category.join(', ') : 'All'}</span></div>
                <div>State: <span className="font-bold">{scholarship.state || 'All India'}</span></div>
              </div>
            </div>
          )}
        </div>

        {/* Official Web Source Button */}
        <div className="p-4 bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase block">Official Website</span>
            <span className="text-xs font-bold text-brand-700 dark:text-brand-300 truncate block max-w-[180px]">
              {scholarship.officialLink}
            </span>
          </div>
          <a
            href={scholarship.officialLink}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1"
          >
            <span>Visit</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>

      {/* Sticky Bottom Action Dock */}
      <div className="fixed bottom-16 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 px-4 py-3 flex gap-3 shadow-2xl">
        <button
          onClick={() => saved ? unsaveScholarship(scholarship._id) : saveScholarship(scholarship)}
          className={`flex-1 py-3 rounded-xl border font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors ${
            saved
              ? 'bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border-brand-200 dark:border-brand-800'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700'
          }`}
        >
          {saved ? <BookmarkMinus className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          <span>{saved ? 'Saved' : 'Save'}</span>
        </button>

        {activeApp ? (
          <Link
            to="/applications"
            className="flex-[2] py-3 bg-brand-50 text-brand-700 border border-brand-200 dark:bg-brand-950 dark:text-brand-300 font-bold text-xs rounded-xl flex items-center justify-center transition-colors shadow-sm"
          >
            <FileText className="w-4 h-4 mr-1.5" />
            <span>View Application Process</span>
          </Link>
        ) : (
          <button
            onClick={() => {
              startApplication(scholarship);
              navigate('/applications');
            }}
            className="flex-[2] py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl flex items-center justify-center transition-colors shadow-sm"
          >
            <span>Start Preparation</span>
          </button>
        )}
      </div>

      {showReport && (
        <ReportModal scholarship={scholarship} onClose={() => setShowReport(false)} />
      )}

    </div>
  );
};

export default MobileDetails;
