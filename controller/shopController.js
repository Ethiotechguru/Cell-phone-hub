const Product = require('../models/product');
const {Cart} = require('../models/cart');
const cartItemHelper = require('../utility/cartItemList')

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
	const id = req.body.cartItem;
	Product.findById(id, (product)=>{
		Cart.addProduct(id,product)
		res.redirect("/");
	})
}
exports.postDeleteCart = (req, res,next)=>{
	const id = req.body.deleteCart;
	Cart.deleteCartItem(id, ()=>{
		return res.redirect('/cart')
	});
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

