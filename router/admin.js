const express = require('express');
const {
	postAddProduct,
	getAddProduct,
} = require("../controller/adminController");
const router = express.Router();

router.post("/add-product", postAddProduct);
router.get("/add-product", getAddProduct);

module.exports.router =router;

