
const Product= require('../models/product')
const User = require('../models/user')
const postAddProduct = (req, res, next) => {
	const {title,price,desc,imgUrl} = req.body;
	User.findByPk(req.user.id)
		.then((user) => {
			return user.createProduct({
				title: title,
				price: price,
				description: desc,
				imgUrl: imgUrl,
			});
		})
		.then((result) => {
			res.redirect("/");
		}).catch(err=>{
			console.log(err)
		})
};
const postEditProduct = (req, res, next) => {
	const id = req.body.prodId;
	const { title, price, desc,imgUrl} = req.body;
	Product.findByPk(id)
		.then((product) => {
			product.title = title;
			product.price = price;
			product.description = desc;
			product.imgUrl = imgUrl;
			return product.save();
		})
		.then(() => {
			res.redirect("/");
		})
		.catch((err) => {
			console.log(err);
		});
};
const postDeleteProduct = (req, res, next)=>{
	const id = req.body.cartItem;
	Product.findByPk(id).then(product=>{
		return product.destroy();
	}).then(()=>{
		res.redirect('/admin-product');
	}).catch(err=>{
		console.log(err);
	})
}
const getAddProduct = (req, res, next) => {
	res.render("edit-product.ejs", {
		pageTitle: "Add Product",
		path: "/add-product",
		editMode:false,
	});
};
const getAdminProducts = (req, res, next)=>{
	Product.findAll().then((products) =>{
		res.render("adminProducts.ejs", {
			products: products,
			pageTitle: "Admin Products",
			path: "/admin-product",
		});
	}).catch(err=>{
		console.log(err)
	});
	
}
const getEditProduct = (req, res, next) => {
	let id = req.params.prodId;
	let editing = req.query.edit;
	Product.findByPk(id).then(product=>{
		res.render("edit-product.ejs", {
			pageTitle: "Add Product",
			path: "/add-product",
			editMode: editing,
			product: product,
		});
	})
	
};

module.exports.postAddProduct = postAddProduct;
module.exports.getAddProduct = getAddProduct;
module.exports.getEditProduct = getEditProduct;
module.exports.getAdminProducts = getAdminProducts;
module.exports.postEditProduct = postEditProduct;
module.exports.postDeleteProduct = postDeleteProduct;

	