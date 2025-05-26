  const express = require('express');
  const router = express.Router();
  const { verifyToken, allowRoles } = require('../middlewares/authMiddleware');

  // Admin-only route example
  router.get('/products', verifyToken, allowRoles('admin'), async (req, res) => {
    // Only admin can reach here
    res.json({ message: 'This is admin-only product list' });
  });

  module.exports = router;
