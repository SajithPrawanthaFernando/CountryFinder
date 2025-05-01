import "@testing-library/jest-dom";

global.IntersectionObserver = class {
  constructor(callback, options) {}
  observe() {}
  unobserve() {}
  disconnect() {}
};
