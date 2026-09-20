import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search as SearchIcon, SlidersHorizontal } from 'lucide-react';
import ScholarshipCard from '../../components/ScholarshipCard';
import seedScholarships from '../../data/seedData';

const MobileSearch = () => {
  const [filters, setFilters] = useState({
    state: 'All States',
    category: 'General',
    annualIncome: '< 3 Lakhs',
    sector: 'Educational',
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    fetchResults();
  }, []);

  const filterSeedDataLocally = (filterObj) => {
    return seedScholarships.filter(item => {
      if (filterObj.state && filterObj.state !== 'All States' && item.state !== 'All States') {
        if (item.state.toLowerCase() !== filterObj.state.toLowerCase()) return false;
      }
      if (filterObj.sector && filterObj.sector !== 'All') {
        if (item.sector && item.sector.toLowerCase() !== filterObj.sector.toLowerCase()) return false;
      }
      return true;
    });
  };

  const fetchResults = async (customFilters = filters) => {
    setLoading(true);
    setSearched(true);
    try {
      const response = await axios.post('/api/search', customFilters);
      if (response.data && response.data.success && response.data.data.length > 0) {
        setResults(response.data.data);
      } else {
        setResults(filterSeedDataLocally(customFilters));
      }
    } catch (error) {
      console.warn('Network or proxy error in MobileSearch, using local seedData fallback:', error.message);
      setResults(filterSeedDataLocally(customFilters));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchResults();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">

      {/* Filter Form - Always Visible on Screen */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-5">
        <div className="flex items-center space-x-2 mb-5">
          <SlidersHorizontal className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Find Scholarships</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* State */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">State</label>
            <select
              value={filters.state}
              onChange={(e) => setFilters({ ...filters, state: e.target.value })}
              className="w-full h-12 px-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
            >
              <option value="All States">All States</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Delhi">Delhi</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="UP">Uttar Pradesh</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full h-12 px-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
            >
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="EWS">EWS</option>
            </select>
          </div>

          {/* Income */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Family Income</label>
            <select
              value={filters.annualIncome}
              onChange={(e) => setFilters({ ...filters, annualIncome: e.target.value })}
              className="w-full h-12 px-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
            >
              <option value="< 3 Lakhs">Less than ₹3 Lakhs</option>
              <option value="3-6 Lakhs">₹3 - 6 Lakhs</option>
              <option value="6-10 Lakhs">₹6 - 10 Lakhs</option>
              <option value="10-15 Lakhs">₹10 - 15 Lakhs</option>
              <option value="> 15 Lakhs">More than ₹15 Lakhs</option>
            </select>
          </div>

          {/* Sector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Sector</label>
            <select
              value={filters.sector}
              onChange={(e) => setFilters({ ...filters, sector: e.target.value })}
              className="w-full h-12 px-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
            >
              <option value="Educational">Educational</option>
              <option value="Sports">Sports</option>
              <option value="Arts & Culture">Arts & Culture</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Business & Entrepreneurship">Business & Entrepreneurship</option>
              <option value="Research & Innovation">Research & Innovation</option>
              <option value="Agricultural">Agricultural</option>
              <option value="Social Sector">Social Sector</option>
            </select>
          </div>

          {/* Find Scholarships Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-sm disabled:opacity-60"
          >
            <SearchIcon className="w-5 h-5" />
            <span>{loading ? 'Searching...' : 'Find Scholarships'}</span>
          </button>
        </form>
      </div>

      {/* Results */}
      <div className="px-4 py-5 space-y-4">
        {loading ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400 text-sm">Searching scholarships...</div>
        ) : results.length > 0 ? (
          <>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Found <span className="text-brand-600 dark:text-brand-400">{results.length}</span> scholarships
            </p>
            {results.map(scholarship => (
              <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
            ))}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-base font-medium">No scholarships found</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Try adjusting your filters above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileSearch;
