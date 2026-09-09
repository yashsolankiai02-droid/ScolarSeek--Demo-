import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, Trophy, Palette, Stethoscope, Briefcase, 
  FlaskConical, Sprout, HeartHandshake, Sparkles, Search, 
  CheckCircle2, ArrowRight, ShieldCheck, Zap, Layers
} from 'lucide-react';
import ScholarshipInsights from '../components/ScholarshipInsights';

export default function Home() {
  const navigate = useNavigate();

  const sectorCards = [
    {
      title: 'Educational',
      icon: GraduationCap,
      description: 'Pre-matric, post-matric, engineering, medical, law, and degree grants.',
      gradient: 'from-blue-600 to-indigo-600',
    },
    {
      title: 'Sports',
      icon: Trophy,
      description: 'Stipends, tournament grants, and TOPS training for state & national athletes.',
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      title: 'Arts & Culture',
      icon: Palette,
      description: 'CCRT & Sangeet Natak Akademi fellowships for music, dance, and visual arts.',
      gradient: 'from-purple-600 to-pink-600',
    },
    {
      title: 'Healthcare',
      icon: Stethoscope,
      description: 'MBBS, BDS, Nursing, AYUSH, and NEET-based financial aid.',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'Business & Entrepreneurship',
      icon: Briefcase,
      description: 'Startup India seed funds, innovation grants, and Stand-Up India capital.',
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      title: 'Research & Innovation',
      icon: FlaskConical,
      description: 'CSIR NET, PMRF, SERB, and doctoral/postdoctoral fellowships.',
      gradient: 'from-rose-500 to-red-600',
    },
    {
      title: 'Agricultural',
      icon: Sprout,
      description: 'ICAR JRF/SRF, organic farming incentives, and dairy youth development.',
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      title: 'Social Sector',
      icon: HeartHandshake,
      description: 'NGO development grants, education grassroots work, and disability rights.',
      gradient: 'from-violet-600 to-purple-600',
    },
  ];

  const handleSectorClick = (sectorName) => {
    navigate(`/search?sector=${encodeURIComponent(sectorName)}`);
  };

  return (
    <div className="space-y-24 pb-16">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Split Layout) */}
      {/* ========================================================================= */}
      <section className="relative pt-12 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[350px] bg-brand-600/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="text-left">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-panel border border-brand-500/30 text-brand-300 text-xs font-semibold mb-8 animate-fade-in">
                <Sparkles className="w-4 h-4 text-brand-400 animate-spin" />
                <span>Smart Multi-Sector Scholarship Discovery Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                Find Your <span className="bg-gradient-to-r from-brand-400 via-cyan-300 to-brand-500 bg-clip-text text-transparent">Perfect Scholarship</span>
              </h1>

              <p className="text-lg text-slate-300 mb-10 leading-relaxed font-light">
                Discover scholarships from across India tailored precisely to your profile.
                Customized filtering across <strong className="text-white">8 distinct sectors</strong> with universal income, state, and category matching.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  to="/search"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 shadow-xl shadow-brand-600/30 hover:shadow-brand-500/50 transition-all hover:scale-105 flex items-center justify-center space-x-3"
                >
                  <Search className="w-5 h-5" />
                  <span>Start Searching Now</span>
                </Link>

                <a
                  href="#sectors"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-slate-300 hover:text-white glass-panel border border-slate-700/80 hover:border-brand-500/40 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Explore 8 Sectors</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative group lg:mt-0 mt-10">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-cyan-400 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl">
                <img 
                  src="/images/features_dashboard.jpg" 
                  alt="Scholarship Dashboard Interface" 
                  className="w-full h-auto object-cover transform hover:scale-105 transition duration-700"
                />
              </div>
            </div>
          </div>

          {/* Quick Metrics (Below Hero) */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Verified Scholarships', value: '200+' },
              { label: 'Distinct Sectors', value: '8 Fields' },
              { label: 'States Covered', value: 'All India' },
              { label: 'Total Annual Aid', value: '₹50+ Cr' },
            ].map((stat, i) => (
              <div key={i} className="glass-panel p-4 rounded-xl border border-slate-800 text-center hover:bg-slate-800/50 transition-colors">
                <div className="text-2xl sm:text-3xl font-extrabold text-brand-400">{stat.value}</div>
                <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. 8 SECTOR CATEGORY CARDS */}
      {/* ========================================================================= */}
      <section id="sectors" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white mb-3">Explore Scholarships by Sector</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm">
            Every sector has unique questions. Click a category card to launch the tailored search engine.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectorCards.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                onClick={() => handleSectorClick(cat.title)}
                className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-800 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${cat.gradient} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {cat.description}
                  </p>
                </div>

                <div className="flex items-center text-xs font-semibold text-brand-400 group-hover:text-brand-300">
                  <span>Match Criteria</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. KEY FEATURES + STATISTICAL DIAGRAM */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Features List (Left) */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-extrabold text-white mb-3">
                  Data-Driven & Verified
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  We monitor over 200+ government portals to ensure our database is always up to date. The chart shows the current live distribution of active schemes.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex space-x-4">
                  <div className="p-3 bg-brand-500/10 border border-brand-500/20 rounded-2xl text-brand-400 h-fit">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Conditional Filters</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Only answer what applies to you. Educational asks for CGPA; Healthcare asks for NEET score.
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 h-fit">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Verified Government Data</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Direct official links to scholarships.gov.in, AICTE, CSIR, and official portals.
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-400 h-fit">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Zero Document Upload</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Instant accurate scholarship matches in under 10 seconds, no login required.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistical Chart (Right) */}
            <div className="h-full">
              <ScholarshipInsights />
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PINPOINT PRECISION SECTION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Image Side (Left) */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-[2rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl">
              <img 
                src="/images/scholarship_features.jpg" 
                alt="Scholarship Advanced Filtering" 
                className="w-full h-auto object-cover transform hover:scale-105 transition duration-700"
              />
            </div>
          </div>

          {/* Text Side (Right) */}
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-white">
              Pinpoint Precision Matching
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Finding the right scholarship shouldn't feel like searching for a needle in a haystack. 
              Our intelligent filtering engine allows you to cross-reference multiple data points to find the exact match for your unique profile.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="glass-panel p-5 rounded-xl border border-slate-800">
                <div className="font-bold text-brand-400 mb-2">State & Category</div>
                <p className="text-xs text-slate-400">Filter by domicile requirements and specific quota allotments seamlessly.</p>
              </div>
              <div className="glass-panel p-5 rounded-xl border border-slate-800">
                <div className="font-bold text-brand-400 mb-2">Income Ceilings</div>
                <p className="text-xs text-slate-400">Automatically filter out scholarships where your family income exceeds the limit.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. BOTTOM CTA BANNER */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-900 via-brand-700 to-slate-900 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border border-brand-500/30 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Unlock Your Scholarship Funding?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm mb-8">
            Filter through hundreds of active schemes from central government, state bodies, and private trusts.
          </p>
          <Link
            to="/search"
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl font-bold text-brand-950 bg-white hover:bg-slate-100 shadow-xl transition-all hover:scale-105 cursor-pointer"
          >
            <Search className="w-5 h-5" />
            <span>Launch Scholarship Matcher</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
