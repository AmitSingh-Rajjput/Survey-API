const express = require("express");

const router = express.Router();

const {saveResponse } = require("../controller/response")
const { getUserById } = require("../controller/user");
const {getSurveyById} = require("../controller/survey")
const { isAuthenticated,isAdmin,isSignedIn } = require("../controller/auth");
const {getCategoryById} = require("../controller/category");

//params
router.param("userId",getUserById);
router.param("surveyId",getSurveyById)
router.param("categoryId",getCategoryById)

//Routes 
router.post("/saveResponse/:userId/:surveyId",isSignedIn,isAuthenticated,saveResponse)


module.exports = router