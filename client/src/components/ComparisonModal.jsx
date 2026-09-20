import React from 'react';
import { X, ExternalLink, Check, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ComparisonModal({ items, onClose }) {
  if (!items || items.length === 0) return null;

  const formatINR = (val) => {
    if (!val) return 'Varies';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  const formatIncome = (val) => {
    if (!val || val >= 10000000) return 'No Limit';
    if (val >= 100000) return `Up to ₹${(val / 100000).toFixed(1)}L`;
    return `Up to ${formatINR(val)}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-gray-800/50">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Scholarship Comparison</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Side-by-side analysis of selected scholarships</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table */}
        <div className="p-6 overflow-x-auto overflow-y-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="p-3 text-xs font-bold uppercase tracking-wider text-gray-400 w-1/4">Feature</th>
                {items.map((item, idx) => (
                  <th key={idx} className="p-3 text-sm font-bold text-gray-900 dark:text-white w-1/3">
                    <Link to={`/scholarship/${item._id}`} className="hover:text-brand-600 transition-colors line-clamp-2">
                      {item.name}
                    </Link>
                    <span className="block text-xs font-normal text-gray-500 mt-0.5">{item.provider}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
              <tr>
                <td className="p-3 font-semibold text-gray-600 dark:text-gray-400">Annual Amount</td>
                {items.map((item, idx) => (
                  <td key={idx} className="p-3 font-bold text-brand-600 dark:text-brand-400">
                    {formatINR(item.annualAmount)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-gray-600 dark:text-gray-400">Income Limit</td>
                {items.map((item, idx) => (
                  <td key={idx} className="p-3 text-gray-800 dark:text-gray-200">
                    {formatIncome(item.maxIncomeLimit)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-gray-600 dark:text-gray-400">Eligible Categories</td>
                {items.map((item, idx) => (
                  <td key={idx} className="p-3 text-gray-800 dark:text-gray-200">
                    {Array.isArray(item.category) ? item.category.join(', ') : item.category || 'All'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-gray-600 dark:text-gray-400">State / Domicile</td>
                {items.map((item, idx) => (
                  <td key={idx} className="p-3 text-gray-800 dark:text-gray-200">
                    {item.state || 'All India'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-gray-600 dark:text-gray-400">Sector</td>
                {items.map((item, idx) => (
                  <td key={idx} className="p-3 text-gray-800 dark:text-gray-200">
                    {item.sector || 'Educational'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-gray-600 dark:text-gray-400">Deadline</td>
                {items.map((item, idx) => (
                  <td key={idx} className="p-3 text-red-600 font-semibold dark:text-red-400">
                    {item.deadline}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-gray-600 dark:text-gray-400">Official Action</td>
                {items.map((item, idx) => (
                  <td key={idx} className="p-3">
                    <a
                      href={item.officialLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 px-3 py-2 rounded-lg transition-colors"
                    >
                      <span>Official Site</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-1" />
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-right">
          <button onClick={onClose} className="px-5 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold text-xs rounded-xl transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
