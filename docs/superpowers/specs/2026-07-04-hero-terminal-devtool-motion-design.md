# Design: Hero Terminal + Dev-tool Motion Pass

**Date:** 2026-07-04
**Status:** Implemented 2026-07-04 (see docs/superpowers/plans/2026-07-04-hero-terminal-devtool-motion.md). Bundle note: eager main grew 50.65 → 101.67 kB gz (motion runtime ≈ 29 kB — the cost accepted with the library-assisted decision); react-console-emulator (9.7 kB) and typewriter-effect (9.5 kB) load as lazy chunks.

## Problem

The site is professional but generic: after the initial AOS fade-in nothing moves,
reacts, or surprises, and there is no signature moment a visitor remembers. Identity
(layout, tokens, copy) is good and stays. Explicitly out of scope by preference:
gradients, glassmorphism, copy rewrites, full identity rework.

## Decisions (from brainstorming Q&A)

| Question | Decision |
|---|---|
| Gap to fix | A memorable signature moment + motion/reactivity |
| Signature flavor | Terminal / dev-tool |
| Terminal placement | **Split hero** — intro text left (unchanged), terminal window right; stacks on mobile |
| Site-wide motion | **Dev-tool texture** — decode headings, mono indexes, cursor accents, corner brackets |
| Build approach | **Library-assisted** — `motion` (framer-motion) + `react-console-emulator`; boot typing via existing `typewriter-effect` |

## 1. Hero terminal (signature)

Terminal window styled entirely from existing tokens (`--surface`, `--border`,
`--accent`, JetBrains Mono). Chrome: three muted dots + `sean@portfolio:~ — zsh`.

- **Boot sequence** — auto-plays once (~4s), skippable by click/keypress:
  `$ whoami` → name/role → `$ now` → `▸ building KIRA @ Bercerita` /
  `▸ earthquake research @ SJSU` → `type 'help' to explore`. Implemented with the
  already-installed `typewriter-effect` core.
- **Interactive mode** — `react-console-emulator` mounts only after boot completes
  (keeps initial render lean). Command registry lives in a pure module.
- **Commands:** `help`, `about`, `projects`, `skills`, `certs`, `resume` (opens PDF),
  `contact`, `goto <section>` (smooth-scroll), `theme dark|light` (drives existing
  `useTheme`), `clear`. Easter eggs: `sudo hire-sean`, `ls`, `pwd`, `whoami`, `exit`
  (playful refusal). Unknown → `zsh: command not found: <x> — try 'help'`.
- **Mobile:** boot plays; tappable command chips (`help · projects · resume ·
  contact`) below the window; typed input still available.
- **A11y/SEO:** output region `aria-live="polite"`; input labelled. Every fact the
  terminal exposes also exists in the page sections — no content locked inside it.

## 2. Dev-tool motion pass (site-wide)

`motion/react` (LazyMotion + domAnimation) replaces AOS entirely — `aos` dependency,
init code, and all `data-aos` attributes removed.

- Section headings **decode into place** once per first viewport entry
  (`useDecodeText` hook); eyebrows gain a blinking cursor block; sections get mono
  indexes `01`–`05` (About → Contact).
- Card grids (projects, certificates): staggered fade-up via `whileInView` +
  `staggerChildren`; hover = amber corner brackets + index turns amber (CSS only).
- Links: `>` prompt reveal + dashed→solid amber underline. Tags: soft amber glow on
  hover. Buttons: unified accent focus/hover ring.
- Nav: active-section marker is a small amber square that slides between items
  (`layoutId` spring).
- Footer sign-off line: `$ echo "thanks for scrolling"`.
- **Not doing:** scroll-jacking, parallax, custom cursor, sounds, gradients,
  glassmorphism.

## 3. Architecture

```
src/components/Terminal/index.js    # window chrome, boot, emulator mount, chips
src/components/Terminal/commands.js # pure command registry — unit-testable
src/hooks/useDecodeText.js          # decode-on-view, reduced-motion aware
src/motion/variants.js              # shared fadeUp / stagger variants + Reveal helper
```

Modified: `Home` (split grid), all sections (motion wrappers + indexes), `Nav`
(layoutId marker), `Footer` (echo line), `App.css` (terminal + dev-tool classes),
`Layout.js` (drop AOS init), `package.json` (+`motion`, +`react-console-emulator`,
−`aos`). Copy/content untouched. Terminal inherits light theme automatically via CSS
vars.

## 4. Performance & accessibility guardrails

- Net bundle ≈ **+17–19 KB gz** (motion ~20 with LazyMotion, emulator ~5, −AOS ~6).
- Hero LCP remains the intro text; terminal is text-only (no images/fonts added).
- `prefers-reduced-motion`: typing, decode, stagger, and marker springs collapse to
  instant render — full content, zero animation (`useReducedMotion` + hook checks).
- Light theme: existing darkened amber (`#9a5e11`) keeps AA contrast.

## 5. Testing & risks

- Unit tests for `commands.js` via existing react-scripts runner: each command's
  output shape, `goto` targets, `theme` argument handling, unknown-command path.
- Manual verification: light/dark themes, reduced-motion, mobile layout, keyboard
  navigation into/out of the terminal.
- **Risk:** `react-console-emulator` is stale (~2022). Checkpoint at implementation:
  if it misbehaves under React 18 / CRA 5, fall back to a ~60-line hand-rolled input
  line; registry, styling, and boot sequence carry over unchanged.
