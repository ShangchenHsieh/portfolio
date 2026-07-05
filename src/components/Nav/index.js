import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import "./nav.css";

const NAV_ITEMS = [
  { label: "About", id: "about" },
  { label: "Experience", id: "resume" },
  { label: "Projects", id: "projects" },
  { label: "Certificates", id: "certificates" },
  { label: "Contact", id: "contact" },
];

const SOCIALS = [
  { Icon: GitHubIcon, url: "https://github.com/ShangchenHsieh", label: "GitHub" },
  {
    Icon: LinkedInIcon,
    url: "https://www.linkedin.com/in/shang-chen-hsieh-598167222/",
    label: "LinkedIn",
  },
  { Icon: InstagramIcon, url: "https://www.instagram.com/sean_chen.h/", label: "Instagram" },
];

export default function Nav() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Solidify the bar once the page has scrolled a little.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in view.
  useEffect(() => {
    const ids = ["home", ...NAV_ITEMS.map((item) => item.id)];
    const ratios = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => ratios.set(entry.target.id, entry.intersectionRatio));
        const top = Array.from(ratios.entries())
          .filter(([, ratio]) => ratio > 0)
          .sort((a, b) => b[1] - a[1])[0];
        if (top) setActiveSection(top[0]);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const linksRef = useRef(null);
  const [marker, setMarker] = useState({ x: 0, visible: false });

  // Slide the amber marker under the active desktop link.
  useEffect(() => {
    const update = () => {
      const nav = linksRef.current;
      const link = nav?.querySelector('[data-active="true"]');
      if (!link) {
        setMarker((m) => ({ ...m, visible: false }));
        return;
      }
      setMarker({ x: link.offsetLeft + link.offsetWidth / 2 - 3, visible: true });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [activeSection]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-nav" data-scrolled={scrolled}>
      <div className="container">
        <div className="site-nav__inner">
          <a href="#home" className="site-nav__brand" onClick={closeMenu}>
            <span className="marker" aria-hidden="true" />
            Sean Hsieh
          </a>

          <nav className="site-nav__links" aria-label="Primary" ref={linksRef}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="site-nav__link"
                data-active={activeSection === item.id}
              >
                {item.label}
              </a>
            ))}
            <span
              className="site-nav__marker"
              data-visible={marker.visible}
              style={{ transform: `translateX(${marker.x}px)` }}
              aria-hidden="true"
            />
          </nav>

          <div className="site-nav__right">
            <div className="site-nav__social">
              {SOCIALS.map(({ Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-btn"
                  aria-label={label}
                >
                  <Icon className="w-[18px] h-[18px]" />
                </a>
              ))}
            </div>

            <span className="site-nav__divider" aria-hidden="true" />

            <button
              type="button"
              className="icon-btn"
              onClick={toggle}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              {theme === "dark" ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>

            <button
              type="button"
              className="icon-btn site-nav__burger"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <div className="container">
            <nav aria-label="Mobile">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="mobile-menu__link"
                  data-active={activeSection === item.id}
                  onClick={closeMenu}
                >
                  {item.label}
                  <span aria-hidden="true">→</span>
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2 py-5">
              {SOCIALS.map(({ Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-btn"
                  aria-label={label}
                >
                  <Icon className="w-[18px] h-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- icons ---------- */

function SunIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
    </svg>
  );
}

function MenuIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

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
