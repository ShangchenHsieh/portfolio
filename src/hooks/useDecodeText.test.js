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
