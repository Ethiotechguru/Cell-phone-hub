const express = require('express');
const adminController = require('../controller/adminController')
const router = express.Router();

router.post("/add-product", adminController.postAddProduct);
router.get("/add-product",adminController.getAddProduct);

exports.router =router;
