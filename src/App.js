import React, { useState, useEffect } from 'react';
import Layout from "./Layout/Layout";
import Display from "./components/Display";
import Slidebar from "./components/SlideBar";
import './App.css'; // assuming you have a CSS file for your styles

export default function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout>
      {windowWidth > 768 && <Slidebar />} {/* Show Slidebar only if windowWidth is greater than 768 pixels */}
      <Display />
    </Layout>
  );
}
