import React from 'react';
import { 
  Filter, Search, MapPin, IndianRupee, Users, Compass, 
  GraduationCap, Trophy, Palette, Stethoscope, Briefcase, 
  FlaskConical, Sprout, HeartHandshake, RotateCcw
} from 'lucide-react';

export default function FilterForm({ filters, setFilters, onSubmit, loading }) {

  const handleInputChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      state: 'All States',
      annualIncome: '< 3 Lakhs',
      category: 'General',
      sector: 'Educational',
    });
  };

  // State Options
  const states = [
    'All States',
    'Gujarat',
    'Maharashtra',
    'Delhi',
    'Karnataka',
    'Rajasthan',
    'UP',
    'Tamil Nadu',
    'West Bengal',
    'Punjab',
  ];

  // Annual Income Options
  const incomeRanges = [
    '< 3 Lakhs',
    '3-6 Lakhs',
    '6-10 Lakhs',
    '10-15 Lakhs',
    '> 15 Lakhs',
  ];

  // Category Options
  const categories = ['General', 'OBC', 'SC', 'ST', 'EWS'];

  // Sector Options with Icons
  const sectors = [
    { name: 'Educational', icon: GraduationCap },
    { name: 'Sports', icon: Trophy },
    { name: 'Arts & Culture', icon: Palette },
    { name: 'Healthcare', icon: Stethoscope },
    { name: 'Business & Entrepreneurship', icon: Briefcase },
    { name: 'Research & Innovation', icon: FlaskConical },
    { name: 'Agricultural', icon: Sprout },
    { name: 'Social Sector', icon: HeartHandshake },
  ];

  return (
    <form
      onSubmit={onSubmit}
      className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-brand-500/10 border border-brand-500/20 rounded-xl text-brand-400">
            <Filter className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Smart Scholarship Matcher</h3>
            <p className="text-xs text-slate-400">Specify your profile parameters to extract exact matching grants</p>
          </div>
        </div>
        
        <button
          type="button"
          onClick={resetFilters}
          className="flex items-center text-xs font-semibold text-slate-400 hover:text-brand-400 transition-colors px-3 py-1.5 rounded-lg border border-slate-800 hover:border-brand-500/30"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
          Reset All
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: UNIVERSAL FILTERS (Always Visible) */}
      {/* ========================================================================= */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-bold text-brand-400 uppercase tracking-wider mb-4">
          <span className="w-2 h-2 rounded-full bg-brand-400"></span>
          <span>Universal Eligibility Criteria</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Universal 1: State */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center">
              <MapPin className="w-3.5 h-3.5 text-brand-400 mr-1.5" />
              State of Domicile
            </label>
            <select
              value={filters.state || 'All States'}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all cursor-pointer"
            >
              {states.map((st) => (
                <option key={st} value={st} className="bg-slate-900 text-white">
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Universal 2: Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center">
              <Users className="w-3.5 h-3.5 text-brand-400 mr-1.5" />
              Social Category
            </label>
            <select
              value={filters.category || 'General'}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-900 text-white">
                  {cat} Category
                </option>
              ))}
            </select>
          </div>

          {/* Universal 3: Sector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center">
              <Compass className="w-3.5 h-3.5 text-brand-400 mr-1.5" />
              Select Sector
            </label>
            <select
              value={filters.sector || 'Educational'}
              onChange={(e) => handleInputChange('sector', e.target.value)}
              className="w-full bg-slate-950/80 border border-brand-500/50 text-brand-300 font-semibold rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 transition-all cursor-pointer"
            >
              {sectors.map((sec) => (
                <option key={sec.name} value={sec.name} className="bg-slate-900 text-white">
                  {sec.name}
                </option>
              ))}
            </select>
          </div>

          {/* Universal 4: Annual Income (Radio group span) */}
          <div className="md:col-span-2 lg:col-span-1">
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center">
              <IndianRupee className="w-3.5 h-3.5 text-brand-400 mr-1.5" />
              Annual Family Income
            </label>
            <div className="grid grid-cols-2 gap-2">
              {incomeRanges.map((inc) => (
                <label
                  key={inc}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg border text-xs cursor-pointer transition-all ${
                    filters.annualIncome === inc
                      ? 'bg-brand-600/30 border-brand-500 text-white font-semibold'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="annualIncome"
                    value={inc}
                    checked={filters.annualIncome === inc}
                    onChange={(e) => handleInputChange('annualIncome', e.target.value)}
                    className="accent-brand-500 w-3.5 h-3.5"
                  />
                  <span className="truncate">{inc}</span>
                </label>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: SECTOR-SPECIFIC CONDITIONAL FILTERS */}
      {/* ========================================================================= */}
      <div className="pt-6 border-t border-slate-800/80 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>{filters.sector || 'Educational'} Sector Specialized Requirements</span>
          </div>
          <span className="text-[10px] text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-md">
            Dynamic Filters Applied
          </span>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* SECTOR 1: EDUCATIONAL */}
        {/* ----------------------------------------------------------------------- */}
        {filters.sector === 'Educational' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-950/50 p-5 rounded-xl border border-slate-800/90">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Grade / Class Level</label>
              <select
                value={filters.grade || 'Any Grade'}
                onChange={(e) => handleInputChange('grade', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {['12th', 'Bachelor', 'Masters', 'PhD', 'Any Grade'].map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Field of Study</label>
              <select
                value={filters.fieldOfStudy || 'Any Field'}
                onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {['Science', 'Commerce', 'Arts', 'Engineering', 'Medical', 'Law', 'Management', 'Any Field'].map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">CGPA / Percentage</label>
              <select
                value={filters.cgpa || 'No minimum'}
                onChange={(e) => handleInputChange('cgpa', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {['40%+', '50%+', '60%+', '70%+', '80%+', 'No minimum'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* SECTOR 2: SPORTS */}
        {/* ----------------------------------------------------------------------- */}
        {filters.sector === 'Sports' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-950/50 p-5 rounded-xl border border-slate-800/90">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Sport Type</label>
              <select
                value={filters.sportType || 'Any Sport'}
                onChange={(e) => handleInputChange('sportType', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {['Cricket', 'Football', 'Basketball', 'Hockey', 'Badminton', 'Tennis', 'Athletics', 'Swimming', 'Any Sport'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Performance Achievement Level</label>
              <select
                value={filters.performanceLevel || 'Any Level'}
                onChange={(e) => handleInputChange('performanceLevel', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {['School Level', 'State Level', 'National Level', 'International Level', 'Any Level'].map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Athlete Age Group</label>
              <select
                value={filters.ageGroup || 'Any Age'}
                onChange={(e) => handleInputChange('ageGroup', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {['10-14', '14-18', '18-25', '25-35', 'Any Age'].map((a) => (
                  <option key={a} value={a}>{a} Years</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* SECTOR 3: ARTS & CULTURE */}
        {/* ----------------------------------------------------------------------- */}
        {filters.sector === 'Arts & Culture' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-950/50 p-5 rounded-xl border border-slate-800/90">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Art Discipline</label>
              <select
                value={filters.artDiscipline || 'Any Art'}
                onChange={(e) => handleInputChange('artDiscipline', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {['Classical Music', 'Contemporary Dance', 'Bharatanatyam', 'Theatre', 'Painting', 'Photography', 'Film', 'Any Art'].map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Proficiency Level</label>
              <select
                value={filters.proficiencyLevel || 'Any Level'}
                onChange={(e) => handleInputChange('proficiencyLevel', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {['Beginner', 'Intermediate', 'Advanced', 'Professional', 'Any Level'].map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Years of Dedicated Practice</label>
              <select
                value={filters.yearsOfPractice || 'Any Experience'}
                onChange={(e) => handleInputChange('yearsOfPractice', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {['<2 years', '2-5 years', '5-10 years', '>10 years', 'Any Experience'].map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* SECTOR 4: HEALTHCARE */}
        {/* ----------------------------------------------------------------------- */}
        {filters.sector === 'Healthcare' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-950/50 p-5 rounded-xl border border-slate-800/90">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Medical Field</label>
              <select
                value={filters.medicalField || 'Any Field'}
                onChange={(e) => handleInputChange('medicalField', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {['MBBS', 'BDS', 'Nursing', 'Pharmacy', 'Ayurveda', 'Homoeopathy', 'Physiotherapy', 'Any Field'].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Qualification Level</label>
              <select
                value={filters.qualificationLevel || 'Any Level'}
                onChange={(e) => handleInputChange('qualificationLevel', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {['Undergraduate', 'Postgraduate', 'PhD', 'Any Level'].map((q) => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">NEET Score Requirement</label>
              <select
                value={filters.neetScore || 'No requirement'}
                onChange={(e) => handleInputChange('neetScore', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {['400-500', '500-600', '600-700', '700+', 'No requirement'].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* SECTOR 5: BUSINESS & ENTREPRENEURSHIP */}
        {/* ----------------------------------------------------------------------- */}
        {filters.sector === 'Business & Entrepreneurship' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-950/50 p-5 rounded-xl border border-slate-800/90">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Business Venture Stage</label>
              <select
                value={filters.businessStage || 'Any Stage'}
                onChange={(e) => handleInputChange('businessStage', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {['Idea', 'Startup', 'Growth', 'Scale', 'Any Stage'].map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Business Industry Domain</label>
              <select
                value={filters.businessType || 'Any Type'}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {['Technology', 'Agriculture', 'Manufacturing', 'Retail', 'Healthcare', 'Education', 'Energy', 'Social', 'Any Type'].map((bt) => (
                  <option key={bt} value={bt}>{bt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Funding Requirement</label>
              <select
                value={filters.fundingRange || 'Any Amount'}
                onChange={(e) => handleInputChange('fundingRange', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {['<5L', '5-10L', '10-25L', '25-50L', '50+L', 'Any Amount'].map((fr) => (
                  <option key={fr} value={fr}>{fr}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* SECTOR 6: RESEARCH & INNOVATION */}
        {/* ----------------------------------------------------------------------- */}
        {filters.sector === 'Research & Innovation' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-950/50 p-5 rounded-xl border border-slate-800/90">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Research Domain</label>
              <select
                value={filters.researchField || 'Any Field'}
                onChange={(e) => handleInputChange('researchField', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {['AI', 'Biotechnology', 'Clean Energy', 'Medical Research', 'Space Tech', 'Quantum', 'Nano', 'Agriculture Tech', 'Any Field'].map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Research Academic Level</label>
              <select
                value={filters.researchLevel || 'Any Level'}
                onChange={(e) => handleInputChange('researchLevel', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {["Master's Research", 'PhD', 'Postdoctoral', 'Any Level'].map((rl) => (
                  <option key={rl} value={rl}>{rl}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Fellowship Duration</label>
              <select
                value={filters.durationMonths || 'Any Duration'}
                onChange={(e) => handleInputChange('durationMonths', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {['3-6 months', '6-12 months', '1-2 years', '2-5 years', 'Any Duration'].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* SECTOR 7: AGRICULTURAL */}
        {/* ----------------------------------------------------------------------- */}
        {filters.sector === 'Agricultural' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-950/50 p-5 rounded-xl border border-slate-800/90">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Agricultural Field</label>
              <select
                value={filters.agriField || 'Any Field'}
                onChange={(e) => handleInputChange('agriField', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {['Crop Cultivation', 'Horticulture', 'Animal Husbandry', 'Dairy', 'Fisheries', 'Forestry', 'Irrigation', 'Organic', 'Any Field'].map((ag) => (
                  <option key={ag} value={ag}>{ag}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Qualification Level</label>
              <select
                value={filters.agriQualification || 'Any Level'}
                onChange={(e) => handleInputChange('agriQualification', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {['10th/12th', 'Diploma', 'Bachelor', "Master's", 'PhD', 'Any Level'].map((aq) => (
                  <option key={aq} value={aq}>{aq}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Farm Scale & Type</label>
              <select
                value={filters.farmType || 'Any Type'}
                onChange={(e) => handleInputChange('farmType', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {['Small (<5 acres)', 'Medium (5-20)', 'Large (>20)', 'Urban Farm', 'Greenhouse', 'Any Type'].map((ft) => (
                  <option key={ft} value={ft}>{ft}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* SECTOR 8: SOCIAL SECTOR */}
        {/* ----------------------------------------------------------------------- */}
        {filters.sector === 'Social Sector' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-950/50 p-5 rounded-xl border border-slate-800/90">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Cause Area</label>
              <select
                value={filters.causeArea || 'Any Cause'}
                onChange={(e) => handleInputChange('causeArea', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {['Education', 'Healthcare', 'Environment', 'Gender Equality', 'Disability', 'Child Welfare', 'Poverty', 'Rural Dev', 'LGBTQ+', 'Any Cause'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Background Requirement</label>
              <select
                value={filters.backgroundRequired || 'Any Background'}
                onChange={(e) => handleInputChange('backgroundRequired', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {['Social Work degree', 'Development experience', 'Any relevant experience', 'Fresh graduate', 'Any Background'].map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Engagement Role Type</label>
              <select
                value={filters.roleType || 'Any Role'}
                onChange={(e) => handleInputChange('roleType', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {['Leadership', 'Implementation/Field work', 'Research', 'Training', 'Any Role'].map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SUBMIT BUTTON */}
      {/* ========================================================================= */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-6 rounded-xl font-bold text-base text-white bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 shadow-xl shadow-brand-600/30 hover:shadow-brand-500/50 transition-all flex items-center justify-center space-x-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Searching Scholarships Database...</span>
            </div>
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              <span>Search Scholarships Now</span>
            </>
          )}
        </button>
      </div>

    </form>
  );
}
