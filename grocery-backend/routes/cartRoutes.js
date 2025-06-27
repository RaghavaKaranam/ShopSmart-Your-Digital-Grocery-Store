const express = require('express');
const router = express.Router();
const CartItem = require('../models/cart');

// Get all cart items
router.get('/', async (req, res) => {
  try {
    const items = await CartItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
});

// Add to cart
router.post('/add', async (req, res) => {
  try {
    const { productId, title, price, quantity, image } = req.body;
    const existing = await CartItem.findOne({ productId });

    if (existing) {
      existing.quantity += quantity;
      await existing.save();
      return res.json({ message: 'Cart updated' });
    }

    const newItem = new CartItem({ productId, title, price, quantity, image });
    await newItem.save();
    res.json({ message: 'Added to cart' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

// Remove item
router.delete('/:productId', async (req, res) => {
  try {
    await CartItem.deleteOne({ productId: req.params.productId });
    res.json({ message: 'Item removed' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove item' });
  }
});

// Clear all
router.delete('/', async (req, res) => {
  try {
    await CartItem.deleteMany({});
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear cart' });
  }
});

module.exports = router;
