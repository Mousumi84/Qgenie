import express from 'express';
import isAuth from '../Middleware/isAuth.js';
import { createAssessmentController, createAssessmentusingAIController, editAssessmentController, updateAssessmentStatusController, getAllAssessmentsController, getAssessmentByIdController, getTeacherAssessmentsController, getStudentAssessmentController, deleteAssessmentController } from '../Controllers/AssessmentController.js';   

const AssessmentRouter = express.Router();

AssessmentRouter.post("/create", isAuth, createAssessmentController);
AssessmentRouter.post("/createAi", createAssessmentusingAIController);   // isAuth
AssessmentRouter.post("/edit/:id", isAuth, editAssessmentController);
AssessmentRouter.post("/updateStatus/:id", isAuth, updateAssessmentStatusController);
AssessmentRouter.get("/getAll", isAuth, getAllAssessmentsController);
AssessmentRouter.get("/get/:id", isAuth, getAssessmentByIdController);
AssessmentRouter.get("/getteacher/:username", isAuth, getTeacherAssessmentsController);
AssessmentRouter.get("/getstudent", isAuth, getStudentAssessmentController);
// AssessmentRouter.get("/get/studentAssessment/:id", getStudentAssessmentByIdController);     //   isAuth
AssessmentRouter.post("/delete/:id", isAuth, deleteAssessmentController);

export default AssessmentRouter;