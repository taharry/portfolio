import '@testing-library/jest-dom/vitest';

// jsdom has no real AudioContext / matchMedia — stub the bits useSfx and the
// motion/reduced-motion checks touch so components can render in tests.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// jsdom doesn't implement scrollIntoView (used by SkillList's keyboard nav
// and the route-focus hook's scroll-to-top).
if (!window.HTMLElement.prototype.scrollIntoView) {
  window.HTMLElement.prototype.scrollIntoView = () => {};
}

if (!window.AudioContext && !window.webkitAudioContext) {
  class FakeAudioContext {
    constructor() {
      this.state = 'running';
      this.currentTime = 0;
      this.destination = {};
    }
    createOscillator() {
      return {
        type: 'sine',
        frequency: { setValueAtTime() {}, exponentialRampToValueAtTime() {} },
        connect() { return this; },
        start() {},
        stop() {},
      };
    }
    createGain() {
      return {
        gain: { setValueAtTime() {}, exponentialRampToValueAtTime() {} },
        connect() { return this; },
      };
    }
    resume() {}
  }
  window.AudioContext = FakeAudioContext;
}
