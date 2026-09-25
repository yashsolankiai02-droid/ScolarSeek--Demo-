import React, { createContext, useContext, useState, useEffect } from 'react';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('student_profile');
    if (saved) return JSON.parse(saved);
    return {
      // Personal
      name: '',
      age: '',
      gender: '',
      state: '',
      district: '',
      
      // Education
      educationLevel: '',
      course: '',
      institution: '',
      year: '',
      
      // Eligibility
      category: '',
      annualIncome: '',
      disabilityStatus: 'No',
      
      // Verification Status (Mock)
      verificationStatus: {
        identity: 'unverified', // unverified, verified, manual_review
        category: 'unverified',
        academic: 'unverified',
        income: 'unverified'
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('student_profile', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updates) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const calculateCompletion = () => {
    const requiredFields = [
      'name', 'age', 'gender', 'state', 'district',
      'educationLevel', 'course', 'institution', 'year',
      'category', 'annualIncome'
    ];
    let completed = 0;
    requiredFields.forEach(field => {
      if (profile[field] && profile[field].trim() !== '') {
        completed++;
      }
    });
    return Math.round((completed / requiredFields.length) * 100);
  };

  const checkEligibility = (scholarship) => {
    // Basic Rule-based matching engine
    const matches = [];
    const mismatches = [];
    let isEligible = true;
    let missingInfo = false;

    // Check State
    if (scholarship.state && scholarship.state !== 'All States') {
      if (!profile.state) {
        mismatches.push('State information required');
        missingInfo = true;
      } else if (scholarship.state !== profile.state) {
        mismatches.push(`Requires domicile of ${scholarship.state}`);
        isEligible = false;
      } else {
        matches.push('State requirement matched');
      }
    }

    // Check Category
    if (scholarship.category && scholarship.category.length > 0 && !scholarship.category.includes('All')) {
      if (!profile.category) {
        mismatches.push('Category information required');
        missingInfo = true;
      } else if (!scholarship.category.includes(profile.category) && !scholarship.category.includes('General') ) {
         // simplistic check, assuming general covers all or specific categories needed
        mismatches.push(`Requires specific category (${scholarship.category.join(', ')})`);
        isEligible = false;
      } else {
        matches.push('Category requirement matched');
      }
    }

    // Check Income
    if (scholarship.maxIncomeLimit && scholarship.maxIncomeLimit < 10000000) {
      if (!profile.annualIncome) {
        mismatches.push('Family income information required');
        missingInfo = true;
      } else {
        // Parse profile income roughly if it's stored as a string range
        let userIncomeVal = 0;
        if (profile.annualIncome === '< 3 Lakhs') userIncomeVal = 250000;
        else if (profile.annualIncome === '3-6 Lakhs') userIncomeVal = 450000;
        else if (profile.annualIncome === '6-10 Lakhs') userIncomeVal = 800000;
        else if (profile.annualIncome === '10-15 Lakhs') userIncomeVal = 1250000;
        else if (profile.annualIncome === '> 15 Lakhs') userIncomeVal = 2000000;
        else userIncomeVal = parseInt(profile.annualIncome.replace(/[^0-9]/g, '')) || 0;

        if (userIncomeVal > scholarship.maxIncomeLimit) {
          mismatches.push(`Income exceeds limit of ₹${(scholarship.maxIncomeLimit/100000).toFixed(1)} Lakhs`);
          isEligible = false;
        } else {
          matches.push('Income requirement satisfied');
        }
      }
    }

    let status = 'Eligible';
    if (!isEligible) status = 'Not Eligible';
    else if (missingInfo) status = 'Profile information required';

    return { status, matches, mismatches, isEligible };
  };

  const runMockVerification = () => {
    // Simulates an API call to a mock verification service (UIDAI/DigiLocker)
    setProfile(prev => ({
      ...prev,
      verificationStatus: {
        identity: 'verified',
        category: 'verified',
        academic: 'verified',
        income: 'manual_review' // specifically to show the exception handling per the prompt
      }
    }));
  };

  const value = {
    profile,
    updateProfile,
    completionPercentage: calculateCompletion(),
    checkEligibility,
    runMockVerification
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};
