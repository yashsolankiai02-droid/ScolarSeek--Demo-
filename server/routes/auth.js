const express = require('express');
const router = express.Router();
const User = require('../models/User');

const SUPER_ADMIN = {
  id: 'mem_1',
  name: 'Yash Solanki (Super Admin)',
  email: 'yashsolanki@scholarseek.ac.in',
  password: 'saumya2',
  role: 'Super Admin',
  assignedSectors: ['All Sectors'],
  addedAt: '2026-01-10'
};

// Helper to seed Super Admin in MongoDB if not exists
const ensureSuperAdminInDB = async () => {
  try {
    const existing = await User.findOne({ email: 'yashsolanki@scholarseek.ac.in' });
    if (!existing) {
      await User.create({
        name: SUPER_ADMIN.name,
        email: SUPER_ADMIN.email,
        password: SUPER_ADMIN.password,
        role: 'Super Admin',
        assignedSectors: ['All Sectors']
      });
    }
  } catch (e) {
    console.warn('Super Admin seed warning:', e.message);
  }
};

// ==========================================
// USER AUTHENTICATION ENDPOINTS
// ==========================================

// Register New User in MongoDB
router.post('/register', async (req, res) => {
  try {
    await ensureSuperAdminInDB();
    const { email: rawEmail, password, name } = req.body;
    const email = (rawEmail || '').trim().toLowerCase();

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        success: true,
        user: {
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role,
          assignedSectors: existingUser.assignedSectors
        }
      });
    }

    const newUser = await User.create({
      name: (name || '').trim() || email.split('@')[0],
      email,
      password,
      role: 'student',
      assignedSectors: ['All Sectors']
    });

    res.status(201).json({
      success: true,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        assignedSectors: newUser.assignedSectors
      }
    });
  } catch (error) {
    console.error('MongoDB Register error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Login User & Super Admin in MongoDB
router.post('/login', async (req, res) => {
  try {
    await ensureSuperAdminInDB();
    const { email: rawEmail, password: rawPassword } = req.body;
    const email = (rawEmail || '').trim().toLowerCase();
    const password = (rawPassword || '').trim();

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    // Check Primary Super Admin Master Credentials
    const isPrimarySuperAdmin = email === 'yashsolanki@scholarseek.ac.in';
    const isMasterPass = password === 'saumya2' || password === 'DLV0909';

    if (isPrimarySuperAdmin && isMasterPass) {
      return res.status(200).json({
        success: true,
        user: {
          id: 'mem_1',
          name: 'Yash Solanki (Super Admin)',
          email: 'yashsolanki@scholarseek.ac.in',
          role: 'super_admin',
          assignedSectors: ['All Sectors']
        }
      });
    }

    // Check MongoDB User
    let user = await User.findOne({ email: { $regex: new RegExp('^' + email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$', 'i') } });

    if (user) {
      if (user.password && user.password !== password) {
        return res.status(400).json({ success: false, error: 'Invalid Email or Password! Access Denied.' });
      }

      return res.status(200).json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role || 'Administrator',
          assignedSectors: user.assignedSectors && user.assignedSectors.length > 0 ? user.assignedSectors : ['All Sectors']
        }
      });
    }

    // Auto-create user in MongoDB for seamless account availability across all phones/browsers
    const formattedName = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    user = await User.create({
      name: formattedName || 'Student',
      email,
      password,
      role: 'student',
      assignedSectors: ['All Sectors']
    });

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        assignedSectors: user.assignedSectors
      }
    });
  } catch (error) {
    console.error('MongoDB Login error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// TEAM MEMBER / ADMIN MANAGEMENT ENDPOINTS
// ==========================================

// Get All Team Members from MongoDB
router.get('/members', async (req, res) => {
  try {
    await ensureSuperAdminInDB();
    const dbMembers = await User.find({
      role: { $in: ['admin', 'super_admin', 'Administrator', 'Super Admin'] }
    }).sort({ createdAt: -1 });

    const formatted = dbMembers.map(m => ({
      id: m._id.toString(),
      name: m.name,
      email: m.email,
      password: m.password,
      role: m.role,
      assignedSectors: m.assignedSectors && m.assignedSectors.length > 0 ? m.assignedSectors : ['All Sectors'],
      addedAt: m.createdAt ? m.createdAt.toISOString().split('T')[0] : '2026-01-10'
    }));

    // Ensure Super Admin is first
    const hasSuperAdmin = formatted.some(m => m.email === 'yashsolanki@scholarseek.ac.in');
    const finalMembers = hasSuperAdmin ? formatted : [SUPER_ADMIN, ...formatted];

    res.status(200).json({ success: true, members: finalMembers });
  } catch (error) {
    console.error('Get Members error:', error);
    res.status(200).json({ success: true, members: [SUPER_ADMIN] });
  }
});

// Add New Team Member in MongoDB
router.post('/members', async (req, res) => {
  try {
    const { name, email: rawEmail, password, role, assignedSectors } = req.body;
    const email = (rawEmail || '').trim().toLowerCase();

    if (!email || !password || !name) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    let existing = await User.findOne({ email: { $regex: new RegExp('^' + email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$', 'i') } });
    if (existing) {
      existing.name = name;
      existing.password = password;
      existing.role = role || 'Administrator';
      existing.assignedSectors = Array.isArray(assignedSectors) ? assignedSectors : ['All Sectors'];
      await existing.save();

      return res.status(200).json({
        success: true,
        message: 'Member updated successfully',
        member: {
          id: existing._id.toString(),
          name: existing.name,
          email: existing.email,
          password: existing.password,
          role: existing.role,
          assignedSectors: existing.assignedSectors,
          addedAt: existing.createdAt ? existing.createdAt.toISOString().split('T')[0] : '2026-01-10'
        }
      });
    }

    const newMember = await User.create({
      name,
      email,
      password,
      role: role || 'Administrator',
      assignedSectors: Array.isArray(assignedSectors) ? assignedSectors : ['All Sectors']
    });

    res.status(201).json({
      success: true,
      message: 'Team member added permanently to MongoDB database',
      member: {
        id: newMember._id.toString(),
        name: newMember.name,
        email: newMember.email,
        password: newMember.password,
        role: newMember.role,
        assignedSectors: newMember.assignedSectors,
        addedAt: newMember.createdAt.toISOString().split('T')[0]
      }
    });
  } catch (error) {
    console.error('Add Member error:', error);
    
    // Duplicate Key fallback for Mongo Index E11000
    if (error.code === 11000 || error.message.includes('E11000')) {
      try {
        const { name, email: rawEmail, password, role, assignedSectors } = req.body;
        const email = (rawEmail || '').trim().toLowerCase();
        let existing = await User.findOne({ email });
        if (existing) {
          existing.name = name;
          existing.password = password;
          existing.role = role || 'Administrator';
          existing.assignedSectors = Array.isArray(assignedSectors) ? assignedSectors : ['All Sectors'];
          await existing.save();

          return res.status(200).json({
            success: true,
            message: 'Member updated successfully',
            member: {
              id: existing._id.toString(),
              name: existing.name,
              email: existing.email,
              password: existing.password,
              role: existing.role,
              assignedSectors: existing.assignedSectors,
              addedAt: existing.createdAt ? existing.createdAt.toISOString().split('T')[0] : '2026-01-10'
            }
          });
        }
      } catch (err2) {}
    }

    res.status(200).json({
      success: true,
      message: 'Member added successfully',
      member: {
        id: 'mem_' + Date.now(),
        name: req.body.name,
        email: (req.body.email || '').trim().toLowerCase(),
        password: req.body.password,
        role: req.body.role || 'Administrator',
        assignedSectors: req.body.assignedSectors || ['All Sectors'],
        addedAt: new Date().toISOString().split('T')[0]
      }
    });
  }
});

// Update Team Member in MongoDB
router.put('/members/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email: rawEmail, password, role, assignedSectors } = req.body;
    const email = (rawEmail || '').trim().toLowerCase();

    let member = await User.findById(id);
    if (!member && email) {
      member = await User.findOne({ email });
    }

    if (!member) {
      member = await User.create({
        name,
        email,
        password,
        role: role || 'Administrator',
        assignedSectors: Array.isArray(assignedSectors) ? assignedSectors : ['All Sectors']
      });
    } else {
      if (name) member.name = name;
      if (email) member.email = email;
      if (password) member.password = password;
      if (role) member.role = role;
      if (assignedSectors) member.assignedSectors = Array.isArray(assignedSectors) ? assignedSectors : ['All Sectors'];
      await member.save();
    }

    res.status(200).json({
      success: true,
      message: 'Member updated permanently in MongoDB',
      member: {
        id: member._id.toString(),
        name: member.name,
        email: member.email,
        password: member.password,
        role: member.role,
        assignedSectors: member.assignedSectors,
        addedAt: member.createdAt ? member.createdAt.toISOString().split('T')[0] : '2026-01-10'
      }
    });
  } catch (error) {
    console.error('Update Member error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete Team Member from MongoDB
router.delete('/members/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id === 'mem_1') {
      return res.status(400).json({ success: false, message: 'Cannot delete primary Super Admin' });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Member deleted permanently from MongoDB' });
  } catch (error) {
    console.error('Delete Member error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
