const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema;
const {Survey,QuestionSchema} = require("../models/survey")

// const response = new mongoose.Schema({
//     questions:[QuestionSchema],
//     que_response: {
//         type:String,
//         required:true
//     }
// },{timestamp:true})

// const ResponseSchema = mongoose.model("ResponseSchema", response);

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
    questions:[{ type: mongoose.Types.ObjectId, ref: "QuestionSchema" }],
    resposes:{
        type:Array,
        required:true,
        default:[]
    },
},{timestamp:true});

const ResponsesSchema = mongoose.model("ResponsesSchema", responsesSchema);

module.exports = { ResponsesSchema };