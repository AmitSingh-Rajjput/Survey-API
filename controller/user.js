const User = require("../models/user")
const { ResponseSchema, ResponsesSchema } = require("../models/response")
const nodemailer = require("nodemailer");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "No user was found in DB"
        });
      }
      req.profile = user;
      next();
    });
  };
  
  exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
  };

  exports.getAllUsers = (req,res) => {
    User.find().exec((err,users)=>{
        if(err || !users){
            return res.status(400).json({
                error:"No user Found"
            })
        }
        res.json(users)
    })
  }

  exports.updateUser = (req,res) => {
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true,useFindAndModify:false},
        (err,user) => {
            if(err){
                return res.status(400).json({
                    error:"You are not authorized"
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user)
        }
    )
  }

  exports.userSurveyList = (req, res) => {
    ResponsesSchema.find({ user_Id: req.profile._id })
      .populate("survey_Id","_id survey_name survey_category")
      .exec((err, surveys) => {
        if (err) {
          return res.status(400).json({
            error: "No Surveys in this account"
          });
        }
        return res.json(surveys);
      });
  };

  exports.pushSurveyInResponseList = (req, res, next) => {
    // req.body.products.forEach(product => {
    //   purchases.push({
    //     _id: product._id,
    //     name: product.name,
    //     description: product.description,
    //     category: product.category,
    //     quantity: product.quantity,
    //     amount: req.body.order.amount,
    //     transaction_id: req.body.order.transaction_id
    //   });
    // });
  
    //store thi in DB
    User.findOneAndUpdate(
      { _id: req.profile._id },
      { $push: { completedSurvey: req.body.survey_Id } },
      { new: true },
      (err, survey) => {
        if (err) {
          return res.status(400).json({
            error: "Unable to save survey list"
          });
        }
        next();
      }
    );
  };

  exports.filterUser = (req,res) => {
    var gender = req.body.gender
    var exp = req.body.totalNumberExperience
    var city = req.body.city
    var post = req.body.post

    User.aggregate([
      {
        $match:{
          $and: [
              {gender:{$in: gender}},
              {totalNumberExperience:{$in:exp}},
              {city:{$in: city}},
              {post:{$in:post}}
          ]
        }
      }
    ]).exec((err,users) => {
      if(err){
        return res.status(400).json({
          error:"No user list found"
        })
      }

      res.send(users)
    })
  }
  

  exports.sendEmail = async (req,res) => {
    var customerList = req.body.userList
    var surveyId = req.body.surveyId

    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'testingsurvey00@gmail.com',
      pass: 'unskacnzbkaezlnd'
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Survey Mind" <infoSurveyMind@example.com>', // sender address
    to: customerList, // list of receivers
    subject: "Hello Survey Coming Test mail", // Subject line
    text: "Hello All. Please fill this survey link", // plain text body
    html: "<a>www.google.com</a>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  res.json({
    mssg:"Email Sent Successfully!"
  })

  }