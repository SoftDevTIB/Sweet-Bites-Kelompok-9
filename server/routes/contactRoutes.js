const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const { postContact } = require('../controllers/contactController');

const router = express.Router();

router.post('/', verifyToken, postContact); // Added back verifyToken to ensure only logged-in users can send messages

module.exports = router;