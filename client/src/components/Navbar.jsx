import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Search, Home, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white border border-gray-200 shadow-sm border-b border-gray-200/80 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2.5 bg-brand-600 rounded-xl text-white group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-gray-900">
                Scholar<span className="text-brand-600">Seek</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-brand-50 text-brand-700 border border-brand-100 rounded-full">
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
                  ? 'bg-brand-50 text-brand-700 border border-brand-100'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/60'
              }`}
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>

            <Link
              to="/search"
              className={`flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                isActive('/search')
                  ? 'bg-brand-50 text-brand-700 border border-brand-100'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/60'
              }`}
            >
              <Search className="w-4 h-4 mr-2" />
              Find Scholarships
            </Link>

            <Link
              to="/search"
              className="ml-4 flex items-center px-5 py-2.5 rounded-lg font-semibold text-sm text-white bg-brand-600 hover:bg-brand-700 transition-all"
            >
              <Search className="w-4 h-4 mr-2" />
              Start Matcher
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-2 animate-fade-in shadow-md">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center px-4 py-3 rounded-lg text-base font-medium ${
              isActive('/') ? 'bg-brand-50 text-brand-700' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Home className="w-5 h-5 mr-3" />
            Home
          </Link>

          <Link
            to="/search"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center px-4 py-3 rounded-lg text-base font-medium ${
              isActive('/search') ? 'bg-brand-50 text-brand-700' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Search className="w-5 h-5 mr-3" />
            Find Scholarships
          </Link>

          <Link
            to="/search"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center w-full mt-4 px-5 py-3 rounded-lg font-bold text-white bg-brand-600 hover:bg-brand-700"
          >
            <Search className="w-5 h-5 mr-2" />
            Start Matcher
          </Link>
        </div>
      )}
    </header>
  );
}
