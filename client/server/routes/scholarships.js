const express = require('express');
const router = express.Router();
const Scholarship = require('../models/Scholarship');
const seedScholarships = require('../seedData');
const { getIsConnected } = require('../config/db');

// Middleware to check Admin Security Key
const verifyAdminKey = (req, res, next) => {
  const adminKeyHeader = req.headers['x-admin-key'];
  const validKeys = [process.env.ADMIN_KEY, 'DLV0909', 'saumya2', 'admin123'].filter(Boolean);

  if (!adminKeyHeader || !validKeys.includes(adminKeyHeader)) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Invalid Admin Secret Passcode. Access denied.',
    });
  }
  next();
};

// GET /api/scholarships - Get all scholarships
router.get('/', async (req, res) => {
  try {
    if (getIsConnected()) {
      try {
        const data = await Scholarship.find().sort({ createdAt: -1 });
        if (data && data.length > 0) {
          return res.status(200).json({ success: true, count: data.length, data });
        }
      } catch (dbErr) {
        console.warn('MongoDB fetch error, falling back to seedData:', dbErr.message);
      }
    }
    return res.status(200).json({ success: true, count: seedScholarships.length, data: seedScholarships });
  } catch (error) {
    return res.status(200).json({ success: true, count: seedScholarships.length, data: seedScholarships });
  }
});

// GET /api/scholarships/:id - Get single scholarship by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      try {
        const scholarship = await Scholarship.findById(id);
        if (scholarship) {
          return res.status(200).json({ success: true, data: scholarship });
        }
      } catch (dbErr) {
        console.warn('MongoDB findById error, checking seedData:', dbErr.message);
      }
    }

    // Check in-memory seed dataset
    const found = seedScholarships.find((s) => s._id === id || String(s._id) === String(id));
    if (found) {
      return res.status(200).json({ success: true, data: found });
    }

    return res.status(404).json({ success: false, message: 'Scholarship not found' });
  } catch (error) {
    const found = seedScholarships.find((s) => s._id === req.params.id || String(s._id) === String(req.params.id));
    if (found) {
      return res.status(200).json({ success: true, data: found });
    }
    return res.status(500).json({ success: false, message: 'Server error fetching scholarship details', error: error.message });
  }
});

// POST /api/scholarships - Add new scholarship (Protected by verifyAdminKey)
router.post('/', verifyAdminKey, async (req, res) => {
  try {
    const newDoc = { _id: `custom_${Date.now()}`, ...req.body };
    seedScholarships.unshift(newDoc);

    if (!getIsConnected()) {
      return res.status(201).json({ success: true, data: newDoc, message: 'Added to in-memory store' });
    }

    try {
      const newScholarship = await Scholarship.create(req.body);
      return res.status(201).json({ success: true, data: newScholarship });
    } catch (dbErr) {
      console.warn('MongoDB create error, stored in seedData:', dbErr.message);
      return res.status(201).json({ success: true, data: newDoc });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Validation error creating scholarship', error: error.message });
  }
});

// POST /api/scholarships/seed - Seed database (Protected by verifyAdminKey)
router.post('/seed', verifyAdminKey, async (req, res) => {
  try {
    if (getIsConnected()) {
      await Scholarship.deleteMany({});
      const created = await Scholarship.insertMany(seedScholarships);
      return res.status(201).json({ success: true, count: created.length, message: 'Database successfully seeded' });
    }
    return res.status(200).json({ success: true, count: seedScholarships.length, message: 'In-memory dataset is ready' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error seeding database', error: error.message });
  }
});

// PUT /api/scholarships/:id - Update scholarship (Protected by verifyAdminKey)
router.put('/:id', verifyAdminKey, async (req, res) => {
  try {
    const { id } = req.params;

    // Check in seedData array
    const seedIndex = seedScholarships.findIndex(s => String(s._id) === String(id));
    if (seedIndex !== -1) {
      seedScholarships[seedIndex] = { ...seedScholarships[seedIndex], ...req.body };
    }

    if (getIsConnected()) {
      try {
        const updatedScholarship = await Scholarship.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (updatedScholarship) {
          return res.status(200).json({ success: true, data: updatedScholarship });
        }
      } catch (dbErr) {
        console.warn('MongoDB update failed for id:', id, dbErr.message);
      }
    }

    if (seedIndex !== -1) {
      return res.status(200).json({ success: true, data: seedScholarships[seedIndex], message: 'Updated scholarship scheme successfully' });
    }

    return res.status(404).json({ success: false, message: 'Scholarship not found' });
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Error updating scholarship', error: error.message });
  }
});

// DELETE /api/scholarships/:id - Delete scholarship (Protected by verifyAdminKey)
router.delete('/:id', verifyAdminKey, async (req, res) => {
  try {
    const { id } = req.params;
    let deletedCount = 0;

    // Remove from seedData array if present
    const seedIndex = seedScholarships.findIndex(s => String(s._id) === String(id));
    if (seedIndex !== -1) {
      seedScholarships.splice(seedIndex, 1);
      deletedCount++;
    }

    if (getIsConnected()) {
      try {
        const deletedScholarship = await Scholarship.findByIdAndDelete(id);
        if (deletedScholarship) {
          deletedCount++;
        }
      } catch (dbErr) {
        console.warn('MongoDB delete failed for id:', id, dbErr.message);
      }
    }

    if (deletedCount > 0) {
      return res.status(200).json({ success: true, message: 'Scholarship deleted successfully' });
    }

    return res.status(404).json({ success: false, message: 'Scholarship not found' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting scholarship', error: error.message });
  }
});

// DELETE /api/scholarships/all/delete-all - Delete ALL scholarships (Protected by verifyAdminKey)
router.delete('/all/delete-all', verifyAdminKey, async (req, res) => {
  try {
    seedScholarships.length = 0;
    if (getIsConnected()) {
      try {
        await Scholarship.deleteMany({});
      } catch (dbErr) {
        console.warn('MongoDB deleteMany error:', dbErr.message);
      }
    }
    return res.status(200).json({ success: true, message: 'All scholarships deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting all scholarships', error: error.message });
  }
});

module.exports = router;
