import { createCommands, SECTION_IDS } from "./commands";

function build() {
  const handlers = {
    scrollTo: jest.fn(),
    setTheme: jest.fn(),
    openResume: jest.fn(),
    clear: jest.fn(),
  };
  return { handlers, commands: createCommands(handlers) };
}

test("registers the full command set", () => {
  const { commands } = build();
  const expected = [
    "help", "about", "projects", "skills", "certs", "resume",
    "contact", "goto", "theme", "clear", "sudo", "ls", "pwd", "whoami", "exit",
  ];
  expected.forEach((name) => {
    expect(commands[name]).toBeDefined();
    expect(typeof commands[name].fn).toBe("function");
  });
});

test("help lists every command name", () => {
  const { commands } = build();
  const out = commands.help.fn();
  Object.keys(commands).forEach((name) => expect(out).toContain(name));
});

test("goto scrolls to a valid section", () => {
  const { commands, handlers } = build();
  const out = commands.goto.fn("projects");
  expect(handlers.scrollTo).toHaveBeenCalledWith("projects");
  expect(out).toContain("projects");
});

test("goto rejects unknown sections with usage", () => {
  const { commands, handlers } = build();
  const out = commands.goto.fn("basement");
  expect(handlers.scrollTo).not.toHaveBeenCalled();
  SECTION_IDS.forEach((id) => expect(out).toContain(id));
});

test("theme sets valid modes and rejects the rest", () => {
  const { commands, handlers } = build();
  expect(commands.theme.fn("light")).toContain("light");
  expect(handlers.setTheme).toHaveBeenCalledWith("light");
  handlers.setTheme.mockClear();
  expect(commands.theme.fn("mauve")).toContain("usage");
  expect(handlers.setTheme).not.toHaveBeenCalled();
});

test("resume opens the pdf", () => {
  const { commands, handlers } = build();
  commands.resume.fn();
  expect(handlers.openResume).toHaveBeenCalled();
});

test("clear delegates to the handler", () => {
  const { commands, handlers } = build();
  commands.clear.fn();
  expect(handlers.clear).toHaveBeenCalled();
});

test("projects lists real project titles", () => {
  const { commands } = build();
  expect(commands.projects.fn()).toContain("KIRA");
});

test("sudo hire-sean is rewarding, plain sudo is denied", () => {
  const { commands } = build();
  expect(commands.sudo.fn("hire-sean")).toMatch(/granted/i);
  expect(commands.sudo.fn("rm", "-rf", "/")).toMatch(/not root/i);
});

test("contact includes the email", () => {
  const { commands } = build();
  expect(commands.contact.fn()).toContain("shang-chen.hsieh@sjsu.edu");
});
