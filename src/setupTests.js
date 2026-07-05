// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// jsdom lacks these browser APIs; components under test rely on them.
window.matchMedia =
  window.matchMedia ||
  function matchMedia(query) {
    return {
      matches: false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
    };
  };

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = window.IntersectionObserver || MockIntersectionObserver;

window.HTMLElement.prototype.scrollIntoView =
  window.HTMLElement.prototype.scrollIntoView || function scrollIntoView() {};
