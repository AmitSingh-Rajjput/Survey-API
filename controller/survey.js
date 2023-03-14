const {Survey,QuestionSchema} = require("../models/survey")


exports.getSurveyById = (req, res, next, id) => {
    Survey.findById(id).exec((err, survey) => {
      if (err) {
        return res.status(400).json({
          error: "Category not found in DB"
        });
      }
      req.survey = survey;
      next();
    });
  };

  exports.getSurvey = (req, res) => {
    return res.json(req.survey);
  };

exports.createSurvey = (req,res) => {
    const survey = new Survey(req.body)
    survey.save((err,survey) => {
        if(err) {
            return res.status(400).json({
                error:"Somethng went wrong in saving survey"
            })
        }
        res.json({
            message:"Suvery Created Succesfully"
        })
    })
}

exports.getAllSurvey = (req,res) => {
    const category = req.category
    Survey.find({"survey_category":category}).exec((err, survey) => {
        if (err) {
          return res.status(400).json({
            error: "No Survey Found"
          });
        }
        res.json(survey);
      });


}

exports.updateSurvey = (req,res) => {
    Survey.findByIdAndUpdate(
        { _id: req.survey._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, survey) => {
          if (err) {
            return res.status(400).json({
              error: "You are not authorized to update this user"
            });
          }
          res.json(survey);
        }
      );

}

exports.deleteSurvey = (req,res) => {
    const survey = req.survey;

    survey.remove((err, survey) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this category"
      });
    }
    res.json({
      message: "Successfully deleted Survey"
    });
  });
}