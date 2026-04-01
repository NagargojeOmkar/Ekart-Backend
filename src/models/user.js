// src/models/user.js
const { DataTypes } = require('sequelize');
const db = require('../config/db_config');

const User = db.define('User', {
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
    allowNull: true, // null for phone-only users
    validate: {
      isEmail: true,
    },
  },
  mobile: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true, // null for email-only users
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true, // null for Google / OTP users
  },
  provider: {
    type: DataTypes.ENUM('local', 'google', 'mobile', 'firebase'),
    defaultValue: 'local',
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user',
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: true,
});

module.exports = User;