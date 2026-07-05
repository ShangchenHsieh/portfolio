import Work from "./work";
import { projects } from "../../constants";
import SectionHeader from "../SectionHeader";
import { Stagger, StaggerItem } from "../../motion/variants";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeader
          index="03"
          eyebrow="Projects"
          title="Selected work"
          lede="Full-stack applications and applied-AI tools I've built — from an educational platform for classrooms to a course-lookup service used by students at SJSU."
        />

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <StaggerItem key={index} className="h-full">
              <Work
                index={String(index + 1).padStart(2, "0")}
                title={project.title}
                desc={project.desc}
                img={project.img}
                link={project.link}
                code={project.code}
                tags={project.tags}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
