import AssessmentModel from "../../Schemas/TeacherSchemas/AssessmentSchema.js";



const saveAssessment = ({title, template, description, status, publishedAt, totalMarks, questions, questionType, question, marks, negativeMarks, hints, explanation, sampleAnswer, sampleOptions}) => {
    return new Promise(async (Resolve, reject) => {
        let AssObj = {
            title: title,
            template: template,
            description: description,
            // status: status,
            // publishedAt: publishedAt,
            totalMarks: totalMarks,
            // questions: [
                // {
                //     questionType: ,
                //     question: ,
                //     marks: ,
                //     negativeMarks: ,
                //     hints: ,
                //     explanation: ,
                // }
            // ],
        }


        try {
            let DBdata = await AssessmentModel.create(AssObj);
            console.log("AssessmentModel line- 36",DBdata);

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
            console.log("AssessmentModel line- 36",DBdata);

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
            console.log("AssessmentModel line- 65",DBdata);

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
            console.log("AssessmentModel line- 78",DBdata);

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
            console.log("AssessmentModel line- 91",DBdata);

            Resolve(DBdata);
        } catch (error) {
            reject(error);
        }
    })
}

export { saveAssessment, createAssessmentUsingAI, editAssessment, fetchAllAssessments, fetchAssessmentById, deleteAssessment }