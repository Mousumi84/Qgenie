import mongoose from "mongoose";

const QuestionTypeSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["MCQ", "MSQ", "TRUE_FALSE", "FILL_BLANK", "SAQ", "LAQ"]
    },
    questionCount: {
        type: Number,
    },
    marksperQtn: {
        type: Number,
    },
    difficultyLevel: {
        type: String,
        enum: ["easy", "medium", "hard"],
    },
    aiprompt: {
        type: String,
    },
    options: {
        type: [
            {
                type: String,
            }
        ],
    }
},
    // {
    //     _id: false
    // }
);

const TemplateSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    subject: {
        type: String,
    },
    gradelevel: {
        type: String,
    },
    description: {
        type: String,
    },
    questionTypeTemplate: {
        type: [QuestionTypeSchema],
        default: []
    },
    totalMarks: {
        type: Number,
    },
    createdBy: {
        type: String,
    }
},
    {
        timestamps: true
    }
);

const TemplateModel = mongoose.model("Template", TemplateSchema);

export default TemplateModel;