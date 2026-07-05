import "../../App.css";
import resume from "../../assets/files/Shangchen_Hsieh_Resume.pdf";
import portrait from "../../assets/images/MyImage.jpg";
import { focusAreas } from "../../constants";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <header className="mb-12">
          <p className="eyebrow" data-aos="fade-up">About</p>
          <h2
            className="mt-4 font-semibold tracking-[-0.02em] text-[clamp(1.9rem,4vw,2.75rem)]"
            data-aos="fade-up"
          >
            Who I am
          </h2>
        </header>

        <div className="grid lg:grid-cols-[minmax(0,300px)_1fr] gap-10 lg:gap-16 items-start">
          {/* Portrait */}
          <div data-aos="fade-up">
            <div className="card overflow-hidden">
              <img
                src={portrait}
                alt="Sean Hsieh"
                className="w-full aspect-[4/5] object-cover"
                loading="lazy"
              />
            </div>
            <p className="mono text-xs text-muted mt-3">
              Shang-chen (Sean) Hsieh · San Jose, CA
            </p>
          </div>

          {/* Bio */}
          <div data-aos="fade-up" data-aos-delay="80">
            <div className="space-y-5 text-lg leading-relaxed text-muted max-w-2xl">
              <p>
                I'm a software engineer who recently earned a{" "}
                <span className="text-fg">B.S. in Computer Science from San Jose State University</span>.
                I work across backend, cloud, and applied AI — building APIs, deployment
                pipelines, and the infrastructure that keeps products reliable as they grow.
              </p>
              <p>
                Right now I'm a backend engineer at{" "}
                <span className="text-fg">Bercerita</span>, where I build KIRA — an
                English-learning platform for students in Indonesia — and a research assistant at{" "}
                <span className="text-fg">SJSU</span>, running large-scale earthquake-rupture
                simulations on high-performance computing clusters.
              </p>
            </div>

            <div className="mt-10">
              <p className="label">Focus areas</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {focusAreas.map((area) => (
                  <span key={area} className="tag">{area}</span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="label">Outside work</p>
              <p className="mt-3 text-muted max-w-2xl">
                Badminton, bodybuilding, mechanical keyboards, and reading.
              </p>
            </div>

            <div className="mt-10">
              <a href={resume} target="_blank" rel="noreferrer" className="btn btn-secondary">
                <DownloadIcon />
                Download résumé
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
    </svg>
  );
}
