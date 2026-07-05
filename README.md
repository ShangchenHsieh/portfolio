# Sean Hsieh — Portfolio

Personal portfolio site for Shang-chen (Sean) Hsieh, a software engineer working across
backend, cloud, and applied AI. Built with React and Tailwind CSS.

## Design

- Minimal, product-grade aesthetic — one accent color (amber), true-neutral grays, generous
  whitespace, no gradients or decorative effects.
- **Dark and light themes** with a toggle (persisted to `localStorage`, defaults to the system
  preference; set before paint to avoid a flash of the wrong theme).
- Type pairing: **Inter** (UI/body) with **JetBrains Mono** for labels, tags, and dates —
  self-hosted via `@fontsource`, no runtime CDN.
- Sticky top navigation with scroll-spy and a mobile menu.

## Structure

- `src/components/` — one folder per section (`Home`, `About`, `Resume`, `Projects`,
  `Certificates`, `Contact`) plus `Nav`, `Footer`, and a dependency-free `Lightbox`.
- `src/constants/` — project and certificate data.
- `src/hooks/useTheme.js` — theme state + persistence.
- `src/App.css` — design tokens (CSS variables per theme) and shared component classes.

## Develop

```bash
npm install     # install dependencies
npm start       # dev server at http://localhost:3000
npm run build   # production build
npm run deploy  # build + publish to GitHub Pages
```
