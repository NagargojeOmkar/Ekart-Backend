// src/routes/v1/index.js

const express = require('express');
const productRoutes = require('./product_router');
const categoryRouter = require('./category_router');
const pingRoutes = require('./ping_Router');
const brandRoutes = require('./brand_router');

const v1Router = express.Router();
v1Router.use('/ping', pingRoutes);
v1Router.use('/products', productRoutes);
v1Router.use('/categories', categoryRouter);
v1Router.use('/brands', brandRoutes);


module.exports = v1Router;