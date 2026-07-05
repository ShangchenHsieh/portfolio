import { fireEvent, render, screen } from "@testing-library/react";
import TerminalWindow from "./index";

// Force the reduced-motion path: boot renders statically and the emulator
// mounts immediately — this doubles as the react-console-emulator compat check.
beforeEach(() => {
  window.matchMedia = (query) => ({
    matches: query.includes("prefers-reduced-motion"),
    media: query,
    addEventListener: () => { },
    removeEventListener: () => { },
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

test("clicking anywhere in terminal body focuses shell input", async () => {
  const { container } = render(<TerminalWindow />);
  const input = await screen.findByRole("textbox");
  input.blur();

  const body = container.querySelector(".term__body");
  fireEvent.click(body);

  expect(input).toHaveFocus();
});
