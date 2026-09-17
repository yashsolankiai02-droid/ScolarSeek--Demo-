import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FilterForm from '../components/FilterForm';
import { Search as SearchIcon, Sparkles } from 'lucide-react';

export default function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSector = searchParams.get('sector') || 'Educational';

  const [filters, setFilters] = useState({
    state: 'All States',
    annualIncome: '< 3 Lakhs',
    category: 'General',
    sector: initialSector,
    grade: 'Any Grade',
    fieldOfStudy: 'Any Field',
    cgpa: 'No minimum',
    sportType: 'Any Sport',
    performanceLevel: 'Any Level',
    ageGroup: 'Any Age',
    artDiscipline: 'Any Art',
    proficiencyLevel: 'Any Level',
    yearsOfPractice: 'Any Experience',
    medicalField: 'Any Field',
    qualificationLevel: 'Any Level',
    neetScore: 'No requirement',
    businessStage: 'Any Stage',
    businessType: 'Any Type',
    fundingRange: 'Any Amount',
    researchField: 'Any Field',
    researchLevel: 'Any Level',
    durationMonths: 'Any Duration',
    agriField: 'Any Field',
    agriQualification: 'Any Level',
    farmType: 'Any Type',
    causeArea: 'Any Cause',
    backgroundRequired: 'Any Background',
    roleType: 'Any Role',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sectorFromUrl = searchParams.get('sector');
    if (sectorFromUrl) {
      setFilters((prev) => ({ ...prev, sector: sectorFromUrl }));
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Pass filter state to Results page via Router state
    setTimeout(() => {
      navigate('/results', { state: { filters } });
    }, 400);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tailored Filter Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Search Scholarships</h1>
        <p className="text-gray-600 text-sm max-w-xl mx-auto">
          Configure your state, category, annual income, and sector parameters below.
          The algorithm will match active scholarships instantly.
        </p>
      </div>

      {/* Filter Form Component */}
      <FilterForm
        filters={filters}
        setFilters={setFilters}
        onSubmit={handleSubmit}
        loading={loading}
      />

    </div>
  );
}
