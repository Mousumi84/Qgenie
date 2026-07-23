import express from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// File import
import TeacherAuthRouter from "./Routers/TeacherAuthRouter.js";
import StudentAuthRouter from "./Routers/StudentAuthRouter.js";
import TemplateRouter from "./Routers/TemplateRouter.js";
import AssessmentRouter from "./Routers/AssessmentRouter.js";

// Constats & Initialization:
const app = express();
configDotenv();
const PORT = process.env.PORT || 5001;

// Middleware & json parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

// MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("✔️ MongoDB connected"))
.catch((er) => console.log("❌ Failed to connect MongoDB",er));

// Route Handler
app.get("/", (req,res) => {
  res.send("Application Working")
});
app.use("/teacher",TeacherAuthRouter);
app.use("/student",StudentAuthRouter);
app.use("/template",TemplateRouter);
app.use("/assessment",AssessmentRouter);

// Listener
app.listen(PORT, () => {
  console.log("Server is running");
  console.log(`http://localhost:${PORT}`)
});

