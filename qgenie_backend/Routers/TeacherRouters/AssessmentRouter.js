import express from 'express';
import isAuth from '../../Middleware/isAuth.js';
import { createAssessmentController, createAssessmentusingAIController, deleteAssessmentController, editAssessmentController, getAllAssessmentController, getAssessmentByIdController } from '../../Controllers/TeacherControllers/AssessmentController.js';

const AssessmentRouter = express.Router();

AssessmentRouter.post("/create", createAssessmentController);   // isAuth
AssessmentRouter.post("/createAi", createAssessmentusingAIController);   // isAuth
AssessmentRouter.post("/edit/:id", editAssessmentController);   // isAuth
AssessmentRouter.get("/getAll", isAuth, getAllAssessmentController);
AssessmentRouter.get("/get/:id", isAuth, getAssessmentByIdController);
AssessmentRouter.delete("/delete", isAuth, deleteAssessmentController);

export default AssessmentRouter;