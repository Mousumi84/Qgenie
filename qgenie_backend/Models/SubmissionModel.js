import SubmissionModel from "../Schemas/SubmissionSchema.js";





const submitAssessment = ({record}) => {
    return new Promise(async (resolve, reject) => {
        try {
            await SubmissionModel.createIndexes();
            let DBdata = await SubmissionModel.create(record);
            console.log("SubmissionModel line- 11",DBdata);

            resolve(DBdata);
        } catch (error) {
            reject(error);
        }
    })
}

const fetchStudentAllSubmissionById = ({id}) => {
    return new Promise(async (resolve, reject) => {
        try {
            let DBdata = await SubmissionModel.find({ studentId: id });
            console.log("SubmissionModel line- 24",DBdata);

            if(DBdata.length < 1) {
                console.log("Yes")
                reject({
                    status: 404,
                    message: "No record found.",
                });
            }

            resolve(DBdata);
        } catch (error) {
            reject(error);
        }
    })
}

const fetchAssessmentAllSubmissionById = ({id}) => {
    return new Promise(async (resolve, reject) => {
        try {
            let DBdata = await SubmissionModel.find({ assessmentId: id });
            console.log("SubmissionModel line- 37",DBdata);

            if(DBdata.length < 1) {
                console.log("Yes")
                reject({
                    status: 404,
                    message: "No record found.",
                });
            }

            resolve(DBdata);
        } catch (error) {
            reject(error);
        }
    })
}

export { submitAssessment, fetchStudentAllSubmissionById, fetchAssessmentAllSubmissionById };