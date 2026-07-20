import express from 'express';
import isAuth from '../../Middleware/isAuth.js';
import { getStudentAllAssessmentController, getStudentAssessmentByIdController } from '../../Controllers/StudentControllers/AssessmentController.js';

const StudentAssessmentRouter = express.Router();

StudentAssessmentRouter.get("/getAll", getStudentAllAssessmentController);   // isAuth
StudentAssessmentRouter.get("/get/:id", getStudentAssessmentByIdController);     //   isAuth
// StudentAssessmentRouter.post("/updateStatus/:id", );     //   isAuth 

export default StudentAssessmentRouter;