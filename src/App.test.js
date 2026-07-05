import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the hero with Sean's name", async () => {
  render(<App />);
  expect(await screen.findByRole("heading", { name: /sean hsieh/i })).toBeInTheDocument();
});
