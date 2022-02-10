const {Product} = require('../models/product');
const {Cart} = require('../models/cart');

exports.getShopController = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render("./shop.ejs", {
			products: products,
			pageTitle: "Shop",
			path: "/shop",
		});
	});
};

exports.cartController = (req, res, next)=>{
	Cart.getCartItems(cartItems=>{
		console.log(cartItems)
		res.render("./cart.ejs", {
			pageTitle: "Cart",
			path: "/cart",
			cartItems: cartItems,
		});
	})
}
exports.getProductDetail = (req, res, next) => {
	let id = req.params.prodId;
	Product.findById(id, (product) => {
		res.render("detail.ejs", {
			product: product,
			pageTitle: product.prodName,
			path: "/x",
		});
	});
};
exports.postCartController = (req,res,next)=>{
	const id = req.body.cartItem;
	Product.findById(id, (product)=>{
		Cart.addProduct(id,product)
		res.redirect('/')
	})
}

exports.allProducts = (req,res,next)=>{
	Product.fetchAll((products)=>{
		res.render("./products.ejs", {
			pageTitle: "Products",
			path: "/products",
			products: products,
		});
	});
}

