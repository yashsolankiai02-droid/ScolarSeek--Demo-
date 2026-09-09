import React from 'react';

export default function LoadingSpinner({ message = 'Loading scholarships...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-slate-800 border-t-brand-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-brand-500/20 rounded-full animate-ping"></div>
        </div>
      </div>
      <p className="text-slate-400 font-medium text-sm animate-pulse">{message}</p>
    </div>
  );
}

export function ScholarshipSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((idx) => (
        <div key={idx} className="glass-panel rounded-2xl p-6 border border-slate-800 animate-pulse space-y-4">
          <div className="flex justify-between items-center">
            <div className="w-24 h-6 bg-slate-800 rounded-full"></div>
            <div className="w-16 h-6 bg-slate-800 rounded-md"></div>
          </div>
          <div className="w-3/4 h-6 bg-slate-800 rounded"></div>
          <div className="w-full h-12 bg-slate-800/60 rounded-xl"></div>
          <div className="w-full h-8 bg-slate-800/40 rounded"></div>
          <div className="w-full h-10 bg-slate-800 rounded-xl"></div>
        </div>
      ))}
    </div>
  );
}
