const express = require('express');
const path = require('path');
const router = express.Router();

const data = [];

router.post("/add-product", (req, res, next) => {
    let prodName = req.body.title;
    let price = req.body.price;
    let desc = req.body.desc;
    // let iUrl = req.body.image;
	data.push({ prodName, price, desc });
	res.redirect("/");
});

router.get("/add-product", (req, res, next) => {
	console.log(req.method);
	res.render("./add-product.pug", { pageTitle: "Add Product", path:'/add-product' });
});
exports.router =router;
exports.data = data;
