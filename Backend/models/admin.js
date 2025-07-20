// models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  Fullname: String,
  email: String,
  password: String,
});

module.exports = mongoose.model('Admin', adminSchema, 'Admin_Access');
// Make sure 'Admin_Access' is the collection name in your DB
