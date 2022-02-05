const path = require('path')
const express = require('express');

const adminData = require('./admin');

const router = express.Router();

router.get("/", (req, res, next) => {
	const products = adminData.data;
    console.log(products);
	res.render("./shop.pug", { prods: products, docTitle:'Shop'});
});


module.exports = router;