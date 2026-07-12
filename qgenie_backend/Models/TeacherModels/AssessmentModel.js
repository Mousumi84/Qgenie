import AssessmentModel from "../../Schemas/TeacherSchemas/AssessmentSchema.js";



const saveAssessment = ({AssObj}) => {
    return new Promise(async (Resolve, reject) => {
        console.log("AssessmentModel line- 7",AssObj);

        try {
            let DBdata = await AssessmentModel.create(AssObj);
            console.log("AssessmentModel line- 11",DBdata);

            Resolve(DBdata);
        } catch (error) {
            reject(error);
        }
    })
}

const createAssessmentUsingAI = ({title, template, description, status, publishedAt, totalMarks, questions, questionType, question, marks, negativeMarks, hints, explanation, sampleAnswer, sampleOptions}) => {
    return new Promise(async (Resolve, reject) => {
        try {
            
        } catch (error) {
            reject(error);
        }
    })
}

const editAssessment = ({id, title, template, description, status, publishedAt, totalMarks, questions, questionType, question, marks, negativeMarks, hints, explanation, sampleAnswer, sampleOptions}) => {
    return new Promise(async (Resolve, reject) => {
        try {
            let DBdata = await AssessmentModel.findByIdAndUpdate();
            console.log("AssessmentModel line- 34",DBdata);

            Resolve(DBdata);
        } catch (error) {
            reject(error);
        }
    })
}

const fetchAllAssessments = () => {
    return new Promise(async (Resolve, reject) => {
        try {
            let DBdata = await AssessmentModel.find();
            console.log("AssessmentModel line- 47",DBdata);

            Resolve(DBdata);
        } catch (error) {
            reject(error);
        }
    })
}

const fetchAssessmentById = ({id}) => {
    return new Promise(async (Resolve, reject) => {
        try {
            let DBdata = await AssessmentModel.findById(id);
            console.log("AssessmentModel line- 60",DBdata);

            Resolve(DBdata);
        } catch (error) {
            reject(error);
        }
    })
}

const deleteAssessment = ({id}) => {
    return new Promise(async (Resolve, reject) => {
        try {
            let DBdata = await AssessmentModel.findByIdAndDelete(id);
            console.log("AssessmentModel line- 73",DBdata);

            Resolve(DBdata);
        } catch (error) {
            reject(error);
        }
    })
}

export { saveAssessment, createAssessmentUsingAI, editAssessment, fetchAllAssessments, fetchAssessmentById, deleteAssessment }