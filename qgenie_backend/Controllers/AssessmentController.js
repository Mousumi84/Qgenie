import { deleteAssessment, editAssessment, fetchAllAssessments, fetchAssessmentById, fetchStudentAssessments, fetchTemplatesByTeacher, saveAssessment, updateStatusAssessment, fetchStudentAssessmentById } from "../Models/AssessmentModel.js";

const createAssessmentController = async (req, res) => {
    // console.log("create assessment", req.body);
    let AssObj = req.body;

    try {
        let data = await saveAssessment({ AssObj });

        return res.send({
            status: 200,
            message: "Assessment created successfully",
        })
    } catch (error) {
        return res.send({
            status: error.status || 500,
            message: error.message || "Internal server error",
        })
    }
}

const createAssessmentusingAIController = async (req, res) => {
    try {


        return res.send({
            status: 200,
            message: "",
        })
    } catch (error) {
        return res.send({
            status: error.status || 500,
            message: error.message || "Internal server error",
        })
    }
}

const editAssessmentController = async (req, res) => {
    // console.log("Edit Assessment",req.params.id,req.body);
    let id = req.params.id;
    let assessmentInput = req.body;

    try {
        const data = await editAssessment({ id, assessmentInput });
        return res.send({
            status: 200,
            message: `Update assessment successfully`,
            data: data,
        })
    } catch (error) {
        return res.send({
            status: error.status || 500,
            message: error.message || "Internal server error",
        })
    }
}

const updateAssessmentStatusController = async (req, res) => {
    console.log("Edit Assessment Status", req.params.id, req.body);
    let id = req.params.id;
    let { status, publishedAt, assessmentDate } = req.body;

    try {
        const data = await updateStatusAssessment({ id, status, publishedAt, assessmentDate });
        return res.send({
            status: 200,
            message: `Updated assessment status successfully`,
            data: data,
        })
    } catch (error) {
        return res.send({
            status: error.status || 500,
            message: error.message || "Internal server error",
        })
    }
}

const getAllAssessmentsController = async (req, res) => {
    try {
        let data = await fetchAllAssessments();

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

const getAssessmentByIdController = async (req, res) => {
    let id = req.params.id;

    try {
        let data = await fetchAssessmentById({ id });

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

// Fetch all the assessments created by a specific teacher
const getTeacherAssessmentsController = async (req, res) => {
    let username = req.params.username;

    try {
        let data = await fetchTemplatesByTeacher({ username });

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

// Fetch all the assessments of students in specific gradelevel 
const getStudentAssessmentController = async (req, res) => {
    let { gradelevel } = req.user.data;
    console.log("gradelevel =>", gradelevel);

    try {
        let data = await fetchStudentAssessments({ gradelevel });

        return res.send({
            status: 200,
            message: "Data fetched",
            data: data,
        })
    } catch (error) {
        console.log(error)
        return res.send({
            status: error.status || 500,
            message: error.message || "Internal server error",
        })
    }
}

const getStudentAssessmentByIdController = async (req, res) => {
    let id = req.params.id;

    try {
        let data = await fetchStudentAssessmentById({ id });

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

const deleteAssessmentController = async (req, res) => {
    let id = req.params.id;
    console.log("Delete assessment:", id);

    try {
        let data = await deleteAssessment({ id });

        return res.send({
            status: 200,
            message: "Assessment deleted successfully",
        })
    } catch (error) {
        return res.send({
            status: error.status || 500,
            message: error.message || "Internal server error",
        })
    }
}

export { createAssessmentController, createAssessmentusingAIController, editAssessmentController, updateAssessmentStatusController, getAllAssessmentsController, getAssessmentByIdController, getTeacherAssessmentsController, getStudentAssessmentController, getStudentAssessmentByIdController, deleteAssessmentController };