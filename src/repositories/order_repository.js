  const { Order, OrderItem, Product } = require('../models');

  class OrderRepository {
    async createOrderWithItems(orderData, items) {
      const transaction = await Order.sequelize.transaction();
      try {
        const order = await Order.create(orderData, { transaction });

        const createdItems = await OrderItem.bulkCreate(
          items.map(item => ({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            priceAtPurchase: item.priceAtPurchase,
            subtotal: item.priceAtPurchase * item.quantity,
          })),
          { transaction }
        );

        await transaction.commit();

        return this.findOrderById(order.id);
      } catch (err) {
        await transaction.rollback();
        throw err;
      }
    }

    async findOrderById(orderId) {
      return Order.findOne({
        where: { id: orderId },
        include: [
          {
            model: OrderItem,
            as: 'orderItems',
            include: [
              {
                model: Product,
                as: 'product',
                attributes: ['id', 'name', 'price'],
              },
            ],
          },
        ],
      });
    }

    async findOrdersByUserId(userId, { page = 1, limit = 10, status }) {
      const offset = (page - 1) * limit;

      const where = { userId };
      if (status) where.status = status;

      const { count, rows } = await Order.findAndCountAll({
        where,
        include: [
          {
            model: OrderItem,
            as: 'orderItems',
            include: [
              {
                model: Product,
                as: 'product',
                attributes: ['id', 'name'],
              },
            ],
          },
        ],
        limit,
        offset,
        order: [['createdAt', 'DESC']],
      });

      return {
        orders: rows,
        totalOrders: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    }

    async findAllOrders({ page = 1, limit = 10, status, search }) {
      const offset = (page - 1) * limit;

      const where = {};
      if (status) where.status = status;
      if (search) {
        where.orderNumber = { [require('sequelize').Op.like]: `%${search}%` };
      }

      const { count, rows } = await Order.findAndCountAll({
        where,
        include: [
          {
            model: OrderItem,
            as: 'orderItems',
            include: [
              {
                model: Product,
                as: 'product',
                attributes: ['id', 'name'],
              },
            ],
          },
        ],
        limit,
        offset,
        order: [['createdAt', 'DESC']],
      });

      return {
        orders: rows,
        totalOrders: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    }

    async updateOrderStatus(orderId, status) {
      const order = await Order.findByPk(orderId);
      if (!order) return null;

      order.status = status;
      if (status === 'CANCELLED') {
        order.cancelledAt = new Date();
      }
      await order.save();

      return this.findOrderById(orderId);
    }

    async updatePaymentStatus(orderId, paymentStatus) {
      const order = await Order.findByPk(orderId);
      if (!order) return null;

      order.paymentStatus = paymentStatus;
      await order.save();

      return this.findOrderById(orderId);
    }
  }

  module.exports = OrderRepository;