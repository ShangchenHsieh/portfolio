import Work from "./work";
import { projects } from "../../constants";
import SectionHeader from "../SectionHeader";
import { Reveal, Stagger, StaggerItem } from "../../motion/variants";

export default function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeader
          index="03"
          eyebrow="Projects"
          title="Selected work"
          lede="Full-stack applications and applied-AI tools I've built — from an educational platform for classrooms to a course-lookup service used by students at SJSU."
        />

        {/* Featured project — the flagship gets the room it earns. */}
        <Reveal className="mb-6">
          <FeaturedWork
            title={featured.title}
            desc={featured.desc}
            img={featured.img}
            link={featured.link}
            code={featured.code}
            tags={featured.tags}
          />
        </Reveal>

        {/* The rest, in a balanced grid — medium presence, not equal to the flagship. */}
        <Stagger className="grid sm:grid-cols-2 gap-6">
          {rest.map((project, index) => (
            <StaggerItem key={index} className="h-full">
              <Work
                index={String(index + 2).padStart(2, "0")}
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

function FeaturedWork({ title, desc, tags, link, code, img }) {
  const hasLive = link && link.startsWith("http");
  const hasCode = code && code.startsWith("http") && code !== link;

  return (
    <article className="card card-hover card-corners overflow-hidden grid md:grid-cols-2">
      {/* Screenshot, not a photo — contain it so the UI stays legible instead of
          cropping to fill a pane whose height is set by the text column. */}
      <div className="aspect-[16/10] md:aspect-auto md:h-full flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-line bg-elevated p-4 sm:p-6">
        <img src={img} alt={title} loading="lazy" className="max-w-full max-h-full object-contain rounded-sm" />
      </div>

      <div className="p-6 sm:p-8 flex flex-col justify-center">
        <p className="label mb-3">
          <span className="text-accent">01</span> · Featured project
        </p>
        <h3 className="text-2xl sm:text-3xl font-semibold text-fg">{title}</h3>
        <p className="mt-3 text-muted leading-relaxed max-w-prose">{desc}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {tags.map((tag, i) => (
            <span key={i} className="tag">{tag.name}</span>
          ))}
        </div>

        {(hasLive || hasCode) && (
          <div className="mt-6 pt-5 border-t border-line flex items-center gap-6">
            {hasLive && (
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="link-accent inline-flex items-center gap-1.5 text-sm"
              >
                <ExternalIcon />
                Live
              </a>
            )}
            {hasCode && (
              <a
                href={code}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg transition-colors"
              >
                <CodeIcon />
                Code
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function ExternalIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 9l-3 3 3 3M16 9l3 3-3 3M13 6l-2 12" />
    </svg>
  );
}
