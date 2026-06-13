import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
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
    password: {
        type: String,
        require: true,
    }, 
    role: {
        type: String,
    }, 
    gender: {
        type: String,
    }, 
    gradelevel: {
        type: String,
    }, 
    institution: {
        type: String,
    }, 
    dob: {
        type: String,
    }, 
})

const StudentModel = mongoose.model("Student",StudentSchema);

export default StudentModel;