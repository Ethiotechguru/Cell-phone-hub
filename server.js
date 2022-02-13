
const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const adminRouter = require('./router/admin');
const shopRouter = require('./router/shop');
const notFondRouter = require('./router/error');
const sequelize = require('./db/database');
const User = require('./models/user');
const Product = require('./models/product');
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
app.use(shopRouter.router);
app.use(adminRouter.router);

app.use(notFondRouter);

Product.belongsTo(User,{constraint:true, onDelete:'CASCADE'});
User.hasMany(Product)
sequelize
	.sync()
	.then((result) => {
		return User.findByPk(1);
	})
	.then((user) => {
		if (!user) {
			return User.create({
				email: "samyethio@gmail.com",
				name: "samule",
			});
		}
		return user;
	})
	.then((user) => {
		app.listen(3001);
	}).catch(err=>{
        console.log(err)
    })
