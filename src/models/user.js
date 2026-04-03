const db = require('../config/db_config');
const DataTypes = db.Sequelize.DataTypes;

const User = db.sequelize.define('User', {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
    validate: { isEmail: true },
  },

  mobile: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  provider: {
    type: DataTypes.ENUM('local', 'google', 'mobile', 'firebase'),
    defaultValue: 'local',
  },

  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user',
  }

}, {
  tableName: 'users',
  timestamps: true,
});

module.exports = User;