import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Heart, ShieldCheck, ExternalLink, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-brand-600 rounded-lg text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white">ScholarSeek</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              India's premier smart scholarship discovery portal. Tailored matching based on your sector, income, category, and state profile.
            </p>
            <div className="flex items-center space-x-2 text-xs text-brand-400">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Free & Verified Portals</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-brand-400 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-brand-400 transition-colors">Search Engine</Link>
              </li>
              <li>
                <Link to="/search?sector=Educational" className="hover:text-brand-400 transition-colors">Education Scholarships</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-amber-400 transition-colors flex items-center">
                  <Lock className="w-3 h-3 mr-1 text-amber-400" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Sectors List */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Featured Sectors</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/search?sector=Business%20%26%20Entrepreneurship" className="hover:text-brand-400 transition-colors">Business & Startups</Link>
              </li>
              <li>
                <Link to="/search?sector=Healthcare" className="hover:text-brand-400 transition-colors">Healthcare & Nursing</Link>
              </li>
              <li>
                <Link to="/search?sector=Research%20%26%20Innovation" className="hover:text-brand-400 transition-colors">Research & CSIR Grants</Link>
              </li>
              <li>
                <Link to="/search?sector=Arts%20%26%20Culture" className="hover:text-brand-400 transition-colors">Arts & Culture Fellowship</Link>
              </li>
            </ul>
          </div>

          {/* External Portals */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Government Portals</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="https://scholarships.gov.in" target="_blank" rel="noreferrer" className="flex items-center hover:text-brand-400 transition-colors">
                  <span>National Scholarship Portal</span>
                  <ExternalLink className="w-3 h-3 ml-1.5 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://digitalgujarat.gov.in" target="_blank" rel="noreferrer" className="flex items-center hover:text-brand-400 transition-colors">
                  <span>Digital Gujarat Portal</span>
                  <ExternalLink className="w-3 h-3 ml-1.5 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://startupindia.gov.in" target="_blank" rel="noreferrer" className="flex items-center hover:text-brand-400 transition-colors">
                  <span>Startup India Portal</span>
                  <ExternalLink className="w-3 h-3 ml-1.5 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ScholarSeek Platform. All rights reserved.</p>
          <p className="flex items-center mt-4 sm:mt-0">
            Crafted with <Heart className="w-3.5 h-3.5 mx-1 text-red-500 fill-red-500" /> for Indian Students
          </p>
        </div>
      </div>
    </footer>
  );
}
