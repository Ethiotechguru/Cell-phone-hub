const Product = require('../models/product');
const ObjectId = require('mongodb').ObjectId;
const Order = require('../models/order');


exports.getShopController = (req, res, next) => {
	Product.find().then((products) => {
		const isLoggedIn = req.session.isLoggedIn;
		res.render("./shop.ejs", {
			products: products,
			pageTitle: "Shop",
			path: "/shop",
			isAuthenticated: isLoggedIn,
			user:req.session.user,
			csrfToken:req.csrfToken(),
		});
	});
};

exports.getProductDetail = (req, res, next) => {
	let id = req.params.prodId;
	let prodId = new ObjectId(id);
	Product.findById(prodId)
		.then((product) => {
			const isLoggedIn = req.session.isLoggedIn;
			res.render("./detail.ejs", {
				product: product,
				pageTitle: product.title,
				path: "/products",
				isAuthenticated: isLoggedIn,
				user: req.session.user,
			});
		})
		.catch((err) => console.log(err));
};
exports.postCartController = (req,res,next)=>{
	const prodId = req.body.cartItem.trim();
	const id = new ObjectId(prodId);
	// let curProdId = { prodId:prodId, quantity: 1 };;
	// console.log(curProdId)
	// curProdId = JSON.stringify(curProdId);
	// console.log(curProdId)
	// let prodIds = [curProdId];
	// prodIds = prodIds.toString();
	// if (!req.session.user) {
		// const { cookies } = req;
		// console.log(cookies.prodIds.split(','));
		// prodIds.push(cookies.prodIds);
		// if (cookies.prodIds){
		// 	prodIds.push(cookies.prodIds)
		// }
		// console.log(cookies.prodIds);
		// res.setHeader("Set-Cookie", `prodIds=${prodIds}`);
		// return res.redirect("/login");
	// }
	Product.findById(id)
		.then((product) => {
			req.user.addToCart(product);
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
			// if(!req.session.isLoggedIn){
				// const { cookies } = req;
				// console.log(cookies.prodIds.split(','));
				// console.log(JSON.parse(cookies.prodIds.split(",")));
				// let guestCartProdIds = [];
				// if (cookies.prodIds) {
				// 	let p = cookies.prodIds.split(",")
				// 	console.log(JSON.parse(cookies.prodIds.split(',')))
				// 	// guestCartProdIds = p.map(e=>{
				// 	// 	return JSON.parse(e)
				// 	// });
				// }
				// console.log(guestCartProdIds);
				// return res.redirect("/login");
				// return Product.find({_id:{$in:guestCartProdIds}})
				// .then(products=>{
				// 	let subTotal = products.reduce((a, b)=>a+b.price, 0)
				// 	res.render("guestCheckOut.ejs", {
				// 		cartItems: products,
				// 		pageTitle: "Guest Checkout",
				// 		path: "/cart",
				// 		subTotal: subTotal.toFixed(2),
				// 		isAuthenticated: false,
				// 		user: req.session.user,
				// 	});
				// }).catch(err=>{
				// 	console.log(err)
				// })
			// }
			return req.user.populate("cart.items.productId")
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
					const isLoggedIn = req.session.isLoggedIn;
					res.render("cart.ejs", {
						cartItems: cartItems,
						pageTitle: "Cart",
						path: "/cart",
						subTotal: subTotal.toFixed(2),
						isAuthenticated: isLoggedIn,
						user: req.session.user,
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
					email: req.user.email,
					userId: req.user,
				},
			});
			req.user.cart = {items:[]}
			req.user.save();
			return order.save()
		})
		.then((result) => {
			res.redirect("/");
		})
		.catch((err) => {
			console.log(err);
		})
} 
exports.getOrder = (req, res, next)=>{
		Order.find({'user.userId':req.session.user._id})
		.then(orders=>{
			return orders
		})
		.then(orderItems => {
			const isLoggedIn = req.session.isLoggedIn;
			res.render("./orders.ejs", {
				pageTitle: "Orders",
				path: "/orders",
				orderItems: orderItems,
				isAuthenticated: isLoggedIn,
				user: req.session.user,
			});
		})
		.catch((err) => {
			console.log(err);
		});
}
exports.allProducts = (req,res,next)=>{
	const isLoggedIn = req.session.isLoggedIn;
	Product.find().then(prods=>{
		res.render("./products.ejs", {
			pageTitle: "Products",
			path: "/products",
			products: prods,
			isAuthenticated: isLoggedIn,
			user: req.session.user,
		});
	}).catch(err=>{
		console.log(err)
	})
}
