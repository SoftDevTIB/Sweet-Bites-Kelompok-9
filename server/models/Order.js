const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  deliveryDate: {
    type: Date,
  },
  deliveryFee: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['menunggu', 'diproses', 'dikirim', 'selesai'],
    default: 'menunggu'
  },
  totalAmount: {
    type: Number,
    required: true
  },
  items: [orderItemSchema]
});

module.exports = mongoose.model('Order', orderSchema);
