import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import Results from './pages/Results';
import Details from './pages/Details';
import Admin from './pages/Admin';

// Configure Axios default base URL for live Vercel deployment & local dev
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://scolarseek-backend.onrender.com';
axios.defaults.baseURL = API_BASE_URL;

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/results" element={<Results />} />
            <Route path="/scholarship/:id" element={<Details />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
