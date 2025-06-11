const express = require('express');
const User = require('../models/User'); 
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

const {
  getMe,
  getId,
  updateUserAddress
} = require('../controllers/userController');

router.get('/me', verifyToken, getMe);
router.get('/id', verifyToken, getId);
router.post('/update-address', verifyToken, updateUserAddress);

module.exports = router;