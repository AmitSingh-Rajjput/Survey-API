var express = require("express")
var router = express.Router()
const {check} = require('express-validator')
const {signout,signup,signin,isSignedIn} = require("../controller/auth")


router.post("/signup",[
    check("name","Name Should be atleast 3 charater").isLength({min:3}),
    check("email","Email is required").isEmail(),
    check("password","Password should atleast 3 charater").isLength({min:3}),
],signup)

router.post("/signin",[
    check("email","Email is required").isEmail(),
    check("password","Password filed is required").isLength({min:3}),
],signin)

router.get("/signout",signout)

module.exports = router