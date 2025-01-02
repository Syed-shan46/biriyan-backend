
const mongoose = require('mongoose');




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

  products: [{  // An array of product objects
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    itemPrice: { type: Number },
  }],

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
