const fs = require("fs");
const path = require("path");
const { Product } = require("./product");

const p = path.join(__dirname, '..', 'data', 'carts.json');

class Cart {
	static addProduct(id) {
		fs.readFile(p, (err, fileContent) => {
			let cart = [];
			if (!err) {
				cart = JSON.parse(fileContent)
			}
			const idx = cart.findIndex((prod) => prod.id === id);
			let updatedProduct;
			if (idx !== -1) {
				cart[idx].qty = cart[idx].qty + 1;
			} else {
				updatedProduct = {
					id: id,
					qty: 1,
				};
				cart = [...cart, updatedProduct];
			}
			fs.writeFile(p, JSON.stringify(cart), (err) => {
				console.log(err);
			});
		});
	}
    static getCartItems(cb){
        fs.readFile(p, (err, data)=>{
            if(!err){
                const items = JSON.parse(data);
                cb(items)
            }else{
                cb([])
            }
        })
    }
	static deleteCartItem(id,cb){
		this.getCartItems(items=>{
			const cartProds = items.filter(item=>item.id.trim() !== id.trim());
			fs.writeFile(p, JSON.stringify(cartProds), (err) => {
				if (err) {
					console.log(err);
				}
			});
			cb();
		})
	}
};
exports.Cart = Cart;