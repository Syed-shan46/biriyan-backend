const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  itemName: {
    type: String,
    trim: true,
    required: true,
  },

  itemPrice: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  isAdditional: {
    type: Boolean,
  },

  additional: {
    type: String,
  },

  images: [
    {
      type: String,
      required: true,
    }
  ],


  popular: {
    type: Boolean,
    default: true,
  },

  recommend: {
    type: Boolean,
    default: false,
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;