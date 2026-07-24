import express from "express";
import isAuth from "../Middleware/isAuth.js";
import { getAssessmentAllSubmissionController, getStudentAllSubmissionController, submitAssessmentController } from "../Controllers/SubmissionController.js";

const SubmissionRouter = express.Router();

SubmissionRouter.post("/submitAssessment", submitAssessmentController);    //  isAuth
SubmissionRouter.get("/getAll/studentRecord/:id", getStudentAllSubmissionController);    //  isAuth
SubmissionRouter.get("/getAll/assessmentRecord/:id", getAssessmentAllSubmissionController);    //  isAuth

export default SubmissionRouter;