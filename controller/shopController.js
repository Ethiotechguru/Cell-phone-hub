// const adminData = require('./adminController')
// const helperFunc = require('../public/mobileNav')
const {Product} = require('../models/product');
module.exports.getShopController = (req, res, next) => {
	Product.fetchAll((products)=>{
		res.render("./shop.ejs", {
			prods: products,
			pageTitle: "Shop",
			path: "/",
		});
	});
};

module.exports.cartController = (req, res, next)=>{
	res.render("./cart.ejs", {
		pageTitle: "Cart",
		path: "/cart",
	});
}

module.exports.allProducts = (req,res,next)=>{
	Product.fetchAll((products) => {
		res.render("./products.ejs", {
			pageTitle: "Products",
			path: "/products",
			products:products,
		});
	});
}