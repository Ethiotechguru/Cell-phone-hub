const Sequelize = require("sequelize");

const sequelize = require("../db/database");

const CartItem = sequelize.define('cartItem',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    quantity:{
        type:Sequelize.INTEGER,
        allowNull:false,
    }
});

module.exports = CartItem;