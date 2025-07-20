// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');

// Admin login route (no hashing)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    const admin = await Admin.findOne({ email });
    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Admin login successful',
      admin: {
        id: admin._id,
        name: admin.Fullname,
        email: admin.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
