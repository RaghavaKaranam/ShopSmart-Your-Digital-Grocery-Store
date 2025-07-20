// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  ProductName: String,
  Category: String,
  SubCategory: String,
  Price: Number,
  Quantity: String,
  Image_Url: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema, 'Products');
