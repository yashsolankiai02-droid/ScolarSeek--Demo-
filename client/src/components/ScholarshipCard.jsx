import React from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  IndianRupee, MapPin, Calendar, Tag, ArrowRight, 
  GraduationCap, Trophy, Palette, Stethoscope, Briefcase, 
  FlaskConical, Sprout, HeartHandshake, ShieldCheck, Sparkles
} from 'lucide-react';

const sectorColors = {
  'Educational': 'from-blue-600 to-indigo-600 text-blue-100',
  'Sports': 'from-amber-500 to-orange-600 text-amber-100',
  'Arts & Culture': 'from-purple-600 to-pink-600 text-purple-100',
  'Healthcare': 'from-emerald-600 to-teal-600 text-emerald-100',
  'Business & Entrepreneurship': 'from-sky-600 to-blue-700 text-sky-100',
  'Research & Innovation': 'from-indigo-600 to-violet-700 text-indigo-100',
  'Agricultural': 'from-lime-600 to-emerald-700 text-lime-100',
  'Social Sector': 'from-rose-600 to-pink-700 text-rose-100',
};

const sectorIcons = {
  'Educational': GraduationCap,
  'Sports': Trophy,
  'Arts & Culture': Palette,
  'Healthcare': Stethoscope,
  'Business & Entrepreneurship': Briefcase,
  'Research & Innovation': FlaskConical,
  'Agricultural': Sprout,
  'Social Sector': HeartHandshake,
};

export default function ScholarshipCard({ scholarship: rawScholarship }) {
  const { completionPercentage, checkEligibility } = useProfile();
  const { getLocalizedScholarship } = useLanguage();
  const scholarship = getLocalizedScholarship ? getLocalizedScholarship(rawScholarship) : rawScholarship;

  const eligibilityCheck = completionPercentage > 0 ? checkEligibility(scholarship) : null;
  const SectorIcon = sectorIcons[scholarship.sector] || GraduationCap;
  const badgeGradient = sectorColors[scholarship.sector] || 'from-brand-600 to-indigo-600 text-white';

  const formatINR = (val) => {
    if (!val) return 'Varies';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatIncome = (val) => {
    if (!val || val >= 10000000) return 'No Limit';
    if (val >= 100000) return `Up to ₹${(val / 100000).toFixed(1)} Lakhs`;
    return `Up to ${formatINR(val)}`;
  };

  return (
    <div className="group bg-white dark:bg-slate-900/90 backdrop-blur-md rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between hover:shadow-[0_12px_40px_-12px_rgba(37,99,235,0.2)] dark:hover:shadow-[0_12px_40px_-12px_rgba(99,102,241,0.25)] hover:border-brand-300 dark:hover:border-brand-700 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
      
      {/* Decorative Subtle Ambient Glow */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-brand-500/10 rounded-full blur-2xl group-hover:bg-brand-500/20 transition-all pointer-events-none"></div>

      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3.5 relative z-10">
          <span className={`inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold bg-gradient-to-r ${badgeGradient} shadow-sm`}>
            <SectorIcon className="w-3.5 h-3.5 mr-1.5 shrink-0" />
            <span>{scholarship.sector || 'Educational'}</span>
          </span>

          <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center border border-slate-200/60 dark:border-slate-700">
            <MapPin className="w-3 h-3 mr-1 text-slate-400" />
            <span>{scholarship.state || 'All States'}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          {scholarship.name}
        </h3>

        {/* Financial Amount Banner */}
        <div className="mb-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Financial Grant</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Direct Disbursement</span>
          </div>
          <div className="text-right">
            <span className="text-lg font-extrabold text-brand-600 dark:text-brand-400 tracking-tight block">
              {formatINR(scholarship.annualAmount)}
            </span>
            <span className="text-[10px] font-semibold text-slate-400">Per Academic Year</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2 mb-4 leading-relaxed">
          {scholarship.description}
        </p>

        {/* Key Attributes Pills */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300 mb-5">
          <div className="flex items-center space-x-1.5 bg-slate-50 dark:bg-slate-800/40 px-2.5 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800">
            <Tag className="w-3.5 h-3.5 text-brand-500 shrink-0" />
            <span className="truncate text-[11px]">Inc: <strong className="font-bold text-slate-900 dark:text-white">{formatIncome(scholarship.maxIncomeLimit)}</strong></span>
          </div>

          <div className="flex items-center space-x-1.5 bg-slate-50 dark:bg-slate-800/40 px-2.5 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800">
            <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="truncate text-[11px]">Ends: <strong className="font-bold text-slate-900 dark:text-white">{scholarship.deadline}</strong></span>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        {/* Eligibility Status Tag */}
        {completionPercentage > 0 && eligibilityCheck && (
          <div className={`px-3 py-2 rounded-xl flex items-center justify-between text-xs font-bold border transition-colors ${
            eligibilityCheck.isEligible 
              ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30' 
              : 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30'
          }`}>
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{eligibilityCheck.status}</span>
            </span>
            <Sparkles className="w-3.5 h-3.5 opacity-60" />
          </div>
        )}

        {/* Action Button */}
        <Link
          to={`/scholarship/${scholarship._id}`}
          className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-700 hover:from-brand-500 hover:to-indigo-500 shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 group/btn"
        >
          <span>View Scholarship Details</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>

    </div>
  );
}
