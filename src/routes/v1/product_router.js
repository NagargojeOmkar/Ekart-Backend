const express = require('express');
const { productController} = require('../../controllers/product_controller');
const router = express.Router();

const {
  validateCreateProduct,
  validateUpdateProduct
} = require('../../middleware/product_mid');

router.post('/Products', productController);

module.exports = router;