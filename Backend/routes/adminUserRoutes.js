// backend/routes/userRoutes.js (or adminUserRoutes.js)
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // ✅ adjust path to your user model!

// ✅ GET all users (for admin)
router.get('/all', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error('Failed to fetch users:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
