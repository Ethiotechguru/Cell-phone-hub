const Product = require('../models/product');
const Cart = require('../models/cart');
// const cartItemHelper = require('../utility/cartItemList')

exports.getShopController = (req, res, next) => {
	
	Product.findAll().then((products) => {
		res.render("./shop.ejs", {
			products: products,
			pageTitle: "Shop",
			path: "/shop",
		});
	});
};

exports.getProductDetail = (req, res, next) => {
	let id = req.params.prodId;
	Product.findByPk(id).then((product)=>{
		res.render("./detail.ejs", {
			product: product,
			pageTitle: product.title,
			path: "/products",
		});
	}).catch(err=> console.log(err))
};

exports.postCartController = (req,res,next)=>{
	const prodId = req.body.cartItem;
	let product;
	let newQuantity = 1;
	let fetchedCart;
	req.user.getCart()
	.then(cart=>{
		fetchedCart = cart;
		return cart.getProducts({where:{id:prodId}})
	}).then(products=>{
		if(products.length>0){
			product = products[0];
		}
		if(product){
			const oldQuantity = product.cartItem.quantity;
			newQuantity = oldQuantity + 1;
			return product;
		}
		return Product.findByPk(prodId)
	}).then(product=>{
		return fetchedCart.addProduct(product, {
			through: { quantity: newQuantity },
		});
	}).then((cart)=>{
		res.redirect('/cart');
	}).catch(err=>console.log(err))
}
exports.postDeleteCart = (req, res,next)=>{
	const itemId = req.body.deleteCart;
	req.user.getCart()
	.then(cart=>{
		return cart.getProducts({where:{id:itemId}})
	}).then(products=>{
		let product = products[0]

		return product.cartItem.destroy();
	}).then(result=>{
		res.redirect("/cart");
	})
	.catch(err=>{
		console.log(err)
	})
	
}
exports.getCart = (req,res,next)=>{
	req.user
		.getCart()
		.then((cart) => {
			if(cart){
				return cart.getProducts();
			}
			return [];
		})
		.then((cartItems) => {
			const subTotal = cartItems.reduce((a, b)=> a+(+b.price * +b.cartItem.quantity),0);
			res.render("cart.ejs", {
				cartItems: cartItems,
				path: "/cart",
				pageTitle: "Cart",
				subTotal :subTotal.toFixed(2),
			});
		}).catch(err=>{
			console.log(err)
		})
}
exports.postOrders = (req, res, next) => {
	let fetchedCart;
	req.user.getCart().then(cart=>{
		fetchedCart = cart;
		return cart.getProducts();
	})
	.then(products=>{
		return req.user.createOrder()
		.then(order=>{
			return order.addProducts(products.map(product=>{
				product.orderItem = { quantity: product.cartItem.quantity };
				return product;
			}));
		})
	}).then(prods=>{
		return fetchedCart.setProducts(null);
	}).then(results=>{
		res.redirect("/cart");
	})
};
exports.getOrder = (req, res, next)=>{
	req.user.getOrders({include:['products']})
	.then(orders=>{
		res.render("./orders.ejs", {
			pageTitle: "Orders",
			path: "/orders",
			orderItems: orders,
		});
	}).catch(err=>{
		console.log(err)
	})
	
}
exports.allProducts = (req,res,next)=>{
	Product.findAll().then(prods=>{
		res.render("./products.ejs", {
			pageTitle: "Products",
			path: "/products",
			products: prods,
		});
	}).catch(err=>{
		console.log(err)
	})
}

