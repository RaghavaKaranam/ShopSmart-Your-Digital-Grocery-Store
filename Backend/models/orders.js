const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  products: [
    {
      productId: String,
      title: String,
      price: Number,
      quantity: Number
    }
  ],
  totalAmount: Number,
  shipping: {
    name: String,
    address: String,
    phone: String,
    email: String
  },
  paymentMethod: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema, 'checkouts');
