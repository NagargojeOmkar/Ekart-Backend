// src/routes/api_routes.js
const express = require('express');

const pingRoutes = require('./v1/ping_router');
const productRoutes = require('./v1/product_router');
const userRoutes = require('./v1/user_router')
const authRoutes = require('./v1/auth_router');

const router = express.Router();
router.use('/v1', pingRoutes);
router.use('/v1', productRoutes);   
router.use('/v1', userRoutes);
router.use('/v1', authRoutes);

module.exports = router;

