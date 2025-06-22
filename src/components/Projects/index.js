import Work from "./work";
import { projects } from "../../constants";

export default function Projects() {
  return (
    <div
      id="projects"
      className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="head text-5xl md:text-6xl font-bold mb-6"
            data-aos="fade-up"
          >
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div 
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"
            data-aos="fade-up"
            data-aos-delay="200"
          ></div>
          <p 
            className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            A showcase of my recent work, featuring full-stack applications, 
            machine learning projects, and innovative solutions built with modern technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              data-aos-duration="800"
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

        {/* Call to Action */}
        <div 
          className="text-center mt-16"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <div className="modern-card inline-block">
            <h3 className="text-2xl font-bold mb-4">
              Interested in <span className="gradient-text">collaborating</span>?
            </h3>
            <p className="text-zinc-400 mb-6 max-w-md">
              I'm always open to discussing new opportunities and exciting projects.
            </p>
            <a 
              href="#contact" 
              className="btn-primary inline-flex items-center gap-2 group"
            >
              <span>Get In Touch</span>
              <svg 
                className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}