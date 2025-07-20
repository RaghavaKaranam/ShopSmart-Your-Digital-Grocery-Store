const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  email: String,
  address: String,
  phone: String,
  paymentMethod: String,
  products: [
    {
      productId: String,
      title: String,
      price: Number,
      quantity: Number,
    }
  ],
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Checkout', checkoutSchema, 'checkouts');
