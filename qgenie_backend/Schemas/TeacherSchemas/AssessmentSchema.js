import mongoose from "mongoose";

const QuestionPaperSchema = new mongoose.Schema({
    questionType: {
        type: String,
        enum: ["MCQ", "MSQ","TRUE_FALSE","FILL_BLANK", "SAQ", "LAQ"],
    },
    question: {
        type: String,
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
        require: true,
    },
    template: {
        type: Schema.Type.ObjectId,
        ref: "Template",
        required: true,
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ["Pending", "Published", "Done", "Cancel"]
    },
    publishedAt: {
        type: Date
    },
    totalMarks: {
        type: Number
    }, 
    questions: {
        type: [QuestionPaperSchema],
    }
},
{
    timestamps: true,
});

// Check Question Type on  ["MCQ", "MSQ","TRUE_FALSE","FILL_BLANK", "SAQ", "LAQ"]

AssessmentSchema.path('questions').discriminator(
    "MCQ", new Schema({
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
    "MSQ", new Schema({
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
    "TRUE_FALSE", new Schema({
        sampleOptions: {
            true: {
                type: Boolean,
                required: true,
                isCorrect: {
                    type: Boolean,
                    default: false,
                }
            },
            false: {
                type: Boolean,
                required: true,
                isCorrect: {
                    type: Boolean,
                    default: false,
                }
            },
        }
    }) 
);

AssessmentSchema.path('questions').discriminator(
    "FILL_BLANK", new Schema({
        sampleAnswer: {
            type: [String],
            required: true,
        }
    }) 
);

AssessmentSchema.path('questions').discriminator(
    "SAQ", new Schema({
        sampleAnswer: {
            type: String,
            required: true,
        }
    }) 
);

AssessmentSchema.path('questions').discriminator(
    "LAQ", new Schema({
        sampleAnswer: {
            type: String,
            required: true,
        }
    })
);


const AssessmentModel = mongoose.model("Assessment",AssessmentSchema);

export default AssessmentModel;