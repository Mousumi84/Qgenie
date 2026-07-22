import { fetchStudentAllAssessments, fetchStudentAssessmentById } from "../Models/StudentAssessmentModel.js";

const getStudentAllAssessmentController = async (req,res) => {
    let {gradelevel} = req.body;
    console.log("gradelevel =>", gradelevel);

    try {
        let data = await fetchStudentAllAssessments({gradelevel});

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

const getStudentAssessmentByIdController = async (req,res) => {
    let id = req.params.id;
    let {gradelevel} = req.body;
    console.log("gradelevel =>",id, gradelevel);

    try {
        let data = await fetchStudentAssessmentById({id,gradelevel});

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


export { getStudentAllAssessmentController, getStudentAssessmentByIdController };