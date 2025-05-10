import '@testing-library/jest-dom';

// Mock IntersectionObserver for tests (fixes ReferenceError in framer-motion and other components)
global.IntersectionObserver = class {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds = [];
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
};
