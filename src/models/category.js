const db = require("../config/db_config");
const DataTypes = db.Sequelize.DataTypes;

const Category = db.sequelize.define("Category", {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  description: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, {
  tableName: "categories",
  timestamps: true
});

module.exports = Category;