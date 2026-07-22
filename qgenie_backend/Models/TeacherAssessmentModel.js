import AssessmentModel from "../Schemas/AssessmentSchema.js";



const saveAssessment = ({AssObj}) => {
    return new Promise(async (resolve, reject) => {
        console.log("AssessmentModel line- 7",AssObj);

        try {
            let DBdata = await AssessmentModel.create(AssObj);
            console.log("AssessmentModel line- 11",DBdata);

            resolve(DBdata);
        } catch (error) {
            reject(error);
        }
    })
}

const createAssessmentUsingAI = ({title, template, description, status, publishedAt, totalMarks, questions, questionType, question, marks, negativeMarks, hints, explanation, sampleAnswer, sampleOptions}) => {
    return new Promise(async (resolve, reject) => {
        try {
            
        } catch (error) {
            reject(error);
        }
    })
}

const editAssessment = ({id, assessmentInput}) => {
    return new Promise(async (resolve, reject) => {
        let update = assessmentInput;
        console.log("UPDATE",update)

        try {
            let DBdata = await AssessmentModel.findByIdAndUpdate(id, update,{ new: true});
            console.log("AssessmentModel line- 37",DBdata);

            resolve(DBdata);
        } catch (error) {
            reject(error);
        }
    })
}

const updateStatusAssessment = ({id, status, publishedAt}) => {
    return new Promise(async (resolve, reject) => {
        console.log("UPDATE",status, publishedAt)

        try {
            let DBdata = await AssessmentModel.findByIdAndUpdate(id, { status, publishedAt }, { new: true});
            console.log("AssessmentModel line- 37",DBdata);

            resolve(DBdata);
        } catch (error) {
            console.log(error)
            reject(error);
        }
    })
}

const fetchAllAssessments = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let DBdata = await AssessmentModel.find();
            console.log("AssessmentModel line- 50",DBdata);

            resolve(DBdata);
        } catch (error) {
            reject(error);
        }
    })
}

const fetchAssessmentById = ({id}) => {
    return new Promise(async (resolve, reject) => {
        try {
            let DBdata = await AssessmentModel.findById(id);
            console.log("AssessmentModel line- 60",DBdata);

            resolve(DBdata);
        } catch (error) {
            reject(error);
        }
    })
}

const deleteAssessment = ({id}) => {
    return new Promise(async (resolve, reject) => {
        try {
            let DBdata = await AssessmentModel.findByIdAndDelete(id);
            console.log("AssessmentModel line- 76",DBdata);

            resolve(DBdata);
        } catch (error) {
            reject(error);
        }
    })
}

export { saveAssessment, createAssessmentUsingAI, editAssessment, updateStatusAssessment, fetchAllAssessments, fetchAssessmentById, deleteAssessment }