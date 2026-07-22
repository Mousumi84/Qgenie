import mongoose from "mongoose";


let StudentLoginSchema = new mongoose.Schema({
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

let StudentLoginModel = mongoose.model("LoginStudent",StudentLoginSchema);

export default StudentLoginModel;