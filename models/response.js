const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema;
const {Survey,QuestionSchema} = require("../models/survey")

const response = new mongoose.Schema({
    questions:{
        type: ObjectId,
        ref: "QuestionSchema",
        required: true
    },
    que_response: {
        type:String,
        required:true
    }
},{timestamp:true})

const ResponseSchema = mongoose.model("ResponseSchema", response);

const responsesSchema = new mongoose.Schema({
    user_Id: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    survey_Id:{
        type: ObjectId,
        ref: "Survey",
        required: true
    },
    resposes:[response],
},{timestamp:true});

const ResponsesSchema = mongoose.model("ResponsesSchema", responsesSchema);

module.exports = { ResponseSchema, ResponsesSchema };