const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getUsers,
  getOrders,
  updateOrderStatus,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin');

router.use(protect, adminOnly);

router.get('/stats', getDashboardStats);
router.get('/users', getUsers);
router.get('/orders', getOrders);
router.patch('/orders/:id/status', updateOrderStatus);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;
