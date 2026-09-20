import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Search, Home, Menu, X, Sparkles, LayoutDashboard, Bookmark, FileText, User } from 'lucide-react';
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
              to="/dashboard"
              className={`flex items-center px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                isActive('/dashboard') ? 'bg-brand-50 text-brand-700 border border-brand-100' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </Link>

            <Link
              to="/search"
              className={`flex items-center px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                isActive('/search') ? 'bg-brand-50 text-brand-700 border border-brand-100' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Search className="w-4 h-4 mr-2" />
              Explore
            </Link>

            <Link
              to="/saved"
              className={`flex items-center px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                isActive('/saved') ? 'bg-brand-50 text-brand-700 border border-brand-100' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Bookmark className="w-4 h-4 mr-2" />
              Saved
            </Link>

            <Link
              to="/applications"
              className={`flex items-center px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                isActive('/applications') ? 'bg-brand-50 text-brand-700 border border-brand-100' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <FileText className="w-4 h-4 mr-2" />
              Applications
            </Link>

            <Link
              to="/profile"
              className={`ml-4 flex items-center px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                isActive('/profile') ? 'bg-brand-600 text-white shadow-sm' : 'bg-white text-brand-600 border border-brand-200 hover:bg-brand-50'
              }`}
            >
              <User className="w-4 h-4 mr-2" />
              Profile
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
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center px-4 py-3 rounded-lg text-base font-medium ${
              isActive('/dashboard') ? 'bg-brand-50 text-brand-700' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>

          <Link
            to="/search"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center px-4 py-3 rounded-lg text-base font-medium ${
              isActive('/search') ? 'bg-brand-50 text-brand-700' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Search className="w-5 h-5 mr-3" />
            Explore Scholarships
          </Link>

          <Link
            to="/saved"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center px-4 py-3 rounded-lg text-base font-medium ${
              isActive('/saved') ? 'bg-brand-50 text-brand-700' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Bookmark className="w-5 h-5 mr-3" />
            Saved Scholarships
          </Link>

          <Link
            to="/applications"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center px-4 py-3 rounded-lg text-base font-medium ${
              isActive('/applications') ? 'bg-brand-50 text-brand-700' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FileText className="w-5 h-5 mr-3" />
            My Applications
          </Link>

          <Link
            to="/profile"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-center w-full mt-4 px-5 py-3 rounded-lg font-bold ${
              isActive('/profile') ? 'text-white bg-brand-600' : 'text-brand-700 bg-brand-50 border border-brand-200'
            }`}
          >
            <User className="w-5 h-5 mr-2" />
            Student Profile
          </Link>
        </div>
      )}
    </header>
  );
}
