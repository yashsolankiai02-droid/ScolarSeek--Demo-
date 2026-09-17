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
    <div className="bg-white rounded-lg p-5 border border-gray-200 flex flex-col justify-between hover:shadow-md transition-shadow">
      
      {/* Top Sector Badge & Amount */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-brand-50 text-brand-700">
            <SectorIcon className="w-3.5 h-3.5 mr-1.5" />
            {scholarship.sector}
          </span>
          <span className="text-xs font-medium px-2 py-1 rounded bg-gray-100 text-gray-700 flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            {scholarship.state || 'All States'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2">
          {scholarship.name}
        </h3>

        {/* Amount Hero */}
        <div className="mb-4 flex items-baseline justify-between border-b border-gray-100 pb-3">
          <span className="text-xs text-gray-600 font-medium">Financial Grant</span>
          <span className="text-lg font-bold text-gray-900 tracking-tight">
            {formatINR(scholarship.annualAmount)}
            <span className="text-xs font-normal text-gray-500 ml-1">/yr</span>
          </span>
        </div>

        {/* Brief description snippet */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
          {scholarship.description}
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-700 mb-6">
          <div className="flex items-center space-x-1.5">
            <Tag className="w-3.5 h-3.5 text-gray-400" />
            <span className="truncate">Income: <strong className="font-medium">{formatIncome(scholarship.maxIncomeLimit)}</strong></span>
          </div>

          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
            <span className="truncate">Cats: <strong className="font-medium">{Array.isArray(scholarship.category) ? scholarship.category.slice(0, 2).join(', ') : 'All'}</strong></span>
          </div>

          <div className="flex items-center space-x-1.5 col-span-2 mt-1">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span>Deadline: <strong className="font-medium text-gray-900">{scholarship.deadline}</strong></span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <Link
        to={`/scholarship/${scholarship._id}`}
        className="w-full py-2.5 px-4 rounded-md text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
      >
        <span>View Full Criteria</span>
        <ArrowRight className="w-4 h-4 text-gray-400" />
      </Link>

    </div>
  );
}
