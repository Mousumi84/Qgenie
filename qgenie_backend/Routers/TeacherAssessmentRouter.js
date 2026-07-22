import express from 'express';
import isAuth from '../Middleware/isAuth.js';
import { createAssessmentController, createAssessmentusingAIController, deleteAssessmentController, editAssessmentController, getAllAssessmentController, getAssessmentByIdController, updateAssessmentStatusController } from '../Controllers/TeacherAssessmentController.js';

const TeacherAssessmentRouter = express.Router();

TeacherAssessmentRouter.post("/create",isAuth, createAssessmentController);
TeacherAssessmentRouter.post("/createAi", createAssessmentusingAIController);   // isAuth
TeacherAssessmentRouter.post("/edit/:id", isAuth, editAssessmentController);
TeacherAssessmentRouter.post("/updateStatus/:id", isAuth, updateAssessmentStatusController); 
TeacherAssessmentRouter.get("/getAll", isAuth, getAllAssessmentController);
TeacherAssessmentRouter.get("/get/:id", isAuth, getAssessmentByIdController);
TeacherAssessmentRouter.post("/delete/:id", isAuth, deleteAssessmentController);

export default TeacherAssessmentRouter;