const express = require("express");
const authController = require('../controller/auth')
const router = express.Router();

router.get("/login", authController.getLogInPage);

router.post("/login", authController.postLongIn);

router.post("/logout", authController.postLogOut);

router.get('/signup', authController.getSignUp);
router.post("/signup", authController.postSignUp);

module.exports.router = router;
