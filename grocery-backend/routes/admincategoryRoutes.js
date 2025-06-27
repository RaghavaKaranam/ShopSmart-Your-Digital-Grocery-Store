// backend/routes/admincategoryRoutes.js
const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// POST: Add category or subcategory
router.post('/add-category', async (req, res) => {
  const { category, subcategory } = req.body;

  if (!category || !subcategory) {
    return res.status(400).json({ message: 'Both fields are required.' });
  }

  try {
    const existingCategory = await Category.findOne({ category });

    if (!existingCategory) {
      // Create new category with subcategory
      const newCategory = new Category({
        category,
        subcategories: [subcategory],
      });

      await newCategory.save();
      return res.status(201).json({ message: 'Category and subcategory added successfully.' });
    } else {
      // Check if subcategory exists
      if (existingCategory.subcategories.includes(subcategory)) {
        return res.status(409).json({ message: 'Subcategory already exists.' });
      }

      // Add new subcategory
      existingCategory.subcategories.push(subcategory);
      await existingCategory.save();
      return res.status(200).json({ message: 'Subcategory added to existing category.' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
