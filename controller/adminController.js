
const {Product}= require('../models/product')

const postAddProduct = (req, res, next) => {
	console.log(req.params.prodId)
	const {title,price,desc} = req.body;
	let prod = new Product(null,title, price, desc);
	prod.save();
	res.redirect("/");
};
const postEditProduct = (req, res, next) => {
	const id = req.body.prodId;
	const { title, price, desc } = req.body;
	let prod = new Product(id, title, price, desc);
	prod.save();
	res.redirect("/");
};
const getAddProduct = (req, res, next) => {
	res.render("edit-product.ejs", {
		pageTitle: "Add Product",
		path: "/add-product",
		editMode:false,
	});
};
const getAdminProducts = (req, res, next)=>{
	Product.fetchAll(products=>{
		res.render("adminProducts.ejs", {
			products:products,
			pageTitle:'Admin Products',
			path:'/admin-product'
		});
	});
	
}
const getEditProduct = (req, res, next) => {
	let id = req.params.prodId;
	let editing = req.query.edit;
	Product.fetchAll(products=>{
		Product.findById(id, product=>{
			res.render("edit-product.ejs", {
				pageTitle: "Add Product",
				path: "/add-product",
				editMode: editing,
				product:product,
			});
		})
	})
	
};

module.exports.postAddProduct = postAddProduct;
module.exports.getAddProduct = getAddProduct;
module.exports.getEditProduct = getEditProduct;
module.exports.getAdminProducts = getAdminProducts;
module.exports.postEditProduct = postEditProduct;


	