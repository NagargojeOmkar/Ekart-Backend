const express = require('express');
const { productController} = require('../../controllers/product_controller');
const router = express.Router();

router.post('/Products', productController);

module.exports = router;