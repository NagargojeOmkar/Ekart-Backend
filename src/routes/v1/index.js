const express = require('express');
const pingRoutes = require('./v1/ping_router');
const productRoutes = require('./v1/product_router');

const v1Router = express.Router();
v1Router.use('/ping', pingRoutes);
v1Router.use('/products', productRoutes);

module.exports = v1Router;