# PR: feat: interactive hero terminal + dev-tool motion pass

## What

Makes the site memorable and alive while keeping the existing minimal identity:

- **Hero terminal (the signature)** — split hero with a working shell: typed boot sequence (`whoami` / `now`, skippable), then real commands: `help`, `about`, `projects`, `skills`, `certs`, `resume`, `contact`, `goto <section>`, `theme dark|light`, `clear`, plus easter eggs (`sudo hire-sean`, `ls`, `pwd`, `exit`). Tappable command chips for mobile. Everything the terminal prints also exists on the page (a11y/SEO safe).
- **Dev-tool motion pass** — decode-in section headings with mono indexes `01`–`05`, blinking-cursor eyebrows, staggered card reveals, amber corner brackets on card hover, `>` prompt links with dashed→solid underlines, sliding nav marker, `$ echo "thanks for scrolling"` footer sign-off.
- **AOS → motion** — `aos` removed entirely; `motion/react` (LazyMotion) powers reveals.

## Notable engineering

- `Terminal/commands.js` is a pure, injected-handler registry — fully unit-tested.
- `useTheme` gained `set()` + cross-instance sync (MutationObserver), so the terminal's `theme` command and the nav toggle stay consistent.
- `react-console-emulator` (9.7 kB) and `typewriter-effect` (9.5 kB) are lazy chunks.
- `prefers-reduced-motion` collapses typing/decode/reveals to instant static content.

## Bundle accounting

Eager main: 50.65 → 101.67 kB gz (~29 kB = motion runtime, per the library-assisted build decision; remainder is terminal + hero code). Spec + plan in `docs/superpowers/`.

## Testing

- 20 unit tests (registry, theme sync, decode hook, terminal render under React 18).
- Browser-verified: commands, `goto` smooth-scroll, light/dark themes, reduced motion, 390 px mobile stacking, keyboard tab order.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
