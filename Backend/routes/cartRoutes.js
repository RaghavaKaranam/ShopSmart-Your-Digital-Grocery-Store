const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

// ✅ Add/update
router.post('/add', async (req, res) => {
  const { email, product } = req.body;
  let cart = await Cart.findOne({ email });

  if (!cart) {
    cart = new Cart({ email, products: [product] });
  } else {
    const existing = cart.products.find(p => p.productId === product.productId);
    if (existing) {
      existing.quantity += product.quantity;
    } else {
      cart.products.push(product);
    }
  }

  await cart.save();
  res.json(cart);
});

// ✅ Get cart
router.get('/:email', async (req, res) => {
  const cart = await Cart.findOne({ email: req.params.email });
  res.json(cart || { products: [] });
});

// ✅ Remove product
router.post('/remove', async (req, res) => {
  const { email, productId } = req.body;
  const cart = await Cart.findOne({ email });
  if (!cart) return res.sendStatus(404);

  cart.products = cart.products.filter(p => p.productId !== productId);
  await cart.save();
  res.json(cart);
});

// ✅ Clear cart
router.post('/clear', async (req, res) => {
  await Cart.findOneAndUpdate({ email: req.body.email }, { products: [] });
  res.json({ message: 'Cart cleared' });
});

module.exports = router;
