const mongoose = require("mongoose")
const crypto = require("crypto")
const uuidv1 = require("uuid/v1");

var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    lastname:{
        type:String,
        maxlength:32,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    userinfo:{
        type:String,
        trim:true
    },
    totalNumberExperience:{
        type:Number,
        trim:true
    },
    post:{
        type:String,
        trim:true
    },
    city:{
        type:String,
        trim:true
    },
    gender:{
        type:String,
        trim:true
    },
    encry_password: {
       type:String,
       required:true
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    completedSurvey:{
        type:Array,
        default:[]
    }

},{timestamps:true })

userSchema.virtual("password")
        .set(function(password){
            // _password is a private field 
            this._password = password
            this.salt = uuidv1()
            this.encry_password = this.securePassword(password)
        })
        .get(
            function(){
                return this._password
            }
        )

userSchema.methods = {
    
    // To check the password is matched or not
    autheticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password
    },

    securePassword: function(plainpassword){
        if(!plainpassword) return "";
        try {
           // Use for encrypt the plainpassword by using crypto and using unique salt 
           return crypto.createHmac('sha256',this.salt)
           .update(plainpassword)
           .digest('hex')
        } catch (err) {
            return "";
        }
    }
}

module.exports = mongoose.model("User",userSchema)