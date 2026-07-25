import express from "express";
import { createTemplateController, deleteTemplateController, editTemplateController, getTeacherTemplatesController, getAllTemplatesController, getTemplateByIdController } from "../Controllers/TemplateController.js";
import isAuth from "../Middleware/isAuth.js";

const TemplateRouter = express.Router();

TemplateRouter.post("/create", isAuth, createTemplateController);
TemplateRouter.post("/edit/:id", isAuth, editTemplateController);
TemplateRouter.get("/getAll", isAuth, getAllTemplatesController);
TemplateRouter.get("/get/teacher/:username", isAuth, getTeacherTemplatesController);
TemplateRouter.get("/get/:id", isAuth, getTemplateByIdController);
TemplateRouter.post("/delete/:id", isAuth, deleteTemplateController);

export default TemplateRouter;