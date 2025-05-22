const express = require('express');
const User = require('../models/User').default; 
const router = express.Router();

const { login, logout, registerUser } = require('../controllers/authController');

router.get('/', async (req, res) => {
  const db = getDB();
  const users = await db.collection('users').find({}).toArray();
  res.json(users);
});

// rutenya jadi: /api/auth/login
router.post('/register', registerUser);
router.post('/login', login);
router.post('/logout', logout);



module.exports = router;