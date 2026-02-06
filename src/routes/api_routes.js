const express = require('express');

const pingRoutes = require('./v1/ping_router');
const productRoutes = require('./v1/product_router');

const router = express.Router();
router.use('/v1', pingRoutes);
router.use('/v1', productRoutes);   

module.exports = router;

