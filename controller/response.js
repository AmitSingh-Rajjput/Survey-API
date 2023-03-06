
const { ResponseSchema, ResponsesSchema } = require("../models/response")

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

exports.viewResponse = (req,res)=> {

}