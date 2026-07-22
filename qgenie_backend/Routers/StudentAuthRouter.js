import express from "express";
import isAuth from "../Middleware/isAuth.js";
import { studentConfirmAccessController, studentEditProfileController, studentLoginController, studentLogoutController, studentSignupController, studentUpdatePasswordController } from "../Controllers/StudentAuthController.js";
const StudentAuthRouter = express.Router();

StudentAuthRouter.post("/signup", studentSignupController);
StudentAuthRouter.post("/editProfile", isAuth, studentEditProfileController);
StudentAuthRouter.post("/confirmAccess", studentConfirmAccessController);
StudentAuthRouter.post("/resetPassword", studentUpdatePasswordController);
StudentAuthRouter.post("/login", studentLoginController);
StudentAuthRouter.post("/logout", isAuth, studentLogoutController); 

export default StudentAuthRouter;