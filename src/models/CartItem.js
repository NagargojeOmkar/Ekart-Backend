const db = require('../config/db_config');
const DataTypes = db.Sequelize.DataTypes;

const CartItem = db.sequelize.define('CartItem', {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: { min: 1 },
  },

  priceAtAdd: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }

}, {
  tableName: 'cart_items',
  timestamps: true,
});

module.exports = CartItem;