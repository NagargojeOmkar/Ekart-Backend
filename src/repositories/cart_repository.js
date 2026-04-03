// src/repositories/cart_repository.js

  const BaseRepository = require('./base_repository');
  const { Cart, CartItem, Product } = require('../models');

  class CartRepository extends BaseRepository {
    constructor() {
      super(Cart);
    }

    async getCartWithItems(userId) {
      const cart = await this.model.findOne({
        where: { userId },
        include: [{
          model: CartItem,
          as: 'items',
          include: [{
            model: Product,
            as: 'product',
            attributes: ['id', 'name', 'price', 'stock'],
          }],
        }],
      });
      return cart;
    }

    // findOrCreate in one hit
    async findOrCreateCart(userId) {
      const [cart] = await Cart.findOrCreate({
        where: { userId },
        defaults: { userId },
      });
      return cart;
    }
  }

  module.exports = CartRepository;