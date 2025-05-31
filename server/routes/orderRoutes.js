const express = require('express');
const upload = require('../middlewares/upload');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

const { 
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus
} = require('../controllers/orderController');

router.post('/', verifyToken, createOrder);

// Ambil semua order
router.get('/', verifyToken, getAllOrders);

// Ambil order berdasarkan orderId
router.get('/:orderId', verifyToken, getOrderById);

// Update status order darri orderId
router.patch('/:orderId/status', verifyToken, updateOrderStatus);

module.exports = router;