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

const getAssessmentByIdController = async (req,res) => {
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

const deleteAssessmentController = async (req,res) => {
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

export { createAssessmentController, createAssessmentusingAIController, editAssessmentController, getAllAssessmentController, getAssessmentByIdController, deleteAssessmentController};