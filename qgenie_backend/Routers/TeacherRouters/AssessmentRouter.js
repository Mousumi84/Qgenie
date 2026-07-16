import express from 'express';
import isAuth from '../../Middleware/isAuth.js';
import { createAssessmentController, createAssessmentusingAIController, deleteAssessmentController, editAssessmentController, getAllAssessmentController, getAssessmentByIdController, updateAssessmentStatusController } from '../../Controllers/TeacherControllers/AssessmentController.js';

const AssessmentRouter = express.Router();

AssessmentRouter.post("/create",isAuth, createAssessmentController);
AssessmentRouter.post("/createAi", createAssessmentusingAIController);   // isAuth
AssessmentRouter.post("/edit/:id", isAuth, editAssessmentController);
AssessmentRouter.post("/updateStatus/:id", updateAssessmentStatusController);  // isAuth
AssessmentRouter.get("/getAll", isAuth, getAllAssessmentController);
AssessmentRouter.get("/get/:id", isAuth, getAssessmentByIdController);
AssessmentRouter.post("/delete/:id", isAuth, deleteAssessmentController);

export default AssessmentRouter;