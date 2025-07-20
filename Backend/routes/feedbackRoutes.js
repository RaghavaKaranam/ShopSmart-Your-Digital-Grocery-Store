// backend/routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');

// POST: Submit Feedback
router.post('/submit', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET: Fetch all feedbacks
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch feedbacks' });
  }
});

// DELETE: Feedback by ID
router.delete('/:id', async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete feedback' });
  }
});

module.exports = router;
