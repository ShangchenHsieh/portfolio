import "../App.css";
import { useState, useEffect } from "react";
import "../componentStyling/SlideBar.css"

function GitHubIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.2 11.38c.6.11.8-.26.8-.58v-2.03c-3.34.72-4.03-1.42-4.03-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.08-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.3.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 016.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.2.69.8.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3A2 2 0 0121 5v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.34 10.34H5.67V18h2.67v-7.66zM7 5.78a1.56 1.56 0 100 3.12 1.56 1.56 0 000-3.12zM18.33 13.5c0-2.3-1.22-3.37-2.85-3.37-1.31 0-1.9.72-2.23 1.22v-1.04h-2.67V18h2.67v-4.26c0-1.13.21-2.22 1.61-2.22 1.38 0 1.4 1.29 1.4 2.3V18h2.67v-4.5z" />
    </svg>
  );
}

function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm11.5 1.5a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z" />
    </svg>
  );
}

export default function Slidebar() {
  const [select, setSelect] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  // Track active section with IntersectionObserver instead of reading layout on every scroll.
  useEffect(() => {
    const sections = ['home', 'about', 'resume', 'projects', 'certificates', 'contact'];
    const visibleEntries = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleEntries.set(entry.target.id, entry.intersectionRatio);
        });

        const sorted = Array.from(visibleEntries.entries())
          .filter(([, ratio]) => ratio > 0)
          .sort((a, b) => b[1] - a[1]);

        if (sorted[0]) {
          const current = sorted[0][0];
          setActiveSection(current);
          const activeIndex = sections.indexOf(current);
          if (activeIndex !== -1) {
            setSelect(activeIndex);
          }
        }
      },
      {
        root: null,
        rootMargin: '-35% 0px -35% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    const sectionElements = sections
      .map((sectionId) => document.getElementById(sectionId))
      .filter(Boolean);

    sectionElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { label: "Home", href: "/#", id: "home" },
    { label: "About Me", href: "#about", id: "about" },
    { label: "Experience", href: "#resume", id: "resume" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Certificates", href: "#certificates", id: "certificates" },
    { label: "Contact", href: "#contact", id: "contact" }
  ];

  const socialLinks = [
    {
      icon: GitHubIcon,
      url: "https://github.com/ShangchenHsieh",
      label: "GitHub"
    },
    {
      icon: LinkedInIcon,
      url: "https://www.linkedin.com/in/shang-chen-hsieh-598167222/",
      label: "LinkedIn"
    },
    {
      icon: InstagramIcon,
      url: "https://www.instagram.com/sean_chen.h/",
      label: "Instagram"
    }
  ];

  return (
    <div className="slidebar-container">
      <div className="nav flex text-white text-lg mt-10 flex-col align-middle justify-center text-center w-full gap-6 overflow-hidden px-6">
        {/* Profile Section */}
        <div data-aos="slide-down" className="mb-4">
          <div className="relative inline-block">
            <img
              src={require("../assets/images/MyImage.jpg")}
              alt="Shangchen Hsieh"
              className="rounded-full border-2 border-zinc-600 hover:border-blue-500 cursor-pointer mx-auto max-w-[180px] w-full aspect-square object-cover transition-all duration-300"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <h3 className="text-white name py-4 font-semibold text-xl">
            Shang-chen<br />
            <span className="gradient-text">Hsieh</span>
          </h3>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={() => setSelect(index)}
              className={`block py-3 px-4 rounded-lg font-medium transition-all duration-300 relative group ${select === index || activeSection === item.id
                ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                : "text-zinc-300 hover:text-blue-400 hover:bg-zinc-800/50"
                }`}
              data-aos="slide-right"
              data-aos-delay={index * 100}
            >
              <span className="relative z-10">{item.label}</span>
              {(select === index || activeSection === item.id) && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg"></div>
              )}
            </a>
          ))}
        </nav>

        {/* Social Links */}
        <div
          className="flex justify-center gap-4 pt-6"
          data-aos="slide-up"
          data-aos-delay="600"
        >
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-zinc-800/50 border border-zinc-700 rounded-full hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 group"
                title={social.label}
              >
                <IconComponent className="w-5 h-5 text-zinc-400 group-hover:text-blue-400 transition-colors" />
              </a>
            );
          })}
        </div>



        {/* Status Indicator */}
        <div
          className="mt-6 pt-4 border-t border-zinc-800"
          data-aos="fade-up"
          data-aos-delay="1000"
        >
          <div className="flex items-center justify-center gap-2 text-sm text-zinc-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Available for opportunities</span>
          </div>
        </div>
      </div>
    </div>
  );
}