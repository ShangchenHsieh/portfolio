import React from "react";
import "../../App.css";

export default function Home() {
  return (
    <section id="home" className="min-h-screen flex items-center">
      <div className="container w-full">
        <div className="max-w-3xl py-28">
          <p className="eyebrow" data-aos="fade-up">
            Software Engineer
          </p>

          <h1
            className="mt-5 font-semibold tracking-[-0.03em] leading-[1.02] text-[clamp(2.75rem,8vw,5rem)]"
            data-aos="fade-up"
            data-aos-delay="50"
          >
            Sean Hsieh
          </h1>

          <p
            className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-muted"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Full-stack &amp; AI engineer based in San Jose. I build backend services, cloud
            infrastructure, and applied-AI products — currently engineering{" "}
            <span className="text-fg">KIRA at Bercerita</span> and researching earthquake
            modeling at <span className="text-fg">San Jose State</span>.
          </p>

          <div
            className="mt-9 flex flex-wrap items-center gap-3"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <a href="#projects" className="btn btn-primary">
              View my work
              <ArrowRight />
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get in touch
            </a>
          </div>

          <div
            className="mt-11 flex items-center gap-2.5 text-sm text-muted mono"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Open to software engineering roles
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowRight() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
