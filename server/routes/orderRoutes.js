const express = require('express');
const upload = require('../middlewares/upload');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

const { 
  createOrder,
  getAllOrders,
  getOrderById
} = require('../controllers/orderController');

router.post('/', verifyToken, createOrder);

// Ambil semua order
router.get('/', getAllOrders);

// Ambil order berdasarkan orderId
router.get('/:orderId', getOrderById);

module.exports = router;