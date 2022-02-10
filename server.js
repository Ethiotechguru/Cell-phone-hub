
const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');

const adminRouter = require('./router/admin');
const shopRouter = require('./router/shop');
const notFondRouter = require('./router/error');

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "views");



app.use(shopRouter.router);
app.use(adminRouter.router);

app.use(notFondRouter);


app.listen(3001, (err) => {
    console.log(err)
});