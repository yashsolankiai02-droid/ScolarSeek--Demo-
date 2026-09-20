import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  English: {
    dashboard: 'Dashboard',
    explore: 'Explore',
    saved: 'Saved',
    applications: 'Applications',
    profile: 'Profile',
    findScholarships: 'Find Scholarships',
    searchPlaceholder: 'Search scholarships by name, state, or provider...',
    save: 'Save',
    savedLabel: 'Saved',
    applyNow: 'Start Preparation',
    officialWebsite: 'Apply on Official Website',
    profileCompletion: 'Profile Completion',
    matchingScholarships: 'Matching Scholarships',
    requiredDocuments: 'Required Documents',
    deadline: 'Deadline',
    category: 'Category',
    state: 'State',
    familyIncome: 'Family Income',
    logout: 'Logout',
    reportIssue: 'Report Incorrect Info',
    recentlyViewed: 'Recently Viewed',
    compare: 'Compare',
  },
  Hindi: {
    dashboard: 'डैशबोर्ड',
    explore: 'खोजें',
    saved: 'सहेजे गए',
    applications: 'आवेदन',
    profile: 'प्रोफाइल',
    findScholarships: 'छात्रवृत्ति खोजें',
    searchPlaceholder: 'नाम, राज्य या प्रदाता द्वारा छात्रवृत्ति खोजें...',
    save: 'सहेजें',
    savedLabel: 'सहेजा गया',
    applyNow: 'तैयारी शुरू करें',
    officialWebsite: 'आधिकारिक वेबसाइट पर आवेदन करें',
    profileCompletion: 'प्रोफाइल पूर्णता',
    matchingScholarships: 'आपके लिए छात्रवृत्तियां',
    requiredDocuments: 'आवश्यक दस्तावेज',
    deadline: 'अंतिम तिथि',
    category: 'वर्ग',
    state: 'राज्य',
    familyIncome: 'पारिवारिक आय',
    logout: 'लॉगआउट',
    reportIssue: 'गलत जानकारी की रिपोर्ट करें',
    recentlyViewed: 'हाल ही में देखे गए',
    compare: 'तुलना करें',
  },
  Gujarati: {
    dashboard: 'ડેશબોર્ડ',
    explore: 'શોધો',
    saved: 'સાચવેલ',
    applications: 'અરજીઓ',
    profile: 'પ્રોફાઇલ',
    findScholarships: 'શિષ્યવૃત્તિ શોધો',
    searchPlaceholder: 'નામ, રાજ્ય અથવા સંસ્થા દ્વારા શોધો...',
    save: 'સાચવો',
    savedLabel: 'સાચવેલ',
    applyNow: 'તૈયારી શરૂ કરો',
    officialWebsite: 'સત્તાવાર વેબસાઇટ પર અરજી કરો',
    profileCompletion: 'પ્રોફાઇલ પૂર્ણતા',
    matchingScholarships: 'તમારા માટે શિષ્યવૃત્તિઓ',
    requiredDocuments: 'જરૂરી દસ્તાવેજો',
    deadline: 'છેલ્લી તારીખ',
    category: 'કેટેગરી',
    state: 'રાજ્ય',
    familyIncome: 'કૌટુંબિક આવક',
    logout: 'લોગઆઉટ',
    reportIssue: 'ખોટી માહિતીની રિપોર્ટ કરો',
    recentlyViewed: 'તાજેતરમાં જોયેલ',
    compare: 'સરખામણી કરો',
  }
};

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('app_language') || 'English';
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('app_dark_mode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('app_language', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('app_dark_mode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const t = (key) => {
    return translations[lang]?.[key] || translations['English']?.[key] || key;
  };

  const getLocalizedScholarship = (item) => {
    if (!item) return item;
    if (lang === 'Hindi') {
      return {
        ...item,
        name: item.nameHi && item.nameHi.trim() ? item.nameHi : item.name,
        description: item.descriptionHi && item.descriptionHi.trim() ? item.descriptionHi : item.description,
        eligibility: item.eligibilityHi && item.eligibilityHi.trim() ? item.eligibilityHi : item.eligibility,
      };
    }
    return item;
  };

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, darkMode, toggleDarkMode, getLocalizedScholarship }}>
      {children}
    </LanguageContext.Provider>
  );
};
