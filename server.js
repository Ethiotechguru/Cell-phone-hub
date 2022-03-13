
const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session')
const cookieParser = require("cookie-parser");
const csrf = require('csurf');
//*SESSION
const MongoDBStore = require('connect-mongodb-session')(session);

const adminRouter = require('./router/admin');
const shopRouter = require('./router/shop');
const authRouter = require('./router/logIn')
const notFondRouter = require('./router/error');
const User = require('./models/user');
require('dotenv').config();

const connectionString = process.env.URL;
//*SESSION STOR MONGO-DB-SESSION CONNECTION
const store = new MongoDBStore({
	uri:connectionString,
	collection:'sessions',
});
const app = express();
const csrfProtection = csrf();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

//*SESSION
app.use(
	session({
		secret: "my secret",
		resave: false,
		saveUninitialized: false,
		store: store,
	})
);

//*Cross Site Request Forgery Protection
app.use(csrfProtection);

app.use((req,res,next)=>{
	if(!req.session.user){
		return next()
	}
	User.findById(req.session.user._id)
		.then((user) => {
			req.user = user;
			next();
		})
		.catch((err) => {
			console.log(err);
		});

});
app.use(authRouter.router);
app.use(shopRouter.router);
app.use(adminRouter.router);
app.use(notFondRouter);
mongoose
	.connect(connectionString)
	.then(results => {
		app.listen(3001, () => {
			console.log("listening on port 3001")
		});
	})
	.catch((err) => console.log(err));
