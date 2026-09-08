import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ScholarshipCard from '../components/ScholarshipCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { 
  ArrowLeft, ExternalLink, Calendar, MapPin, IndianRupee, 
  ShieldCheck, Tag, GraduationCap, CheckCircle2, AlertCircle, Share2
} from 'lucide-react';

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [scholarship, setScholarship] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const fetchDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/scholarships/${id}`);
      if (response.data && response.data.success) {
        const item = response.data.data;
        setScholarship(item);

        // Fetch related scholarships in same sector
        fetchRelated(item.sector, item._id);
      } else {
        setError('Scholarship record not found');
      }
    } catch (err) {
      console.error('Error fetching scholarship detail:', err);
      setError('Failed to load scholarship details');
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
    if (val >= 100000) return `Up to ₹${(val / 100000).toFixed(1)} Lakhs Family Income`;
    return `Up to ${formatINR(val)}`;
  };

  if (loading) return <LoadingSpinner message="Fetching full scholarship profile..." />;

  if (error || !scholarship) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Scholarship Not Found</h2>
        <p className="text-xs text-slate-400 mb-6">{error || 'The requested scholarship could not be found.'}</p>
        <button
          onClick={() => navigate('/search')}
          className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-brand-600 hover:bg-brand-500"
        >
          Return to Search
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Results
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center text-xs font-semibold text-brand-400 hover:text-brand-300 bg-brand-500/10 border border-brand-500/20 px-3.5 py-1.5 rounded-lg"
        >
          <Share2 className="w-3.5 h-3.5 mr-1.5" />
          {copied ? 'Link Copied!' : 'Share Scholarship'}
        </button>
      </div>

      {/* Main Details Card */}
      <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-slate-800 space-y-8 relative overflow-hidden">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-300 border border-brand-500/20">
            <GraduationCap className="w-4 h-4 mr-1.5 text-brand-400" />
            {scholarship.sector} Sector
          </span>

          <span className="inline-flex items-center px-3.5 py-1.5 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <MapPin className="w-3.5 h-3.5 mr-1.5" />
            {scholarship.state || 'All States'}
          </span>
        </div>

        {/* Header Title */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            {scholarship.name}
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed font-light">
            {scholarship.description}
          </p>
        </div>

        {/* Grant Hero Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
          <div>
            <span className="text-xs text-slate-400 font-medium">Annual Financial Amount</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-brand-400 mt-1">
              {formatINR(scholarship.annualAmount)}
              <span className="text-xs font-normal text-slate-400 ml-1">/ year</span>
            </div>
          </div>

          <div>
            <span className="text-xs text-slate-400 font-medium">Income Ceiling</span>
            <div className="text-sm font-bold text-white mt-2">
              {formatIncome(scholarship.maxIncomeLimit)}
            </div>
          </div>

          <div>
            <span className="text-xs text-slate-400 font-medium">Application Deadline</span>
            <div className="text-sm font-bold text-amber-300 mt-2 flex items-center">
              <Calendar className="w-4 h-4 mr-1.5 text-amber-400" />
              {scholarship.deadline}
            </div>
          </div>
        </div>

        {/* Eligibility Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-2" />
            Eligibility & Selection Criteria
          </h3>
          
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 text-sm text-slate-300 leading-relaxed space-y-3">
            <p>{scholarship.eligibility}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800/80 text-xs">
              <div>
                <strong className="text-slate-400">Allowed Categories: </strong>
                <span className="text-white font-medium">
                  {Array.isArray(scholarship.category) ? scholarship.category.join(', ') : 'All Categories'}
                </span>
              </div>

              {scholarship.grade && (
                <div>
                  <strong className="text-slate-400">Education Grade: </strong>
                  <span className="text-white font-medium">{scholarship.grade}</span>
                </div>
              )}

              {scholarship.fieldOfStudy && (
                <div>
                  <strong className="text-slate-400">Field of Study: </strong>
                  <span className="text-white font-medium">{scholarship.fieldOfStudy}</span>
                </div>
              )}

              {scholarship.minCGPA > 0 && (
                <div>
                  <strong className="text-slate-400">Min Percentage / CGPA: </strong>
                  <span className="text-white font-medium">{scholarship.minCGPA}%</span>
                </div>
              )}

              {scholarship.sportType && (
                <div>
                  <strong className="text-slate-400">Sport: </strong>
                  <span className="text-white font-medium">{scholarship.sportType} ({scholarship.performanceLevel})</span>
                </div>
              )}

              {scholarship.artDiscipline && (
                <div>
                  <strong className="text-slate-400">Art Discipline: </strong>
                  <span className="text-white font-medium">{scholarship.artDiscipline}</span>
                </div>
              )}

              {scholarship.medicalField && (
                <div>
                  <strong className="text-slate-400">Medical Discipline: </strong>
                  <span className="text-white font-medium">{scholarship.medicalField}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Official Apply Action */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-400 block">Direct Government / Trust Portal</span>
            <span className="text-xs text-slate-500 font-mono truncate max-w-xs block">{scholarship.officialLink}</span>
          </div>

          <a
            href={scholarship.officialLink}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-cyan-500 shadow-xl shadow-brand-600/30 hover:shadow-brand-500/50 transition-all flex items-center justify-center space-x-2"
          >
            <span>Apply Now on Official Portal</span>
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>

      </div>

      {/* Related Scholarships Section */}
      {related.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Related {scholarship.sector} Scholarships</h3>
            <Link to={`/search?sector=${encodeURIComponent(scholarship.sector)}`} className="text-xs font-semibold text-brand-400 hover:underline">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((relItem) => (
              <ScholarshipCard key={relItem._id} scholarship={relItem} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
