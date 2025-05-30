// routes/cartRoutes.js
const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  overwriteCart
} = require('../controllers/cartController');

const router = express.Router();

router.get('/', verifyToken, getCart);
router.post('/', verifyToken, addToCart);
router.put('/:productId', verifyToken, updateQuantity);    // <= baru
router.delete('/:productId', verifyToken, removeFromCart);
// router.post('/sync', verifyToken, syncCart);   
router.post('/overwrite', verifyToken, overwriteCart);            // <= kalau mau sync seluruh cart

module.exports = router;
