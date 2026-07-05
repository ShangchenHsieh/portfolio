import Work from "./work";
import { projects } from "../../constants";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <header className="mb-12 max-w-2xl">
          <p className="eyebrow" data-aos="fade-up">Projects</p>
          <h2
            className="mt-4 font-semibold tracking-[-0.02em] text-[clamp(1.9rem,4vw,2.75rem)]"
            data-aos="fade-up"
          >
            Selected work
          </h2>
          <p className="mt-4 text-muted leading-relaxed" data-aos="fade-up">
            Full-stack applications and applied-AI tools I've built — from an educational platform
            for classrooms to a course-lookup service used by students at SJSU.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={Math.min((index % 3) * 80, 240)}
              className="h-full"
            >
              <Work
                title={project.title}
                desc={project.desc}
                img={project.img}
                link={project.link}
                code={project.code}
                tags={project.tags}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
