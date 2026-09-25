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
      }
      return { success: false, error: 'Unknown registration error.' };
    } catch (e) {
      return { success: false, error: e.response?.data?.error || e.message || 'Registration failed.' };
    }
  };

  const login = async (emailInput, passwordInput) => {
    const email = (emailInput || '').trim().toLowerCase();
    const password = (passwordInput || '').trim();

    if (!email || !password) {
      return { success: false, error: 'Email and password are required.' };
    }

    try {
      const response = await axios.post('/api/auth/login', { email, password });
      if (response.data && response.data.success && response.data.user) {
        saveUser(response.data.user);
        return { success: true, user: response.data.user };
      }
      return { success: false, error: 'Unknown login error.' };
    } catch (e) {
      return { success: false, error: e.response?.data?.error || e.message || 'Login failed.' };
    }
  };

  const logout = () => {
    saveUser(null);
    window.location.href = '/login';
  };

  const isAuthenticated = !!user || !!localStorage.getItem('auth_user');

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
