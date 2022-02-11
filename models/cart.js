const fs = require("fs");
const path = require("path");

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
};
exports.Cart = Cart;
// const fs = require('fs');
// const path = require('path');

// const cartPath = path.join(__dirname, '..', 'data', 'carts.json');

// class Cart {
// 	static addProduct(id, product) {
// 		console.log(product)
// 		fs.readFile(cartPath,(err, data)=>{
//             let cartItems = [];
//             if(err){
//                 cartItems.push({
// 					id: id,
//                     quantity:1,
// 				});
//                 fs.writeFile(cartPath, JSON.stringify(cartItems), (err) => {
// 					if(err){
// 						console.log(err)
// 					}
// 				});
//             }else{
//                 cartItems = JSON.parse(data);
//                 console.log(cartItems)
//                 let idx = cartItems.findIndex((p) => p.id === id);
//                 if(idx !== -1){
//                     cartItems[idx].quantity = cartItems[idx].quantity + 1;
//                     fs.writeFileSync(cartPath, JSON.stringify(cartItems), (err) => {
// 						console.log(err);
// 					});
//                 }else{
//                     cartItems.push({
// 						id: id,
// 						price: product.price,
// 						prodName: product.prodName,
// 						quantity: 1,
// 					});
//                     fs.writeFileSync(cartPath, JSON.stringify(cartItems), (err) => {
// 						console.log(err);
// 					});
//                 }
//             }
//         })
// 	}
//     static getCartItems(cb){
//         fs.readFile(cartPath, (err, data)=>{
//             if(!err){
//                 const items = JSON.parse(data);
//                 cb(items)
//             }else{
//                 cb([])
//             }
//         })
//     }
// }

// exports.Cart = Cart;
