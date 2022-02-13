
const {Product}= require('../models/product')
const postAddProduct = (req, res, next) => {
	console.log(req.body)
	const {title,price,desc,imgUrl} = req.body;
	let prod = new Product(null,title, price, desc, imgUrl);
	prod.save().then(()=>{
		res.redirect("/");
	}).catch(err=>{
		console.log(err)
	})
	
};
const postEditProduct = (req, res, next) => {
	const id = req.body.prodId;
	const { title, price, desc,imgUrl} = req.body;
	let prod = new Product(id, title, price, desc, imgUrl);
	prod.save();
	res.redirect("/");
};
const postDeleteProduct = (req, res, next)=>{
	const id = req.body.cartItem;
	Product.deleteOne(id,(arg)=>{
		if(arg){
			res.render("/unable.ejs", {
				products: arg,
				pageTitle: "Unable to delete",
				path: "/admin-product",
			});
		}else{
			res.redirect("/admin-product");
		}
		
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
	Product.fetchAll().then(([products]) =>{
		products.forEach((prod) => console.log(typeof prod.idnew_table));
		res.render("adminProducts.ejs", {
			products: products,
			pageTitle: "Admin Products",
			path: "/admin-product",
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
module.exports.postDeleteProduct = postDeleteProduct;

	