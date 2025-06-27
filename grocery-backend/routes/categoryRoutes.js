const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Category = mongoose.model('Category', categorySchema, 'categories');

router.post('/add', async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.status(201).json({ message: 'Category added successfully' });
  } catch (err) {
    console.error('Add category error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
