// routes/checkoutRoutes.js
const express = require('express');
const router = express.Router();
const Checkout = require('../models/checkout');

router.post('/', async (req, res) => {
  try {
    const {
      fullName, email, phone, address,
      city, pincode, paymentMode
    } = req.body;

    // Save to MongoDB
    const newOrder = new Checkout({
      fullName, email, phone, address,
      city, pincode, paymentMode
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (err) {
    console.error('Checkout error:', err);
    res.status(500).json({ message: 'Order failed, please try again.' });
  }
});
router.get('/', async (req, res) => {
  try {
    const orders = await Checkout.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders.' });
  }
});
module.exports = router;
