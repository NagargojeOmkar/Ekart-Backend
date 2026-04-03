// src/routes/v1/order_router.js
  const express = require('express');
  const router = express.Router();
  const authMiddleware = require('../../middleware/auth_middleware');
  const { isAdmin } = require('../../middleware/role_middleware');
  const {
    placeOrder,
    getOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus,
    updatePaymentStatus,
    cancelOrder,
  } = require('../../controllers/order_controller');

  router.use(authMiddleware);

  // ── User routes ──
  router.post('/', placeOrder);
  router.get('/', getUserOrders);
  router.get('/:orderId', getOrder);
  router.post('/:orderId/cancel', cancelOrder);

  // ── Admin routes ──
  router.post('/:orderId/status', isAdmin, updateOrderStatus);
  router.post('/:orderId/payment', isAdmin, updatePaymentStatus);
  router.get('/admin/all', isAdmin, getAllOrders);

  module.exports = router;