
const path = require('path')
const express = require('express');
const {urlencoded} = require('body-parser');

const adminRouter = require('./router/admin');
const shopRouter = require('./router/shop');
const notFondRouter = require('./router/error');

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(urlencoded({extended:false}));
console.log(path.join(__dirname, "public"));

app.use("/admin", adminRouter.router);
app.use(shopRouter)

app.use('/',notFondRouter);

// console.log(__dirname);

app.listen(3001, () => {
    
});