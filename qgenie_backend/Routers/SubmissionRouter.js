import express from "express";
import isAuth from "../Middleware/isAuth.js";
import { getAssessmentAllSubmissionController, getStudentAllSubmissionController, getStudentAssessmentStatusController, startAssessmentController, submitAssessmentController } from "../Controllers/SubmissionController.js";

const SubmissionRouter = express.Router();

SubmissionRouter.post("/startExam", isAuth, startAssessmentController);
SubmissionRouter.post("/submitAssessment/:id", isAuth, submitAssessmentController);
SubmissionRouter.get("/getAll/studentAssessmentStatus/:id", isAuth, getStudentAssessmentStatusController);
SubmissionRouter.get("/getAll/studentRecord/:id", isAuth, getStudentAllSubmissionController);
SubmissionRouter.get("/getAll/assessmentRecord/:id", isAuth, getAssessmentAllSubmissionController);

export default SubmissionRouter;