const User = require("../models/user")
const {check, validationResult} = require('express-validator')
var jwt= require('jsonwebtoken')
var expressJwt = require('express-jwt')


exports.signup = (req,res) => {
    
    const errors= validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }

    const user = new User(req.body)
    user.save((err,user) => {
        if(err) {
            return res.status(400).json({
                err:"Not able to save user in DB"
            })
        }
        res.json({
            name:user.name,
            email:user.email,
            id:user._id
        })
    })
}

exports.signin =(req,res) => {
    const {email,password} = req.body;
    const errors= validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }

    User.findOne({email},(err,user) => {
        if(err || !user){
            return res.status(400).json({
                error:"User doesn't exist"
            })
        }

        if(!user.autheticate(password)){
            return res.status(401).json({
                error:"Email and Password not matched"
            })
        }

        // create token by using user id 
        const token =jwt.sign({_id:user._id},process.env.SECRET)

        //put token in cookies
        res.cookie("token",token,{expire:new Date () + 99});

        //send response to frontend 
        const {_id,name,email,role} = user
        return res.json({token,user:{_id,name,email,role}})
        

    })

}


exports.signout = (req,res) => {
    res.clearCookie("token")
    return res.json({
        message:"User Signout Successfully"
    })
}

//protected Routes 
//check for token only 
exports.isSignedIn = expressJwt({
    secret:process.env.SECRET,
    userProperty:"auth"
});


//custom middleware
//To check if it is login or not 
exports.isAuthenticated = (req,res,next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error:"ACCESS DENIED"
        })
    }
    next();
}

//To check if it is Admin or not
exports.isAdmin= (req,res,next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error:"You are not ADMIN,Access Denied"
        })
    }
    next();
}



