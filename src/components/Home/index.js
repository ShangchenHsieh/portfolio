import React from "react";
import { Reveal } from "../../motion/variants";
import TerminalWindow from "../Terminal";
import "../../App.css";

export default function Home() {
  return (
    <section id="home" className="min-h-screen flex items-center">
      <div className="container w-full">
        <div className="grid items-center gap-12 py-24 lg:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)]">
          <div className="max-w-3xl">
            <Reveal as="p" className="eyebrow">
              Software Engineer
            </Reveal>

            <Reveal
              as="h1"
              delay={0.05}
              className="mt-5 font-semibold tracking-[-0.03em] leading-[1.02] text-[clamp(2.75rem,8vw,5rem)]"
            >
              Sean Hsieh
            </Reveal>

            <Reveal as="p" delay={0.1} className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-muted">
              Full-stack &amp; AI engineer based in San Jose. I build backend services, cloud
              infrastructure, and applied-AI products — currently engineering{" "}
              <span className="text-fg">KIRA at Bercerita</span> and researching earthquake
              modeling at <span className="text-fg">San Jose State</span>.
            </Reveal>

            <Reveal delay={0.15} className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn btn-primary">
                View my work
                <ArrowRight />
              </a>
              <a href="#contact" className="btn btn-secondary">
                Get in touch
              </a>
            </Reveal>

            <Reveal delay={0.2} className="mt-11 flex items-center gap-2.5 text-sm text-muted mono">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to software engineering roles
            </Reveal>
          </div>

          <Reveal delay={0.25}>
            <TerminalWindow />
          </Reveal>
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
