import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('auth_user');
    if (saved) return JSON.parse(saved);
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('auth_user');
    }
  }, [user]);

  const signup = (email, password, name) => {
    // Store account in localStorage (prototype only)
    const accounts = JSON.parse(localStorage.getItem('auth_accounts') || '[]');
    
    // Check if email already exists
    if (accounts.find(a => a.email === email)) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const newAccount = { email, password, name, createdAt: new Date().toISOString() };
    accounts.push(newAccount);
    localStorage.setItem('auth_accounts', JSON.stringify(accounts));

    // Auto-login after signup
    setUser({ email, name });
    return { success: true };
  };

  const login = (email, password) => {
    const accounts = JSON.parse(localStorage.getItem('auth_accounts') || '[]');
    const account = accounts.find(a => a.email === email && a.password === password);
    
    if (!account) {
      return { success: false, error: 'Invalid email or password.' };
    }

    setUser({ email: account.email, name: account.name });
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('student_profile');
    localStorage.removeItem('saved_scholarships');
    localStorage.removeItem('applications_tracker');
    window.location.href = '/';
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
