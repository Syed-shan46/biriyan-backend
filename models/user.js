// models/User.js
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },

}, {
  timestamps: true,
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
