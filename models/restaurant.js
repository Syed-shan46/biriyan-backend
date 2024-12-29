const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  isOpen: { type: Boolean, default: true }, // Default to open
  // Other fields
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
