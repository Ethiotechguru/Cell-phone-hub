const path = require('path')
const express = require('express');

const router = express.Router();

router.get("/", (req, res, next) => {
	console.log("this is the first app get func");
	res.sendFile(path.join(__dirname,'../', 'views','shop.html'));
});


module.exports = router;