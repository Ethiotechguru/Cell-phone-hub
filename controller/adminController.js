
const ObjectId = require('mongodb').ObjectId
const Product= require('../models/product')
// const User = require('../models/user')
const postAddProduct = (req, res, next) => {
	const {title,price,desc,imgUrl} = req.body;
	let product = new Product({
		title: title,
		price: price,
		description: desc,
		imgUrl: imgUrl,
		userId: req.user,
		images: [],
	});
	product.save()
	res.redirect("/add-product");
};

const getAddProduct = (req, res, next) => {
	const isLoggedIn = req.session.isLoggedIn;
	res.render("edit-product.ejs", {
		pageTitle: "Add Product",
		path: "/add-product",
		editMode: false,
		isAuthenticated: isLoggedIn,
		user: req.session.user,
	});
};

const postEditProduct = (req, res, next) => {
	const id = req.body.prodId.trim();
	let prodId = new ObjectId(id)
	const { title, price, desc,imgUrl} = req.body;
	Product.findById(prodId)
		.then(product=>{
			product.title = title;
			product.price = price;
			product.description = desc;
			product.imgUrl = imgUrl;
			return product.save()
		})
		.then((product) => {
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
		const isLoggedIn = req.session.isLoggedIn;
		res.render("edit-product.ejs", {
			pageTitle: "Add Product",
			path: "/add-product",
			editMode: editing,
			product: product,
			isAuthenticated: isLoggedIn,
			user: req.session.user,
		});
	});
};

const postDeleteProduct = (req, res, next)=>{
	const id = req.body.cartItem.trim();
	const prodId = new ObjectId(id)
	Product.findByIdAndDelete(prodId)
		.then((products) => {
			res.redirect("/admin-product");
		})
		.catch((err) => {
			console.log(err);
		});
}


const getAdminProducts = (req, res, next)=>{
	// if(!req.session.isLoggedIn){
	// 	return res.redirect('/login')
	// }
	Product.find({ userId: req.user._id})
		.then((products) => {
			const isLoggedIn = req.session.isLoggedIn;
			res.render("adminProducts.ejs", {
				products: products,
				pageTitle: "Admin Products",
				path: "/admin-product",
				isAuthenticated: isLoggedIn,
				user: req.session.user,
			});
		})
		.catch((err) => {
			console.log(err);
		});
}



module.exports.postAddProduct = postAddProduct;
module.exports.getAddProduct = getAddProduct;
module.exports.getEditProduct = getEditProduct;
module.exports.getAdminProducts = getAdminProducts;
module.exports.postEditProduct = postEditProduct;
module.exports.postDeleteProduct = postDeleteProduct;