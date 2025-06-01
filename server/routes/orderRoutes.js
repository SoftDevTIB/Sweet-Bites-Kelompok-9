const express = require('express');
const upload = require('../middlewares/upload');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

const { 
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getOrdersByUser
} = require('../controllers/orderController');

router.post('/', verifyToken, createOrder);

// Ambil semua order
router.get('/', getAllOrders);

// Ambil order berdasarkan user
router.get('/user', verifyToken, getOrdersByUser);

// Ambil order berdasarkan orderId
router.get('/:orderId', getOrderById);

// Update status order darri orderId
router.patch('/:orderId/status', verifyToken, updateOrderStatus);

module.exports = router;