const sequalize = require('sequelize');
const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = require("./serverConfig");

const sequelize = new sequalize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql'
}); 

module.exports = sequelize; 