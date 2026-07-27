import AssessmentModel from "../Schemas/AssessmentSchema.js";



const saveAssessment = ({ AssObj }) => {
    return new Promise(async (resolve, reject) => {
        console.log("AssessmentModel line- 7", AssObj);

        try {
            let DBdata = await AssessmentModel.create(AssObj);
            console.log("AssessmentModel line- 11", DBdata);

            resolve(DBdata);
        } catch (error) {
            reject(error);
        }
    })
}

const createAssessmentUsingAI = ({ title, template, description, status, publishedAt, totalMarks, questions, questionType, question, marks, negativeMarks, hints, explanation, sampleAnswer, sampleOptions }) => {
    return new Promise(async (resolve, reject) => {
        try {

        } catch (error) {
            reject(error);
        }
    })
}

const editAssessment = ({ id, assessmentInput }) => {
    return new Promise(async (resolve, reject) => {
        let update = assessmentInput;
        console.log("UPDATE", update)

        try {
            let DBdata = await AssessmentModel.findByIdAndUpdate(id, update, { new: true });
            console.log("AssessmentModel line- 37", DBdata);

            resolve(DBdata);
        } catch (error) {
            reject(error);
        }
    })
}

const updateStatusAssessment = ({ id, status, publishedAt }) => {
    return new Promise(async (resolve, reject) => {
        console.log("UPDATE", status, publishedAt)

        try {
            let DBdata = await AssessmentModel.findByIdAndUpdate(id, { status, publishedAt }, { new: true });
            console.log("AssessmentModel line- 52", DBdata);

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
            console.log("AssessmentModel line- 66", DBdata);

            resolve(DBdata);
        } catch (error) {
            reject(error);
        }
    })
}

const fetchAssessmentById = ({ id }) => {
    return new Promise(async (resolve, reject) => {
        try {
            let DBdata = await AssessmentModel.findById(id);
            console.log("AssessmentModel line- 79", DBdata);

            resolve(DBdata);
        } catch (error) {
            reject(error);
        }
    })
}

const fetchTemplatesByTeacher = ({ username }) => {
    return new Promise(async (resolve, reject) => {
        try {
            let DBdata = await AssessmentModel.find({ createdBy : username });
            console.log("AssessmentModel line- 108", DBdata);

            if (!DBdata) {
                reject({
                    status: 404,
                    message: "Assessment not found.",
                });
            }

            resolve(DBdata);
        } catch (error) {
            reject(error);
        }
    })
}

const fetchStudentAssessments = ({ gradelevel }) => {
    return new Promise(async (resolve, reject) => {
        try {
            let DBdata = await AssessmentModel.find({ gradelevel, status: "Published" });
            console.log("AssessmentModel line- 92", DBdata);

            resolve(DBdata);
        } catch (error) {
            reject(error);
        }
    })
}

// const fetchStudentAssessmentById = ({ id, gradelevel }) => {
//     return new Promise(async (resolve, reject) => {
//         console.log(id, gradelevel)
//         try {
//             let DBdata = await AssessmentModel.findOne({
//                 $and: [{ _id: id }, { gradelevel }],
//             });
//             console.log("AssessmentModel line- 108", DBdata);

//             if (!DBdata) {
//                 console.log("Yes")
//                 reject({
//                     status: 404,
//                     message: "Assessment not found.",
//                 });
//             }

//             resolve(DBdata);
//         } catch (error) {
//             reject(error);
//         }
//     })
// }

const deleteAssessment = ({ id }) => {
    return new Promise(async (resolve, reject) => {
        try {
            let DBdata = await AssessmentModel.findByIdAndDelete(id);
            console.log("AssessmentModel line- 129", DBdata);

            resolve(DBdata);
        } catch (error) {
            reject(error);
        }
    })
}

export { saveAssessment, createAssessmentUsingAI, editAssessment, updateStatusAssessment, fetchAllAssessments, fetchAssessmentById, fetchStudentAssessments, fetchTemplatesByTeacher, deleteAssessment }   // fetchStudentAssessmentById