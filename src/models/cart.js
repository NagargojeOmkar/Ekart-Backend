const db = require('../config/db_config');
const DataTypes = db.Sequelize.DataTypes;

const Cart = db.sequelize.define('Cart', {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  }

}, {
  tableName: 'carts',
  timestamps: true,
});

module.exports = Cart;