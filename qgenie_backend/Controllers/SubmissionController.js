import { fetchAssessmentAllSubmissionById, fetchStudentAllSubmissionById, submitAssessment } from "../Models/SubmissionModel.js";

const submitAssessmentController = async (req,res) => {
    let record = req.body;
    console.log("Submit Records =>",record);

    try {
        let data = await submitAssessment({record});

        return res.send({
            status: 200,
            message: "Assessment Submitted successfully",
            data: data
        })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                status: 409,
                message: "You have already submitted this assessment."
            });
        }

        return res.send({
            status: error.status || 500,
            message: error.message || "Internal server error",
        })
    }
}

const getStudentAllSubmissionController = async (req,res) => {
    console.log("id",req)
    let id = req.params.id;
    
    try {
        let data = await fetchStudentAllSubmissionById({id});

        return res.send({
            status: 200,
            message: "Data fetched",
            data: data,
        })
    } catch (error) {
        return res.send({
            status: error.status || 500,
            message: error.message || "Internal server error",
        })
    }
}

const getAssessmentAllSubmissionController = async (req,res) => {
    console.log("id",req)
    let id = req.params.id;

    try {
        let data = await fetchAssessmentAllSubmissionById({id});

        return res.send({
            status: 200,
            message: "Data fetched",
            data: data,
        })
    } catch (error) {
        return res.send({
            status: error.status || 500,
            message: error.message || "Internal server error",
        })
    }
}

export { submitAssessmentController, getStudentAllSubmissionController, getAssessmentAllSubmissionController };