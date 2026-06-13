import mongoose from "mongoose";


let TeacherLoginSchema = new mongoose.Schema({
    loginId: {
        type: String,
        require: true,
        unique: true,
    },
    token: {
        type: String,
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,

    //     expires: 86400,
    // },
});

let TeacherLoginModel = mongoose.model("LoginTeachers",TeacherLoginSchema);

export default TeacherLoginModel;