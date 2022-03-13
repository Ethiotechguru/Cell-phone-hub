const User = require("../models/user")
const bcrypt = require('bcryptjs');
const { ObjectId } = require("mongodb");
exports.getSignUp = (req,res, next)=>{
	if (req.session.isLoggedIn) {
		return res.redirect("/");
	}
    res.render("auth/signUp.ejs", {
		pageTitle: "Sign Up",
		path: "/signup",
		message: req.message,
		isAuthenticated: false,
		user: req.session.user,
	});
}
exports.postSignUp = (req, res, next) => {
	
    const {email,password, confirmPassword} =req.body;
    console.log(email, password, confirmPassword)
    if(password !== confirmPassword){
        console.log("no match")
        return res.redirect("/login");
    }
    User.findOne({email:email}).then(userDoc=>{
		console.log(userDoc)
        if (userDoc) {
            console.log(userDoc)
			return res.redirect("/signup");
		}
        return bcrypt
			.hash(password, 12)
			.then((hashPassword) => {
				const user = new User({
					email: email,
					password: hashPassword,
					cart: {
						items: [],
					},
				});
				return user.save();
			})
			.then((result) => {
				res.redirect("/login");
			});
    }).catch(err=>{
        console.log(err)
    })
	
};
exports.getLogInPage = (req,res,next)=>{
    const isLoggedIn = req.session.isLoggedIn;
	if(isLoggedIn){
		return res.redirect('/')
	}
    res.render("auth/login", {
		pageTitle: "Log In",
		path: "login",
		isAuthenticated: isLoggedIn,
		user: req.session.user,
	});
}
exports.postLongIn = (req,res, next)=>{
	let email = req.body.email;
	let password = req.body.password;
	//"621dbe50362e7faf6281340b"
	//{email:email, password:password}//"email@email.com"
	// setTimeout(() => {
	// 	res.redirect('/')
	// }, 3000);
	// res.redirect('/')
	User.findOne({email:email})
		.then((user) => {
            if(!user){
                return res.redirect("/");
            }
            bcrypt.compare(password, user.password).then(doMatch=>{
                console.log(doMatch);
                if (doMatch){
                    req.session.isLoggedIn = true;
					req.session.user = user;
					return req.session.save((err) => {
						if (err) {
							console.log(err);
						}
						res.redirect("/");
					});
                }
                res.redirect('/login')
            })
			
		})
		.catch((err) => {
			console.log(err);
            
		});
}
exports.postLogOut = (req, res, next)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
        }
        res.redirect("/");
    });
    
}