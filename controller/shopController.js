const {Product} = require('../models/product');
const {Cart} = require('../models/cart');
const cartItemHelper = require('../utility/cartItemList')

exports.getShopController = (req, res, next) => {
	Product.fetchAll().then(([products]) => {
		res.render("./shop.ejs", {
			products: products,
			pageTitle: "Shop",
			path: "/shop",
		});
	});
};

exports.getProductDetail = (req, res, next) => {
	let id = req.params.prodId;
	Product.findById(id).then(([product])=>{
		res.render("./detail.ejs", {
			product: product[0],
			pageTitle: product[0].title,
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
	Product.fetchAll().then(prods=>{
		res.render("./products.ejs", {
			pageTitle: "Products",
			path: "/products",
			products: prods[0],
		});
	}).catch(err=>{
		console.log(err)
	})
}

