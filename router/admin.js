const express = require('express');
const isValidUser = require("../middleware/authMiddleware");
const {
	postAddProduct,
	getAddProduct,
	getEditProduct,
	getAdminProducts,
	postEditProduct,
	postDeleteProduct,
} = require("../controller/adminController");
const router = express.Router();
router.get("/edit-product/:prodId", isValidUser, getEditProduct);
router.post("/add-product", isValidUser, postAddProduct);
router.post("/edit-product", postEditProduct);
router.get("/add-product", isValidUser, getAddProduct);
router.get("/admin-product", isValidUser, getAdminProducts);
router.post("/delete-admin-product", isValidUser, postDeleteProduct);


module.exports.router =router;

