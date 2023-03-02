const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema;

var questionSchema = new mongoose.Schema({
    question_statment: {
        type: String,
        required: true
    },
    question_type: {
        type:String,
        required:true
    },
    question_options: {
        type:Array,
        default:[]
    }
}, {timestamps:true})

const QuestionSchema = mongoose.model("QuestionSchema", questionSchema);

var surveySchema = new mongoose.Schema({
    survey_name: {
        type:String,
        required:true,
    },
    survey_category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    questions:[questionSchema],
},{timestamps:true})

const Survey = mongoose.model("Survey", surveySchema);

module.exports = { QuestionSchema, Survey };
