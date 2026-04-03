// src/controllers/cart_controller.js


  const CartService = require('../service/cart_service');
  const cartService = new CartService();

  async function getCart(req, res, next) {
    try {
      const data = await cartService.getCart(req.user.id);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  async function addToCart(req, res, next) {
    try {
      const data = await cartService.addToCart(req.user.id, req.body);
      res.status(201).json({ success: true, message: 'Item added to cart', data });
    } catch (err) {
      next(err);
    }
  }

  async function updateQuantity(req, res, next) {
    try {
      const data = await cartService.updateQuantity(req.user.id, req.params.itemId, req.body);
      res.json({ success: true, message: 'Quantity updated', data });
    } catch (err) {
      next(err);
    }
  }

  async function removeItem(req, res, next) {
    try {
      const data = await cartService.removeItem(req.user.id, req.params.itemId);
      res.json({ success: true, message: 'Item removed from cart', data });
    } catch (err) {
      next(err);
    }
  }

  async function checkout(req, res, next) {
    try {
      const data = await cartService.checkout(req.user.id, req.body);
      res.json(data);
    } catch (err) {
      next(err);
    }
  }

  module.exports = { getCart, addToCart, updateQuantity, removeItem, checkout };

