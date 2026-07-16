import { deleteAssessment, editAssessment, fetchAllAssessments, fetchAssessmentById, saveAssessment, updateStatusAssessment } from "../../Models/TeacherModels/AssessmentModel.js";

const createAssessmentController = async (req,res) => {
    // console.log("create assessment", req.body);
    let AssObj = req.body;

    try {
        let data = await saveAssessment({AssObj});

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
    // console.log("Edit Assessment",req.params.id,req.body);
    let id = req.params.id;
    let assessmentInput = req.body;

    try {
        const data = await editAssessment({id, assessmentInput});
        return res.send({
            status: 200,
            message: `Update assessment successfully`,
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

const updateAssessmentStatusController = async (req,res) => {
    console.log("Edit Assessment Status",req.params.id,req.body);
    let id = req.params.id;
    let {status, publishedAt} = req.body;

    try {
        const data = await updateStatusAssessment({id, status, publishedAt});
        return res.send({
            status: 200,
            message: `Updated assessment status successfully`,
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
    console.log("Delete assessment:", id);

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

export { createAssessmentController, createAssessmentusingAIController, editAssessmentController, updateAssessmentStatusController, getAllAssessmentController, getAssessmentByIdController, deleteAssessmentController};