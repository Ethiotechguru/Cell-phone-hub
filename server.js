
const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const adminRouter = require('./router/admin');
const shopRouter = require('./router/shop');
const notFondRouter = require('./router/error');
const User = require('./models/user');

require('dotenv').config();
const connectionString = process.env.URL;

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req,res,next)=>{
	User.findById("621dbe50362e7faf6281340b").then((user) => {
		req.user = user;
		next();
	});
});

app.use(shopRouter.router);
app.use(adminRouter.router);
app.use(notFondRouter);

mongoose
	.connect(connectionString)
	.then((result) => {
		return User.findOne().then((user) => {
			if (!user) {
				const user = new User({
					name: "Sam",
					email: "email@email.com",
					cart: {
						items: [],
					}
				});
				return user.save();
			} else {
				return user;
			}
		});
	})
	.then(() => {
		app.listen(3001, () => {
			console.log("Connected");
		});
	})
	.catch((err) => console.log(err));

