  const OrderRepository = require('../repositories/order_repository');
  const CartRepository = require('../repositories/cart_repository');
  const { Product } = require('../models');
  const BadRequestError = require('../errors/bad_request_error');
  const NotFoundError = require('../errors/not_found_error');

  class OrderService {
    constructor() {
      this.orderRepo = new OrderRepository();
      this.cartRepo = new CartRepository();
    }

    _generateOrderNumber() {
      const timestamp = Date.now().toString().slice(-6);
      const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      return `ORD-${timestamp}-${random}`;
    }

    async placeOrder(userId, { shippingAddress, paymentMethod }) {
      const cart = await this.cartRepo.getCartWithItems(userId);
      if (!cart || !cart.items || cart.items.length === 0) {
        throw new BadRequestError('Cart is empty');
      }

      let totalAmount = 0;
      const orderItems = [];

      for (const cartItem of cart.items) {
        const product = await Product.findByPk(cartItem.productId);
        if (!product) {
          throw new NotFoundError(`Product "${cartItem.product?.name || cartItem.productId}" not found`);
        }
        if (product.stock < cartItem.quantity) {
          throw new BadRequestError(
            `Insufficient stock for "${product.name}". Available: ${product.stock}, Requested: ${cartItem.quantity}`
          );
        }

        const subtotal = product.price * cartItem.quantity;
        totalAmount += subtotal;

        orderItems.push({
          productId: product.id,
          quantity: cartItem.quantity,
          priceAtPurchase: product.price,
        });
      }

      const orderData = {
        userId,
        orderNumber: this._generateOrderNumber(),
        totalAmount: Math.round(totalAmount * 100) / 100,
        paymentMethod: paymentMethod || 'COD',
        shippingAddress,
      };

      const order = await this.orderRepo.createOrderWithItems(orderData, orderItems);

      // decrease stock and clear cart
      const transaction = await Product.sequelize.transaction();
      try {
        for (const item of cart.items) {
          const product = await Product.findByPk(item.productId, {
            lock: transaction.LOCK.UPDATE,
            transaction,
          });
          if (product) {
            await product.decrement('stock', { by: item.quantity, transaction });
          }
        }

        const CartItemRepository = require('../repositories/cart_item_repository');
        const cartItemRepo = new CartItemRepository();
        await cartItemRepo.model.destroy({
          where: { cartId: cart.id },
          transaction,
        });

        await transaction.commit();
      } catch (err) {
        await transaction.rollback();
        throw err;
      }

      return this.getOrder(order.id);
    }

    async getOrder(orderId) {
      const order = await this.orderRepo.findOrderById(orderId);
      if (!order) throw new NotFoundError('Order', orderId);
      return this._formatOrder(order);
    }

    async getUserOrders(userId, { page, limit, status }) {
      const result = await this.orderRepo.findOrdersByUserId(userId, {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
        status,
      });

      return {
        ...result,
        orders: result.orders.map(o => this._formatOrderSummary(o)),
      };
    }

    async getAllAdminOrders({ page, limit, status, search }) {
      const result = await this.orderRepo.findAllOrders({
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
        status,
        search,
      });

      return {
        ...result,
        orders: result.orders.map(o => this._formatOrderSummary(o)),
      };
    }

    async updateOrderStatus(orderId, { status, reason }) {
      const order = await this.orderRepo.findOrderById(orderId);
      if (!order) throw new NotFoundError('Order', orderId);

      // only PENDING can be cancelled
      if (status === 'CANCELLED' && order.status !== 'PENDING') {
        throw new BadRequestError('Only PENDING orders can be cancelled');
      }

      return this.orderRepo.updateOrderStatus(orderId, status);
    }

    async updatePaymentStatus(orderId, { paymentStatus }) {
      const order = await this.orderRepo.findOrderById(orderId);
      if (!order) throw new NotFoundError('Order', orderId);
      return this.orderRepo.updatePaymentStatus(orderId, paymentStatus);
    }

    async cancelOrder(userId, orderId, { reason }) {
      const order = await this.orderRepo.findOrderById(orderId);
      if (!order) throw new NotFoundError('Order', orderId);
      if (order.userId !== userId) {
        throw new BadRequestError('You can only cancel your own orders');
      }
      if (order.status !== 'PENDING') {
        throw new BadRequestError('Only PENDING orders can be cancelled');
      }

      return this.orderRepo.updateOrderStatus(orderId, 'CANCELLED');
    }

    _formatOrder(order) {
      return {
        id: order.id,
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
        status: order.status,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        shippingAddress: order.shippingAddress,
        cancelledAt: order.cancelledAt,
        cancellationReason: order.cancellationReason,
        items: (order.orderItems || []).map(item => ({
          productId: item.productId,
          name: item.product?.name || 'Unknown',
          quantity: item.quantity,
          priceAtPurchase: item.priceAtPurchase,
          subtotal: item.subtotal,
        })),
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      };
    }

    _formatOrderSummary(order) {
      return {
        id: order.id,
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
        status: order.status,
        paymentStatus: order.paymentStatus,
        itemCount: (order.orderItems || []).length,
        createdAt: order.createdAt,
      };
    }
  }

  module.exports = OrderService;
