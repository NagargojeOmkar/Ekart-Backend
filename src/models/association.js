const products = require('./products');
const categories = require('./categories');

products.belongsTo(categories, { foreignKey: 'categoryId', as: 'category' });

categories.hasMany(products, { foreignKey: 'categoryId', as: 'products' });

module.exports = {
  product: products,
  category: categories
};

