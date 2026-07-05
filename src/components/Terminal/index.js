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
                  contentStyle={{
                    padding: 0,
                    color: "var(--text)",
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    background: "transparent",
                  }}
                  inputAreaStyle={{ fontFamily: "inherit", background: "transparent" }}
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
