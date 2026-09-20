import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useProfile } from '../contexts/ProfileContext';
import { useSaved } from '../contexts/SavedContext';
import { useApplications } from '../contexts/ApplicationsContext';
import { useLanguage } from '../contexts/LanguageContext';
import ScholarshipCard from '../components/ScholarshipCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ReportModal from '../components/ReportModal';
import { 
  ArrowLeft, ExternalLink, Calendar, MapPin, IndianRupee, 
  ShieldCheck, Tag, GraduationCap, CheckCircle2, AlertCircle, Share2,
  Bookmark, BookmarkMinus, FileText, Check, XCircle, Flag
} from 'lucide-react';
import seedScholarships from '../data/seedData';

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { checkEligibility } = useProfile();
  const { isSaved, saveScholarship, unsaveScholarship } = useSaved();
  const { getApplication, startApplication } = useApplications();
  const { getLocalizedScholarship } = useLanguage();

  const [rawScholarship, setScholarship] = useState(null);
  const scholarship = getLocalizedScholarship ? getLocalizedScholarship(rawScholarship) : rawScholarship;
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    fetchDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const addRecentlyViewed = (item) => {
    try {
      const existing = JSON.parse(localStorage.getItem('recently_viewed') || '[]');
      const filtered = existing.filter(s => String(s._id) !== String(item._id));
      const updated = [item, ...filtered].slice(0, 6);
      localStorage.setItem('recently_viewed', JSON.stringify(updated));
    } catch (e) {
      console.warn('Recently viewed error', e);
    }
  };

  const fetchDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/scholarships/${id}`);
      if (response.data && response.data.success) {
        const item = response.data.data;
        setScholarship(item);
        addRecentlyViewed(item);
        fetchRelated(item.sector, item._id);
      } else {
        const foundSeed = seedScholarships.find(s => String(s._id) === String(id));
        if (foundSeed) {
          setScholarship(foundSeed);
          addRecentlyViewed(foundSeed);
          fetchRelated(foundSeed.sector, foundSeed._id);
        } else {
          setError('Scholarship record not found');
        }
      }
    } catch (err) {
      console.warn('API error in Details page, checking seedData fallback:', err.message);
      const foundSeed = seedScholarships.find(s => String(s._id) === String(id));
      if (foundSeed) {
        setScholarship(foundSeed);
        addRecentlyViewed(foundSeed);
        fetchRelated(foundSeed.sector, foundSeed._id);
      } else {
        setError('Failed to load scholarship details');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchRelated = async (sector, currentId) => {
    try {
      const res = await axios.post('/api/search', { sector });
      if (res.data && res.data.success) {
        const otherItems = (res.data.data || []).filter(
          (s) => String(s._id) !== String(currentId)
        );
        setRelated(otherItems.slice(0, 3));
      }
    } catch (e) {
      console.warn('Could not fetch related scholarships:', e);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const formatINR = (val) => {
    if (!val) return 'Varies';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatIncome = (val) => {
    if (!val || val >= 10000000) return 'No Income Limit Specified';
    if (val >= 100000) return `Up to ₹${(val / 100000).toFixed(1)} Lakhs`;
    return `Up to ${formatINR(val)}`;
  };

  if (loading) return <LoadingSpinner message="Fetching scholarship details..." />;

  if (error || !scholarship) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Scholarship Not Found</h2>
        <p className="text-xs text-gray-600 mb-6">{error || 'The requested scholarship could not be found.'}</p>
        <button
          onClick={() => navigate('/search')}
          className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-brand-600 hover:bg-brand-500"
        >
          Return to Search
        </button>
      </div>
    );
  }

  const eligibilityCheck = checkEligibility(scholarship);
  const saved = isSaved(scholarship._id);
  const activeApplication = getApplication(scholarship._id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      
      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back
        </button>

        <div className="flex space-x-3">
          <button
            onClick={() => setShowReport(true)}
            className="inline-flex items-center text-sm font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3.5 py-2 rounded-lg transition-colors"
            title="Report inaccurate info"
          >
            <Flag className="w-4 h-4 mr-1.5" />
            <span className="hidden sm:inline">Report Info</span>
          </button>

          <button
            onClick={() => saved ? unsaveScholarship(scholarship._id) : saveScholarship(scholarship)}
            className={`inline-flex items-center text-sm font-semibold px-4 py-2 rounded-lg border transition-colors ${
              saved 
                ? 'bg-brand-50 text-brand-700 border-brand-200 hover:bg-brand-100' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {saved ? <BookmarkMinus className="w-4 h-4 mr-2" /> : <Bookmark className="w-4 h-4 mr-2" />}
            {saved ? 'Saved' : 'Save'}
          </button>
          
          <button
            onClick={handleShare}
            className="inline-flex items-center text-sm font-semibold text-gray-700 hover:text-gray-900 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Share2 className="w-4 h-4 mr-2" />
            {copied ? 'Copied!' : 'Share'}
          </button>
        </div>
      </div>

      {showReport && (
        <ReportModal scholarship={scholarship} onClose={() => setShowReport(false)} />
      )}

      {/* Main Details Card */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-8 border border-gray-200 space-y-8 relative overflow-hidden">
        
        {/* Header Title */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {scholarship.name}
          </h1>
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
             <span className="font-semibold">{scholarship.provider || 'Official Source'}</span>
             <span>•</span>
             <span>{scholarship.sector} Sector</span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed max-w-3xl">
            {scholarship.description}
          </p>
        </div>

        {/* Grant Hero Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div>
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Annual Amount</span>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {formatINR(scholarship.annualAmount)}
            </div>
          </div>

          <div>
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Income Limit</span>
            <div className="text-base font-bold text-gray-900 mt-2">
              {formatIncome(scholarship.maxIncomeLimit)}
            </div>
          </div>

          <div>
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Deadline</span>
            <div className="text-base font-bold text-brand-700 mt-2 flex items-center">
              <Calendar className="w-4 h-4 mr-1.5" />
              {scholarship.deadline}
            </div>
          </div>
        </div>

        {/* Personalized Eligibility Matcher */}
        <div className={`p-5 rounded-xl border ${eligibilityCheck.isEligible ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200'}`}>
           <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center uppercase tracking-wider">
             <ShieldCheck className={`w-4 h-4 mr-2 ${eligibilityCheck.isEligible ? 'text-emerald-600' : 'text-gray-500'}`} />
             Eligibility Match
           </h3>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
               {eligibilityCheck.matches.map((match, idx) => (
                 <div key={idx} className="flex items-start text-sm text-gray-700">
                   <Check className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                   <span>{match}</span>
                 </div>
               ))}
               {eligibilityCheck.mismatches.map((mismatch, idx) => (
                 <div key={idx} className="flex items-start text-sm text-gray-700">
                   {eligibilityCheck.status === 'Profile information required' ? (
                     <AlertCircle className="w-4 h-4 text-amber-500 mr-2 shrink-0 mt-0.5" />
                   ) : (
                     <XCircle className="w-4 h-4 text-red-500 mr-2 shrink-0 mt-0.5" />
                   )}
                   <span>{mismatch}</span>
                 </div>
               ))}
               {eligibilityCheck.matches.length === 0 && eligibilityCheck.mismatches.length === 0 && (
                 <div className="text-sm text-gray-500 italic">No specific constraints detected. Check full requirements.</div>
               )}
             </div>
             
             <div className="flex flex-col items-end justify-center text-right border-l border-gray-200 pl-4">
                <div className={`text-lg font-bold ${eligibilityCheck.isEligible ? 'text-emerald-700' : 'text-gray-700'}`}>
                  {eligibilityCheck.status}
                </div>
                {eligibilityCheck.status === 'Profile information required' && (
                  <Link to="/profile" className="text-xs text-brand-600 font-semibold mt-1 hover:underline">
                    Update Profile
                  </Link>
                )}
             </div>
           </div>
        </div>

        {/* General Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
           
           <div>
             <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider border-b border-gray-100 pb-2">Full Requirements</h4>
             <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{scholarship.eligibility}</p>
             <ul className="mt-4 space-y-2 text-sm text-gray-700">
               <li><strong className="text-gray-900">Categories:</strong> {Array.isArray(scholarship.category) ? scholarship.category.join(', ') : 'All'}</li>
               {scholarship.state && <li><strong className="text-gray-900">State:</strong> {scholarship.state}</li>}
               {scholarship.fieldOfStudy && <li><strong className="text-gray-900">Field:</strong> {scholarship.fieldOfStudy}</li>}
             </ul>
           </div>

           <div>
             <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider border-b border-gray-100 pb-2">Documents Required (Typical)</h4>
             <ul className="space-y-2 text-sm text-gray-700 list-disc pl-4">
               <li>Aadhaar Card / Identity Proof</li>
               <li>Income Certificate</li>
               <li>Caste / Category Certificate</li>
               <li>Previous Year Marksheet</li>
               <li>Bank Passbook (Aadhaar Seeded)</li>
               <li>Fee Receipt (If applicable)</li>
             </ul>
           </div>

        </div>

        {/* Application Actions */}
        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50 -mx-8 -mb-8 p-8">
          <div>
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-1">Official Portal</span>
            <a href={scholarship.officialLink} target="_blank" rel="noreferrer" className="text-sm text-brand-600 hover:underline flex items-center">
              {scholarship.officialLink} <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            {activeApplication ? (
              <Link
                to="/applications"
                className="w-full sm:w-auto px-6 py-3 rounded-lg font-bold text-sm text-brand-700 bg-brand-50 border border-brand-200 hover:bg-brand-100 transition-colors flex items-center justify-center"
              >
                View in Tracker
              </Link>
            ) : (
              <button
                onClick={() => {
                  startApplication(scholarship);
                  navigate('/applications');
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-lg font-bold text-sm text-white bg-brand-600 hover:bg-brand-700 transition-colors flex items-center justify-center"
              >
                Start Preparation
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
