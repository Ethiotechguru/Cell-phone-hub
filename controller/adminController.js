
const data = [];

const postAddProduct = (req, res, next) => {
	const {title,price,desc} = req.body;
	data.push({ prodName:title, price, desc });
	res.redirect("/");
};
const getAddProduct = (req, res, next) => {
	res.render("./add-product.ejs", {
		pageTitle: "Add Product",
		path: "/add-product",
	});
};

exports.postAddProduct = postAddProduct;
exports.getAddProduct = getAddProduct;

exports.data = data;
	