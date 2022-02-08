const path = require('path')
const express = require("express");

const router = express.Router();

router.use('/',(req,res)=>{
    res.status(404).render('./error.ejs',{pageTitle:'No Found'})
})

module.exports = router;