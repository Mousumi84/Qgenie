import SubmissionModel from "../Schemas/SubmissionSchema.js";



const startAssessment = ({record}) => {
    return new Promise(async (resolve, reject) => {
        try {
            await SubmissionModel.createIndexes();
            let DBdata = await SubmissionModel.create(record);
            console.log("SubmissionModel line- 11",DBdata);

            resolve(DBdata._id);
        } catch (error) {
            reject(error);
        }
    })
}

const submitAssessment = ({id,record}) => {
    return new Promise(async (resolve, reject) => {
        try {
            let DBdata = await SubmissionModel.findByIdAndUpdate(id, record, { new: true });
            console.log("SubmissionModel line- 11",DBdata);

            resolve(DBdata);
        } catch (error) {
            reject(error);
        }
    })
}

const fetchStudentAssessmentStatusById = ({id}) => {
    return new Promise(async (resolve, reject) => {
        try {
            let DBdata = await SubmissionModel.find({ studentId: id }).select('assessmentId status submittedAt startedAt');
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

export { startAssessment, submitAssessment, fetchStudentAssessmentStatusById, fetchStudentAllSubmissionById, fetchAssessmentAllSubmissionById };