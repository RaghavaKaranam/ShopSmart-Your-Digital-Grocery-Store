// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/orders');
const Cart = require('../models/cart');
const nodemailer = require('nodemailer');

router.post('/place', async (req, res) => {
  const { email, shipping, paymentMethod } = req.body;

  // ✅ Find the user's cart by email
  const cart = await Cart.findOne({ email });

  if (!cart || cart.products.length === 0) {
    return res.status(400).json({ message: 'Your cart is empty.' });
  }

  // ✅ Calculate total
  const total = cart.products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  // ✅ Create and save the order
  const order = new Order({
    email,
    products: cart.products,
    totalAmount: total,
    shipping,
    paymentMethod,
  });

  await order.save();

  // ✅ Clear the cart
  await Cart.findOneAndUpdate({ email }, { products: [] });

  // ✅ Build product list for email
  const productList = cart.products.map(p =>
    `• ${p.title} (x${p.quantity}) - ₹${p.price} each, Subtotal: ₹${p.price * p.quantity}`
  ).join('\n');

  const emailText = `
Hi ${shipping.name},

✅ Thank you for shopping with ShopSmart!

Here are the details of your order:

${productList}

---------------------------
Total Amount: ₹${total}
---------------------------

Your order is now being processed.
We'll notify you when it ships!

Thanks for trusting ShopSmart!

Regards,
ShopSmart Team
`;

  // ✅ Send confirmation email
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: shipping.email,
    subject: '✅ ShopSmart Order Confirmation',
    text: emailText,
  });

  res.json({ message: 'Order placed successfully! Confirmation sent to your email.' });
});

// ✅ Order history for user
router.get('/history/:email', async (req, res) => {
  const orders = await Order.find({ email: req.params.email });
  res.json(orders);
});
// ✅ Get all orders (for Admin)
router.get('/all', async (req, res) => {
  try {
    const allOrders = await Order.find().sort({ createdAt: -1 });
    
    res.json(allOrders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});
router.put('/cancel/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (order.status !== 'pending') {
      return res.status(400).json({ message: 'Order cannot be cancelled' });
    }

    order.status = 'cancelled';
    await order.save();

    res.json({ message: 'Order cancelled successfully!' });
  } catch (err) {
    console.error('Error cancelling order:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
