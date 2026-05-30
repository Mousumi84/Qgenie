import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import TeacherLayout from './Components/Teacher';

const TeacherDashboard = lazy(() => import('./Components/Teacher/Dashboard'));
const TeacherTemplatesPage = lazy(() => import('./Components/Teacher/Templates'));
const CreateTemplatePage = lazy(() => import('./Components/Teacher/Templates/Create'));
// const StudentDashboard = lazy(() => import('./Components/Student/Dashboard'));
// const StudentAssessmentsPage = lazy(() => import('./Components/Student/Assessments'));

function App() {
  return (
    <div id='app'>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route element={<TeacherLayout />}>
                    <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
                    <Route path="/teacher/templates" element={<TeacherTemplatesPage />} />
                    <Route path="/teacher/templates/create" element={<CreateTemplatePage />} />
                </Route>
                {/* <Route element={<StudentLayout />}>
                    <Route path="/student/dashboard" element={<StudentDashboard />} />
                    <Route path="/student/assessments" element={<StudentAssessmentsPage />} />
                </Route> */}
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
