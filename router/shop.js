
const express = require('express');

const {
	getShopController,
	cartController,
	allProducts,
} = require("../controller/shopController");

const router = express.Router();

router.get("/", getShopController);
router.get("/cart", cartController);
router.get("/products", allProducts);

module.exports = router;