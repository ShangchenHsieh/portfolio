import React, { useState, useEffect } from 'react';
import Home from "./Home";
import About from "./About";
import Resume from "./Resume";
import Projects from "./Projects";
import Contact from "./Contact";
import "../App.css";

export default function Display() {
  // eslint-disable-next-line
  const [padding, setPadding] = useState('25%');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setPadding('0');
      } else {
        setPadding('25%');
      }
    };

    // Call the handleResize function on initial load
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='main-content-container'>
      <div className={`pl-25 w-screen back text-white relative`}>
        <Home />
        <About />
        <Resume />
        <Projects />
        <Contact />
      </div>
    </div>


  );
}
