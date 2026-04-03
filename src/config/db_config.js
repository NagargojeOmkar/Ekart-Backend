// src/config/db_config.js

const { Sequelize } = require('sequelize'); // ✅ correct import
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = require("./serverConfig");

// 🔹 Create instance
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql'
});

// 🔹 Create db object
const db = {};

// 🔥 VERY IMPORTANT
db.Sequelize = Sequelize;   // class (Op, DataTypes, etc.)
db.sequelize = sequelize;   // instance (connection, transactions)

// 🔹 Export full object
module.exports = db;