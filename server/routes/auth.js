const express = require('express');
const User = require('../models/User').default; 
const router = express.Router();

const { loginUser } = require('../controllers/authController');
const {registerUser} = require('../controllers/authController')

router.get('/', async (req, res) => {
  const db = getDB();
  const users = await db.collection('users').find({}).toArray();
  res.json(users);
});

// rutenya jadi: /api/auth/login
router.post('/register', registerUser);
router.post('/login', loginUser);




module.exports = router;