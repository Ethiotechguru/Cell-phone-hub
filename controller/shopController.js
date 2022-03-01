const Product = require('../models/product');
const ObjectId = require('mongodb').ObjectId;
const Order = require('../models/order');


exports.getShopController = (req, res, next) => {
	Product.find().then((products) => {
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
	Product.findById(id)
		.then((product) => {
			return req.user.addToCart(product)
		})
		.then((cart) => {
			res.redirect("/");
		})
		.catch((err) => console.log(err));
}
exports.postDeleteCart = (req, res,next)=>{
	const itemId = req.body.deleteCartItem;
	return req.user.deleteCartItem(itemId)
	.then((result) => {
		res.redirect('/cart')
	}).catch(err=>{
		console.log(err)
	})
}
exports.getCart = (req,res,next)=>{
			req.user.populate("cart.items.productId")
				.then((user) => {
					return user.cart.items;
				})
				.then((cartItems) => {
					let subTotal = 0;
					if (cartItems.length > 0) {
						subTotal = cartItems.reduce((a, b) => {
							return a + +b.productId.price * b.quantity;
						}, 0);
					}
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
	return req.user
		.populate("cart.items.productId")
		.then((user) => {
			const products = user.cart.items.map(item=>{
				return {product:{...item.productId._doc}, quantity:item.quantity}
			})
			const order = new Order({
				products: products,
				timeStamp:Date.now(),
				user: {
					name: req.user.name,
					userId: req.user,
				},
			});
			req.user.cart = {items:[]}
			req.user.save();
			return order.save()
		})
		.then((result) => {
			console.log(result,'is result')
			res.redirect("/");
		})
		.catch((err) => {
			console.log(err);
		})
} 
exports.getOrder = (req, res, next)=>{
		Order.find()
		.then(orders=>{
			return orders
		})
		.then(orderItems => {
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
	Product.find().then(prods=>{
		res.render("./products.ejs", {
			pageTitle: "Products",
			path: "/products",
			products: prods,
		});
	}).catch(err=>{
		console.log(err)
	})
}
