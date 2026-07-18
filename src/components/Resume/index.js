import "../../App.css";
import resume from "../../assets/files/Shangchen_Hsieh_Resume.pdf";
import PhotoThumbs from "../Lightbox";
import SectionHeader from "../SectionHeader";
import { Reveal } from "../../motion/variants";
import researchPoster from "../../assets/images/research_assistant_poster.JPG";
import kiraTeam from "../../assets/images/kira_team_picture.jpg";
import kiraWholeTeam from "../../assets/images/kira_whole_team_picture.jpg";

const EXPERIENCES = [
  {
    title: "Backend Engineer · Bercerita",
    date: "Nov 2025 – Jan 2026",
    type: "work",
    description: [
      "Cut quiz-image load times by 90%+ (2–3 s → ~150 ms) for users in Indonesia by adding CloudFront edge caching.",
      "Refactored the API into modular endpoints, improving readability and accelerating future feature work.",
    ],
    images: [
      { src: kiraWholeTeam, caption: "The Bercerita team and partners" },
    ],
  },
  {
    title: "Teaching Assistant · San Jose State University",
    date: "Sep 2025 – Dec 2025",
    type: "work",
    description:
      "Led discussion sections, code reviews, and pair-programming for the Computing Practice & Programming course, helping students build practical, job-ready coding skills.",
  },
  {
    title: "Research Assistant · San Jose State University",
    date: "Jul 2025 – AUG 2026",
    type: "work",
    note: "“Analysis of Energy Budgets as a Means of Comparing Modeled Subduction Zone Earthquakes at Cascadia and Sumatra”",
    description: [
      "Model dynamic earthquake rupture in SeisSol, running large-scale simulations on high-performance computing clusters and visualizing results in ParaView.",
      "Compare energy budgets of modeled megathrust earthquakes across the Cascadia and Sumatra subduction zones.",
      "Presented a research poster at the 2026 Seismological Society of America (SSA) Annual Meeting.",
    ],
    images: [
      {
        src: researchPoster,
        caption: "Presenting my research poster at the SSA Annual Meeting",
      },
    ],
  },
  {
    title: "Software Engineer · Bercerita",
    date: "Apr 2025 – Aug 2025",
    type: "work",
    description: [
      "Engineered and shipped core features for KIRA, a gamified English-learning platform, boosting engagement among Indonesian elementary students.",
      "Drove Agile workflows across a team of 3 engineers, 1 designer, and 1 PM, reaching 70% product completion in 4 months.",
      "Architected a state-machine-driven agentic system to autonomously generate AI-powered weekly quizzes.",
      "Built a fully automated CI/CD pipeline with GitHub Actions, Docker, Amazon S3, and AWS Elastic Beanstalk, cutting deployment overhead by ~120 hours per quarter.",
      "Deployed an email notification system on AWS SES, streamlining user communication and improving retention.",
    ],
    images: [
      { src: kiraTeam, caption: "Presenting “Intro to KIRA” with the Bercerita team" },
    ],
  },
  {
    title: "B.S. Computer Science · San Jose State University",
    date: "May 2025",
    type: "education",
    description:
      "Bachelor's degree focused on software engineering and machine learning.",
  },
  {
    title: "Guest Speaker · International Gateways, SJSU",
    date: "Nov 2023",
    type: "work",
    description:
      "Shared my academic and career journey with international students, offering guidance for similar paths.",
  },
  {
    title: "Developer Intern · Developer's Guild",
    date: "Aug 2021 – May 2022",
    type: "work",
    description: [
      "Built a blog-publishing system with REST APIs in Spring Boot, designed for scalability and efficient resource use.",
      "Optimized MySQL queries, improving query performance by 13%.",
    ],
  },
];

const STRENGTHS = ["Problem-solving", "Collaboration", "Communication", "Ownership", "Goal-driven"];

export default function Resume() {
  return (
    <section id="resume" className="section section-alt">
      <div className="container">
        <SectionHeader index="02" eyebrow="Experience" title="Experience & education" />

        <div className="max-w-3xl">
          <ol className="relative border-l border-line ml-1.5">
            {EXPERIENCES.map((exp, index) => (
              <Reveal
                as="li"
                key={index}
                delay={Math.min(index * 0.06, 0.24)}
                className="relative pl-7 sm:pl-9 pb-11 last:pb-0"
              >
                <span
                  className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-[2px] bg-accent"
                  aria-hidden="true"
                />

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="mono text-xs text-muted">{exp.date}</span>
                  {exp.type === "education" && <span className="tag">Education</span>}
                </div>

                <h3 className="mt-1.5 text-lg font-semibold text-fg">{exp.title}</h3>

                {exp.note && (
                  <p className="mt-1.5 text-sm text-muted italic max-w-2xl">{exp.note}</p>
                )}

                {Array.isArray(exp.description) ? (
                  <ul className="mt-3 space-y-2 text-muted max-w-2xl">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex gap-2.5">
                        <span className="mt-[0.55rem] marker flex-none" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-muted max-w-2xl">{exp.description}</p>
                )}

                {exp.images && <PhotoThumbs photos={exp.images} />}
              </Reveal>
            ))}
          </ol>

          <hr className="rule mt-4 mb-8" />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="label">Strengths</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {STRENGTHS.map((s) => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </div>
            <a href={resume} target="_blank" rel="noreferrer" className="btn btn-secondary shrink-0">
              <DownloadIcon />
              Download résumé
            </a>
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
