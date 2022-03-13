
const express = require('express');
const isValidUser = require('../middleware/authMiddleware')
const router = express.Router();
const prodCon = require("../controller/shopController");


router.post("/cart", isValidUser, prodCon.postCartController);
router.get("/products/:prodId", prodCon.getProductDetail);
router.get("/products", prodCon.allProducts);
router.get("/cart", isValidUser, prodCon.getCart);
router.post("/delete-cart",isValidUser, prodCon.postDeleteCart);
router.get("/", prodCon.getShopController);
router.get('/orders',isValidUser, prodCon.getOrder);
router.post("/create-order",isValidUser, prodCon.postOrders);

module.exports.router = router;