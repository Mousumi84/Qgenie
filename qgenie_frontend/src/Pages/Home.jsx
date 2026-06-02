import React from 'react';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

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
    <div id="Home" className="p-9 flex flex-col gap-4 w-150"> 
      <Outlet />
    </div>
  );
}

export default Home;



