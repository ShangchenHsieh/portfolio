import React, { Suspense, lazy, useEffect, useState } from 'react';
import Layout from "./Layout/Layout";
import Display from "./components/Display";
import './App.css'; // assuming you have a CSS file for your styles

const Slidebar = lazy(() => import("./components/SlideBar"));

export default function App() {
  const getIsDesktop = () => (typeof window !== "undefined" ? window.innerWidth > 768 : true);
  const [isDesktop, setIsDesktop] = useState(getIsDesktop);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 769px)');
    const updateDeviceMode = (event) => {
      setIsDesktop(event.matches);
    };

    setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener('change', updateDeviceMode);

    return () => {
      mediaQuery.removeEventListener('change', updateDeviceMode);
    };
  }, []);

  return (
    <Layout>
      {isDesktop && (
        <Suspense fallback={null}>
          <Slidebar />
        </Suspense>
      )}
      <Display />
    </Layout>
  );
}
