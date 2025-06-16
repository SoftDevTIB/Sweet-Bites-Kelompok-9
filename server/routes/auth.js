const express = require('express');
const User = require('../models/User'); 
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

const { 
  login, 
  logout, 
  registerUser, 
  changePassword,
  updateUserAddress 
} = require('../controllers/authController');

router.get('/', async (req, res) => {
  const db = getDB();
  const users = await db.collection('users').find({}).toArray();
  res.json(users);
});

// rutenya jadi: /api/auth/login
router.post('/register', registerUser);
router.post('/login', login);
router.post('/logout', verifyToken, logout);
router.post('/change-password', verifyToken, changePassword);



module.exports = router;