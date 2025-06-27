const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  subcategories: { type: [String], default: [] }
});

// ✅ Explicitly bind to "categories" collection
module.exports = mongoose.models.Category || mongoose.model('Category', categorySchema, 'categories');
