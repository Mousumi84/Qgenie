import express from "express";
import { teacherConfirmAccessController, teacherEditProfileController, teacherLoginController, teacherLogoutController, teacherSignupController, teacherUpdatePasswordController } from "../../Controllers/TeacherControllers/AuthController.js";
import isAuth from "../../Middleware/isAuth.js";
const TeacherAuthRouter = express.Router();

TeacherAuthRouter.post("/signup", teacherSignupController);
TeacherAuthRouter.post("/editProfile", isAuth, teacherEditProfileController);
TeacherAuthRouter.post("/confirmAccess", teacherConfirmAccessController);
TeacherAuthRouter.post("/resetPassword", teacherUpdatePasswordController);
TeacherAuthRouter.post("/login", teacherLoginController);
TeacherAuthRouter.post("/logout", isAuth, teacherLogoutController); 

export default TeacherAuthRouter;