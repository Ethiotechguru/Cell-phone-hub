const express = require('express');
const {
	postAddProduct,
	getAddProduct,
	getEditProduct,
	getAdminProducts,
	postEditProduct,
} = require("../controller/adminController");
const router = express.Router();
router.get("/edit-product/:prodId", getEditProduct);
router.post("/add-product", postAddProduct);
router.post("/edit-product", postEditProduct);
router.get("/add-product", getAddProduct);
router.get("/admin-product", getAdminProducts);


module.exports.router =router;

