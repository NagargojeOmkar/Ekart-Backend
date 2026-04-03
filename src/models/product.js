const db = require('../config/db_config');
const DataTypes = db.Sequelize.DataTypes;

const Product = db.sequelize.define('Product', {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  description: {
    type: DataTypes.STRING,
    allowNull: false
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  brandId: {   // 🔥 added (optional but useful)
    type: DataTypes.INTEGER,
    allowNull: true
  }

}, {
  tableName: 'products',
  timestamps: true
});

module.exports = Product;