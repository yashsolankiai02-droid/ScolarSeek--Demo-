import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ScholarshipCard from '../components/ScholarshipCard';
import { ScholarshipSkeletonGrid } from '../components/LoadingSpinner';
import seedScholarships from '../data/seedData';
import ComparisonModal from '../components/ComparisonModal';
import { 
  Search, ArrowLeft, Filter, SlidersHorizontal, AlertCircle, RefreshCw, Scale 
} from 'lucide-react';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve filter parameters passed from Search page, or default
  const initialFilters = location.state?.filters || {
    state: 'All States',
    annualIncome: '< 3 Lakhs',
    category: 'General',
    sector: 'Educational',
  };

  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('amount-desc'); // amount-desc, amount-asc, deadline
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const toggleCompare = (scholarship) => {
    setSelectedForCompare(prev => {
      const exists = prev.some(s => s._id === scholarship._id);
      if (exists) return prev.filter(s => s._id !== scholarship._id);
      if (prev.length >= 3) {
        alert('You can compare up to 3 scholarships at a time.');
        return prev;
      }
      return [...prev, scholarship];
    });
  };

  useEffect(() => {
    fetchResults(initialFilters);
  }, []);

  const getFallbackScholarships = (filterPayload) => {
    let result = seedScholarships;
    if (filterPayload?.sector && filterPayload.sector !== 'All') {
      const matched = seedScholarships.filter(s => s.sector && s.sector.toLowerCase() === filterPayload.sector.toLowerCase());
      if (matched.length > 0) result = matched;
    }
    return result;
  };

  const fetchResults = async (filterPayload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/search', filterPayload);
      if (response.data && response.data.success && response.data.data.length > 0) {
        setScholarships(response.data.data);
      } else {
        setScholarships(getFallbackScholarships(filterPayload));
      }
    } catch (err) {
      console.warn('Backend API request error in Results page, using client seedData fallback:', err.message);
      setScholarships(getFallbackScholarships(filterPayload));
    } finally {
      setLoading(false);
    }
  };

  // Sorting logic
  const sortedScholarships = [...scholarships].sort((a, b) => {
    if (sortBy === 'amount-desc') {
      return (b.annualAmount || 0) - (a.annualAmount || 0);
    }
    if (sortBy === 'amount-asc') {
      return (a.annualAmount || 0) - (b.annualAmount || 0);
    }
    if (sortBy === 'deadline') {
      return (a.deadline || '').localeCompare(b.deadline || '');
    }
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      
      {/* Top Bar with Back Link */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Modify Filters
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Search Results
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Found <strong className="text-brand-600 font-bold">{scholarships.length}</strong> matching scholarship schemes
          </p>
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <label className="text-sm font-semibold text-gray-600 flex items-center shrink-0">
            <SlidersHorizontal className="w-4 h-4 mr-1.5" />
            Sort By:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 cursor-pointer"
          >
            <option value="amount-desc">Grant Amount (High to Low)</option>
            <option value="amount-asc">Grant Amount (Low to High)</option>
            <option value="deadline">Application Deadline</option>
          </select>
        </div>
      </div>

      {/* Filter Badges Summary */}
      <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg flex flex-wrap items-center gap-2 text-sm">
        <span className="text-gray-700 font-semibold flex items-center mr-1">
          <Filter className="w-4 h-4 mr-1 text-gray-500" />
          Active Filters:
        </span>
        
        {Object.entries(initialFilters).map(([key, val]) => {
          if (!val || val === 'All' || val === 'All States' || val.startsWith('Any') || val === 'No minimum' || val === 'No requirement') {
            return null;
          }
          return (
            <span
              key={key}
              className="inline-flex items-center px-2.5 py-1 rounded-md bg-white border border-gray-200 text-gray-700 font-medium text-xs shadow-card"
            >
              <span className="capitalize text-gray-500 mr-1">{key}:</span>
              {val}
            </span>
          );
        })}

        <button
          onClick={() => navigate('/search')}
          className="ml-auto text-sm font-medium text-brand-600 hover:text-brand-700 hover:underline"
        >
          Change Criteria
        </button>
      </div>

      {/* Loading State */}
      {loading && <ScholarshipSkeletonGrid />}

      {/* Error State */}
      {error && (
        <div className="bg-white border border-red-200 shadow-sm rounded-xl p-8 text-center max-w-lg mx-auto mt-10">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Connection Error</h3>
          <p className="text-sm text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => fetchResults(initialFilters)}
            className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 inline-flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Search</span>
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && scholarships.length === 0 && (
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-12 text-center max-w-xl mx-auto space-y-4 mt-10">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No Matching Scholarships Found</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            No scholarships met all selected criteria simultaneously. Try broadening your state choice to "All States" or adjusting income range limits.
          </p>
          <div className="pt-4">
            <Link
              to="/search"
              className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white bg-brand-600 hover:bg-brand-700 transition-colors"
            >
              Adjust Search Filters
            </Link>
          </div>
        </div>
      )}

      {/* Results Grid */}
      {!loading && !error && sortedScholarships.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedScholarships.map((item) => {
            const isSelected = selectedForCompare.some(s => s._id === item._id);
            return (
              <div key={item._id} className="relative group">
                <button
                  onClick={() => toggleCompare(item)}
                  className={`absolute top-3 left-3 z-10 text-xs font-bold px-2.5 py-1 rounded-md border transition-all ${
                    isSelected 
                      ? 'bg-brand-600 text-white border-brand-600 shadow'
                      : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 opacity-80 group-hover:opacity-100'
                  }`}
                >
                  {isSelected ? '✓ Selected' : '+ Compare'}
                </button>
                <ScholarshipCard scholarship={item} />
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Compare Drawer Trigger */}
      {selectedForCompare.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40 bg-gray-900 text-white p-4 rounded-2xl shadow-2xl flex items-center space-x-4 border border-gray-700 animate-bounce">
          <div className="text-xs font-bold">
            <span>{selectedForCompare.length} selected for comparison</span>
          </div>
          <button
            onClick={() => setShowCompareModal(true)}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-colors"
          >
            <Scale className="w-4 h-4" />
            <span>Compare Now</span>
          </button>
          <button
            onClick={() => setSelectedForCompare([])}
            className="text-xs text-gray-400 hover:text-white"
          >
            Clear
          </button>
        </div>
      )}

      {/* Comparison Modal */}
      {showCompareModal && (
        <ComparisonModal
          items={selectedForCompare}
          onClose={() => setShowCompareModal(false)}
        />
      )}

    </div>
  );
}
