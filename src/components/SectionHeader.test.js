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
