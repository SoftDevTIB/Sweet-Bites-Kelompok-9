  const express = require('express');
  const router = express.Router();
  const { verifyToken, allowRoles } = require('../middlewares/authMiddleware');

  const {
    getAllUsers,
    getUserDetail,
    getAdminStats
  } = require('../controllers/adminController');

  router.get('/users', verifyToken, allowRoles('admin'), getAllUsers);
  router.get('/users/:id', verifyToken, allowRoles('admin'), getUserDetail);
  router.get('/stats', verifyToken, allowRoles('admin'), getAdminStats);

  module.exports = router;
