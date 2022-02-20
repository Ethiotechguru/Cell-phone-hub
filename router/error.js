const path = require('path')
const express = require("express");

const router = express.Router();

router.use('/:parm',(req,res)=>{
	res.status(404).render("./error.ejs", {
		pageTitle: "No Found",
		path: "Error",
	});
})

module.exports = router;