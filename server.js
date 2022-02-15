
const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const adminRouter = require('./router/admin');
const shopRouter = require('./router/shop');
const notFondRouter = require('./router/error');
const sequelize = require('./db/database');
const User = require('./models/user');
const Product = require('./models/product');
const CartItem = require('./models/cart-item');
const Cart = require('./models/cart');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "views");

app.use((req,res,next)=>{
    User.findByPk(1).then(user=>{
        req.user = user;
        next();
    }).catch(err=>{
        console.log(err)
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
	next()
})
app.use(shopRouter.router);
app.use(adminRouter.router);

app.use(notFondRouter);

Product.belongsTo(User,{constraint:true, onDelete:'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Product.belongsToMany(Cart,{through:CartItem});
Cart.belongsToMany(Product, {through:CartItem});
User.hasMany(Order);
Order.belongsTo(User);
Product.belongsToMany(Order, {through:OrderItem});
Order.belongsToMany(Product, {through:OrderItem})
sequelize
	// .sync({ force: true })
	.sync()
	.then((result) => {
		return User.findByPk(1);
	})
	.then((user) => {
		if (!user) {
			return User.create({
				email: "nodeComp@email.com",
				name: "myName",
			
			});
		}
		return user;
	})
	.then(user=>{
		user.getCart().then(cart=>{
			if(cart){
				return cart;
			}else{
				return user.createCart();
			}
		})
	})
	.then((cart)=>{
		app.listen(3001);
	})
	.catch((err) => {
		console.log(err);
	});
