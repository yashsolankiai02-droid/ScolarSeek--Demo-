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

const formatDate = (dateVal) => {
  try {
    if (!dateVal) return new Date().toISOString().split('T')[0];
    if (typeof dateVal === 'string') return dateVal.split('T')[0];
    if (dateVal instanceof Date) return dateVal.toISOString().split('T')[0];
    if (typeof dateVal.toISOString === 'function') return dateVal.toISOString().split('T')[0];
  } catch (e) {}
  return new Date().toISOString().split('T')[0];
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
    const { email: rawEmail, password: rawPassword, name: rawName } = req.body || {};
    const email = (rawEmail || '').trim().toLowerCase();
    const password = (rawPassword || '').trim();
    const name = (rawName || '').trim();

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    let existingUser = await User.findOne({ email });
    if (!existingUser) {
      existingUser = await User.findOne({ email: { $regex: new RegExp('^' + email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$', 'i') } });
    }

    if (existingUser) {
      if (password) {
        existingUser.password = password;
        if (name) existingUser.name = name;
        await existingUser.save();
      }
      return res.status(200).json({
        success: true,
        user: {
          id: existingUser._id.toString(),
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role,
          assignedSectors: existingUser.assignedSectors
        }
      });
    }

    const newUser = await User.create({
      name: name || email.split('@')[0],
      email,
      password,
      role: 'student',
      assignedSectors: ['All Sectors']
    });

    res.status(201).json({
      success: true,
      user: {
        id: newUser._id.toString(),
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
    const { email: rawEmail, password: rawPassword } = req.body || {};
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
          role: 'Super Admin',
          assignedSectors: ['All Sectors']
        }
      });
    }

    // Check MongoDB User
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.findOne({ email: { $regex: new RegExp('^' + email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$', 'i') } });
    }

    if (user) {
      if (user.password && user.password !== password) {
        return res.status(400).json({ success: false, error: 'Invalid Email or Password! Access Denied.' });
      }

      return res.status(200).json({
        success: true,
        user: {
          id: user._id.toString(),
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
        id: user._id.toString(),
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
    const dbMembers = await User.find({}).sort({ createdAt: -1 });

    const formatted = dbMembers.map(m => ({
      id: m._id.toString(),
      name: m.name,
      email: m.email,
      password: m.password,
      role: m.role || 'Administrator',
      assignedSectors: m.assignedSectors && m.assignedSectors.length > 0 ? m.assignedSectors : ['All Sectors'],
      addedAt: formatDate(m.createdAt)
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
    const { name: rawName, email: rawEmail, password: rawPassword, role, assignedSectors } = req.body || {};
    const email = (rawEmail || '').trim().toLowerCase();
    const password = (rawPassword || '').trim();
    const name = (rawName || '').trim();

    if (!email || !password || !name) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    let existing = await User.findOne({ email });
    if (!existing) {
      existing = await User.findOne({ email: { $regex: new RegExp('^' + email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$', 'i') } });
    }

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
          addedAt: formatDate(existing.createdAt)
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
        addedAt: formatDate(newMember.createdAt)
      }
    });
  } catch (error) {
    console.error('Add Member error:', error);
    
    // Duplicate Key fallback for Mongo Index E11000
    if (error.code === 11000 || error.message.includes('E11000')) {
      try {
        const { name: rawName, email: rawEmail, password: rawPassword, role, assignedSectors } = req.body || {};
        const email = (rawEmail || '').trim().toLowerCase();
        const password = (rawPassword || '').trim();
        const name = (rawName || '').trim();

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
              addedAt: formatDate(existing.createdAt)
            }
          });
        }
      } catch (err2) {}
    }

    res.status(500).json({ success: false, message: error.message || 'Failed to add team member' });
  }
});

// Update Team Member in MongoDB
router.put('/members/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name: rawName, email: rawEmail, password: rawPassword, role, assignedSectors } = req.body || {};
    const email = (rawEmail || '').trim().toLowerCase();
    const password = (rawPassword || '').trim();
    const name = (rawName || '').trim();

    let member = null;
    if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
      member = await User.findById(id);
    }
    if (!member && email) {
      member = await User.findOne({ email });
      if (!member) {
        member = await User.findOne({ email: { $regex: new RegExp('^' + email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$', 'i') } });
      }
    }

    if (!member) {
      member = await User.create({
        name: name || 'Team Member',
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
        addedAt: formatDate(member.createdAt)
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

    if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
      await User.findByIdAndDelete(id);
    }
    const { email } = req.query || {};
    if (email) {
      await User.findOneAndDelete({ email: email.toLowerCase() });
    }

    res.status(200).json({ success: true, message: 'Member deleted permanently from MongoDB' });
  } catch (error) {
    console.error('Delete Member error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;


