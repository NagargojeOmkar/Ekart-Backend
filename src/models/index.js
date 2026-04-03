// src/models/index.js


const Category = require('./category');
  const Brand = require('./brand');
  const Product = require('./product');
  const User = require('./user');
  const Cart = require('./cart');
  const CartItem = require('./CartItem');
  const Order = require('./Order');
  const OrderItem = require('./OrderItem');

  // 🔥 THIS LINE TRIGGERS ALL ASSOCIATIONS
  require('./association');

  module.exports = {
    Category,
    Brand,
    Product,
    User,
    Cart,
    CartItem,
    Order,
    OrderItem
  };
