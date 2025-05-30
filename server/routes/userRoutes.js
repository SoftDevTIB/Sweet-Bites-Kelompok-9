const express = require('express');
const User = require('../models/User').default; 
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

const {
  getMe,
  updateUserAddress
} = require('../controllers/userController');

router.get('/me', verifyToken, getMe);
router.post('/update-address', verifyToken, updateUserAddress);

module.exports = router;