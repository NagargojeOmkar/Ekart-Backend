  const db = require('../config/db_config');

  const User     = require('./user');
  const Product  = require('./product');
  const Category = require('./category');
  const Brand    = require('./brand');
  const Cart     = require('./cart');
  const CartItem = require('./CartItem');

  // ── Existing associations ──────────────────────────────────────
  Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
  Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });

  // ── User ↔ Cart (1:1) ────────────────────────────────────────
  User.hasOne(Cart, { foreignKey: 'userId', onDelete: 'CASCADE' });
  Cart.belongsTo(User, { foreignKey: 'userId' });

  // ── Cart ↔ CartItem (1:N) ───────────────────────────────────
  Cart.hasMany(CartItem, { foreignKey: 'cartId', onDelete: 'CASCADE', as: 'items' });
  CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

  // ── CartItem → Product (N:1) ────────────────────────────────
  CartItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

  module.exports = { User, Product, Category, Brand, Cart, CartItem };