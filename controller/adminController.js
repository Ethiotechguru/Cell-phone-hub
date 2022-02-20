
const ObjectId = require('mongodb').ObjectId
const Product= require('../models/product')
// const User = require('../models/user')
const postAddProduct = (req, res, next) => {
	const {title,price,desc,imgUrl} = req.body;
	const userId = req.user._id;
	let product = new Product(title, price, desc, imgUrl, userId);
	product.save()
	res.redirect("/admin-product");
};

const getAddProduct = (req, res, next) => {
	res.render("edit-product.ejs", {
		pageTitle: "Add Product",
		path: "/add-product",
		editMode: false,
	});
};

const postEditProduct = (req, res, next) => {
	const id = req.body.prodId.trim();
	let prodId = new ObjectId(id)
	const { title, price, desc,imgUrl} = req.body;
	Product.updateProduct(prodId, title, price, desc, imgUrl)
		.then(() => {
			res.redirect("/");
		})
		.catch((err) => {
			console.log(err);
		});
};

const getEditProduct = (req, res, next) => {
	let id = req.params.prodId;
	let prodId = new ObjectId(id);
	let editing = req.query.edit;
	Product.findById(prodId).then((product) => {
		res.render("edit-product.ejs", {
			pageTitle: "Add Product",
			path: "/add-product",
			editMode: editing,
			product: product,
		});
	});
};

const postDeleteProduct = (req, res, next)=>{
	const id = req.body.cartItem.trim();
	const prodId = new ObjectId(id)
	Product.deleteById(prodId)
		.then((products) => {
			res.redirect("/admin-product");
		})
		.catch((err) => {
			console.log(err);
		});
}

const getAdminProducts = (req, res, next)=>{
	Product.fetchAll().then((products) =>{
		res.render("adminProducts.ejs", {
			products: products,
			pageTitle: "Admin Products",
			path: "/admin-product",
		});
	}).catch(err=>{
		console.log(err)
	});
}

module.exports.postAddProduct = postAddProduct;
module.exports.getAddProduct = getAddProduct;
module.exports.getEditProduct = getEditProduct;
module.exports.getAdminProducts = getAdminProducts;
module.exports.postEditProduct = postEditProduct;
module.exports.postDeleteProduct = postDeleteProduct;