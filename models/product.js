
const Sequelize = require('sequelize');
const sequelize = require("../db/database");
const Product = sequelize.define("product", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	price: {
		type: Sequelize.DOUBLE,
		allowNull: false,
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	imgUrl: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

module.exports = Product;











// const db = require('../db/database')
// class Product {
// 	constructor(id,title, price, desc, imgUrl) {
//         this.id = id;
// 		this.title = title;
// 		this.price = price;
// 		this.description = desc;
// 		this.imgUrl = imgUrl;
// 	}
// 	save(){
// 		return db.execute(
// 			"INSERT INTO products (title, price, description, imgUrl) VALUES(?,?,?,?)",
// 			[this.title, this.price, this.description, this.imgUrl]
// 		);
// 	}
// 	static fetchAll(cb) {
// 		return db.execute('SELECT * FROM products')
// 	}
// 	static findById(id) {
// 		return db.execute("SELECT * FROM products WHERE products.idnew_table = ?",[id]);
// 	}
// 	static deleteOne(id, cb) {
		
// 	}
// }
// module.exports= {
//     Product:Product,
// }





