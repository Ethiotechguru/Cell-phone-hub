const { getDb } = require('../db/mongBase');
const Product = require('../models/product');
const ObjectId = require('mongodb').ObjectId;
const User = require('../models/user')
// const Cart = require('../models/cart');
// const cartItemHelper = require('../utility/cartItemList')

exports.getShopController = (req, res, next) => {
	
	Product.fetchAll().then((products) => {
		res.render("./shop.ejs", {
			products: products,
			pageTitle: "Shop",
			path: "/shop",
		});
	});
};

exports.getProductDetail = (req, res, next) => {
	let id = req.params.prodId;
	let prodId = new ObjectId(id);
	Product.findById(prodId)
		.then((product) => {
			res.render("./detail.ejs", {
				product: product,
				pageTitle: product.title,
				path: "/products",
			});
		})
		.catch((err) => console.log(err));
};

exports.postCartController = (req,res,next)=>{
	const prodId = req.body.cartItem.trim();
	const id = new ObjectId(prodId)
	const db = getDb();
	db.collection("products")
		.findOne({ _id: id })
		.then(product=>{
			
			req.user.addToCart(product)
		})
		.then((cart) => {
			res.redirect("/cart");
		})
		.catch((err) => console.log(err));
}
// exports.postDeleteCart = (req, res,next)=>{
// 	const itemId = req.body.deleteCart;
// 	req.user.getCart()
// 	.then(cart=>{
// 		return cart.getProducts({where:{id:itemId}})
// 	}).then(products=>{
// 		let product = products[0]

// 		return product.cartItem.destroy();
// 	}).then(result=>{
// 		res.redirect("/cart");
// 	})
// 	.catch(err=>{
// 		console.log(err)
// 	})
	
// }
exports.getCart = (req,res,next)=>{
	const userId = req.user._id
	User.findById(userId)
		.then((user) => {
			return user.cart.items;
		}).then(cartItems=>{
			const subTotal = cartItems.reduce((a, b) => {
				return a + (+b.price * b.quantity)
			},0);

			res.render("cart.ejs", {
				cartItems: cartItems,
				path: "/cart",
				pageTitle: "Cart",
				subTotal: subTotal.toFixed(2),
			});
		})
		.catch((err) => {
			console.log(err);
		});
}
exports.postOrders = (req, res, next) => {
	const userId = req.user._id
	console.log(userId)
	req.user.checkOut().then(user=>{
		console.log("product ordered")
	}).then(results=>{
		res.redirect("/cart");
	}).catch(err=>{
		console.log(err)
	})
}

exports.getOrder = (req, res, next)=>{
	req.user
		.getOrders()
		.then(user=>{
			return user.order.orderItems
		})
		.then(orderItems => {
			console.log(orderItems)
			res.render("./orders.ejs", {
				pageTitle: "Orders",
				path: "/orders",
				orderItems: orderItems,
			});
		})
		.catch((err) => {
			console.log(err);
		});
	
}
exports.allProducts = (req,res,next)=>{
	Product.fetchAll().then(prods=>{
		res.render("./products.ejs", {
			pageTitle: "Products",
			path: "/products",
			products: prods,
		});
	}).catch(err=>{
		console.log(err)
	})
}

