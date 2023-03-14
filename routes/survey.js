const express = require("express");

const router = express.Router();

const {createSurvey,getAllSurvey,getSurveyById,updateSurvey,deleteSurvey,getSurvey} = require("../controller/survey")
const { getUserById } = require("../controller/user");
const { isAuthenticated,isAdmin,isSignedIn } = require("../controller/auth");
const {getCategoryById} = require("../controller/category");


//params
router.param("userId",getUserById);
router.param("surveyId",getSurveyById)
router.param("categoryId",getCategoryById)



//Routes 
router.post("/survey/createSurvey/:userId",isSignedIn,isAuthenticated,isAdmin,createSurvey)

router.get("/survey/:surveyId",isSignedIn,isAuthenticated,getSurvey)

router.get("/survey/getAllSurveys/:categoryId",getAllSurvey)

router.put("/survey/updateSurvey/:userId/:surveyId",isSignedIn,isAuthenticated,isAdmin,updateSurvey)

router.delete("/survey/deleteSurvey/:userId/:surveyId",isSignedIn,isAuthenticated,isAdmin,deleteSurvey)

module.exports = router