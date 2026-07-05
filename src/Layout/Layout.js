import { LazyMotion, domAnimation } from "motion/react";
import "../App.css";

export default function Layout({ children }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="page">{children}</div>
    </LazyMotion>
  );
}
