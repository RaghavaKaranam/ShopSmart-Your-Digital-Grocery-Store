// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  mobile: String,
  password: String
});

const User = mongoose.model('User', userSchema,'User');

module.exports = User;
