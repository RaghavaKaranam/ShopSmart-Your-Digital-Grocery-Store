const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  email: { type: String, required: true },
  products: [
    {
      productId: String,
      title: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', cartSchema, 'cart');
