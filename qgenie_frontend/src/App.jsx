import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import TeacherLayout from './Components/Teacher';

const TeacherDashboard = lazy(() => import('./Components/Teacher/Dashboard'));
const TeacherTemplatesPage = lazy(() => import('./Components/Teacher/Templates'));
const CreateTemplatePage = lazy(() => import('./Components/Teacher/Templates/Create'));

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
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
