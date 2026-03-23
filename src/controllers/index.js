const express = require('express')
const brandController = require('./brand_controller');
const categoryController = require('./category_controller');
const pingController = require('./ping_controller');
const productController = require('./product_controller');
const userController = require('./user_controller');

const router = express.Router();

module.exports = {
    brandController,
    categoryController,
    pingController,
    productController,
    userController
}