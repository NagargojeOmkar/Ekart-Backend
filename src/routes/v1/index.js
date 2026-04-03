// src/routes/v1/index.js

const express = require('express');
const productRoutes = require('./product_router');
const categoryRouter = require('./category_router');
const pingRoutes = require('./ping_Router');
const brandRoutes = require('./brand_router');
const authRouter = require('./auth_router');
const userRouter = require('./user_router');
const cartRouter = require('./cart_router');
const { v1 } = require('firebase-admin/firestore');
const orderRouter = require('./order_router');

const v1Router = express.Router();
v1Router.use('/ping', pingRoutes);
v1Router.use('/products', productRoutes);
v1Router.use('/categories', categoryRouter);
v1Router.use('/brands', brandRoutes);
v1Router.use(authRouter);
v1Router.use(userRouter);
v1Router.use('/cart', cartRouter);
v1Router.use('/orders', orderRouter);

module.exports = v1Router;