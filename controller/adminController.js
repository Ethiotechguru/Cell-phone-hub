
const {Product}= require('../models/product')

const postAddProduct = (req, res, next) => {
	const {title,price,desc} = req.body;
	let prod = new Product(title, price, desc);
	prod.save();
	res.redirect("/");
};
const getAddProduct = (req, res, next) => {
	res.render("add-product.ejs", {
		pageTitle: "Add Product",
		path: "/add-product",
	});
};

module.exports.postAddProduct = postAddProduct;
module.exports.getAddProduct = getAddProduct;


	