const express = require("express");
const router = express.Router();

const {getUserById,getUser,getAllUsers,updateUser,userSurveyList,sendEmail,filterUser} = require("../controller/user")
const {isSignedIn,isAuthenticated,isAdmin} = require("../controller/auth")

//This is middleware that was called automatically when ever userId param is there.
router.param("userId",getUserById);

router.get("/user/:userId",isSignedIn,isAuthenticated,getUser)
router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser)
router.get("/user/surveyList/:userId",isSignedIn,isAuthenticated,userSurveyList)
router.get("/user/userList/:userId",isSignedIn,isAuthenticated,filterUser)
router.get("/sendEmail",sendEmail)


router.get("/users",getAllUsers)
module.exports = router;