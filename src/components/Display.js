import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import Home from "./Home";
import Footer from "./Footer";
import "../App.css";

const About = lazy(() => import("./About"));
const Resume = lazy(() => import("./Resume"));
const Projects = lazy(() => import("./Projects"));
const Certificates = lazy(() => import("./Certificates"));
const Contact = lazy(() => import("./Contact"));

function LazySection({ id, Component }) {
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
      { root: null, rootMargin: "400px 0px", threshold: 0.01 }
    );

    observer.observe(placeholderRef.current);
    return () => observer.disconnect();
  }, [shouldRender]);

  if (!shouldRender) {
    return <div id={id} ref={placeholderRef} className="section" aria-hidden="true" />;
  }

  return (
    <Suspense fallback={<div id={id} className="section" aria-hidden="true" />}>
      <Component />
    </Suspense>
  );
}

export default function Display() {
  return (
    <main>
      <Home />
      <LazySection id="about" Component={About} />
      <LazySection id="resume" Component={Resume} />
      <LazySection id="projects" Component={Projects} />
      <LazySection id="certificates" Component={Certificates} />
      <LazySection id="contact" Component={Contact} />
      <Footer />
    </main>
  );
}
