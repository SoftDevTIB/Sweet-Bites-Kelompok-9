const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/authController');

// rutenya jadi: /api/auth/login
router.post('/login', loginUser);

module.exports = router;
