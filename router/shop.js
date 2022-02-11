
const express = require('express');
const router = express.Router();
const prodCon = require("../controller/shopController");


router.post("/cart", prodCon.postCartController);
router.get("/products/:prodId", prodCon.getProductDetail);
router.get("/products", prodCon.allProducts);
router.get("/cart", prodCon.getCart);

router.get("/", prodCon.getShopController);

module.exports.router = router;