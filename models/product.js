
const mongodb = require('mongodb');
const getDb = require('../db/mongBase').getDb
class Product {
	constructor(title, price, description, imgUrl, userId) {
		this.title = title;
		this.price = price;
		this.description = description;
		this.imgUrl = imgUrl;
		this.userId = userId;
	}
	save() {
		const db = getDb();
		db.collection("products")
			.insertOne(this)
			.then((product) => {
				console.log(product);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	static fetchAll() {
		const db = getDb();
		return db
			.collection("products")
			.find()
			.toArray()
			.then((products) => {
				return products;
			})
			.catch((err) => {
				console.log(err);
			});
	}
	static findById(id) {
		const db = getDb();
		return db
			.collection("products")
			.findOne({ _id: id })
			.then((product) => {
				return product;
			})
			.catch((err) => {
				console.log(err);
			});
	}
	static deleteById(id) {
		const db = getDb();
		return db
			.collection("products")
			.deleteOne({ _id: id })
			.then(() => {
				console.log("One product is deleted");
			})
			.catch((err) => {
				console.log(err);
			});
	}
	static updateProduct(id, title, price, description, imgUrl) {
		const db = getDb();
		return db
			.collection("products")
			.updateOne(
				{ _id: id },
				{ $set: { title:title, price:price, description:description, imgUrl:imgUrl } }
			)
			.then((prod) => {
				console.log('product is updated')
			})
			.catch((err) => {
				console.log(err);
			});
	}
}


module.exports = Product;

