import React, { Suspense, lazy } from 'react';
import Layout from "./Layout/Layout";
import Display from "./components/Display";
import './App.css';

const Nav = lazy(() => import("./components/Nav"));

export default function App() {
  return (
    <Layout>
      <Suspense fallback={null}>
        <Nav />
      </Suspense>
      <Display />
    </Layout>
  );
}
