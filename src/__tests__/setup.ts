import '@testing-library/jest-dom';

// Mock Web Audio API
global.AudioContext = class MockAudioContext {
  createOscillator() {
    return {
      connect: () => {},
      start: () => {},
      stop: () => {},
      frequency: { setValueAtTime: () => {} },
      type: 'sine'
    };
  }
  
  createGain() {
    return {
      connect: () => {},
      gain: { 
        setValueAtTime: () => {},
        linearRampToValueAtTime: () => {}
      }
    };
  }
  
  get destination() {
    return {};
  }
  
  get currentTime() {
    return 0;
  }
  
  get state() {
    return 'running';
  }
  
  resume() {
    return Promise.resolve();
  }
  
  close() {
    return Promise.resolve();
  }
} as any;

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock navigator.share
Object.defineProperty(navigator, 'share', {
  writable: true,
  value: () => Promise.resolve(),
});

// Mock navigator.clipboard
Object.defineProperty(navigator, 'clipboard', {
  writable: true,
  value: {
    writeText: () => Promise.resolve(),
  },
});