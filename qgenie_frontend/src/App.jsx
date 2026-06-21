import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Welcome from "./Components/Common/Home/Welcome";
import { Toaster } from "react-hot-toast";

const Login = lazy(() => import("./Components/Common/Auth/Login"));
const Signup = lazy(() => import("./Components/Common/Auth/Signup"));
const ProtectedRoute = lazy(() => import("./Components/Common/ProtectedRoute"));

const TeacherLayout = lazy(() => import("./Components/Teacher/Layout"));
const TeacherDashboard = lazy(() => import("./Pages/Teacher/Dashboard"));
const TeacherTemplatesPage = lazy(() => import("./Pages/Teacher/Templates"));
const CreateTemplatePage = lazy(() => import('./Pages/Teacher/Templates/Create'));
const TeacherAssessment = lazy(() => import("./Pages/Teacher/Assessment"));
const TeacherAssessmentCreate = lazy(() => import(".//Pages/Teacher/Assessment/Create"));
const TeacherSubmission = lazy(() => import("./Pages/Teacher/Submission"));


const StudentLayout = lazy(() => import("./Components/Student/Layout"));
const StudentDashboard = lazy(() => import("./Pages/Student/Dashboard"));
const StudentAssessment = lazy(() => import("./Pages/Student/Assessment"));
const StudentSubmission = lazy(() => import("./Pages/Student/Submission"));

function App() {
  // let [isTeacherLoggedIn, setIsTeacherLoggedIn] = React.useState(false);
  // let [isStudentLoggedIn, setIsStudentLoggedIn] = React.useState(false);

  return (
    <div id="app">
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} >
            <Route index element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<TeacherLayout />}>
              <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
              <Route path="/teacher/templates" element={<TeacherTemplatesPage />} />
              <Route path="/teacher/templates/create" element={<CreateTemplatePage />} />
              <Route path="/teacher/assessments" element={<TeacherAssessment />} />
              <Route path="/teacher/assessments/create" element={<TeacherAssessmentCreate />} />
              <Route path="/teacher/submissions" element={<TeacherSubmission />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<StudentLayout />}>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/assessments" element={<StudentAssessment />} />
              <Route path="/student/submissions" element={<StudentSubmission />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
