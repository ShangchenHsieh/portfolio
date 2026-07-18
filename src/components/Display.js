import React, { Suspense, lazy } from 'react';
import Home from "./Home";
import Footer from "./Footer";
import "../App.css";

const About = lazy(() => import("./About"));
const Resume = lazy(() => import("./Resume"));
const Projects = lazy(() => import("./Projects"));
const Certificates = lazy(() => import("./Certificates"));
const Contact = lazy(() => import("./Contact"));

// Sections are code-split (lazy chunks) but mounted immediately, not gated on
// scroll. Deferring the *mount* left the DOM empty for crawlers, link/social
// previews, and fast scrollers; code-splitting alone keeps the perf win without
// that cost. Each id anchor lives on the section itself so scroll-spy/anchors
// resolve even before its chunk resolves.
function DeferredSection({ id, Component }) {
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
      <DeferredSection id="about" Component={About} />
      <DeferredSection id="resume" Component={Resume} />
      <DeferredSection id="projects" Component={Projects} />
      <DeferredSection id="certificates" Component={Certificates} />
      <DeferredSection id="contact" Component={Contact} />
      <Footer />
    </main>
  );
}
