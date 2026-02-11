// src/models/brand.js

const db = require('../config/db_config');

const Brand = db.define('brand', {
  id: {
    type: db.Sequelize.INTEGER, 
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: db.Sequelize.STRING,  
    allowNull: false
  },
  description: {
    type: db.Sequelize.STRING,  
    allowNull: false
  }
});

module.exports = Brand;