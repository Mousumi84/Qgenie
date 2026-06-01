import React from 'react';
import { useEffect } from 'react';

function Home() {

  useEffect(() => {
  document.body.style.backgroundImage = "url('/background.png')";
  document.body.style.backgroundSize = "100% 100%";
  document.body.style.backgroundAttachment = "fixed";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";

  return () => {
    document.body.style.backgroundImage = "none";
  };
}, []);
  return (
    <div id="Home" className="p-10 flex flex-col gap-4 w-150"> 
      <div className="w-6/12"><img src="/Qgenie_transparent.png" alt="Qgenie-logo"/></div>
      <div className="text-6xl font-bold text-white text-shadow-lg/30">Welcome to <span className="text-green-500 text-8xl">Qgenie</span> Assess </div>
      <div className="text-4xl text-gray-300 text-shadow-lg/30 ">Think. Test. Grow.</div>
      <div className="flex flex-col gap-4 mt-8">
        <button onClick={() => window.location.href = '/teacher/dashboard'} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-100">
          Get Started as Teacher
        </button>
        <button onClick={() => window.location.href = '/student/dashboard'} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-100">
          Get Started as Student
        </button>
      </div>
    </div>
  );
}

export default Home;
