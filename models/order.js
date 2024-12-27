
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  category: String,
  image: String,
  price: Number,
});


const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userName: {
    type: String,
  },

  phone: {
    type: Number,
  },

  address: {
    type: String,
    required: true, // Address is mandatory
    trim: true
  },

  productName: {
    type: String,
    required: true,
  },

  products: [productSchema],

  quantity: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  image: {
    type: String,

  },

  totalAmount: {
    type: Number,
    required: true,
  },

  paymentStatus: {
    type: String,
    enum: ['Pending', 'Success', 'Failed'],
    default: 'Pending',
  },

  orderStatus: {
    type: String,
    default: 'Pending'
  },

  delivered: {
    type: Boolean,
    default: true,
  },

  customerDeviceToken: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
