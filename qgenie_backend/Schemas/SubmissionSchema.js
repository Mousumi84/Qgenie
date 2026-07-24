import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Questions",
    },
    questionType: {
        type: String
    },
    StudentAnswer: {
        type: String     //  mongoose.Schema.Types.Mixed
    },
    obtainedMarks: {
        type: Number,
        default: 0
    },
    isCorrect: {
        type: Boolean
    },
    feedback: {
        type: String
    }
});

const SubmissionSchema = new mongoose.Schema({
    assessmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assessment",
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudentAuth",
        required: true
    },
    totalMarks: {
        type: Number
    },
    obtainedMarks: {
        type: Number,
        default: 0
    },
    percentage: {
        type: Number,
    },
    status: {
        type: String,
        enum: [ "In Progress", "Submitted", "Evaluated" ],
        default: "In Progress"
    },
    // attemptNo: {
    //     type: Number,
    //     default: 1
    // },
    startedAt: {
        type: Date
    },
    submittedAt: {
        type: Date
    },
    timeUsed: {
        type: Number
    },
    answers: {
        type: [AnswerSchema]
    },
    ipAddress: {
        type: String
    },
    deviceType: {
        type: String
    },
    browser: {
        type: String
    },
    tabSwitchCount: {
        type: Number
    },
    copyPasteCount: {
        type: Number
    },
    autoSubmitted: {
        type: Boolean
    },
    teacherRemarks: {
        type: String
    }
},
// {
//     timestamps: true
// }
);

SubmissionSchema.index(
    { studentId: 1, assessmentId: 1 },
    { unique: true }
);

const SubmissionModel = mongoose.model("Submission",SubmissionSchema);

export default SubmissionModel;