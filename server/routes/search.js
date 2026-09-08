const express = require('express');
const router = express.Router();
const Scholarship = require('../models/Scholarship');
const seedScholarships = require('../seedData');
const { getIsConnected } = require('../config/db');

// Helper to convert income radio strings to numbers
const getIncomeNumeric = (incomeStr) => {
  if (!incomeStr) return 10000000;
  if (incomeStr.includes('< 3')) return 300000;
  if (incomeStr.includes('3-6')) return 600000;
  if (incomeStr.includes('6-10')) return 1000000;
  if (incomeStr.includes('10-15')) return 1500000;
  if (incomeStr.includes('> 15')) return 2500000;
  return 10000000;
};

// Helper to extract CGPA numeric minimum requirement
const parseCGPA = (cgpaStr) => {
  if (!cgpaStr || cgpaStr === 'No minimum') return 0;
  const num = parseInt(cgpaStr);
  return isNaN(num) ? 0 : num;
};

// Helper to extract NEET score minimum requirement
const parseNEET = (neetStr) => {
  if (!neetStr || neetStr === 'No requirement') return 0;
  const num = parseInt(neetStr);
  return isNaN(num) ? 0 : num;
};

// Helper to extract practice years minimum requirement
const parseYears = (yearsStr) => {
  if (!yearsStr || yearsStr === 'Any Experience') return 0;
  if (yearsStr.includes('<2')) return 1;
  if (yearsStr.includes('2-5')) return 2;
  if (yearsStr.includes('5-10')) return 5;
  if (yearsStr.includes('>10')) return 10;
  return 0;
};

// Helper to parse funding request
const parseFunding = (fundingStr) => {
  if (!fundingStr || fundingStr === 'Any Amount') return 0;
  if (fundingStr.includes('<5L')) return 100000;
  if (fundingStr.includes('5-10L')) return 500000;
  if (fundingStr.includes('10-25L')) return 1000000;
  if (fundingStr.includes('25-50L')) return 2500000;
  if (fundingStr.includes('50+L')) return 5000000;
  return 0;
};

// Helper to parse duration
const parseDuration = (durationStr) => {
  if (!durationStr || durationStr === 'Any Duration') return 0;
  if (durationStr.includes('3-6')) return 3;
  if (durationStr.includes('6-12')) return 6;
  if (durationStr.includes('1-2 years')) return 12;
  if (durationStr.includes('2-5 years')) return 24;
  return 0;
};

// ==========================================
// POST /api/search
// Flexible Filter Algorithm
// ==========================================
router.post('/', async (req, res) => {
  try {
    const filters = req.body || {};
    let allScholarships = [];

    // Check if connected to MongoDB Atlas
    if (getIsConnected()) {
      allScholarships = await Scholarship.find().lean();
    } else {
      allScholarships = seedScholarships;
    }

    const filtered = allScholarships.filter((item) => {
      // -----------------------------------------------------------
      // 1. UNIVERSAL FILTER 1: STATE
      // -----------------------------------------------------------
      if (filters.state && filters.state !== 'All States') {
        const itemState = item.state || 'All States';
        if (itemState !== 'All States' && itemState.toLowerCase() !== filters.state.toLowerCase()) {
          return false;
        }
      }

      // -----------------------------------------------------------
      // 2. UNIVERSAL FILTER 2: ANNUAL INCOME
      // -----------------------------------------------------------
      if (filters.annualIncome) {
        const userIncomeLimit = getIncomeNumeric(filters.annualIncome);
        if (item.maxIncomeLimit && item.maxIncomeLimit < userIncomeLimit) {
          return false;
        }
      }

      // -----------------------------------------------------------
      // 3. UNIVERSAL FILTER 3: CATEGORY
      // -----------------------------------------------------------
      if (filters.category && filters.category !== 'All') {
        const cats = item.category || [];
        const matchesCategory = cats.some(
          (c) => c.toLowerCase() === filters.category.toLowerCase() || c.toLowerCase() === 'all' || c.toLowerCase() === 'general'
        );
        if (!matchesCategory) return false;
      }

      // -----------------------------------------------------------
      // 4. UNIVERSAL FILTER 4: SECTOR
      // -----------------------------------------------------------
      if (filters.sector && filters.sector !== 'All') {
        if (item.sector.toLowerCase() !== filters.sector.toLowerCase()) {
          return false;
        }
      }

      // -----------------------------------------------------------
      // 5. SECTOR SPECIFIC FILTERS
      // -----------------------------------------------------------
      const selectedSector = filters.sector;

      // --- A. EDUCATIONAL SECTOR ---
      if (selectedSector === 'Educational') {
        if (filters.grade && filters.grade !== 'Any Grade') {
          if (item.grade && item.grade !== 'Any Grade' && item.grade.toLowerCase() !== filters.grade.toLowerCase()) {
            return false;
          }
        }
        if (filters.fieldOfStudy && filters.fieldOfStudy !== 'Any Field') {
          if (
            item.fieldOfStudy &&
            item.fieldOfStudy !== 'Any Field' &&
            item.fieldOfStudy.toLowerCase() !== filters.fieldOfStudy.toLowerCase()
          ) {
            return false;
          }
        }
        if (filters.cgpa && filters.cgpa !== 'No minimum') {
          const userMarks = parseCGPA(filters.cgpa);
          if (item.minCGPA && item.minCGPA > userMarks) {
            return false;
          }
        }
      }

      // --- B. SPORTS SECTOR ---
      if (selectedSector === 'Sports') {
        if (filters.sportType && filters.sportType !== 'Any Sport') {
          if (item.sportType && item.sportType !== 'Any Sport' && item.sportType.toLowerCase() !== filters.sportType.toLowerCase()) {
            return false;
          }
        }
        if (filters.performanceLevel && filters.performanceLevel !== 'Any Level') {
          if (
            item.performanceLevel &&
            item.performanceLevel !== 'Any Level' &&
            item.performanceLevel.toLowerCase() !== filters.performanceLevel.toLowerCase()
          ) {
            return false;
          }
        }
        if (filters.ageGroup && filters.ageGroup !== 'Any Age') {
          if (item.ageGroup && item.ageGroup !== 'Any Age' && item.ageGroup !== filters.ageGroup) {
            return false;
          }
        }
      }

      // --- C. ARTS & CULTURE SECTOR ---
      if (selectedSector === 'Arts & Culture') {
        if (filters.artDiscipline && filters.artDiscipline !== 'Any Art') {
          if (
            item.artDiscipline &&
            item.artDiscipline !== 'Any Art' &&
            item.artDiscipline.toLowerCase() !== filters.artDiscipline.toLowerCase()
          ) {
            return false;
          }
        }
        if (filters.proficiencyLevel && filters.proficiencyLevel !== 'Any Level') {
          if (
            item.proficiencyLevel &&
            item.proficiencyLevel !== 'Any Level' &&
            item.proficiencyLevel.toLowerCase() !== filters.proficiencyLevel.toLowerCase()
          ) {
            return false;
          }
        }
        if (filters.yearsOfPractice && filters.yearsOfPractice !== 'Any Experience') {
          const userYears = parseYears(filters.yearsOfPractice);
          if (item.minYearsOfPractice && item.minYearsOfPractice > userYears) {
            return false;
          }
        }
      }

      // --- D. HEALTHCARE SECTOR ---
      if (selectedSector === 'Healthcare') {
        if (filters.medicalField && filters.medicalField !== 'Any Field') {
          if (
            item.medicalField &&
            item.medicalField !== 'Any Field' &&
            item.medicalField.toLowerCase() !== filters.medicalField.toLowerCase()
          ) {
            return false;
          }
        }
        if (filters.qualificationLevel && filters.qualificationLevel !== 'Any Level') {
          if (
            item.qualificationLevel &&
            item.qualificationLevel !== 'Any Level' &&
            item.qualificationLevel.toLowerCase() !== filters.qualificationLevel.toLowerCase()
          ) {
            return false;
          }
        }
        if (filters.neetScore && filters.neetScore !== 'No requirement') {
          const userScore = parseNEET(filters.neetScore);
          if (item.minNEETScore && item.minNEETScore > userScore) {
            return false;
          }
        }
      }

      // --- E. BUSINESS & ENTREPRENEURSHIP SECTOR ---
      if (selectedSector === 'Business & Entrepreneurship') {
        if (filters.businessStage && filters.businessStage !== 'Any Stage') {
          if (
            item.businessStage &&
            item.businessStage !== 'Any Stage' &&
            item.businessStage.toLowerCase() !== filters.businessStage.toLowerCase()
          ) {
            return false;
          }
        }
        if (filters.businessType && filters.businessType !== 'Any Type') {
          if (Array.isArray(item.businessType)) {
            const hasType = item.businessType.some(
              (bt) => bt.toLowerCase() === filters.businessType.toLowerCase() || bt.toLowerCase() === 'any type'
            );
            if (!hasType) return false;
          }
        }
        if (filters.fundingRange && filters.fundingRange !== 'Any Amount') {
          const userNeed = parseFunding(filters.fundingRange);
          if (item.fundingAmount && item.fundingAmount < userNeed) {
            return false;
          }
        }
      }

      // --- F. RESEARCH & INNOVATION SECTOR ---
      if (selectedSector === 'Research & Innovation') {
        if (filters.researchField && filters.researchField !== 'Any Field') {
          if (
            item.researchField &&
            item.researchField !== 'Any Field' &&
            item.researchField.toLowerCase() !== filters.researchField.toLowerCase()
          ) {
            return false;
          }
        }
        if (filters.researchLevel && filters.researchLevel !== 'Any Level') {
          if (
            item.researchLevel &&
            item.researchLevel !== 'Any Level' &&
            item.researchLevel.toLowerCase() !== filters.researchLevel.toLowerCase()
          ) {
            return false;
          }
        }
        if (filters.durationMonths && filters.durationMonths !== 'Any Duration') {
          const userDuration = parseDuration(filters.durationMonths);
          if (item.durationMonths && item.durationMonths < userDuration) {
            return false;
          }
        }
      }

      // --- G. AGRICULTURAL SECTOR ---
      if (selectedSector === 'Agricultural') {
        if (filters.agriField && filters.agriField !== 'Any Field') {
          if (item.agriField && item.agriField !== 'Any Field' && item.agriField.toLowerCase() !== filters.agriField.toLowerCase()) {
            return false;
          }
        }
        if (filters.agriQualification && filters.agriQualification !== 'Any Level') {
          if (
            item.agriQualification &&
            item.agriQualification !== 'Any Level' &&
            item.agriQualification.toLowerCase() !== filters.agriQualification.toLowerCase()
          ) {
            return false;
          }
        }
        if (filters.farmType && filters.farmType !== 'Any Type') {
          if (Array.isArray(item.farmType)) {
            const hasFarm = item.farmType.some(
              (ft) => ft.toLowerCase().includes(filters.farmType.toLowerCase()) || ft.toLowerCase() === 'any type'
            );
            if (!hasFarm) return false;
          }
        }
      }

      // --- H. SOCIAL SECTOR ---
      if (selectedSector === 'Social Sector') {
        if (filters.causeArea && filters.causeArea !== 'Any Cause') {
          if (item.causeArea && item.causeArea !== 'Any Cause' && item.causeArea.toLowerCase() !== filters.causeArea.toLowerCase()) {
            return false;
          }
        }
        if (filters.backgroundRequired && filters.backgroundRequired !== 'Any Background') {
          if (
            item.backgroundRequired &&
            item.backgroundRequired !== 'Any Background' &&
            item.backgroundRequired.toLowerCase() !== filters.backgroundRequired.toLowerCase()
          ) {
            return false;
          }
        }
        if (filters.roleType && filters.roleType !== 'Any Role') {
          if (item.roleType && item.roleType !== 'Any Role' && item.roleType.toLowerCase() !== filters.roleType.toLowerCase()) {
            return false;
          }
        }
      }

      return true;
    });

    return res.status(200).json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (error) {
    console.error('Search API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while executing search algorithm',
      error: error.message,
    });
  }
});

module.exports = router;
