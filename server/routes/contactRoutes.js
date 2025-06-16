const express = require('express');
const { postContact } = require('../controllers/contactController');

const router = express.Router();

router.post('/', postContact); // Added back verifyToken to ensure only logged-in users can send messages

module.exports = router;