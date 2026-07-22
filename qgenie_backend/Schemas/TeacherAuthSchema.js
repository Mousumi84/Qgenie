import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
    name: {
        require: true,
        type: String,
    },
    username: {
        require: true,
        type: String,
        unique: true,
    },
    email: {
        require: true,
        type: String,
        unique: true,
    },
    doj : {
        type: String,
    },
    gender : {
        type: String,
    },
    institution : {
        type: String,
    },
    password : {
        type: String,
        require: true
    },
    role : {
        type: String,
    },
    subject : {
        type: String,
    },
})

const TeacherModel = mongoose.model("Teacher",TeacherSchema);

export default TeacherModel;