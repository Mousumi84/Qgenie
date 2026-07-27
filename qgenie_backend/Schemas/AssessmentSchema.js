import mongoose from "mongoose";

const QuestionPaperSchema = new mongoose.Schema({
    questionType: {
        type: String,
        enum: ["MCQ", "MSQ","TRUE_FALSE","FILL_BLANK", "SAQ", "LAQ"],
    },
    question: {
        type: String,
    },
    difficultyLevel: {
        type: String,
        enum: ["easy", "medium", "hard"],
    },
    marks: {
        type: Number,
    },
    negativeMarks: {
        type: Number,
        default: 0 ,
    },
    hints: {
        type: String,
    },
    explanation: {
        type: String,
    },
},
{
    discriminatorKey: "questionType",
});

const AssessmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    template: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Template",
        required: true,
    },
    subject: {
        type: String,
    },
    gradelevel: {
        type: String,
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ["Pending", "Published", "Completed", "Cancelled"],
        default: "Pending",
    },
    publishedAt: {
        type: Date,
        default: null,
    },
    lastDateAt: {
        type: Date,
        default: null,
    },
    totalMarks: {
        type: Number
    }, 
    timeAllotted: {
        type: Number, 
    },
    questions: {
        type: [QuestionPaperSchema],
    },
    createdBy: {
        name: {
            type: String,
        },
        username: {
            type: String,
        }
    }
},
{
    timestamps: true,
});

// Check Question Type on  ["MCQ", "MSQ","TRUE_FALSE","FILL_BLANK", "SAQ", "LAQ"]

AssessmentSchema.path('questions').discriminator(
    "MCQ", new mongoose.Schema({
        sampleOptions: {
            type: [{
                label: {
                    type: String,
                    required: true,
                },
                isCorrect: {
                    type: Boolean,
                    default: false,
                },
            }],
            validate: (e) => e.length === 4,
        }
    }) 
);

AssessmentSchema.path('questions').discriminator(
    "MSQ", new mongoose.Schema({
        sampleOptions: {
            type: [{
                label: {
                    type: String,
                    required: true,
                },
                isCorrect: {
                    type: Boolean,
                    default: false,
                },
            }],
            validate: (e) => e.length === 6,
        }
    }) 
);

AssessmentSchema.path('questions').discriminator(
    "TRUE_FALSE", new mongoose.Schema({
        sampleAnswer: {
            type: Boolean,
            required: true,
        }
    }) 
);

AssessmentSchema.path('questions').discriminator(
    "FILL_BLANK", new mongoose.Schema({
        sampleAnswer: {
            type: [String],
            required: true,
        }
    }) 
);

AssessmentSchema.path('questions').discriminator(
    "SAQ", new mongoose.Schema({
        sampleAnswer: {
            type: String,
            required: true,
        }
    }) 
);

AssessmentSchema.path('questions').discriminator(
    "LAQ", new mongoose.Schema({
        sampleAnswer: {
            type: String,
            required: true,
        }
    })
);


const AssessmentModel = mongoose.model("Assessment",AssessmentSchema);

export default AssessmentModel;