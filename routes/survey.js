const express = require("express");

const router = express.Router();

const {createSurvey,getAllSurvey,getSurveyById,updateSurvey,deleteSurvey} = require("../controller/survey")
const { getUserById } = require("../controller/user");
const { isAuthenticated,isAdmin,isSignedIn } = require("../controller/auth");

//params
router.param("userId",getUserById);
router.param("surveyId",getSurveyById)


//Routes 
router.post("/survey/createSurvey/:userId",isSignedIn,isAuthenticated,isAdmin,createSurvey)

router.get("/survey/getAllSurveys",getAllSurvey)

router.put("/survey/updateSurvey/:userId/:surveyId",isSignedIn,isAuthenticated,isAdmin,updateSurvey)

router.delete("/survey/deleteSurvey/:userId/:surveyId",isSignedIn,isAuthenticated,isAdmin,deleteSurvey)

module.exports = router