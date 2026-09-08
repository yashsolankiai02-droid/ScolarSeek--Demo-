import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, CheckCircle2, AlertCircle, ArrowLeft, Lock } from 'lucide-react';

export default function Admin() {
  const navigate = useNavigate();

  const [adminKey, setAdminKey] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    eligibility: '',
    sector: 'Educational',
    state: 'All States',
    category: ['General', 'OBC', 'SC', 'ST', 'EWS'],
    maxIncomeLimit: 800000,
    annualAmount: 50000,
    deadline: '',
    officialLink: '',
    // Educational
    grade: 'Bachelor',
    fieldOfStudy: 'Science',
    minCGPA: 60,
    // Sports
    sportType: 'Cricket',
    performanceLevel: 'State Level',
    ageGroup: '14-18',
    // Arts & Culture
    artDiscipline: 'Painting',
    proficiencyLevel: 'Intermediate',
    minYearsOfPractice: 2,
    // Healthcare
    medicalField: 'MBBS',
    qualificationLevel: 'Undergraduate',
    minNEETScore: 500,
    // Business
    businessStage: 'Startup',
    businessType: ['Technology'],
    fundingAmount: 500000,
    // Research
    researchField: 'AI',
    researchLevel: 'PhD',
    durationMonths: 12,
    // Agricultural
    agriField: 'Horticulture',
    agriQualification: 'Bachelor',
    farmType: ['Small (<5 acres)'],
    // Social
    causeArea: 'Education',
    backgroundRequired: 'Fresh graduate',
    roleType: 'Implementation/Field work',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleCategoryToggle = (cat) => {
    setFormData((prev) => {
      const exists = prev.category.includes(cat);
      if (exists) {
        return { ...prev, category: prev.category.filter((c) => c !== cat) };
      } else {
        return { ...prev, category: [...prev.category, cat] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    if (!adminKey) {
      setErrorMsg('Please enter your Admin Secret Passcode!');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/scholarships', formData, {
        headers: {
          'x-admin-key': adminKey,
        },
      });

      if (response.data && response.data.success) {
        setSuccessMsg(`🎉 Scholarship "${formData.name}" added successfully to MongoDB Atlas!`);
        setTimeout(() => {
          navigate('/results', { state: { filters: { sector: formData.sector } } });
        }, 1500);
      }
    } catch (err) {
      console.error('Error adding scholarship:', err);
      setErrorMsg(
        err.response?.data?.message || 'Failed to add scholarship. Check if your Admin Secret Key is correct.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      
      {/* Top Navigation */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1.5" />
        Back
      </button>

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-emerald-600 rounded-2xl text-white shadow-lg shadow-emerald-600/30">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Protected Admin Portal</h1>
            <p className="text-xs text-slate-400">Insert new verified scholarships into MongoDB Atlas</p>
          </div>
        </div>

        <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium">
          <Lock className="w-3.5 h-3.5 mr-1 text-amber-400" />
          <span>Password Protected</span>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-8">
        
        {/* Admin Passcode Header Box */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/30 space-y-2">
          <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center">
            <Lock className="w-3.5 h-3.5 mr-1.5" />
            Admin Security Passcode *
          </label>
          <input
            type="password"
            required
            placeholder="Enter your secret admin key (e.g. admin123)"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            className="w-full bg-slate-900 border border-amber-500/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
          />
          <p className="text-[11px] text-slate-400">
            Set your custom secret passcode in <code className="text-amber-300">config.env</code> under <code className="text-amber-300">ADMIN_KEY</code>.
          </p>
        </div>

        {/* Universal Section */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-brand-400 uppercase tracking-wider">Universal Scholarship Details</h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Scholarship Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. National Merit Higher Education Assistance Scheme"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Description *</label>
            <textarea
              required
              rows={3}
              placeholder="Brief summary of what the scholarship offers and its purpose..."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Detailed Eligibility Criteria *</label>
            <textarea
              required
              rows={3}
              placeholder="Who can apply? Academic marks, family conditions, age requirements..."
              value={formData.eligibility}
              onChange={(e) => handleChange('eligibility', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Sector *</label>
              <select
                value={formData.sector}
                onChange={(e) => handleChange('sector', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {[
                  'Educational',
                  'Sports',
                  'Arts & Culture',
                  'Healthcare',
                  'Business & Entrepreneurship',
                  'Research & Innovation',
                  'Agricultural',
                  'Social Sector',
                ].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">State *</label>
              <select
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {[
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
                ].map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Annual Amount (₹) *</label>
              <input
                type="number"
                required
                placeholder="50000"
                value={formData.annualAmount}
                onChange={(e) => handleChange('annualAmount', Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Max Family Income Limit (₹) *</label>
              <input
                type="number"
                required
                placeholder="800000"
                value={formData.maxIncomeLimit}
                onChange={(e) => handleChange('maxIncomeLimit', Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Application Deadline *</label>
              <input
                type="date"
                required
                value={formData.deadline}
                onChange={(e) => handleChange('deadline', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Official Application Link URL *</label>
            <input
              type="url"
              required
              placeholder="https://scholarships.gov.in"
              value={formData.officialLink}
              onChange={(e) => handleChange('officialLink', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Category Checkboxes */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Eligible Social Categories</label>
            <div className="flex flex-wrap gap-3">
              {['General', 'OBC', 'SC', 'ST', 'EWS'].map((cat) => (
                <label
                  key={cat}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg border text-xs cursor-pointer ${
                    formData.category.includes(cat)
                      ? 'bg-brand-600/30 border-brand-500 text-white font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.category.includes(cat)}
                    onChange={() => handleCategoryToggle(cat)}
                    className="accent-brand-500"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* Sector Specific Section */}
        <div className="pt-6 border-t border-slate-800 space-y-6">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
            {formData.sector} Sector Extra Specifics
          </h3>

          {formData.sector === 'Educational' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">Grade</label>
                <select
                  value={formData.grade}
                  onChange={(e) => handleChange('grade', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white"
                >
                  {['12th', 'Bachelor', 'Masters', 'PhD', 'Any Grade'].map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">Field of Study</label>
                <select
                  value={formData.fieldOfStudy}
                  onChange={(e) => handleChange('fieldOfStudy', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white"
                >
                  {['Science', 'Commerce', 'Arts', 'Engineering', 'Medical', 'Law', 'Management', 'Any Field'].map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">Min Percentage Required (%)</label>
                <input
                  type="number"
                  placeholder="60"
                  value={formData.minCGPA}
                  onChange={(e) => handleChange('minCGPA', Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white"
                />
              </div>
            </div>
          )}

          {formData.sector === 'Sports' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">Sport Type</label>
                <select
                  value={formData.sportType}
                  onChange={(e) => handleChange('sportType', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white"
                >
                  {['Cricket', 'Football', 'Basketball', 'Hockey', 'Badminton', 'Tennis', 'Athletics', 'Swimming', 'Any Sport'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">Performance Level</label>
                <select
                  value={formData.performanceLevel}
                  onChange={(e) => handleChange('performanceLevel', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white"
                >
                  {['School Level', 'State Level', 'National Level', 'International Level', 'Any Level'].map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">Age Group</label>
                <select
                  value={formData.ageGroup}
                  onChange={(e) => handleChange('ageGroup', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white"
                >
                  {['10-14', '14-18', '18-25', '25-35', 'Any Age'].map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-6 rounded-xl font-bold text-base text-white bg-gradient-to-r from-emerald-600 via-teal-500 to-brand-600 hover:from-emerald-500 hover:to-brand-500 shadow-xl transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <Lock className="w-4 h-4" />
          <span>{loading ? 'Verifying Admin Key & Saving...' : 'Save Scholarship to Database'}</span>
        </button>

      </form>

    </div>
  );
}
