const mongoose = require('mongoose');

const feedback = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  age: String,
  aspects: String,
  expectations: String,
  recommendation: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedback,'Feedbacks');
