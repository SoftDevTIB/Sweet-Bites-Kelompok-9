const express = require('express');
const upload = require('../middlewares/upload');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

const { 
  createOrder
} = require('../controllers/orderController');

router.post('/', verifyToken, createOrder);

module.exports = router;