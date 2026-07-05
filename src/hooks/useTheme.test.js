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
