
const express = require('express');
const router = express.Router();
const prodCon = require("../controller/shopController");


router.post("/cart", prodCon.postCartController);
router.get("/products/:prodId", prodCon.getProductDetail);
router.get("/products", prodCon.allProducts);
router.get("/cart", prodCon.getCart);
router.post("/delete-cart", prodCon.postDeleteCart);
router.get("/", prodCon.getShopController);
router.get('/orders', prodCon.getOrder);
router.post("/create-order",prodCon.postOrders);

module.exports.router = router;