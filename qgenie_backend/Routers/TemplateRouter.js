import express from "express";
import { createTemplateController, deleteTemplateController, editTemplateController, getAllTemplateController, getTemplateByIdController } from "../Controllers/TemplateController.js";
import isAuth from "../Middleware/isAuth.js";

const TemplateRouter = express.Router();

TemplateRouter.post("/create",isAuth, createTemplateController);
TemplateRouter.post("/edit/:id",isAuth, editTemplateController);  
TemplateRouter.get("/getAll",isAuth, getAllTemplateController);
TemplateRouter.get("/get/:id",isAuth, getTemplateByIdController);
TemplateRouter.post("/delete/:id",isAuth, deleteTemplateController); 

export default TemplateRouter;