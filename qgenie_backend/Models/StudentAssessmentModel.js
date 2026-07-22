import AssessmentModel from "../Schemas/AssessmentSchema.js";




const fetchStudentAllAssessments = ({gradelevel}) => {
    return new Promise(async (resolve, reject) => {
        try {
            let DBdata = await AssessmentModel.find({ gradelevel });
            console.log("StudentAssessmentModel line- 10",DBdata);

            resolve(DBdata);
        } catch (error) {
            reject(error);
        }
    })
}

const fetchStudentAssessmentById = ({id, gradelevel}) => {
    return new Promise(async (resolve, reject) => {
        console.log(id,gradelevel)
        try {
            let DBdata = await AssessmentModel.findOne({
                $and : [ {_id: id}, {gradelevel} ],
            });
            console.log("StudentAssessmentModel line- 26",DBdata);

            if(!DBdata) {
                console.log("Yes")
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

const updateStatusAssessment = ({id, status, publishedAt}) => {
    return new Promise(async (resolve, reject) => {
        console.log("UPDATE",status, publishedAt)

        try {
            let DBdata = await AssessmentModel.findByIdAndUpdate(id, { status, publishedAt }, { new: true});
            console.log("StudentAssessmentModel line- 37",DBdata);

            resolve(DBdata);
        } catch (error) {
            console.log(error)
            reject(error);
        }
    })
}

export { fetchStudentAllAssessments, fetchStudentAssessmentById, updateStatusAssessment }