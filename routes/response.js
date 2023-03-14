const express = require("express");

const router = express.Router();

const {saveResponse,getResponseById,getUserResponse} = require("../controller/response")
const { getUserById,pushSurveyInResponseList } = require("../controller/user");
const {getSurveyById} = require("../controller/survey")
const { isAuthenticated,isAdmin,isSignedIn } = require("../controller/auth");
const {getCategoryById} = require("../controller/category");

//params
router.param("userId",getUserById);
router.param("surveyId",getSurveyById)
router.param("categoryId",getCategoryById)
router.param("responseId",getResponseById)

//Routes 
router.post("/saveResponse/:userId/:surveyId",isSignedIn,isAuthenticated,pushSurveyInResponseList,saveResponse)

router.get("/viewResponse/:surveyId/:responseId/:userId",isSignedIn,isAuthenticated,isAdmin,getUserResponse)


module.exports = router