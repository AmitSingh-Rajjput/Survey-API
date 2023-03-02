const express = require("express");
const router = express.Router();

const { getCategoryById,createCategory,getCategory,getAllCategory,updateCategory,removeCategory } = require("../controller/category");
const { getUserById} = require("../controller/user");
const { isAuthenticated,isAdmin,isSignedIn } = require("../controller/auth");

router.param("userId",getUserById);
router.param("categoryId",getCategoryById);

//actual routers goes here
//It is used for cretae new collection or category
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory);

//Read routes
router.get("/category/:categoryId",getCategory);
router.get("/categories",getAllCategory);

//update routes
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory);

//delete
router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,removeCategory);


module.exports = router;