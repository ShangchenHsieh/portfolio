import { projects, certificates, focusAreas } from "../../constants";

export const SECTION_IDS = ["home", "about", "resume", "projects", "certificates", "contact"];

const EMAIL = "shang-chen.hsieh@sjsu.edu";
const GITHUB = "https://github.com/ShangchenHsieh";
const LINKEDIN = "https://www.linkedin.com/in/shang-chen-hsieh-598167222/";

/**
 * Pure command registry for the hero terminal. Side effects are injected so
 * this module stays unit-testable; every fn returns the string to print.
 */
export function createCommands({ scrollTo, setTheme, openResume, clear }) {
  const commands = {
    help: {
      description: "list available commands",
      fn: () =>
        [
          "available commands:",
          "",
          ...Object.entries(commands).map(
            ([name, entry]) => `  ${(entry.usage || name).padEnd(24)} ${entry.description}`
          ),
        ].join("\n"),
    },
    about: {
      description: "who is sean?",
      fn: () =>
        [
          "Shang-chen (Sean) Hsieh — software engineer, San Jose CA.",
          "B.S. Computer Science @ SJSU. Backend, cloud & applied AI.",
          "Currently: KIRA @ Bercerita · earthquake research @ SJSU.",
        ].join("\n"),
    },
    projects: {
      description: "list selected work",
      fn: () =>
        [
          ...projects.map((p) => `▸ ${p.title} — ${p.link || p.code}`),
          "",
          "run 'goto projects' for the full cards.",
        ].join("\n"),
    },
    skills: {
      description: "focus areas",
      fn: () => focusAreas.map((area) => `▸ ${area}`).join("\n"),
    },
    certs: {
      description: "certifications",
      fn: () => certificates.map((c) => `▸ ${c.title} — ${c.issuer}`).join("\n"),
    },
    resume: {
      description: "open résumé (pdf)",
      fn: () => {
        openResume();
        return "opening Shangchen_Hsieh_Resume.pdf …";
      },
    },
    contact: {
      description: "how to reach me",
      fn: () => [`email     ${EMAIL}`, `linkedin  ${LINKEDIN}`, `github    ${GITHUB}`].join("\n"),
    },
    goto: {
      description: "scroll to a section",
      usage: "goto <section>",
      fn: (section) => {
        if (!SECTION_IDS.includes(section)) {
          return `usage: goto <${SECTION_IDS.join("|")}>`;
        }
        scrollTo(section);
        return `navigating to #${section} …`;
      },
    },
    theme: {
      description: "switch color theme",
      usage: "theme <dark|light>",
      fn: (mode) => {
        if (mode !== "dark" && mode !== "light") return "usage: theme <dark|light>";
        setTheme(mode);
        return `theme set to ${mode}`;
      },
    },
    clear: {
      description: "clear the screen",
      fn: () => {
        clear();
        return "";
      },
    },
    sudo: {
      description: "try 'sudo hire-sean'",
      fn: (...args) =>
        args.join(" ") === "hire-sean"
          ? `permission granted ✔ — forwarding to ${EMAIL} … (or just run 'contact')`
          : "sudo: you're not root here :)",
    },
    ls: {
      description: "list this directory",
      fn: () => "about/  resume.pdf  projects/  certificates/  contact/",
    },
    pwd: {
      description: "print working directory",
      fn: () => "/users/sean/portfolio",
    },
    whoami: {
      description: "print effective user",
      fn: () => "sean — full-stack & AI engineer",
    },
    exit: {
      description: "leave the shell",
      fn: () => "nice try — this shell has no exit. the rest of the site is below ↓",
    },
  };

  return commands;
}
