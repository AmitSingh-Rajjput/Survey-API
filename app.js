require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors =require("cors")

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const surveyRoutes = require("./routes/survey")
const categoryRoutes = require("./routes/category");


const app = express();

//DB connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true

}).then(() => {
    console.log("DB Connected");
}).catch((err) => {
    console.log("DB gots OOPS");
});

//Use middle ware configurationto use that 
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())


//My Routes
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",surveyRoutes)
app.use("/api",categoryRoutes)





//PORT
const port = process.env.PORT || 8000;

//Application Starts
app.listen(port, ()=> {
    console.log(`app is running in ${port}`);
});