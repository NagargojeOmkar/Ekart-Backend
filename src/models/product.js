const db = require('../config/db_config');

const Product = db.define('product', {
  id: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },    
  name: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  description : {
    type: db.Sequelize.STRING,
    allowNull: false
 },
    price: {
    type: db.Sequelize.FLOAT,
    allowNull: false
  },    
    stock: {    
    type: db.Sequelize.INTEGER,
    allowNull: false
  },    
    categoryId: {   
    type: db.Sequelize.INTEGER,
    allowNull: false,
    references: {   
        model: 'categories',    
        key: 'id'
    }
  }
});

module.exports = Product;

    