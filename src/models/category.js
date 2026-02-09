const db = require("../config/db_config");

const Category = db.define("category", {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },  
    name: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    desciption: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
});