import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('auth_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });

  const saveUser = (userData) => {
    if (userData) {
      try {
        localStorage.setItem('auth_user', JSON.stringify(userData));
      } catch (e) {}
      setUser(userData);
    } else {
      localStorage.removeItem('auth_user');
      setUser(null);
    }
  };

  const signup = async (emailInput, password, nameInput) => {
    const email = (emailInput || '').trim().toLowerCase();
    const name = (nameInput || '').trim() || 'Student';

    if (!email || !password) {
      return { success: false, error: 'Email and password are required.' };
    }

    try {
      const response = await axios.post('/api/auth/register', { email, password, name });
      if (response.data && response.data.success && response.data.user) {
        saveUser(response.data.user);
        return { success: true, user: response.data.user };
      } else if (response.data && response.data.error) {
        return { success: false, error: response.data.error };
      }
    } catch (e) {
      console.warn('Backend signup API error:', e.message);
      if (e.response && e.response.data && e.response.data.error) {
        return { success: false, error: e.response.data.error };
      }
    }

    // Local Storage Fallback
    const loggedUser = { email, name, role: 'student' };
    try {
      const accounts = JSON.parse(localStorage.getItem('auth_accounts') || '[]');
      accounts.push({ email, password, name, role: 'student', createdAt: new Date().toISOString() });
      localStorage.setItem('auth_accounts', JSON.stringify(accounts));
    } catch (err) {}

    saveUser(loggedUser);
    return { success: true, user: loggedUser };
  };

  const login = async (emailInput, passwordInput) => {
    const email = (emailInput || '').trim().toLowerCase();
    const password = (passwordInput || '').trim();

    if (!email || !password) {
      return { success: false, error: 'Email and password are required.' };
    }

    // Check Primary Super Admin Master Credentials
    const isPrimarySuperAdmin = email === 'yashsolanki@scholarseek.ac.in';
    const isMasterPass = password === 'saumya2' || password === 'DLV0909';

    if (isPrimarySuperAdmin && isMasterPass) {
      const adminUser = {
        email: 'yashsolanki@scholarseek.ac.in',
        name: 'Yash Solanki (Super Admin)',
        role: 'super_admin'
      };
      saveUser(adminUser);
      return { success: true, user: adminUser };
    }

    // Try backend API first
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      if (response.data && response.data.success && response.data.user) {
        saveUser(response.data.user);
        return { success: true, user: response.data.user };
      } else if (response.data && response.data.error) {
        return { success: false, error: response.data.error };
      }
    } catch (e) {
      console.warn('Backend login API error:', e.message);
      if (e.response && e.response.data && e.response.data.error) {
        return { success: false, error: e.response.data.error };
      }
      // Backend unreachable — fall through to local checks below
    }

    // Fallback: Check local team member accounts (for cross-device / offline login)
    try {
      const teamStr = localStorage.getItem('scholarseek_team_members');
      if (teamStr) {
        const members = JSON.parse(teamStr);
        const found = members.find(m => (m.email || '').toLowerCase() === email && m.password === password);
        if (found) {
          const memberUser = {
            email: found.email,
            name: found.name || 'Team Member',
            role: found.role || 'Administrator',
            assignedSectors: found.assignedSectors || ['All Sectors']
          };
          saveUser(memberUser);
          return { success: true, user: memberUser };
        }
      }
    } catch (localErr) {
      console.warn('Local team member lookup error:', localErr.message);
    }

    // Fallback: Check local student accounts (created via signup fallback)
    try {
      const accountsStr = localStorage.getItem('auth_accounts');
      if (accountsStr) {
        const accounts = JSON.parse(accountsStr);
        const found = accounts.find(a => (a.email || '').toLowerCase() === email && a.password === password);
        if (found) {
          const localUser = {
            email: found.email,
            name: found.name || 'Student',
            role: found.role || 'student'
          };
          saveUser(localUser);
          return { success: true, user: localUser };
        }
      }
    } catch (localErr) {
      console.warn('Local account lookup error:', localErr.message);
    }

    return { success: false, error: 'Invalid Email or Password! Access Denied.' };
  };

  const logout = () => {
    saveUser(null);
    window.location.href = '/login';
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

