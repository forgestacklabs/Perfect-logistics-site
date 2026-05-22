import { render, screen } from '@testing-library/react';
import About from './About';
import { expect, test, vi } from 'vitest';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
class IntersectionObserverMock {
  constructor(callback: unknown, options: unknown) {
    if (callback || options) {
      // do nothing
    }
  }
  disconnect() {}
  observe() {}
  takeRecords() { return []; }
  unobserve() {}
}
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

test('renders About component successfully', () => {
  render(<About />);
  expect(screen.getByText('Who We Are')).toBeInTheDocument();
  expect(screen.getByText(/Leading Petro Logistics Solution Provider with over two decades of excellence/i)).toBeInTheDocument();
});
