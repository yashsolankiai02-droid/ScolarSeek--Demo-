import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';
import { 
  GraduationCap, Trophy, Palette, Stethoscope, Briefcase, 
  FlaskConical, Sprout, HeartHandshake, Search, 
  CheckCircle2, ArrowRight, ShieldCheck, Zap, Layers, MapPin
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { completionPercentage } = useProfile();

  useEffect(() => {
    if (completionPercentage > 0) {
      navigate('/dashboard');
    }
  }, [completionPercentage, navigate]);
  const sectorCards = [
    {
      title: 'Educational',
      icon: GraduationCap,
      description: 'Pre-matric, post-matric, engineering, medical, law, and degree grants.',
      color: 'text-blue-600 bg-blue-50',
    },
    {
      title: 'Sports',
      icon: Trophy,
      description: 'Stipends, tournament grants, and TOPS training for state & national athletes.',
      color: 'text-amber-600 bg-amber-50',
    },
    {
      title: 'Arts & Culture',
      icon: Palette,
      description: 'CCRT & Sangeet Natak Akademi fellowships for music, dance, and visual arts.',
      color: 'text-pink-600 bg-pink-50',
    },
    {
      title: 'Healthcare',
      icon: Stethoscope,
      description: 'MBBS, BDS, Nursing, AYUSH, and NEET-based financial aid.',
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      title: 'Business & Entrepreneurship',
      icon: Briefcase,
      description: 'Startup India seed funds, innovation grants, and Stand-Up India capital.',
      color: 'text-cyan-600 bg-cyan-50',
    },
    {
      title: 'Research & Innovation',
      icon: FlaskConical,
      description: 'CSIR NET, PMRF, SERB, and doctoral/postdoctoral fellowships.',
      color: 'text-rose-600 bg-rose-50',
    },
    {
      title: 'Agricultural',
      icon: Sprout,
      description: 'ICAR JRF/SRF, organic farming incentives, and dairy youth development.',
      color: 'text-green-600 bg-green-50',
    },
    {
      title: 'Social Sector',
      icon: HeartHandshake,
      description: 'NGO development grants, education grassroots work, and disability rights.',
      color: 'text-purple-600 bg-purple-50',
    },
  ];

  const handleSectorClick = (sectorName) => {
    navigate(`/search?sector=${encodeURIComponent(sectorName)}`);
  };

  return (
    <div className="space-y-16 pb-16 bg-gray-50">
      
      {/* ========================================================================= */}
      {/* 1. FUNCTIONAL SEARCH HERO */}
      {/* ========================================================================= */}
      <section className="bg-white border-b border-gray-200 pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Find scholarships you are eligible for.
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Search a verified database of central government, state, and private scholarships across India. Compare opportunities and check eligibility criteria before you apply.
          </p>

          {/* Quick Search Entry */}
          <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-soft max-w-3xl mx-auto flex flex-col md:flex-row gap-3">
            <div className="flex-1 flex items-center border border-gray-200 rounded-lg px-4 bg-gray-50 focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-brand-500 transition-all">
              <Search className="w-5 h-5 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="What are you studying? (e.g. B.Tech, MBBS)"
                className="w-full bg-transparent py-3 text-sm text-gray-900 outline-none"
              />
            </div>
            
            <div className="flex-1 flex items-center border border-gray-200 rounded-lg px-4 bg-gray-50 focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-brand-500 transition-all">
              <MapPin className="w-5 h-5 text-gray-400 mr-2" />
              <select className="w-full bg-transparent py-3 text-sm text-gray-900 outline-none cursor-pointer">
                <option value="">Where are you from?</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="gujarat">Gujarat</option>
                <option value="karnataka">Karnataka</option>
                <option value="delhi">Delhi</option>
              </select>
            </div>

            <button 
              onClick={() => navigate('/search')}
              className="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
            >
              Search
            </button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-12">
            <span className="flex items-center"><ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-600" /> Verified Data</span>
            <span className="flex items-center"><Layers className="w-4 h-4 mr-1.5 text-brand-600" /> 8 Unique Sectors</span>
            <span className="flex items-center"><Zap className="w-4 h-4 mr-1.5 text-amber-500" /> Instant Matching</span>
          </div>
        </div>

        {/* Hero Image - Wider container */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full rounded-2xl overflow-hidden shadow-xl border border-gray-200 h-[300px] md:h-[450px]">
            <img 
              src="/images/students_campus_hero.jpg" 
              alt="Diverse university students on campus" 
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. BROWSE BY CATEGORY */}
      {/* ========================================================================= */}
      <section id="sectors" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Browse by Sector</h2>
            <p className="text-gray-600 text-sm">
              Select a field to view scholarships tailored to specific requirements.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sectorCards.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                onClick={() => handleSectorClick(cat.title)}
                className="bg-white border border-gray-200 p-5 rounded-xl cursor-pointer hover:border-brand-300 hover:shadow-soft transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${cat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-brand-600 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  {cat.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. HOW IT WORKS (Functional explanation) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 lg:p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">How Scolar Seek Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm mb-4">1</div>
              <h3 className="text-lg font-bold text-gray-900">Define your profile</h3>
              <p className="text-sm text-gray-600">Enter your course, state, family income, and category to filter out scholarships you aren't eligible for.</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm mb-4">2</div>
              <h3 className="text-lg font-bold text-gray-900">Compare opportunities</h3>
              <p className="text-sm text-gray-600">Review verified scholarship amounts, required documents, and exact application deadlines side-by-side.</p>
            </div>

            <div className="space-y-3">
              <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm mb-4">3</div>
              <h3 className="text-lg font-bold text-gray-900">Apply via official sources</h3>
              <p className="text-sm text-gray-600">Scolar Seek points you directly to official government portals or private trust websites to submit your application safely.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
