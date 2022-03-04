const User = require("../models/user")

exports.getLogInPage = (req,res,next)=>{
    const isLoggedIn = req.session.isLoggedIn;
    res.render("auth/login", {
		pageTitle: "Log In",
		path: "login",
		isAuthenticated: isLoggedIn,
	});
}
exports.postLongIn = (req,res, next)=>{
	let email = req.body.email;
	let password = req.body.email;
	//"621dbe50362e7faf6281340b"
	//{email:email, password:password}//"email@email.com"
	User.findOne({email:email})
		.then((user) => {
            if(!user){
                return res.redirect("/");
            }
			req.session.isLoggedIn = true;
			req.session.user = user;
            req.session.save((err)=>{
                if(err){
                    console.log(err)
                }
                res.redirect("/");
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