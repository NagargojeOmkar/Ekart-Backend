  const db = require('../config/db_config');

  const User     = require('./user');
  const Product  = require('./product');
  const Category = require('./category');
  const Brand    = require('./brand');
  const Cart     = require('./cart');
  const CartItem = require('./CartItem');
  const Order    = require('./Order');
  const OrderItem = require('./OrderItem'); 


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

    User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
  Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  // ── Order ↔ OrderItem (1:N) ──
  Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'orderItems' });
  OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

  // ── OrderItem → Product (N:1) ──
  OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

  module.exports = { User, Product, Category, Brand, Cart, CartItem, Order, OrderItem };

