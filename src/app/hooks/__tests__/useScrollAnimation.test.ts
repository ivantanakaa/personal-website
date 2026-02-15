import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useScrollAnimation } from '../useScrollAnimation';

describe('useScrollAnimation', () => {
  beforeEach(() => {
    // Set default mock values for window and document
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });
    
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 800,
    });
    
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      configurable: true,
      value: 2000,
    });

    // Mock requestAnimationFrame if not already defined
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = (cb: FrameRequestCallback) => {
        cb(0);
        return 0;
      };
    }
    
    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = () => {};
    }

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should initialize with scroll position 0 and progress 0', () => {
    const { result } = renderHook(() => useScrollAnimation());

    expect(result.current.scrollY).toBe(0);
    expect(result.current.scrollProgress).toBe(0);
  });

  it('should update scrollY when user scrolls', () => {
    const { result } = renderHook(() => useScrollAnimation());

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 500, writable: true, configurable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.scrollY).toBe(500);
  });

  it('should calculate scroll progress correctly', () => {
    // Setup: window height 800, document height 2000
    // Max scroll = 2000 - 800 = 1200
    // Scroll to 600 = 600/1200 = 50%
    const { result } = renderHook(() => useScrollAnimation());

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 600, writable: true, configurable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.scrollProgress).toBe(50);
  });

  it('should return 100% progress when scrolled to bottom', () => {
    const { result } = renderHook(() => useScrollAnimation());

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 1200, writable: true, configurable: true }); // Max scroll (2000 - 800)
      window.dispatchEvent(new Event('scroll'));
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.scrollProgress).toBe(100);
  });

  it('should not exceed 100% progress', () => {
    const { result } = renderHook(() => useScrollAnimation());

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 1500, writable: true, configurable: true }); // Beyond max scroll
      window.dispatchEvent(new Event('scroll'));
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.scrollProgress).toBeLessThanOrEqual(100);
  });

  it('should not go below 0% progress', () => {
    const { result } = renderHook(() => useScrollAnimation());

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: -100, writable: true, configurable: true }); // Negative scroll (shouldn't happen but test edge case)
      window.dispatchEvent(new Event('scroll'));
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.scrollProgress).toBeGreaterThanOrEqual(0);
  });

  it('should debounce scroll events', () => {
    const { result } = renderHook(() => useScrollAnimation());

    // Rapid scroll events
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true, configurable: true });
      window.dispatchEvent(new Event('scroll'));
      vi.advanceTimersByTime(50); // Don't wait full debounce time

      Object.defineProperty(window, 'scrollY', { value: 200, writable: true, configurable: true });
      window.dispatchEvent(new Event('scroll'));
      vi.advanceTimersByTime(50);

      Object.defineProperty(window, 'scrollY', { value: 300, writable: true, configurable: true });
      window.dispatchEvent(new Event('scroll'));
      vi.advanceTimersByTime(100); // Now wait for debounce
    });

    // Should have the final value after debounce
    expect(result.current.scrollY).toBe(300);
  });

  it('should handle document with no scrollable content', () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 800, writable: true, configurable: true }); // Same as window height, no scroll
    const { result } = renderHook(() => useScrollAnimation());

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.scrollProgress).toBe(0);
  });

  it('should cleanup event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useScrollAnimation());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('should use passive event listener for performance', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    renderHook(() => useScrollAnimation());

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true }
    );
  });
});
