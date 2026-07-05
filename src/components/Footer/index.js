const SOCIALS = [
  { Icon: GitHubIcon, url: "https://github.com/ShangchenHsieh", label: "GitHub" },
  {
    Icon: LinkedInIcon,
    url: "https://www.linkedin.com/in/shang-chen-hsieh-598167222/",
    label: "LinkedIn",
  },
  { Icon: InstagramIcon, url: "https://www.instagram.com/sean_chen.h/", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <span className="marker" aria-hidden="true" />
          <div>
            <p className="font-semibold text-fg leading-tight">Sean Hsieh</p>
            <p className="mono text-xs text-muted mt-0.5">Software Engineer · San Jose, CA</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
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
      <div className="container pb-8">
        <p className="mono text-xs text-muted">
          <span className="text-accent">$</span> echo "thanks for scrolling"
        </p>
        <p className="mono text-xs text-muted mt-2">
          © {new Date().getFullYear()} Shang-chen Hsieh — built with React.
        </p>
      </div>
    </footer>
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
