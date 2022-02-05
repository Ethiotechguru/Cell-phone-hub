const http = require('http');
const fs = require('fs');

const express = require('express');
const {urlencoded} = require('body-parser');

const adminRouter = require('./router/admin');
const shopRouter = require('./router/shop');
const notFondRouter = require('./router/error');

const app = express();

app.use(urlencoded({extended:false}));

app.use("/admin", adminRouter);
app.use(shopRouter)

app.use(notFondRouter);

// console.log(__dirname);

app.listen(3000, () => {
    
});