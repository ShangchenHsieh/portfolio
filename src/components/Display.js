import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import Home from "./Home";
import "../App.css";

const About = lazy(() => import("./About"));
const Resume = lazy(() => import("./Resume"));
const Projects = lazy(() => import("./Projects"));
const Certificates = lazy(() => import("./Certificates"));
const Contact = lazy(() => import("./Contact"));

function LazySection({ id, Component, placeholderClassName }) {
  const [shouldRender, setShouldRender] = useState(false);
  const placeholderRef = useRef(null);

  useEffect(() => {
    if (shouldRender || !placeholderRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldRender(true);
          }
        });
      },
      {
        root: null,
        rootMargin: '400px 0px',
        threshold: 0.01,
      }
    );

    observer.observe(placeholderRef.current);

    return () => {
      observer.disconnect();
    };
  }, [shouldRender]);

  if (!shouldRender) {
    return <div id={id} ref={placeholderRef} className={placeholderClassName} aria-hidden="true" />;
  }

  return (
    <Suspense fallback={<div id={id} className={placeholderClassName} aria-hidden="true" />}>
      <Component />
    </Suspense>
  );
}

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
        <LazySection id="about" Component={About} placeholderClassName="section-container min-h-screen px-4" />
        <LazySection id="resume" Component={Resume} placeholderClassName="section-container min-h-screen px-4" />
        <LazySection id="projects" Component={Projects} placeholderClassName="section-container min-h-screen px-8 md:px-12 lg:px-16" />
        <LazySection id="certificates" Component={Certificates} placeholderClassName="section-container min-h-screen px-8 md:px-12 lg:px-16" />
        <LazySection id="contact" Component={Contact} placeholderClassName="section-container min-h-screen px-4" />
      </div>
    </div>


  );
}
