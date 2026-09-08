import React from 'react';
import { Link } from 'react-router-dom';
import { 
  IndianRupee, MapPin, Calendar, Tag, ArrowRight, 
  GraduationCap, Trophy, Palette, Stethoscope, Briefcase, 
  FlaskConical, Sprout, HeartHandshake, ShieldCheck
} from 'lucide-react';

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

export default function ScholarshipCard({ scholarship }) {
  const SectorIcon = sectorIcons[scholarship.sector] || GraduationCap;

  // Format currency format to Indian Rupees
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
    <div className="glass-panel glass-panel-hover rounded-2xl p-6 border border-slate-800 flex flex-col justify-between relative group overflow-hidden">
      
      {/* Top Sector Badge & Amount */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20">
            <SectorIcon className="w-3.5 h-3.5 mr-1.5" />
            {scholarship.sector}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            {scholarship.state || 'All States'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors line-clamp-2 mb-2">
          {scholarship.name}
        </h3>

        {/* Amount Hero */}
        <div className="mb-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-baseline justify-between">
          <span className="text-xs text-slate-400 font-medium">Annual Financial Grant</span>
          <span className="text-xl font-extrabold text-brand-400 tracking-tight">
            {formatINR(scholarship.annualAmount)}
            <span className="text-xs font-normal text-slate-400 ml-1">/yr</span>
          </span>
        </div>

        {/* Brief description snippet */}
        <p className="text-slate-400 text-xs line-clamp-2 mb-4 leading-relaxed">
          {scholarship.description}
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-3 border-t border-slate-800/60 mb-6">
          <div className="flex items-center space-x-1.5">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">Income: <strong className="text-white font-medium">{formatIncome(scholarship.maxIncomeLimit)}</strong></span>
          </div>

          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">Cats: <strong className="text-white font-medium">{Array.isArray(scholarship.category) ? scholarship.category.slice(0, 2).join(', ') : 'All'}</strong></span>
          </div>

          <div className="flex items-center space-x-1.5 col-span-2 mt-1">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Deadline: <strong className="text-amber-300 font-medium">{scholarship.deadline}</strong></span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <Link
        to={`/scholarship/${scholarship._id}`}
        className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-brand-600 border border-slate-700 hover:border-brand-500 transition-all flex items-center justify-center space-x-2 group/btn"
      >
        <span>View Full Criteria</span>
        <ArrowRight className="w-4 h-4 text-slate-400 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-transform" />
      </Link>

    </div>
  );
}
