import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import TeacherLayout from "./Components/Teacher/Layout";
import StudentLayout from "./Components/Student/Layout";

const TeacherDashboard = lazy(() => import("./Pages/Teacher/Dashboard"));
const TeacherTemplatesPage = lazy(() => import("./Pages/Teacher/Templates"));
const CreateTemplatePage = lazy(() => import('./Pages/Teacher/Templates/Create'));
const TeacherAssessment = lazy(() => import("./Pages/Teacher/Assessment"));
const TeacherAssessmentCreate = lazy(() => import(".//Pages/Teacher/Assessment/Create"));
const TeacherSubmission = lazy(() => import("./Pages/Teacher/Submission"));
const StudentDashboard = lazy(() => import("./Pages/Student/Dashboard"));
const StudentAssessment = lazy(() => import("./Pages/Student/Assessment"));
const StudentSubmission = lazy(() => import("./Pages/Student/Submission"));

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<TeacherLayout />}>
            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
            <Route path="/teacher/templates" element={<TeacherTemplatesPage />} />
            <Route path="/teacher/templates/create" element={<CreateTemplatePage />} />
            <Route path="/teacher/assessments" element={<TeacherAssessment />} />
            <Route path="/teacher/assessments/create" element={<TeacherAssessmentCreate />} />
            <Route path="/teacher/submissions" element={<TeacherSubmission />} />
          </Route>
          <Route element={<StudentLayout />}>
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/assessments" element={<StudentAssessment />} />
            <Route path="/student/submissions" element={<StudentSubmission />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
