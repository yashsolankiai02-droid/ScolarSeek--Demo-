import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// Contexts
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProfileProvider } from './contexts/ProfileContext';
import { SavedProvider } from './contexts/SavedContext';
import { ApplicationsProvider } from './contexts/ApplicationsContext';
import { LanguageProvider } from './contexts/LanguageContext';

// Hook
import useDeviceMode from './hooks/useDeviceMode';

// Layouts
import DesktopLayout from './layouts/DesktopLayout';
import MobileLayout from './layouts/MobileLayout';

// Auth Page
import Login from './pages/Login';

// Shared Pages
import Search from './pages/Search';
import Results from './pages/Results';
import Details from './pages/Details';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Saved from './pages/Saved';
import Applications from './pages/Applications';
import Dashboard from './pages/Dashboard';

// Mobile-specific Pages
import MobileDashboard from './pages/mobile/MobileDashboard';
import MobileSearch from './pages/mobile/MobileSearch';
import MobileDetails from './pages/mobile/MobileDetails';

// Global Components
import StudentAssistant from './components/StudentAssistant';

// Configure Axios default Base URL
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
axios.defaults.baseURL = import.meta.env.VITE_API_URL || (isLocalhost ? 'http://localhost:5000' : '');

// Protected route wrapper
function ProtectedRoutes() {
  const { isAuthenticated } = useAuth();
  const mode = useDeviceMode();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (mode === 'mobile') {
    return (
      <MobileLayout>
        <Routes>
          <Route path="/dashboard" element={<MobileDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/search" element={<MobileSearch />} />
          <Route path="/results" element={<Results />} />
          <Route path="/scholarship/:id" element={<MobileDetails />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </MobileLayout>
    );
  }

  // Desktop
  return (
    <DesktopLayout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/search" element={<Search />} />
        <Route path="/results" element={<Results />} />
        <Route path="/scholarship/:id" element={<Details />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DesktopLayout>
  );
}

function AppRoutes() {
  const { user, isAuthenticated } = useAuth();

  const getLoginElement = () => {
    if (!isAuthenticated) return <Login />;
    const role = (user?.role || '').toLowerCase();
    const userEmail = (user?.email || '').toLowerCase();
    const isAdmin = role.includes('admin') || role.includes('administrator') || role.includes('super') || userEmail === 'yashsolanki@scholarseek.ac.in';
    return <Navigate to={isAdmin ? "/admin" : "/dashboard"} replace />;
  };

  return (
    <Routes>
      {/* Direct accessible routes */}
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={getLoginElement()} />
      <Route path="/*" element={<ProtectedRoutes />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ProfileProvider>
          <SavedProvider>
            <ApplicationsProvider>
              <Router>
                <AppRoutes />
                <StudentAssistant />
              </Router>
            </ApplicationsProvider>
          </SavedProvider>
        </ProfileProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
