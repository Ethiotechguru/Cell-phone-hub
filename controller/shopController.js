const adminData = require('./adminController')

const getShopController = (req, res, next) => {
	const products = adminData.data;
	res.render("./shop.pug", { prods: products, pageTitle: "Shop", path: "/" });
};

exports.getShopController = getShopController;