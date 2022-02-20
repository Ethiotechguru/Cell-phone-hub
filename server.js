
const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const mongoConnection = require("./db/mongBase").mongoConnection;
const getDb = require("./db/mongBase").getDb;
const adminRouter = require('./router/admin');
const shopRouter = require('./router/shop');
const notFondRouter = require('./router/error');

const User = require('./models/user');
const Product = require('./models/product');
const CartItem = require('./models/cart-item');
const Cart = require('./models/cart');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');
const { ObjectId } = require('mongodb');

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use((req, res, next) => {
// 	const db = getDb();
// 	console.log(req.user);
// 	if (!req.user) {
// 		db
// 			.collection("users")
// 			.insertOne({ email: "email@email.com", name: "sam" })
// 			.then((user) => {
// 				console.log(user)
// 				req.user = { email: "email@email.com", name: "sam" };
// 			});
// 	}
// 	next()

// });
app.set("view engine", "ejs");
app.set("views", "views");

app.use((req,res,next)=>{
	User.findById(new ObjectId("621206b8801d8a682947ef98"))
	.then(user=>{
		req.user = new User(user.name, user.email, user.cart, user.order, user._id);
		next()
	})
})
app.use((req,res,next)=>{
	let user = req.user;
	if(!user){
		return res.render('error.ejs',{
			pageTitle:'Not Found',
			path:'lslfj'
		});
	}
	next();
})
app.use(shopRouter.router);
app.use(adminRouter.router);
app.use(notFondRouter);



mongoConnection()
	.then((client) => {
		app.listen(3001, () => {
			console.log("mongodb is connected and app is listening");
		});
	}).catch(err=>{
		console.log(err)
	})