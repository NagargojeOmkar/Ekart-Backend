const db = require('../config/db_config');
const DataTypes = db.Sequelize.DataTypes;

const Brand = db.sequelize.define('Brand', {
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
  }
}, {
  tableName: 'brands',
  timestamps: true
});

module.exports = Brand;