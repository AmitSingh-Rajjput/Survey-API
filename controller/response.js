
const { ResponseSchema, ResponsesSchema } = require("../models/response")
const {Survey,QuestionSchema} = require("../models/survey")

exports.getResponseById = (req, res, next, id) => {
    ResponsesSchema.findById(id).exec((err, response) => {
      if (err) {
        return res.status(400).json({
          error: "Category not found in DB"
        });
      }
      req.response = response;
      next();
    });
  };

exports.saveResponse =(req,res) => {
    const responses = new ResponsesSchema(req.body)
    responses.save((err,survey) => {
        if(err) {
            return res.status(400).json({
                error:"Somethng went wrong in saving survey"
            })
        }
        res.json({
            message:"Survey saved Succesfully."
        })
    })
}

exports.getUserResponse = (req,res)=> {
    var surId = req.params.surveyId
    var response = req.response
    Survey.findById(surId).populate("questions")
    .exec((err, questions) => {
        if(err) {
            return res.status(400).json({
                error:"Didn't get the questions"
            })
        }
        return res.status(200).json({
            response,
            questions:questions.questions
        })
    });
}