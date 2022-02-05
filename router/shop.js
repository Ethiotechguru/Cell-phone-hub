
const express = require('express');

const shopController = require('../controller/shopController')

const router = express.Router();

router.get("/", shopController.getShopController);


module.exports = router;