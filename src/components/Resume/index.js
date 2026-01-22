import BarGraph from "./BarGraph";
import resume from "../../assets/files/Shangchen_Hsieh_Resume.pdf"
import aws_cloud from "../../assets/files/aws_cloud.pdf"

export default function Resume() {
  const skills = [
    { name: "Problem Solving", percent: 100 },
    { name: "Collaborative", percent: 100 },
    { name: "Interpsersonal", percent: 100 },
    { name: "Goal-driven", percent: 100 },
  ];

  const experiences = [
    {
      title: "Backend Engineer - BERCERITA",
      date: "November 2025 - January 2026",
      type: "work",
      description: [
        "Improved quiz-taking experience by implementing CloudFront caching, reducing image load times by over 90% (2–3seconds to 150 ms) when accessing from Indonesia.",
        "Refactored API codebase to modularize endpoints, improve readability, and simplify future feature development."
      ],
    },
    {
      title: "Teaching Assistant - San Jose State University",
      date: "September 2025 - December 2025",
      type: "work",
      description: "Computing Practice and Programming course, assisting students in mastering programming concepts and practical coding skills via conducting code reviews, pair programming sessions, and leading discussion sections."
    },
    {
      title: "Research Assistant - San Jose State University",
      date: "July 2025 - Present",
      type: "work",
      description: "Conduct research in dynamic rupture modeling using SeisSol, running large-scale simulations on high-performance computing clusters and visualization with Paraview."
    },
    {
      title: "Software Engineer - BERCERITA",
      date: "April 2025 - August 2025",
      type: "work",
      description: ["Engineered and integrated core functionalities for KIRA, a gamified English-learning platform, boosting engagement among Indonesian elementary students.",
        "Orchestrated Agile workflows within a cross-functional team of 3 engineers, 1 UI/UX designer, and 1 project manager, accelerating development to achieve 70% product completion within 4 months.",
        "Architected an agentic system powered by a state machine to autonomously generate AI-driven weekly quizzes, improving content delivery efficiency.",
        "Built a fully automated CI/CD pipeline leveraging GitHub Actions, Docker, Amazon S3, and AWS Elastic Beanstalk, with integrated unit testing — reducing deployment overhead by 120 man-hours per quarter.",
        "Deployed a scalable email-based notification system via AWS Simple Email Service (SES) to streamline user communication and improve retention."
      ],
    },
    {
      title: "Bachelor of Science in Computer Science",
      date: "May 2025",
      type: "education",
      description: "Bachelor's degree at San Jose State University with focus on software engineering and machine learning.",
    },
    {
      title: "Guest Speaker at International Gateways",
      date: "November 16, 2023",
      type: "work",
      description: "Shared academic journey experiences with international students at San Jose State University, providing guidance and insights for similar career paths.",
    },
    {
      title: "Developer Intern - Developer's Guild",
      date: "August 2021 - May 2022",
      type: "work",
      description: [
        "Designed a blog posting system with REST APIs using Spring Boot framework, ensuring scalability and efficient resource utilization",
        "Optimized SQL queries in MySQL for efficient data management, resulting in 13% improvement in query performance",
      ]
    }
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'certification':
        return (
          <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'education':
        return (
          <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
          </svg>
        );
      case 'speaking':
        return (
          <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
          </svg>
        );
    }
  };

  return (
    <div id="resume" className="section-container min-h-screen px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="head text-5xl md:text-6xl font-bold mb-6"
            data-aos="fade-up"
          >
            My <span className="gradient-text">Journey</span>
          </h2>
          <div
            className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 mx-auto rounded-full mb-6 shadow-lg"
            data-aos="fade-up"
            data-aos-delay="200"
          ></div>
          <p
            className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            A timeline of my professional growth, education, and key achievements
            in the world of technology and software development.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Experience Timeline */}
          <div className="space-y-8">
            <h3
              className="text-3xl font-bold mb-8 gradient-text"
              data-aos="fade-right"
            >
              Experience & Education
            </h3>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>

              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="relative flex gap-6"
                    data-aos="fade-right"
                    data-aos-delay={index * 100}
                  >
                    {/* Timeline dot */}
                    <div className="flex-shrink-0 w-12 h-12 bg-zinc-800 border-4 border-blue-500 rounded-full flex items-center justify-center relative z-10">
                      {getIcon(exp.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 modern-card">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h4 className="text-xl font-bold text-white">{exp.title}</h4>
                        <span className="text-sm text-zinc-400 font-medium">{exp.date}</span>
                      </div>

                      {Array.isArray(exp.description) ? (
                        <ul className="space-y-2 text-zinc-300">
                          {exp.description.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-blue-400 mt-2">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-zinc-300 mb-4">{exp.description}</p>
                      )}

                      {exp.link && (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {exp.linkText}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="space-y-8">
            <h3
              className="text-3xl font-bold mb-8 gradient-text"
              data-aos="fade-left"
            >
              Soft Skills
            </h3>

            <div className="modern-card space-y-6">
              {skills.map((skill, index) => (
                <BarGraph
                  key={index}
                  name={skill.name}
                  percent={skill.percent}
                  delay={index * 100}
                />
              ))}
            </div>

            {/* Resume Download */}
            <div
              className="modern-card text-center"
              data-aos="fade-left"
              data-aos-delay="600"
            >
              <h4 className="text-xl font-bold mb-4">Want to know more?</h4>
              <p className="text-zinc-400 mb-6">
                Download my complete resume for detailed information about my experience and projects.
              </p>
              <a
                href={resume}
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2 group"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}