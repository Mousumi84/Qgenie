import { deleteAssessment, fetchAllAssessments, fetchAssessmentById } from "../../Models/TeacherModels/AssessmentModel.js";

const createAssessmentController = async (req,res) => {
    let { title, template, description, status, publishedAt, totalMarks, questions, questionType, question, marks, negativeMarks, hints, explanation} = req.body;
    let { sampleAnswer, sampleOptions} = req.body;

    try {
        let data = await saveAssessment({title, template, description, status, publishedAt, totalMarks, questions, questionType, question, marks, negativeMarks, hints, explanation, sampleAnswer, sampleOptions});

        return res.send({
            status: 200,
            message: "Assessment created successfully",
        })
    } catch (error) {
        return res.send({
            status: 500,
            message: "Internal server error",
            error: error,
        })
    }
}

const createAssessmentusingAIController = async (req,res) => {
    try {


        return res.send({
            status: 200,
            message: "",
        })
    } catch (error) {
        return res.send({
            status: 500,
            message: "Internal server error",
            error: error,
        })
    }
}

const editAssessmentController = async (req,res) => {
    try {


        return res.send({
            status: 200,
            message: "",
        })
    } catch (error) {
        return res.send({
            status: 500,
            message: "Internal server error",
            error: error,
        })
    }
}

const getAllAssessmentController = async (req,res) => {
    try {
        let data = await fetchAllAssessments();

        return res.send({
            status: 200,
            message: "Data fetched",
            data: data,
        })
    } catch (error) {
        return res.send({
            status: 500,
            message: "Internal server error",
            error: error,
        })
    }
}

const getAssessmentByIdController = async (req,res) => {
    let id = req.params.id;

    try {
        let data = await fetchAssessmentById({id});

        return res.send({
            status: 200,
            message: "Data fetched",
            data: data,
        })
    } catch (error) {
        return res.send({
            status: 500,
            message: "Internal server error",
            error: error,
        })
    }
}

const deleteAssessmentController = async (req,res) => {
    let id = req.params.id;

    try {
        let data = await deleteAssessment({id});

        return res.send({
            status: 200,
            message: "Assessment deleted successfully",
        })
    } catch (error) {
        return res.send({
            status: 500,
            message: "Internal server error",
            error: error,
        })
    }
}

export { createAssessmentController, createAssessmentusingAIController, editAssessmentController, getAllAssessmentController, getAssessmentByIdController, deleteAssessmentController};