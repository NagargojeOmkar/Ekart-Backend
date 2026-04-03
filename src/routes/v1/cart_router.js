
// src/routes/v1/cart_router.js

  const express = require('express');
  const router = express.Router();
  const authMiddleware = require('../../middleware/auth_middleware');
  const {
    getCart,
    addToCart,
    updateQuantity,
    removeItem,
    checkout,
  } = require('../../controllers/cart_controller');

  // All cart routes require authentication
  router.use(authMiddleware);

  router.get('/', getCart);
  router.post('/items', addToCart);
  router.patch('/items/:itemId', updateQuantity);
  router.delete('/items/:itemId', removeItem);
  router.post('/checkout', checkout);

  module.exports = router;
