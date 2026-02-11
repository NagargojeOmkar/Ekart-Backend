const categoryMiddleware = require('./category_middleware');
const productMiddleware = require('./product_middleware');

module.exports = {
    ...categoryMiddleware,
    ...productMiddleware
};