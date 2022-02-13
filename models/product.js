const db = require('../db/database')
class Product {
	constructor(id,title, price, desc, imgUrl) {
        this.id = id;
		this.title = title;
		this.price = price;
		this.description = desc;
		this.imgUrl = imgUrl;
	}
	save(){
		return db.execute(
			"INSERT INTO products (title, price, description, imgUrl) VALUES(?,?,?,?)",
			[this.title, this.price, this.description, this.imgUrl]
		);
	}
	static fetchAll(cb) {
		return db.execute('SELECT * FROM products')
	}
	static findById(id) {
		return db.execute("SELECT * FROM products WHERE products.idnew_table = ?",[id]);
	}
	static deleteOne(id, cb) {
		
	}
}
module.exports= {
    Product:Product,
}





