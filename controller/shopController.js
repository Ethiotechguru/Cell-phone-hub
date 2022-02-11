const {Product} = require('../models/product');
const {Cart} = require('../models/cart');
const cartItemHelper = require('../utility/cartItemList')

exports.getShopController = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render("./shop.ejs", {
			products: products,
			pageTitle: "Shop",
			path: "/shop",
		});
	});
};

exports.getProductDetail = (req, res, next) => {
	let id = req.params.prodId;
	Product.findById(id, product => {
		res.render("./detail.ejs", {
			product: product,
			pageTitle: product.prodName,
			path: "/products",
		});
	});
};

exports.postCartController = (req,res,next)=>{
	const id = req.body.cartItem;
	Product.findById(id, (product)=>{
		Cart.addProduct(id,product)
		res.redirect("/");
	})
}
exports.getCart = (req,res,next)=>{
	Cart.getCartItems((items)=>{
		Product.fetchAll(products=>{
			const cItems = cartItemHelper(items, products);
			res.render("cart.ejs", {
				cartItems: cItems,
				path: "/cart",
				pageTitle: "Cart",
			});
		})
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

