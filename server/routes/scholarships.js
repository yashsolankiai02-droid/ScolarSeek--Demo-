const express = require('express');
const router = express.Router();
const Scholarship = require('../models/Scholarship');
const seedScholarships = require('../seedData');
const { getIsConnected } = require('../config/db');

// Middleware to check Admin Security Key
const verifyAdminKey = (req, res, next) => {
  const adminKeyHeader = req.headers['x-admin-key'];
  const expectedKey = process.env.ADMIN_KEY || 'admin123';

  if (!adminKeyHeader || adminKeyHeader !== expectedKey) {
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
      const data = await Scholarship.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: data.length, data });
    }
    return res.status(200).json({ success: true, count: seedScholarships.length, data: seedScholarships });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error fetching scholarships', error: error.message });
  }
});

// GET /api/scholarships/:id - Get single scholarship by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const scholarship = await Scholarship.findById(id);
      if (scholarship) {
        return res.status(200).json({ success: true, data: scholarship });
      }
    }

    // Check in-memory seed dataset
    const found = seedScholarships.find((s) => s._id === id || String(s._id) === String(id));
    if (found) {
      return res.status(200).json({ success: true, data: found });
    }

    return res.status(404).json({ success: false, message: 'Scholarship not found' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error fetching scholarship details', error: error.message });
  }
});

// POST /api/scholarships - Add new scholarship (Protected by verifyAdminKey)
router.post('/', verifyAdminKey, async (req, res) => {
  try {
    if (!getIsConnected()) {
      const newDoc = { _id: `custom_${Date.now()}`, ...req.body };
      seedScholarships.unshift(newDoc);
      return res.status(201).json({ success: true, data: newDoc, message: 'Added to in-memory store' });
    }

    const newScholarship = await Scholarship.create(req.body);
    return res.status(201).json({ success: true, data: newScholarship });
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

    if (!getIsConnected()) {
      const index = seedScholarships.findIndex(s => String(s._id) === String(id));
      if (index !== -1) {
        seedScholarships[index] = { ...seedScholarships[index], ...req.body };
        return res.status(200).json({ success: true, data: seedScholarships[index], message: 'Updated in-memory store' });
      }
      return res.status(404).json({ success: false, message: 'Scholarship not found in memory' });
    }

    const updatedScholarship = await Scholarship.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedScholarship) {
      return res.status(404).json({ success: false, message: 'Scholarship not found' });
    }

    return res.status(200).json({ success: true, data: updatedScholarship });
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Error updating scholarship', error: error.message });
  }
});

// DELETE /api/scholarships/:id - Delete scholarship (Protected by verifyAdminKey)
router.delete('/:id', verifyAdminKey, async (req, res) => {
  try {
    const { id } = req.params;

    if (!getIsConnected()) {
      const index = seedScholarships.findIndex(s => String(s._id) === String(id));
      if (index !== -1) {
        seedScholarships.splice(index, 1);
        return res.status(200).json({ success: true, message: 'Deleted from in-memory store' });
      }
      return res.status(404).json({ success: false, message: 'Scholarship not found in memory' });
    }

    const deletedScholarship = await Scholarship.findByIdAndDelete(id);

    if (!deletedScholarship) {
      return res.status(404).json({ success: false, message: 'Scholarship not found' });
    }

    return res.status(200).json({ success: true, message: 'Scholarship deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting scholarship', error: error.message });
  }
});

module.exports = router;
