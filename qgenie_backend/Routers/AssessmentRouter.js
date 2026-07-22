import express from 'express';
import isAuth from '../Middleware/isAuth.js';
import { createAssessmentController, createAssessmentusingAIController, deleteAssessmentController, editAssessmentController, getAllAssessmentController, getAssessmentByIdController, getStudentAllAssessmentController, getStudentAssessmentByIdController, updateAssessmentStatusController } from '../Controllers/AssessmentController.js';

const TeacherAssessmentRouter = express.Router();

TeacherAssessmentRouter.post("/create",isAuth, createAssessmentController);
TeacherAssessmentRouter.post("/createAi", createAssessmentusingAIController);   // isAuth
TeacherAssessmentRouter.post("/edit/:id", isAuth, editAssessmentController);
TeacherAssessmentRouter.post("/updateStatus/:id", isAuth, updateAssessmentStatusController); 
TeacherAssessmentRouter.get("/getAll", isAuth, getAllAssessmentController);
TeacherAssessmentRouter.get("/get/:id", isAuth, getAssessmentByIdController);
TeacherAssessmentRouter.get("/getAll", getStudentAllAssessmentController);   // isAuth
TeacherAssessmentRouter.get("/get/:id", getStudentAssessmentByIdController);     //   isAuth
TeacherAssessmentRouter.post("/delete/:id", isAuth, deleteAssessmentController);

export default TeacherAssessmentRouter;