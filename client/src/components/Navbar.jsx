import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Search, Home, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2.5 bg-gradient-to-tr from-brand-600 to-brand-400 rounded-xl text-white shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-brand-300 bg-clip-text text-transparent">
                Scholar<span className="text-brand-400">Seek</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-brand-500/10 text-brand-400 border border-brand-500/20 rounded-full">
                India
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                isActive('/')
                  ? 'bg-brand-600/20 text-brand-400 border border-brand-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>

            <Link
              to="/search"
              className={`flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                isActive('/search')
                  ? 'bg-brand-600/20 text-brand-400 border border-brand-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Search className="w-4 h-4 mr-2" />
              Find Scholarships
            </Link>

            <Link
              to="/search"
              className="ml-4 flex items-center px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 shadow-lg shadow-brand-600/30 hover:shadow-brand-500/40 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
              Start Matcher
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800 px-4 pt-2 pb-6 space-y-2 animate-fade-in">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center px-4 py-3 rounded-lg text-base font-medium ${
              isActive('/') ? 'bg-brand-600/20 text-brand-400' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Home className="w-5 h-5 mr-3" />
            Home
          </Link>

          <Link
            to="/search"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center px-4 py-3 rounded-lg text-base font-medium ${
              isActive('/search') ? 'bg-brand-600/20 text-brand-400' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Search className="w-5 h-5 mr-3" />
            Find Scholarships
          </Link>

          <Link
            to="/search"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center w-full mt-4 px-5 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-brand-600 to-brand-500"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start Matcher
          </Link>
        </div>
      )}
    </header>
  );
}
