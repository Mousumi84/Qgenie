import React from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  let navigate = useNavigate();

  const handleTeacherClick = () => {
    const teacherToken = localStorage.getItem("teacherToken");

    if (teacherToken) {
        navigate("/teacher/dashboard");
    } else {
        navigate("/login",{ state: { role: "teacher" } });
    }
  };

  const handleStudentClick = () => {
    const studentToken =  localStorage.getItem("studentToken");

    if (studentToken) {
        navigate("/student/dashboard");
    } else {
        navigate("/login",{ state: { role: "student" } });
    }
  };

  return (
    <div id="Welcome" className="p-10 flex flex-col gap-4 w-150"> 
      <div className="w-6/12"><img src="/Qgenie_transparent.png" alt="Qgenie-logo"/></div>
      <div className="text-6xl font-bold text-white text-shadow-lg/30">Welcome to <span className="text-green-500 text-8xl">Qgenie</span> Assess </div>
      <div className="text-4xl text-gray-300 text-shadow-lg/30 ">Think. Test. Grow.</div>
      <div className="flex flex-col gap-4 mt-8">
        <button onClick={handleTeacherClick} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-100">
          Get Started as Teacher
        </button>
        <button onClick={handleStudentClick} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-100">
          Get Started as Student
        </button>
      </div>
    </div>
  );
}

export default Welcome;
