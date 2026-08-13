import express from 'express';
import isAuth from '../Middleware/isAuth.js';
import { createAssessmentController, createAssessmentusingAIController, editAssessmentController, updateAssessmentStatusController, getAllAssessmentsController, getAssessmentByIdController, getTeacherAssessmentsController, getStudentAssessmentController, deleteAssessmentController, getStudentAssessmentByIdController, getAssessmentQuestionPaperById } from '../Controllers/AssessmentController.js';   

const AssessmentRouter = express.Router();

AssessmentRouter.post("/create", isAuth, createAssessmentController);
AssessmentRouter.post("/createAi", createAssessmentusingAIController);   // isAuth
AssessmentRouter.post("/edit/:id", isAuth, editAssessmentController);
AssessmentRouter.post("/updateStatus/:id", isAuth, updateAssessmentStatusController);
AssessmentRouter.get("/getAll", isAuth, getAllAssessmentsController);
AssessmentRouter.get("/get/:id", isAuth, getAssessmentByIdController);
AssessmentRouter.get("/getTeacher/:username", isAuth, getTeacherAssessmentsController);
AssessmentRouter.get("/getStudent", isAuth, getStudentAssessmentController);
AssessmentRouter.get("/get/studentAssessment/:id", isAuth, getStudentAssessmentByIdController);
AssessmentRouter.get("/get/assessmentPaper/:id", isAuth, getAssessmentQuestionPaperById);
AssessmentRouter.post("/delete/:id", isAuth, deleteAssessmentController);

export default AssessmentRouter;