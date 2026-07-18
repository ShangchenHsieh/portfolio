/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        elevated: "var(--surface-2)",
        line: "var(--border)",
        "line-hover": "var(--border-hover)",
        fg: "var(--text)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        onaccent: "var(--accent-contrast)",
      },
      fontFamily: {
        display: [
          "Bricolage Grotesque Variable",
          "Inter Variable",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        sans: [
          "Inter Variable",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono Variable",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      screens: {
        xs: "450px",
      },
      maxWidth: {
        content: "1040px",
      },
    },
  },
  plugins: [],
};
