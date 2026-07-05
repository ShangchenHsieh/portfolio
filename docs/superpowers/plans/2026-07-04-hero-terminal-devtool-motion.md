# Hero Terminal + Dev-tool Motion Pass — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an interactive hero terminal (split hero) and a coherent dev-tool motion language across the whole site, replacing AOS with `motion/react`.

**Architecture:** A pure command registry (`Terminal/commands.js`) is consumed by a `TerminalWindow` component (boot via `typewriter-effect`, interactive shell via lazily-loaded `react-console-emulator`). Site-wide motion uses `motion/react` LazyMotion primitives (`Reveal`/`Stagger`) plus a decode-on-view hook; all `data-aos` usage and the `aos` dependency are removed.

**Tech Stack:** CRA (react-scripts 5), React 18.2, Tailwind 3 (token-mapped classes like `text-fg`, `border-line`), CSS variables in `App.css`, `motion` v12, `react-console-emulator` v5, `typewriter-effect` (already installed), Jest + React Testing Library (via react-scripts).

## Global Constraints

- No gradients, no glassmorphism, no new fonts, no new images (spec + saved user preference).
- All copy/content stays byte-identical unless a task explicitly adds new text (footer echo line, terminal output).
- Colors only via existing CSS variables / Tailwind token classes (`--accent`, `text-fg`, `border-line`, …). Never hard-code hex values in components.
- `prefers-reduced-motion: reduce` ⇒ every animation collapses to instant, fully-visible content (typing, decode, reveals, marker slide).
- Everything the terminal can output must already exist in the page sections — no exclusive content.
- Net bundle increase ≤ ~20 KB gz. `react-console-emulator` must be lazy-loaded (`React.lazy`).
- Run all commands from repo root: `/Users/sean/Projects/portfolios/portfolio_02`.
- Every component keeps the existing code style: function components, double quotes, Tailwind classes inline, icons as local `function XIcon()` helpers.

---

### Task 1: Dependencies, AOS removal, LazyMotion scaffold, test scaffolding

**Files:**
- Modify: `package.json` (via npm commands)
- Modify: `src/Layout/Layout.js` (full rewrite, it's 35 lines)
- Modify: `src/setupTests.js`
- Modify: `src/App.test.js` (replace stale CRA default — it asserts "learn react" which no longer exists)

**Interfaces:**
- Produces: `<Layout>` now provides `LazyMotion` context — every later task may use `m.*` components (strict mode: `m.div`, never `motion.div`).
- Produces: jsdom polyfills for `matchMedia`, `IntersectionObserver`, `scrollIntoView` — all later tests rely on these.

- [ ] **Step 1: Install/remove dependencies**

```bash
npm install motion react-console-emulator
npm uninstall aos
```

Expected: `package.json` gains `"motion"` and `"react-console-emulator"`, loses `"aos"`.

- [ ] **Step 2: Rewrite `src/Layout/Layout.js`** (drop AOS init, add LazyMotion, convert to function component)

```jsx
import { LazyMotion, domAnimation } from "motion/react";
import "../App.css";

export default function Layout({ children }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="page">{children}</div>
    </LazyMotion>
  );
}
```

- [ ] **Step 3: Extend `src/setupTests.js`** (append below the existing jest-dom import)

```js
// jsdom lacks these browser APIs; components under test rely on them.
window.matchMedia =
  window.matchMedia ||
  function matchMedia(query) {
    return {
      matches: false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
    };
  };

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = window.IntersectionObserver || MockIntersectionObserver;

window.HTMLElement.prototype.scrollIntoView =
  window.HTMLElement.prototype.scrollIntoView || function scrollIntoView() {};
```

- [ ] **Step 4: Replace `src/App.test.js` with a real smoke test**

```jsx
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the hero with Sean's name", async () => {
  render(<App />);
  expect(await screen.findByRole("heading", { name: /sean hsieh/i })).toBeInTheDocument();
});
```

- [ ] **Step 5: Run tests and build**

Run: `CI=true npm test -- --watchAll=false`
Expected: PASS (1 test). Note: passes both before and after later tasks — it's the canary.

Run: `npm run build`
Expected: `Compiled successfully` (warnings about unused vars are failures — fix them).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: swap aos for motion (LazyMotion scaffold), add test polyfills"
```

---

### Task 2: Motion primitives + decode hook

**Files:**
- Create: `src/motion/variants.js`
- Create: `src/hooks/useDecodeText.js`
- Test: `src/hooks/useDecodeText.test.js`

**Interfaces:**
- Produces: `Reveal({ as, delay, ...rest })`, `Stagger({ as, ...rest })`, `StaggerItem({ as, ...rest })` — render `m[as]` elements (default `div`), forward all other props (`className`, `aria-label`, …).
- Produces: `useDecodeText(text)` → `{ ref, display }` — attach `ref` to the visible element, render `display`.

- [ ] **Step 1: Write the failing test** — `src/hooks/useDecodeText.test.js`

```jsx
import { render, screen } from "@testing-library/react";
import { useDecodeText } from "./useDecodeText";

function Probe({ text }) {
  const { ref, display } = useDecodeText(text);
  return <h2 ref={ref}>{display}</h2>;
}

test("renders the real text immediately (before any intersection)", () => {
  render(<Probe text="Selected work" />);
  expect(screen.getByText("Selected work")).toBeInTheDocument();
});

test("keeps static text under prefers-reduced-motion", () => {
  const original = window.matchMedia;
  window.matchMedia = (query) => ({
    matches: query.includes("prefers-reduced-motion"),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  });
  render(<Probe text="Who I am" />);
  expect(screen.getByText("Who I am")).toBeInTheDocument();
  window.matchMedia = original;
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `CI=true npm test -- --watchAll=false useDecodeText`
Expected: FAIL — `Cannot find module './useDecodeText'`

- [ ] **Step 3: Create `src/hooks/useDecodeText.js`**

```js
import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*+=<>/\\_";
const FRAME_MS = 24;
const CHARS_PER_FRAME = 0.45;

/**
 * Scramble-decode `text` once, the first time the ref'd element enters the
 * viewport. Renders plain text until then (and always, under reduced motion).
 */
export function useDecodeText(text) {
  const [display, setDisplay] = useState(text);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let timer = null;
    let played = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played) return;
        played = true;
        observer.disconnect();
        let revealed = 0;
        timer = setInterval(() => {
          revealed += CHARS_PER_FRAME;
          let out = "";
          for (let i = 0; i < text.length; i += 1) {
            if (i < revealed) out += text[i];
            else if (text[i] === " ") out += " ";
            else out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
          }
          setDisplay(out);
          if (revealed >= text.length) {
            clearInterval(timer);
            timer = null;
            setDisplay(text);
          }
        }, FRAME_MS);
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [text]);

  return { ref, display };
}
```

- [ ] **Step 4: Create `src/motion/variants.js`**

```jsx
import { m, useReducedMotion } from "motion/react";

export const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const EASE = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: "-40px 0px -40px 0px" };

export function Reveal({ as = "div", delay = 0, children, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = m[as] ?? m.div;
  return (
    <Tag
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={VIEWPORT}
      variants={fadeUp}
      transition={{ duration: 0.5, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function Stagger({ as = "div", children, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = m[as] ?? m.div;
  return (
    <Tag initial={reduce ? false : "hidden"} whileInView="visible" viewport={VIEWPORT} variants={stagger} {...rest}>
      {children}
    </Tag>
  );
}

export function StaggerItem({ as = "div", children, ...rest }) {
  const Tag = m[as] ?? m.div;
  return (
    <Tag variants={fadeUp} transition={{ duration: 0.5, ease: EASE }} {...rest}>
      {children}
    </Tag>
  );
}
```

- [ ] **Step 5: Run tests**

Run: `CI=true npm test -- --watchAll=false`
Expected: PASS (3 tests across 2 files).

- [ ] **Step 6: Commit**

```bash
git add src/motion/variants.js src/hooks/useDecodeText.js src/hooks/useDecodeText.test.js
git commit -m "feat: motion primitives (Reveal/Stagger) and decode-on-view hook"
```

---

### Task 3: SectionHeader component + dev-tool CSS tokens

**Files:**
- Create: `src/components/SectionHeader.js`
- Test: `src/components/SectionHeader.test.js`
- Modify: `src/App.css` (append after the `.label` block, ~line 152)

**Interfaces:**
- Consumes: `Reveal` from `src/motion/variants.js`, `useDecodeText` from `src/hooks/useDecodeText.js`.
- Produces: `<SectionHeader index="01" eyebrow="About" title="Who I am" lede={optionalString} />` — used by every section task (4 sections use `lede`, About/Resume don't).

- [ ] **Step 1: Write the failing test** — `src/components/SectionHeader.test.js`

```jsx
import { render, screen } from "@testing-library/react";
import SectionHeader from "./SectionHeader";

test("renders index, eyebrow, decoded title and lede", () => {
  render(<SectionHeader index="03" eyebrow="Projects" title="Selected work" lede="Things I built." />);
  expect(screen.getByText("03")).toBeInTheDocument();
  expect(screen.getByText(/projects/i)).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Selected work" })).toBeInTheDocument();
  expect(screen.getByText("Things I built.")).toBeInTheDocument();
});

test("omits lede when not given", () => {
  const { container } = render(<SectionHeader index="01" eyebrow="About" title="Who I am" />);
  expect(container.querySelectorAll("p")).toHaveLength(1); // just the eyebrow
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `CI=true npm test -- --watchAll=false SectionHeader`
Expected: FAIL — `Cannot find module './SectionHeader'`

- [ ] **Step 3: Create `src/components/SectionHeader.js`**

```jsx
import { Reveal } from "../motion/variants";
import { useDecodeText } from "../hooks/useDecodeText";
import "../App.css";

export default function SectionHeader({ index, eyebrow, title, lede }) {
  const { ref, display } = useDecodeText(title);

  return (
    <header className="mb-12 max-w-2xl">
      <Reveal as="p" className="eyebrow">
        <span className="eyebrow-index">{index}</span>
        {eyebrow}
        <span className="cursor-blink" aria-hidden="true" />
      </Reveal>
      <Reveal
        as="h2"
        delay={0.05}
        aria-label={title}
        className="mt-4 font-semibold tracking-[-0.02em] text-[clamp(1.9rem,4vw,2.75rem)]"
      >
        <span ref={ref} aria-hidden="true">
          {display}
        </span>
      </Reveal>
      {lede && (
        <Reveal as="p" delay={0.1} className="mt-4 text-muted leading-relaxed">
          {lede}
        </Reveal>
      )}
    </header>
  );
}
```

- [ ] **Step 4: Append to `src/App.css`** (after the `.label` rule block, before `/* accent square used inline… */`)

```css
/* dev-tool texture: mono section index + blinking cursor block */
.eyebrow-index {
  color: var(--accent);
  font-weight: 600;
}

.cursor-blink {
  display: inline-block;
  width: 0.5em;
  height: 1.05em;
  background: var(--accent);
  animation: cursor-blink 1.1s steps(1) infinite;
}

@keyframes cursor-blink {
  50% { opacity: 0; }
}
```

(The eyebrow is `display: inline-flex; gap: 0.65rem`, so the index and cursor space themselves automatically. The global `prefers-reduced-motion` block at the bottom of App.css already freezes the blink to a solid block — that's the intended fallback.)

- [ ] **Step 5: Run tests**

Run: `CI=true npm test -- --watchAll=false`
Expected: PASS (5 tests, 3 files).

- [ ] **Step 6: Commit**

```bash
git add src/components/SectionHeader.js src/components/SectionHeader.test.js src/App.css
git commit -m "feat: SectionHeader with mono index, decode title, cursor accent"
```

---

### Task 4: useTheme — direct set + cross-instance sync

The terminal's `theme` command must change the theme, and the Nav (a *separate* `useTheme` instance) must not go stale. Writers set the DOM attribute; a `MutationObserver` keeps every hook instance in sync.

**Files:**
- Modify: `src/hooks/useTheme.js` (full rewrite, 30 lines)
- Test: `src/hooks/useTheme.test.js`

**Interfaces:**
- Produces: `useTheme()` → `{ theme: "dark"|"light", toggle(): void, set(mode): void }` (`set` ignores invalid modes). Existing consumer `Nav` keeps using `{ theme, toggle }` unchanged; Task 6 consumes `set`.

- [ ] **Step 1: Write the failing test** — `src/hooks/useTheme.test.js`

```jsx
import { renderHook, act, waitFor } from "@testing-library/react";
import { useTheme } from "./useTheme";

beforeEach(() => document.documentElement.setAttribute("data-theme", "dark"));

test("set() updates state and the DOM attribute", () => {
  const { result } = renderHook(() => useTheme());
  act(() => result.current.set("light"));
  expect(result.current.theme).toBe("light");
  expect(document.documentElement.getAttribute("data-theme")).toBe("light");
});

test("set() ignores invalid modes", () => {
  const { result } = renderHook(() => useTheme());
  act(() => result.current.set("hotdog"));
  expect(result.current.theme).toBe("dark");
});

test("a second hook instance syncs when the first one sets", async () => {
  const a = renderHook(() => useTheme());
  const b = renderHook(() => useTheme());
  act(() => a.result.current.set("light"));
  await waitFor(() => expect(b.result.current.theme).toBe("light"));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `CI=true npm test -- --watchAll=false useTheme`
Expected: FAIL — `result.current.set is not a function`

- [ ] **Step 3: Rewrite `src/hooks/useTheme.js`**

```js
import { useCallback, useEffect, useState } from "react";

function applyTheme(next) {
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch (e) {
    /* storage unavailable — non-fatal */
  }
}

/**
 * Reads the theme set pre-paint by the inline script in index.html. Writers
 * update the <html data-theme> attribute directly; a MutationObserver keeps
 * every hook instance (Nav, Terminal, …) in sync with that single source.
 */
export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.getAttribute("data-theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      const next = root.getAttribute("data-theme") || "dark";
      setThemeState((current) => (current === next ? current : next));
    });
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const set = useCallback((next) => {
    if (next !== "dark" && next !== "light") return;
    applyTheme(next);
    setThemeState(next);
  }, []);

  const toggle = useCallback(() => {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    setThemeState(next);
  }, []);

  return { theme, toggle, set };
}
```

- [ ] **Step 4: Run tests**

Run: `CI=true npm test -- --watchAll=false`
Expected: PASS (8 tests, 4 files). Nav still compiles (it only destructures `theme` and `toggle`).

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useTheme.js src/hooks/useTheme.test.js
git commit -m "feat: useTheme gains set() and cross-instance sync via MutationObserver"
```

---

### Task 5: Terminal command registry (pure module, TDD)

**Files:**
- Modify: `src/constants/index.js` (add `focusAreas` export — About currently keeps this list privately; single source from now on)
- Modify: `src/components/About/index.js` (import `focusAreas` instead of local `FOCUS_AREAS`)
- Create: `src/components/Terminal/commands.js`
- Test: `src/components/Terminal/commands.test.js`

**Interfaces:**
- Consumes: `projects`, `certificates` arrays from `src/constants` (fields used: `title`, `link`, `code`, `issuer`).
- Produces: `createCommands({ scrollTo, setTheme, openResume, clear })` → registry object shaped for react-console-emulator: `{ [name]: { description, usage?, fn(...args) → string } }`. Also exports `SECTION_IDS = ["home","about","resume","projects","certificates","contact"]`.

- [ ] **Step 1: Add `focusAreas` to `src/constants/index.js`** (append at the end of the file)

```js
export const focusAreas = [
  "Backend & APIs",
  "Full-stack Development",
  "AWS / Cloud",
  "CI/CD & DevOps",
  "AI / ML Integration",
  "Databases",
];
```

In `src/components/About/index.js`: delete the local `FOCUS_AREAS` array (lines 5–12), add `import { focusAreas } from "../../constants";` and change the map to `{focusAreas.map((area) => (…))}`.

- [ ] **Step 2: Write the failing test** — `src/components/Terminal/commands.test.js`

```js
import { createCommands, SECTION_IDS } from "./commands";

function build() {
  const handlers = {
    scrollTo: jest.fn(),
    setTheme: jest.fn(),
    openResume: jest.fn(),
    clear: jest.fn(),
  };
  return { handlers, commands: createCommands(handlers) };
}

test("registers the full command set", () => {
  const { commands } = build();
  const expected = [
    "help", "about", "projects", "skills", "certs", "resume",
    "contact", "goto", "theme", "clear", "sudo", "ls", "pwd", "whoami", "exit",
  ];
  expected.forEach((name) => {
    expect(commands[name]).toBeDefined();
    expect(typeof commands[name].fn).toBe("function");
  });
});

test("help lists every command name", () => {
  const { commands } = build();
  const out = commands.help.fn();
  Object.keys(commands).forEach((name) => expect(out).toContain(name));
});

test("goto scrolls to a valid section", () => {
  const { commands, handlers } = build();
  const out = commands.goto.fn("projects");
  expect(handlers.scrollTo).toHaveBeenCalledWith("projects");
  expect(out).toContain("projects");
});

test("goto rejects unknown sections with usage", () => {
  const { commands, handlers } = build();
  const out = commands.goto.fn("basement");
  expect(handlers.scrollTo).not.toHaveBeenCalled();
  SECTION_IDS.forEach((id) => expect(out).toContain(id));
});

test("theme sets valid modes and rejects the rest", () => {
  const { commands, handlers } = build();
  expect(commands.theme.fn("light")).toContain("light");
  expect(handlers.setTheme).toHaveBeenCalledWith("light");
  handlers.setTheme.mockClear();
  expect(commands.theme.fn("mauve")).toContain("usage");
  expect(handlers.setTheme).not.toHaveBeenCalled();
});

test("resume opens the pdf", () => {
  const { commands, handlers } = build();
  commands.resume.fn();
  expect(handlers.openResume).toHaveBeenCalled();
});

test("clear delegates to the handler", () => {
  const { commands, handlers } = build();
  commands.clear.fn();
  expect(handlers.clear).toHaveBeenCalled();
});

test("projects lists real project titles", () => {
  const { commands } = build();
  expect(commands.projects.fn()).toContain("KIRA");
});

test("sudo hire-sean is rewarding, plain sudo is denied", () => {
  const { commands } = build();
  expect(commands.sudo.fn("hire-sean")).toMatch(/granted/i);
  expect(commands.sudo.fn("rm", "-rf", "/")).toMatch(/not root/i);
});

test("contact includes the email", () => {
  const { commands } = build();
  expect(commands.contact.fn()).toContain("shang-chen.hsieh@sjsu.edu");
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `CI=true npm test -- --watchAll=false commands`
Expected: FAIL — `Cannot find module './commands'`

- [ ] **Step 4: Create `src/components/Terminal/commands.js`**

```js
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
      description: "escalate (try 'sudo hire-sean')",
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
```

- [ ] **Step 5: Run tests**

Run: `CI=true npm test -- --watchAll=false`
Expected: PASS (18 tests, 5 files).

- [ ] **Step 6: Commit**

```bash
git add src/components/Terminal/commands.js src/components/Terminal/commands.test.js src/constants/index.js src/components/About/index.js
git commit -m "feat: terminal command registry (pure, tested); focusAreas to constants"
```

---

### Task 6: TerminalWindow component + terminal.css + split hero

**Files:**
- Create: `src/components/Terminal/index.js`
- Create: `src/components/Terminal/terminal.css`
- Modify: `src/components/Home/index.js` (full rewrite below)
- Test: `src/components/Terminal/Terminal.test.js`

**Interfaces:**
- Consumes: `createCommands` (Task 5), `useTheme().set` (Task 4), `Reveal` (Task 2), `typewriter-effect` (installed), `react-console-emulator` (lazy).
- Produces: `<TerminalWindow />` (default export, no props) — used only by Home.

**Checkpoint (spec §5 risk):** if `react-console-emulator` fails to render/build under React 18 here, STOP and flag — fallback is a hand-rolled input line (~60 lines) with the same registry; do not silently work around it another way.

- [ ] **Step 1: Write the failing test** — `src/components/Terminal/Terminal.test.js`

```jsx
import { render, screen } from "@testing-library/react";
import TerminalWindow from "./index";

// Force the reduced-motion path: boot renders statically and the emulator
// mounts immediately — this doubles as the react-console-emulator compat check.
beforeEach(() => {
  window.matchMedia = (query) => ({
    matches: query.includes("prefers-reduced-motion"),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  });
});

test("renders chrome, static boot transcript and the shell input", async () => {
  render(<TerminalWindow />);
  expect(screen.getByText("sean@portfolio:~ — zsh")).toBeInTheDocument();
  expect(screen.getByText(/building KIRA @ Bercerita/i)).toBeInTheDocument();
  expect(await screen.findByRole("textbox")).toBeInTheDocument(); // emulator input
});

test("quick-command chips are present", async () => {
  render(<TerminalWindow />);
  await screen.findByRole("textbox");
  expect(screen.getByRole("button", { name: /resume/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `CI=true npm test -- --watchAll=false Terminal.test`
Expected: FAIL — `Cannot find module './index'`

- [ ] **Step 3: Create `src/components/Terminal/terminal.css`**

```css
/* ============================================================
   Hero terminal — built entirely from the design tokens
   ============================================================ */

.term {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  font-family: 'JetBrains Mono Variable', ui-monospace, monospace;
  font-size: 0.82rem;
  line-height: 1.75;
  overflow: hidden;
}

.term__bar {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 0.9rem;
  border-bottom: 1px solid var(--border);
}

.term__dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--border-hover);
}

.term__title {
  margin-left: 0.5rem;
  font-size: 0.68rem;
  letter-spacing: 0.04em;
  color: var(--muted);
}

.term__body {
  height: 300px;
  padding: 0.9rem 1rem;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.term__prompt {
  color: var(--accent);
  font-weight: 600;
}

.term__out {
  color: var(--muted);
}

.term__hint {
  color: var(--muted);
  opacity: 0.75;
}

/* boot screen doubles as the skip button */
.term__bootscreen {
  all: unset;
  display: block;
  width: 100%;
  cursor: pointer;
  font: inherit;
  color: var(--text);
}

.term__bootscreen .Typewriter__cursor {
  color: var(--accent);
}

/* quick-command chips */
.term__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding: 0.7rem 0.9rem;
  border-top: 1px solid var(--border);
}

.term__chip {
  font-family: inherit;
  font-size: 0.7rem;
  padding: 0.28rem 0.65rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--muted);
  background: var(--surface-2);
  cursor: pointer;
  transition: border-color 0.18s ease, color 0.18s ease;
}

.term__chip:hover {
  border-color: var(--accent);
  color: var(--accent);
}

@media (max-width: 640px) {
  .term__body {
    height: 250px;
  }
}
```

- [ ] **Step 4: Create `src/components/Terminal/index.js`**

```jsx
import { lazy, Suspense, useMemo, useRef, useState } from "react";
import Typewriter from "typewriter-effect";
import { useTheme } from "../../hooks/useTheme";
import { createCommands } from "./commands";
import resumePdf from "../../assets/files/Shangchen_Hsieh_Resume.pdf";
import "./terminal.css";

const ConsoleEmulator = lazy(() => import("react-console-emulator"));

const CHIP_COMMANDS = ["help", "projects", "resume", "contact"];

const BOOT_LINES = [
  { prompt: true, text: "whoami" },
  { out: true, text: "sean — full-stack & AI engineer, san jose ca" },
  { prompt: true, text: "now" },
  { out: true, text: "▸ building KIRA @ Bercerita" },
  { out: true, text: "▸ earthquake research @ SJSU" },
];

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function TerminalWindow() {
  const [booted, setBooted] = useState(prefersReducedMotion);
  const termRef = useRef(null);
  const { set: setTheme } = useTheme();

  const commands = useMemo(
    () =>
      createCommands({
        scrollTo: (id) =>
          document.getElementById(id)?.scrollIntoView({
            behavior: prefersReducedMotion() ? "auto" : "smooth",
          }),
        setTheme,
        openResume: () => window.open(resumePdf, "_blank", "noreferrer"),
        clear: () => termRef.current?.clearStdout?.(),
      }),
    [setTheme]
  );

  const runChip = (name) => {
    const entry = commands[name];
    if (!entry) return;
    const term = termRef.current;
    if (term && typeof term.pushToStdout === "function") {
      term.pushToStdout(`sean@portfolio:~$ ${name}`);
      const out = entry.fn();
      if (out) term.pushToStdout(out);
    } else {
      entry.fn(); // transcript unavailable — still perform the action
    }
  };

  return (
    <div className="term" role="region" aria-label="Interactive terminal — everything here is also on the page below">
      <div className="term__bar" aria-hidden="true">
        <span className="term__dot" />
        <span className="term__dot" />
        <span className="term__dot" />
        <span className="term__title">sean@portfolio:~ — zsh</span>
      </div>

      <div className="term__body">
        {booted ? (
          <>
            <div aria-hidden="true">
              {BOOT_LINES.map((line, i) =>
                line.prompt ? (
                  <div key={i}>
                    <span className="term__prompt">$</span> {line.text}
                  </div>
                ) : (
                  <div key={i} className="term__out">
                    {line.text}
                  </div>
                )
              )}
              <div className="term__hint">// type 'help' to explore — or just scroll</div>
            </div>
            {/* command output is announced; boot transcript above is decorative */}
            <div aria-live="polite">
            <Suspense fallback={<div className="term__out">loading shell…</div>}>
              <ConsoleEmulator
                ref={termRef}
                commands={commands}
                promptLabel="sean@portfolio:~$"
                errorText="zsh: command not found: [command] — try 'help'"
                noDefaults
                autoFocus={false}
                style={{ background: "transparent", minHeight: 0, width: "100%", padding: 0, overflow: "visible" }}
                contentStyle={{ padding: 0, color: "var(--text)", fontFamily: "inherit", fontSize: "inherit" }}
                inputAreaStyle={{ fontFamily: "inherit" }}
                promptLabelStyle={{ color: "var(--accent)", fontFamily: "inherit", fontSize: "inherit" }}
                inputStyle={{
                  color: "var(--text)",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  border: 0,
                  background: "transparent",
                  padding: 0,
                }}
                inputTextStyle={{ color: "var(--text)" }}
                messageStyle={{ color: "var(--muted)", whiteSpace: "pre-wrap", fontFamily: "inherit" }}
              />
            </Suspense>
            </div>
          </>
        ) : (
          <button
            type="button"
            className="term__bootscreen"
            onClick={() => setBooted(true)}
            aria-label="Skip intro animation"
          >
            <Typewriter
              options={{ delay: 26, cursor: "▍" }}
              onInit={(tw) =>
                tw
                  .typeString('<span class="term__prompt">$</span> whoami')
                  .pauseFor(300)
                  .typeString('<br /><span class="term__out">sean — full-stack &amp; AI engineer, san jose ca</span>')
                  .pauseFor(350)
                  .typeString('<br /><span class="term__prompt">$</span> now')
                  .pauseFor(300)
                  .typeString('<br /><span class="term__out">▸ building KIRA @ Bercerita</span>')
                  .typeString('<br /><span class="term__out">▸ earthquake research @ SJSU</span>')
                  .pauseFor(500)
                  .callFunction(() => setBooted(true))
                  .start()
              }
            />
          </button>
        )}
      </div>

      {booted && (
        <div className="term__chips" role="group" aria-label="Quick commands">
          {CHIP_COMMANDS.map((name) => (
            <button key={name} type="button" className="term__chip" onClick={() => runChip(name)}>
              $ {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

Note on a11y: the transcript is intentionally `aria-hidden` — it duplicates page content (Global Constraints) and a screen-reader user gets the real sections; the region label says so.

- [ ] **Step 5: Rewrite `src/components/Home/index.js`** (split hero; `data-aos` → `Reveal`)

```jsx
import React from "react";
import { Reveal } from "../../motion/variants";
import TerminalWindow from "../Terminal";
import "../../App.css";

export default function Home() {
  return (
    <section id="home" className="min-h-screen flex items-center">
      <div className="container w-full">
        <div className="grid items-center gap-12 py-24 lg:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)]">
          <div className="max-w-3xl">
            <Reveal as="p" className="eyebrow">
              Software Engineer
            </Reveal>

            <Reveal
              as="h1"
              delay={0.05}
              className="mt-5 font-semibold tracking-[-0.03em] leading-[1.02] text-[clamp(2.75rem,8vw,5rem)]"
            >
              Sean Hsieh
            </Reveal>

            <Reveal as="p" delay={0.1} className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-muted">
              Full-stack &amp; AI engineer based in San Jose. I build backend services, cloud
              infrastructure, and applied-AI products — currently engineering{" "}
              <span className="text-fg">KIRA at Bercerita</span> and researching earthquake
              modeling at <span className="text-fg">San Jose State</span>.
            </Reveal>

            <Reveal delay={0.15} className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn btn-primary">
                View my work
                <ArrowRight />
              </a>
              <a href="#contact" className="btn btn-secondary">
                Get in touch
              </a>
            </Reveal>

            <Reveal delay={0.2} className="mt-11 flex items-center gap-2.5 text-sm text-muted mono">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to software engineering roles
            </Reveal>
          </div>

          <Reveal delay={0.25}>
            <TerminalWindow />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ArrowRight() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
```

- [ ] **Step 6: Run tests, then look at it**

Run: `CI=true npm test -- --watchAll=false`
Expected: PASS (20 tests, 6 files). **If the emulator import explodes here → checkpoint: stop, report, switch to the hand-rolled-input fallback.**

Run: `npm start`, open http://localhost:3000 — boot types out, click skips it, `help`/`goto projects`/`theme light` work, chips print + act, layout stacks on a narrow window.

- [ ] **Step 7: Commit**

```bash
git add src/components/Terminal src/components/Home/index.js
git commit -m "feat: hero terminal — boot sequence, interactive shell, split hero"
```

---

### Task 7: About + Resume conversion (indexes 01, 02)

**Files:**
- Modify: `src/components/About/index.js`
- Modify: `src/components/Resume/index.js`

**Interfaces:**
- Consumes: `SectionHeader` (Task 3), `Reveal` (Task 2). No new exports.

- [ ] **Step 1: About — replace header and `data-aos`**

Replace the `<header className="mb-12">…</header>` block (currently eyebrow p + h2 with `data-aos`) with:

```jsx
<SectionHeader index="01" eyebrow="About" title="Who I am" />
```

Add imports: `import SectionHeader from "../SectionHeader";` and `import { Reveal } from "../../motion/variants";`

Convert the two grid children:
- `<div data-aos="fade-up">` (portrait column) → `<Reveal>`  … `</Reveal>`
- `<div data-aos="fade-up" data-aos-delay="80">` (bio column) → `<Reveal delay={0.08}>` … `</Reveal>`

(Keep every class and child untouched. The Task 5 `focusAreas` import is already in place.)

- [ ] **Step 2: Resume — replace header and timeline reveals**

Replace the header block with:

```jsx
<SectionHeader index="02" eyebrow="Experience" title="Experience & education" />
```

Add imports: `import SectionHeader from "../SectionHeader";` and `import { Reveal } from "../../motion/variants";`

Convert each timeline item (currently `<li … data-aos="fade-up" data-aos-delay={…}>`):

```jsx
<Reveal
  as="li"
  key={index}
  delay={Math.min(index * 0.06, 0.24)}
  className="relative pl-7 sm:pl-9 pb-11 last:pb-0"
>
```

…keeping all children identical, closing with `</Reveal>`. No `data-aos` attributes remain in either file (`grep -n "data-aos" src/components/About/index.js src/components/Resume/index.js` returns nothing).

- [ ] **Step 3: Run tests and eyeball**

Run: `CI=true npm test -- --watchAll=false` → PASS.
Run: `npm start` → About/Experience headings decode in with `01`/`02` indexes; timeline items stagger up.

- [ ] **Step 4: Commit**

```bash
git add src/components/About/index.js src/components/Resume/index.js
git commit -m "feat: About + Resume on SectionHeader and motion reveals"
```

---

### Task 8: Projects + Certificates — stagger grids, corner brackets, card indexes

**Files:**
- Modify: `src/components/Projects/index.js`
- Modify: `src/components/Projects/work.js`
- Modify: `src/components/Certificates/index.js`
- Modify: `src/components/Certificates/certificateCard.js`
- Modify: `src/App.css` (append after the `.card-hover` rule)

**Interfaces:**
- Consumes: `SectionHeader`, `Stagger`, `StaggerItem`.
- Produces: `Work` gains required prop `index` (string like `"01"`). `CertificateCard` props unchanged.

- [ ] **Step 1: App.css — card corner brackets + card index** (append after `.card-hover:hover { … }`)

```css
/* dev-tool hover: amber corner brackets + card index */
.card-corners {
  position: relative;
}

.card-corners::before,
.card-corners::after {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  border: 0 solid var(--accent);
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.card-corners::before {
  top: -1px;
  left: -1px;
  border-top-width: 1px;
  border-left-width: 1px;
  border-top-left-radius: 10px;
}

.card-corners::after {
  bottom: -1px;
  right: -1px;
  border-bottom-width: 1px;
  border-right-width: 1px;
  border-bottom-right-radius: 10px;
}

.card-corners:hover::before,
.card-corners:hover::after {
  opacity: 1;
}

.card-idx {
  font-family: 'JetBrains Mono Variable', ui-monospace, monospace;
  font-size: 0.68rem;
  color: var(--muted);
  transition: color 0.2s ease;
}

.card-corners:hover .card-idx {
  color: var(--accent);
}
```

- [ ] **Step 2: Projects/index.js — SectionHeader + stagger grid + index prop**

```jsx
import Work from "./work";
import { projects } from "../../constants";
import SectionHeader from "../SectionHeader";
import { Stagger, StaggerItem } from "../../motion/variants";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeader
          index="03"
          eyebrow="Projects"
          title="Selected work"
          lede="Full-stack applications and applied-AI tools I've built — from an educational platform for classrooms to a course-lookup service used by students at SJSU."
        />

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <StaggerItem key={index} className="h-full">
              <Work
                index={String(index + 1).padStart(2, "0")}
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
```

- [ ] **Step 3: work.js — corners class + index row**

Change the `<article>` opener to:

```jsx
<article className="card card-hover card-corners h-full flex flex-col overflow-hidden">
```

and directly above the `<h3>` inside the `p-5` body add:

```jsx
<span className="card-idx" aria-hidden="true">{index}</span>
```

with `index` added to the destructured props: `export default function Work({ index, title, desc, tags, link, code, img })`. Give the `<h3>` `className="mt-1 text-base font-semibold text-fg"` (was no `mt-1`).

- [ ] **Step 4: Certificates/index.js — same conversion**

```jsx
import CertificateCard from "./certificateCard";
import { certificates } from "../../constants";
import SectionHeader from "../SectionHeader";
import { Stagger, StaggerItem } from "../../motion/variants";

export default function Certificates() {
  return (
    <section id="certificates" className="section">
      <div className="container">
        <SectionHeader
          index="04"
          eyebrow="Certificates"
          title="Certifications"
          lede="Coursework and credentials in cloud and AI, from AWS and NVIDIA."
        />

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate, index) => (
            <StaggerItem key={index} className="h-full">
              <CertificateCard
                title={certificate.title}
                issuer={certificate.issuer}
                date={certificate.date}
                img={certificate.img}
                downloadLink={certificate.downloadLink}
                viewLink={certificate.viewLink}
                tags={certificate.tags}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
```

In `certificateCard.js`, change the `<article>` opener to:

```jsx
<article className="card card-hover card-corners h-full flex flex-col p-5">
```

- [ ] **Step 5: Run tests and eyeball**

Run: `CI=true npm test -- --watchAll=false` → PASS.
Run: `npm start` → project cards cascade in, hovering shows amber corner brackets and the `01` index lights up.

- [ ] **Step 6: Commit**

```bash
git add src/components/Projects src/components/Certificates src/App.css
git commit -m "feat: staggered card grids with corner-bracket hover and indexes"
```

---

### Task 9: Contact + Footer conversion (index 05, echo sign-off)

**Files:**
- Modify: `src/components/Contact/index.js`
- Modify: `src/components/Footer/index.js`

**Interfaces:**
- Consumes: `SectionHeader`, `Reveal`. No new exports.

- [ ] **Step 1: Contact — header + reveals**

Replace the header block with:

```jsx
<SectionHeader
  index="05"
  eyebrow="Contact"
  title="Get in touch"
  lede="Open to software engineering roles and interesting projects. Send a note below or reach me directly — I usually reply within a day or two."
/>
```

Imports: `import SectionHeader from "../SectionHeader";` and `import { Reveal } from "../../motion/variants";`

- On the `<form>`: delete its `data-aos="fade-up"` attribute, then wrap the entire `<form>…</form>` in `<Reveal>` … `</Reveal>` (form markup untouched inside).
- `<div className="space-y-3" data-aos="fade-up" data-aos-delay="80">` → `<Reveal delay={0.08} className="space-y-3">`, keep children, close with `</Reveal>`.

- [ ] **Step 2: Footer — echo line**

In `src/components/Footer/index.js`, replace the copyright block:

```jsx
<div className="container pb-8">
  <p className="mono text-xs text-muted">
    <span className="text-accent">$</span> echo "thanks for scrolling"
  </p>
  <p className="mono text-xs text-muted mt-2">
    © {new Date().getFullYear()} Shang-chen Hsieh — built with React.
  </p>
</div>
```

- [ ] **Step 3: Verify no data-aos remains anywhere**

Run: `grep -rn "data-aos" src/`
Expected: no output. (If anything appears, convert it the same way as above.)

- [ ] **Step 4: Run tests, commit**

Run: `CI=true npm test -- --watchAll=false` → PASS.

```bash
git add src/components/Contact/index.js src/components/Footer/index.js
git commit -m "feat: Contact + Footer conversion, terminal echo sign-off"
```

---

### Task 10: Nav sliding marker + link/tag/button polish

**Files:**
- Modify: `src/components/Nav/index.js`
- Modify: `src/components/Nav/nav.css`
- Modify: `src/App.css` (`.link-accent`, `.tag`, `.btn-primary` blocks)

**Interfaces:**
- Consumes: nothing new (plain CSS transition; no motion import — avoids the heavier `domMax` bundle while giving the same sliding visual promised in the spec).

- [ ] **Step 1: Nav/index.js — measured marker**

Add to the existing imports: `import { useEffect, useRef, useState } from "react";` (useRef is new).

Inside `Nav()`, after the `activeSection` state, add:

```jsx
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
```

Change the desktop nav element to carry the ref and the marker element:

```jsx
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
```

- [ ] **Step 2: nav.css — marker styles, retire the static underline**

Add `position: relative;` to the `.site-nav__links` rule. Delete the whole `.site-nav__link[data-active="true"]::after { … }` block. Add:

```css
.site-nav__marker {
  position: absolute;
  left: 0;
  bottom: -0.15rem;
  width: 6px;
  height: 6px;
  border-radius: 1px;
  background: var(--accent);
  opacity: 0;
  transition: transform 0.45s cubic-bezier(0.5, 1.4, 0.4, 1), opacity 0.2s ease;
  pointer-events: none;
}

.site-nav__marker[data-visible="true"] {
  opacity: 1;
}
```

(The global reduced-motion rule collapses the slide to instant — intended.)

- [ ] **Step 3: App.css — link prompt, dashed underline, tag glow, button ring**

Replace the `.link-accent` block with:

```css
/* accent link: gutter '>' prompt + dashed→solid underline on hover */
.link-accent {
  position: relative;
  color: var(--accent);
  font-weight: 500;
  transition: color 0.18s ease;
}

.link-accent::before {
  content: ">";
  position: absolute;
  left: -0.8em;
  font-family: 'JetBrains Mono Variable', ui-monospace, monospace;
  opacity: 0;
  transition: opacity 0.18s ease;
}

.link-accent::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 1px;
  background-image: repeating-linear-gradient(90deg, var(--accent) 0 4px, transparent 4px 8px);
  opacity: 0.4;
  transition: opacity 0.18s ease;
}

.link-accent:hover {
  color: var(--accent-hover);
}

.link-accent:hover::before {
  opacity: 1;
}

.link-accent:hover::after {
  opacity: 1;
  background-image: none;
  background-color: var(--accent);
}
```

Append to the existing `.tag:hover` rule: `box-shadow: 0 0 0 3px var(--accent-soft);`
Append to the existing `.btn-primary:hover` rule: `box-shadow: 0 0 0 3px var(--accent-soft);`

- [ ] **Step 4: Run tests and eyeball**

Run: `CI=true npm test -- --watchAll=false` → PASS.
Run: `npm start` → scroll: the amber square glides between nav items with a slight overshoot; hover "Live" links on project cards: `>` appears in the gutter, dashed underline solidifies.

- [ ] **Step 5: Commit**

```bash
git add src/components/Nav src/App.css
git commit -m "feat: sliding nav marker, prompt links, tag/button glow"
```

---

### Task 11: Full verification + spec status

**Files:**
- Modify: `docs/superpowers/specs/2026-07-04-hero-terminal-devtool-motion-design.md` (status line)

- [ ] **Step 1: Test suite** — `CI=true npm test -- --watchAll=false` → all green.
- [ ] **Step 2: Production build** — `npm run build` → `Compiled successfully`; record the main-chunk gz size printed by CRA and compare against the pre-change size (`git stash` not needed — the July 4 baseline main chunk size is in the build output of `git show 18a3e93` era; just confirm the delta is ≲ 20 KB and that `react-console-emulator` landed in a separate lazy chunk).
- [ ] **Step 3: Manual pass on `npm start`** (use browser devtools):
  - Dark + light theme (`theme light` in the terminal — Nav icon must update too).
  - Reduced motion (devtools → Rendering → emulate `prefers-reduced-motion`): boot renders instantly, headings never scramble, reveals appear without animation.
  - Mobile viewport (390px): hero stacks text → terminal; chips tappable; no horizontal scroll.
  - Keyboard: Tab reaches skip-boot button, terminal input, chips; focus rings visible.
- [ ] **Step 4: Update spec status** — change the `**Status:**` line to `Implemented 2026-07-04 (see docs/superpowers/plans/2026-07-04-hero-terminal-devtool-motion.md)`.
- [ ] **Step 5: Commit**

```bash
git add docs/superpowers/specs/2026-07-04-hero-terminal-devtool-motion-design.md
git commit -m "docs: mark hero terminal spec implemented"
```
