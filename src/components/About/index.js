import "../../App.css";
import resume from "../../assets/files/Shangchen_Hsieh_Resume.pdf"
import animationData from "../../assets/Animation - 1717655438885.json"
import Lottie from "react-lottie";

export default function About() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderer: 'svg'
  }

  const skills = [
    "Fullstack Development",
    "Database Systems",
    "AWS Cloud Services",
    "AI / ML Integration",
  ];

  const interests = [
    "💪 Bodybuilding",
    "🏸 Badminton",
    "📖 Reading",
  ];

  return (
    <div
      id="about"
      className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="head text-5xl md:text-6xl font-bold mb-6"
            data-aos="fade-up"
          >
            About <span className="gradient-text">Me</span>
          </h2>
          <div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
            data-aos="fade-up"
            data-aos-delay="200"
          ></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="space-y-8">
            {/* Introduction */}
            <div
              className="modern-card"
              data-aos="fade-right"
              data-aos-duration="800"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Hi, I'm <span className="gradient-text">Sean</span>
              </h3>
              <p className="text-zinc-300 text-lg leading-relaxed mb-6">
                A passionate software developer,
                specializing in fullstack development and AI/ML implementation.
                I bring dedication and innovation to every project I work on.
              </p>
              <p className="text-zinc-300 text-lg leading-relaxed">
                Beyond academics, I enjoy customizing hardware peripherals like desktops
                and keyboards. I maintain a healthy work-life balance through badminton,
                Brazilian Jiu-Jitsu, and bodybuilding.
              </p>
            </div>

            {/* Skills */}
            <div
              className="modern-card"
              data-aos="fade-right"
              data-aos-delay="200"
              data-aos-duration="800"
            >
              <h4 className="text-xl font-semibold mb-4 gradient-text">Core Expertise</h4>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-full text-sm font-medium text-zinc-300 hover:border-blue-500 hover:text-blue-400 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div
              className="modern-card"
              data-aos="fade-right"
              data-aos-delay="400"
              data-aos-duration="800"
            >
              <h4 className="text-xl font-semibold mb-4 gradient-text">When I'm Not Coding</h4>
              <div className="grid grid-cols-2 gap-3">
                {interests.map((interest, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-zinc-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    <span className="text-lg">{interest}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div
              className="flex flex-col sm:flex-row gap-4"
              data-aos="fade-right"
              data-aos-delay="600"
              data-aos-duration="800"
            >
              <a
                href={resume}
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2 group"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download Resume</span>
              </a>

              <a
                href="#contact"
                className="btn-secondary inline-flex items-center justify-center gap-2 group"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Let's Talk</span>
              </a>
            </div>
          </div>

          {/* Animation Side */}
          <div
            className="flex justify-center items-center"
            data-aos="fade-left"
            data-aos-duration="800"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>

              {/* Animation container */}
              <div className="relative glass-light p-8 rounded-3xl">
                <Lottie
                  options={defaultOptions}
                  height={400}
                  width={400}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          data-aos="fade-up"
          data-aos-delay="800"
          data-aos-duration="800"
        >
          {[
            { number: "2+", label: "Years Experience" },
            { number: "10+", label: "Projects Completed" },
            { number: "5+", label: "Technologies Mastered" },
            { number: "300%", label: "Dedication" }
          ].map((stat, index) => (
            <div key={index} className="text-center modern-card">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-zinc-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}