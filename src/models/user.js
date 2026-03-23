// src/models/user.js

const { DataTypes } = require('sequelize');
const db = require('../config/db_config');

const User = db.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    isEmail: true
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user'
  }

}, {
  tableName: 'users',
  timestamps: true
});

module.exports = User;