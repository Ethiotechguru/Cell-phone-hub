const path = require('path')
const express = require("express");

const router = express.Router();

router.use('/',(req,res)=>{
    res.status(404).sendFile(path.join(__dirname, '../', 'views', 'error.html'))
})

module.exports = router;