// src/repositories/cart_item_repository.js


  const BaseRepository = require('./base_repository');
  const CartItem = require('../models/CartItem');

  class CartItemRepository extends BaseRepository {
    constructor() {
      super(CartItem);
    }

    async findByCartAndProduct(cartId, productId) {
      return this.model.findOne({ where: { cartId, productId } });
    }

    async findAllByCart(cartId) {
      return this.model.findAll({ where: { cartId } });
    }

    async removeFromCart(cartId, itemId) {
      return this.model.destroy({
        where: { id: itemId, cartId }, // ownership check built-in
      });
    }
  }

  module.exports = CartItemRepository;