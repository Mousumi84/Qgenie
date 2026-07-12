import mongoose from "mongoose";

/*
{
    title: "eng",
    template: "6a37f48b8204fa172b93b61d",
    description: "English exam class Nursary",
    totalMarks: 5,
    questions: [
       {
            questionType: "TRUE_FALSE",
            question: "A for Ball",
            sampleAnswer: "false",
            hints: "Starts with \"A\"",
            difficultyLevel: "easy",
            marks: 1,
            negativeMarks: "0.5"
       },
       {
            questionType: "MCQ",
            question: "B for ...",
            sampleOptions: [
               { label: "Ball", isCorrect: true },
               { label: "Cat", isCorrect: false },
               { label: "Dog", isCorrect: false },
               { label: "Egg", isCorrect: false  }
           ],
            hints: "Bat, Balloon",
            difficultyLevel: "easy",
            marks: 1,
            negativeMarks: "0.5"
       },
       {
            questionType: "MCQ",
            question: "Cat have ?",
            sampleOptions: [
               { label: "Fur", isCorrect: true },
               { label: "Hand", isCorrect: false },
               { label: "Leg", isCorrect: false },
               { label: "Wings", isCorrect: false  }
           ],
            hints: "Hair like in the body",
            difficultyLevel: "medium",
            marks: 1,
            negativeMarks: "0.5"
       },
       {
            questionType: "MCQ",
            question: "Z for ...",
            sampleOptions: [
                { label: "Zebra", isCorrect: true },
                { label: "Goat", isCorrect: false },
                { label: "Dog", isCorrect: false },
                { label: "Cow", isCorrect: false  }
            ],
            hints: "Zoo",
            difficultyLevel: "medium",
            marks: 1,
            negativeMarks: "0.5"
        },
        {
            questionType: "MCQ",
            question: "Apple, Ant, Air all starts with ",
            sampleOptions: [
                { label: "A", isCorrect: true },
                { label: "B", isCorrect: false },
                { label: "C", isCorrect: false },
                { label: "D", isCorrect: false  }
            ],
            difficultyLevel: "easy",
            marks: 1,
            negativeMarks: "0.5"
        }
    ]
}
*/
/*
{
    title: "Assessment Title",
    template: "Template ID 1634fbcmjf54326buiyf6q5drd2g368348",
    description: "Assessment Description",
    status: "Pending",
    publishedAt: "2023-10-10T10:00:00.000Z",
    totalMarks: 100,
    questions: [ 
        {
            questionType: "MCQ",
            question: "What is the capital of France?",
            difficultyLevel: "easy",
            marks: 5,
            negativeMarks: 0,
            hints: "It's a famous city.",
            explanation: "The capital of France is Paris.",
            sampleOptions: [
                { label: "Paris", isCorrect: true },
                { label: "London", isCorrect: false },
                { label: "Berlin", isCorrect: false },
                { label: "Madrid", isCorrect: false }
            ]
        },
        {
            questionType: "MSQ",
            question: "What is the names of kolkata?",
            difficultyLevel: "easy",
            marks: 5,
            negativeMarks: 0,
            hints: "It's a famous city.",
            explanation: "The capital of West Bengal is Kolkata.",
            sampleOptions: [
                { label: "Kolkata", isCorrect: true },
                { label: "Calcata", isCorrect: true },
                { label: "City of joy", isCorrect: true },
                { label: "Madrid", isCorrect: false }
            ]
        },
        {
            questionType: "TRUE_FALSE",
            question: "What is the capital of France?",
            difficultyLevel: "easy",
            marks: 5,
            negativeMarks: 0,
            hints: "It's a famous city.",
            explanation: "The capital of France is Paris.",
            sampleAnswer: true
        },
    ],
}
*/

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
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ["Pending", "Published", "Done", "Cancel"],
        default: "Pending",
    },
    publishedAt: {
        type: Date,
        default: null,
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