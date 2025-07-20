// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ✅ Add new product with duplicate check
router.post('/add', async (req, res) => {
  const { ProductName, Category, SubCategory } = req.body;

  try {
    // Duplicate check
    const existing = await Product.findOne({
      ProductName: ProductName.trim(),
      Category: Category.trim(),
      SubCategory: SubCategory.trim(),
    });

    if (existing) {
      return res.json({ exists: true });
    }

    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json({ exists: false, message: 'Product added successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding product.' });
  }
});

// ✅ Get all products
router.get('/all', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products.' });
  }
});

// ✅ Update product by ID
router.put('/:id', async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Product updated.' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating product.' });
  }
});

// ✅ Delete product by ID
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product.' });
  }
});

module.exports = router;
