const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser')

// router.use(bodyParser.urlencoded({ extended: false }));
router.post("/add-product", (req, res, next) => {
	console.log(req.body);
	const { title } = req.body;
	console.log(title);
	res.redirect("/");
});

router.get("/add-product", (req, res, next) => {
	console.log(req.method);
	res.sendFile(path.join(__dirname,'..','views', 'add-product.html'));
});
module.exports = router;