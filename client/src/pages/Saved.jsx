import React from 'react';
import { useSaved } from '../contexts/SavedContext';
import ScholarshipCard from '../components/ScholarshipCard';
import { BookmarkMinus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Saved() {
  const { savedScholarships } = useSaved();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Saved Scholarships</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Track deadlines for scholarships you plan to apply for.</p>
      </div>

      {savedScholarships.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-12 text-center shadow-sm">
          <BookmarkMinus className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">You haven't saved any scholarships yet.</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Browse our database and save the scholarships you are eligible for so you don't miss their deadlines.
          </p>
          <Link to="/search" className="inline-block px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors shadow-sm">
            Explore Scholarships
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {savedScholarships.map(scholarship => (
            <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
          ))}
        </div>
      )}
    </div>
  );
}
