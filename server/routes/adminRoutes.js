  const express = require('express');
  const router = express.Router();
  const { verifyToken, allowRoles } = require('../middlewares/authMiddleware');

  const {
  getAdminStats
} = require('../controllers/adminController');

  router.get('/stats', verifyToken, allowRoles('admin'), getAdminStats);

  module.exports = router;
