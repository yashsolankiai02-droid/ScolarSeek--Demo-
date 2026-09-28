import React, { createContext, useContext, useState, useEffect } from 'react';

const SavedContext = createContext();

export const useSaved = () => useContext(SavedContext);

export const SavedProvider = ({ children }) => {
  const [savedScholarships, setSavedScholarships] = useState(() => {
    const saved = localStorage.getItem('saved_scholarships');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch(e) {}
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('saved_scholarships', JSON.stringify(savedScholarships));
  }, [savedScholarships]);

  const saveScholarship = (scholarship) => {
    setSavedScholarships(prev => {
      if (prev.find(s => s._id === scholarship._id)) return prev;
      return [...prev, scholarship];
    });
  };

  const unsaveScholarship = (id) => {
    setSavedScholarships(prev => prev.filter(s => s._id !== id));
  };

  const isSaved = (id) => {
    return savedScholarships.some(s => s._id === id);
  };

  return (
    <SavedContext.Provider value={{ savedScholarships, saveScholarship, unsaveScholarship, isSaved }}>
      {children}
    </SavedContext.Provider>
  );
};
