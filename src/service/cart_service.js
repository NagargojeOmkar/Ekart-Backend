// src/service/cart_service.js 
 
 const CartRepository = require('../repositories/cart_repository');
  const CartItemRepository = require('../repositories/cart_item_repository');
  const { Product } = require('../models');
  const db = require('../config/db_config'); // sequelize instance
  const BadRequestError = require('../errors/bad_request_error');
  const NotFoundError = require('../errors/not_found_error');

  class CartService {
    constructor() {
      this.cartRepo = new CartRepository();
      this.cartItemRepo = new CartItemRepository();
    }

    // ─── Add to Cart ───────────────────────────────────────────
    async addToCart(userId, { productId, quantity }) {
      quantity = parseInt(quantity) || 0;
      productId = parseInt(productId);

      if (quantity < 1) throw new BadRequestError('Quantity must be at least 1');
      if (!productId) throw new BadRequestError('productId is required');

      // 1. Validate product exists & has stock
      const product = await Product.findByPk(productId);
      if (!product) throw new NotFoundError(`Product ${productId} not found`);
      if (product.stock < quantity) {
        throw new BadRequestError(
          `Insufficient stock. Requested: ${quantity}, Available: ${product.stock}`
        );
      }

      // 2. Get or create cart
      const cart = await this.cartRepo.findOrCreateCart(userId);

      // 3. Check existing item
      const transaction = await db.sequelize.transaction();
      try {
        const existing = await this.cartItemRepo.findByCartAndProduct(cart.id, productId);

        if (existing) {
          const newQty = existing.quantity + quantity;
          if (product.stock < newQty) {
            throw new BadRequestError(
              `Cannot add more. Stock available: ${product.stock}, already in cart: ${existing.quantity}`
            );
          }
          existing.quantity = newQty;
          await existing.save({ transaction });
        } else {
          await this.cartItemRepo.create(
            { cartId: cart.id, productId, quantity, priceAtAdd: product.price },
            { transaction }
          );
        }

        await transaction.commit();
      } catch (err) {
        await transaction.rollback();
        throw err;
      }

      return this.getCart(userId);
    }

    // ─── Get Cart ──────────────────────────────────────────────
    async getCart(userId) {
      const cart = await this.cartRepo.getCartWithItems(userId);
      if (!cart) return this._emptyCartResponse();

      const items = cart.CartItems || cart.items || [];
      const totals = this._calculateTotals(items);

      return {
        cartId: cart.id,
        items: items.map(item => ({
          id: item.id,
          productId: item.productId,
          name: item.product?.name || 'Unknown',
          quantity: item.quantity,
          priceAtAdd: item.priceAtAdd,
          stock: item.product?.stock ?? null,
        })),
        ...totals,
      };
    }

    // ─── Update Quantity ───────────────────────────────────────
    async updateQuantity(userId, itemId, { quantity }) {
      quantity = parseInt(quantity);
      if (quantity < 1) throw new BadRequestError('Quantity must be at least 1');

      const cart = await this.cartRepo.findOrCreateCart(userId);
      const item = await this.cartItemRepo.model.findOne({
        where: { id: itemId, cartId: cart.id },
      });
      if (!item) throw new NotFoundError('Cart item not found');

      // Re-check stock
      const product = await Product.findByPk(item.productId);
      if (!product) throw new NotFoundError(`Product ${item.productId} not found`);
      if (product.stock < quantity) {
        throw new BadRequestError(
          `Insufficient stock. Requested: ${quantity}, Available: ${product.stock}`
        );
      }

      item.quantity = quantity;
      await item.save();

      return this.getCart(userId);
    }

    // ─── Remove Item ───────────────────────────────────────────
    async removeItem(userId, itemId) {
      const cart = await this.cartRepo.findOrCreateCart(userId);
      const deleted = await this.cartItemRepo.removeFromCart(cart.id, itemId);
      if (!deleted) throw new NotFoundError('Cart item not found');
      return this.getCart(userId);
    }

    // ─── Checkout ──────────────────────────────────────────────
    async checkout(userId, { shippingAddress, paymentMethod }) {
      const cart = await this.cartRepo.model.findOne({
        where: { userId },
        include: [{ model: require('../models/CartItem'), as: 'items' }],
      });

      if (!cart || !cart.items || cart.items.length === 0) {
        throw new BadRequestError('Cart is empty');
      }

      const transaction = await db.sequelize.transaction();
      try {
        const orderItems = [];

        for (const cartItem of cart.items) {
          // Lock the product row — prevents race conditions
          const product = await Product.findByPk(cartItem.productId, {
            lock: transaction.LOCK.UPDATE,
            transaction,
          });

          if (!product) {
            throw new NotFoundError(`Product ${cartItem.productId} no longer exists`);
          }

          if (product.stock < cartItem.quantity) {
            throw new BadRequestError(
              `"${product.name}" is out of stock. Only ${product.stock} available.`
            );
          }

          // Deduct stock
          await product.decrement('stock', { by: cartItem.quantity, transaction });

          orderItems.push({
            productId: product.id,
            quantity: cartItem.quantity,
            priceAtPurchase: product.price, // current price
          });
        }

        // In real app: create Order & OrderItems here
        // await Order.create({ userId, total, shippingAddress, paymentMethod, status: 'pending' }, { transaction });

        // Clear cart
        await this.cartItemRepo.model.destroy({
          where: { cartId: cart.id },
          transaction,
        });

        await transaction.commit();

        return {
          success: true,
          message: 'Checkout successful',
          items: orderItems,
          // orderId: order.id,
        };
      } catch (err) {
        await transaction.rollback();
        throw err;
      }
    }

    // ─── Helpers ───────────────────────────────────────────────
    _calculateTotals(items) {
      let totalPrice = 0;
      let totalItems = 0;
      const outOfStockItems = [];

      for (const item of items) {
        totalPrice += item.priceAtAdd * item.quantity;
        totalItems += item.quantity;
        if (item.product && item.product.stock < item.quantity) {
          outOfStockItems.push(item.product.name);
        }
      }

      return {
        totalPrice: Math.round(totalPrice * 100) / 100,
        totalItems,
        outOfStockItems,
      };
    }

    _emptyCartResponse() {
      return {
        cartId: null,
        items: [],
        totalPrice: 0,
        totalItems: 0,
        outOfStockItems: [],
      };
    }
  }

  module.exports = CartService;