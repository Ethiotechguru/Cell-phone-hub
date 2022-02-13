const Sequelize  = require('sequelize');


const sequelize = new Sequelize(
	"nodeComplet",
	"root",
	'Samy@300891',{
		dialect: "mysql",
		host: "localhost",
    }
);
module.exports = sequelize;