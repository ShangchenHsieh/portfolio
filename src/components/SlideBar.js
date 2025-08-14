import "../App.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useState, useEffect } from "react";
import "../componentStyling/SlideBar.css"

export default function Slidebar() {
  const [select, setSelect] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  // Auto-detect active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'resume', 'projects', 'certificates', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          setSelect(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
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
      url: "https://www.instagram.com/seanch.h___/",
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
              <button
                key={index}
                onClick={() => window.open(social.url, "_blank")}
                className="p-3 bg-zinc-800/50 border border-zinc-700 rounded-full hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 group"
                title={social.label}
              >
                <IconComponent className="w-5 h-5 text-zinc-400 group-hover:text-blue-400 transition-colors" />
              </button>
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