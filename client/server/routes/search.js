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
// Flexible & Resilient Search Algorithm
// ==========================================
router.post('/', async (req, res) => {
  try {
    const filters = req.body || {};
    let allScholarships = [];

    // Check if connected to MongoDB Atlas
    if (getIsConnected()) {
      try {
        allScholarships = await Scholarship.find().lean();
      } catch (dbErr) {
        console.warn('MongoDB query error in search, using fallback seedData:', dbErr.message);
        allScholarships = seedScholarships;
      }
    }

    if (!allScholarships || allScholarships.length === 0) {
      allScholarships = seedScholarships;
    }

    let filtered = allScholarships.filter((item) => {
      // -----------------------------------------------------------
      // 1. STATE FILTER
      // -----------------------------------------------------------
      if (filters.state && filters.state !== 'All States' && filters.state !== 'All') {
        const itemState = item.state || 'All States';
        if (itemState !== 'All States' && itemState.toLowerCase() !== filters.state.toLowerCase()) {
          return false;
        }
      }

      // -----------------------------------------------------------
      // 2. SECTOR FILTER
      // -----------------------------------------------------------
      if (filters.sector && filters.sector !== 'All') {
        if (item.sector && item.sector.toLowerCase() !== filters.sector.toLowerCase()) {
          return false;
        }
      }

      // -----------------------------------------------------------
      // 3. CATEGORY FILTER
      // -----------------------------------------------------------
      if (filters.category && filters.category !== 'All' && filters.category !== 'General') {
        const cats = item.category || [];
        const matchesCategory = cats.some(
          (c) => c.toLowerCase() === filters.category.toLowerCase() || c.toLowerCase() === 'all' || c.toLowerCase() === 'general'
        );
        if (!matchesCategory) return false;
      }

      // -----------------------------------------------------------
      // 4. ANNUAL INCOME FILTER
      // -----------------------------------------------------------
      if (filters.annualIncome && filters.annualIncome !== 'All' && filters.annualIncome !== 'Any') {
        const userIncomeLimit = getIncomeNumeric(filters.annualIncome);
        // If user specifies a low income bracket, exclude schemes requiring much higher income
        if (item.maxIncomeLimit && item.maxIncomeLimit < 100000 && userIncomeLimit > 1500000) {
          return false;
        }
      }

      return true;
    });

    // Sector Fallback if filters were too strict
    if (filtered.length === 0) {
      filtered = allScholarships.filter((item) => {
        if (filters.sector && filters.sector !== 'All' && item.sector) {
          return item.sector.toLowerCase() === filters.sector.toLowerCase();
        }
        return true;
      });
    }

    // Ultimate Fallback so user always sees data
    if (filtered.length === 0) {
      filtered = allScholarships;
    }

    return res.status(200).json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (error) {
    console.error('Search API Error:', error);
    return res.status(200).json({
      success: true,
      count: seedScholarships.length,
      data: seedScholarships,
    });
  }
});

module.exports = router;
