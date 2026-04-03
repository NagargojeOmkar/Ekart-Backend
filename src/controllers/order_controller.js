  const OrderService = require('../service/order_service');
  const orderService = new OrderService();

  async function placeOrder(req, res, next) {
    try {
      const { shippingAddress, paymentMethod } = req.body;
      const order = await orderService.placeOrder(req.user.id, { shippingAddress, paymentMethod });
      res.status(201).json({ success: true, message: 'Order placed successfully', data: order });
    } catch (err) {
      next(err);
    }
  }

  async function getOrder(req, res, next) {
    try {
      const order = await orderService.getOrder(req.params.orderId);
      res.json({ success: true, data: order });
    } catch (err) {
      next(err);
    }
  }

  async function getUserOrders(req, res, next) {
    try {
      const orders = await orderService.getUserOrders(req.user.id, req.query);
      res.json({ success: true, data: orders });
    } catch (err) {
      next(err);
    }
  }

  async function getAllOrders(req, res, next) {
    try {
      const orders = await orderService.getAllAdminOrders(req.query);
      res.json({ success: true, data: orders });
    } catch (err) {
      next(err);
    }
  }

  async function updateOrderStatus(req, res, next) {
    try {
      const order = await orderService.updateOrderStatus(req.params.orderId, req.body);
      res.json({ success: true, message: 'Order status updated', data: order });
    } catch (err) {
      next(err);
    }
  }

  async function updatePaymentStatus(req, res, next) {
    try {
      const order = await orderService.updatePaymentStatus(req.params.orderId, req.body);
      res.json({ success: true, message: 'Payment status updated', data: order });
    } catch (err) {
      next(err);
    }
  }

  async function cancelOrder(req, res, next) {
    try {
      const order = await orderService.cancelOrder(req.user.id, req.params.orderId, req.body);
      res.json({ success: true, message: 'Order cancelled', data: order });
    } catch (err) {
      next(err);
    }
  }

  module.exports = {
    placeOrder,
    getOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus,
    updatePaymentStatus,
    cancelOrder,
  };