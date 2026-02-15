import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useMediaQuery } from '../useMediaQuery';

describe('useMediaQuery', () => {
  let mockMatchMedia: ReturnType<typeof vi.fn>;
  let listeners: Array<(event: MediaQueryListEvent) => void> = [];

  beforeEach(() => {
    listeners = [];
    
    // Mock matchMedia
    mockMatchMedia = vi.fn((query: string) => {
      const mediaQueryList = {
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn((event: string, handler: (event: MediaQueryListEvent) => void) => {
          if (event === 'change') {
            listeners.push(handler);
          }
        }),
        removeEventListener: vi.fn((event: string, handler: (event: MediaQueryListEvent) => void) => {
          if (event === 'change') {
            listeners = listeners.filter(l => l !== handler);
          }
        }),
        addListener: vi.fn((handler: (event: MediaQueryListEvent) => void) => {
          listeners.push(handler);
        }),
        removeListener: vi.fn((handler: (event: MediaQueryListEvent) => void) => {
          listeners = listeners.filter(l => l !== handler);
        }),
        dispatchEvent: vi.fn(),
      };
      return mediaQueryList as unknown as MediaQueryList;
    });

    // Ensure window.matchMedia exists
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        configurable: true,
        value: mockMatchMedia,
      });
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
    listeners = [];
  });

  it('should initialize with false for SSR compatibility', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    
    // Initial render should be false before effect runs
    expect(result.current).toBe(false);
  });

  it('should return true when media query matches', () => {
    mockMatchMedia.mockImplementation((query: string) => ({
      matches: true,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
      onchange: null,
    }));

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    
    expect(result.current).toBe(true);
  });

  it('should return false when media query does not match', () => {
    mockMatchMedia.mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
      onchange: null,
    }));

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    
    expect(result.current).toBe(false);
  });

  it('should update when media query match changes', () => {
    let currentMatches = false;
    
    mockMatchMedia.mockImplementation((query: string) => ({
      matches: currentMatches,
      media: query,
      addEventListener: vi.fn((event: string, handler: (event: MediaQueryListEvent) => void) => {
        if (event === 'change') {
          listeners.push(handler);
        }
      }),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
      onchange: null,
    }));

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    
    expect(result.current).toBe(false);

    // Simulate viewport resize that triggers media query change
    act(() => {
      currentMatches = true;
      listeners.forEach(listener => {
        listener({ matches: true, media: '(min-width: 768px)' } as MediaQueryListEvent);
      });
    });

    expect(result.current).toBe(true);
  });

  it('should handle mobile breakpoint (max-width: 767px)', () => {
    mockMatchMedia.mockImplementation((query: string) => ({
      matches: query === '(max-width: 767px)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
      onchange: null,
    }));

    const { result } = renderHook(() => useMediaQuery('(max-width: 767px)'));
    
    expect(result.current).toBe(true);
  });

  it('should handle tablet breakpoint (min-width: 768px)', () => {
    mockMatchMedia.mockImplementation((query: string) => ({
      matches: query === '(min-width: 768px)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
      onchange: null,
    }));

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    
    expect(result.current).toBe(true);
  });

  it('should handle desktop breakpoint (min-width: 1024px)', () => {
    mockMatchMedia.mockImplementation((query: string) => ({
      matches: query === '(min-width: 1024px)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
      onchange: null,
    }));

    const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'));
    
    expect(result.current).toBe(true);
  });

  it('should handle custom media queries', () => {
    mockMatchMedia.mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
      onchange: null,
    }));

    const { result } = renderHook(() => useMediaQuery('(prefers-color-scheme: dark)'));
    
    expect(result.current).toBe(true);
  });

  it('should handle orientation queries', () => {
    mockMatchMedia.mockImplementation((query: string) => ({
      matches: query === '(orientation: portrait)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
      onchange: null,
    }));

    const { result } = renderHook(() => useMediaQuery('(orientation: portrait)'));
    
    expect(result.current).toBe(true);
  });

  it('should cleanup event listeners on unmount', () => {
    const removeEventListenerSpy = vi.fn();
    
    mockMatchMedia.mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: removeEventListenerSpy,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
      onchange: null,
    }));

    const { unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('should update when query prop changes', () => {
    mockMatchMedia.mockImplementation((query: string) => ({
      matches: query === '(min-width: 1024px)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
      onchange: null,
    }));

    const { result, rerender } = renderHook(
      ({ query }) => useMediaQuery(query),
      { initialProps: { query: '(min-width: 768px)' } }
    );
    
    expect(result.current).toBe(false);

    rerender({ query: '(min-width: 1024px)' });
    
    expect(result.current).toBe(true);
  });

  it('should handle fallback for older browsers using addListener', () => {
    const addListenerSpy = vi.fn();
    const removeListenerSpy = vi.fn();
    
    mockMatchMedia.mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: undefined, // Simulate older browser
      removeEventListener: undefined,
      addListener: addListenerSpy,
      removeListener: removeListenerSpy,
      dispatchEvent: vi.fn(),
      onchange: null,
    }));

    const { unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    
    expect(addListenerSpy).toHaveBeenCalledWith(expect.any(Function));
    
    unmount();
    
    expect(removeListenerSpy).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should handle missing matchMedia gracefully', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: undefined,
    });

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    
    // Should return false when matchMedia is not available
    expect(result.current).toBe(false);
  });

  it('should handle complex media queries', () => {
    mockMatchMedia.mockImplementation((query: string) => ({
      matches: query === '(min-width: 768px) and (max-width: 1023px)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
      onchange: null,
    }));

    const { result } = renderHook(() => 
      useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
    );
    
    expect(result.current).toBe(true);
  });

  it('should handle prefers-reduced-motion query', () => {
    mockMatchMedia.mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
      onchange: null,
    }));

    const { result } = renderHook(() => useMediaQuery('(prefers-reduced-motion: reduce)'));
    
    expect(result.current).toBe(true);
  });

  it('should handle multiple simultaneous media query changes', () => {
    let currentMatches = false;
    
    mockMatchMedia.mockImplementation((query: string) => ({
      matches: currentMatches,
      media: query,
      addEventListener: vi.fn((event: string, handler: (event: MediaQueryListEvent) => void) => {
        if (event === 'change') {
          listeners.push(handler);
        }
      }),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
      onchange: null,
    }));

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    
    expect(result.current).toBe(false);

    // Simulate rapid changes
    act(() => {
      currentMatches = true;
      listeners.forEach(listener => {
        listener({ matches: true, media: '(min-width: 768px)' } as MediaQueryListEvent);
      });
    });

    expect(result.current).toBe(true);

    act(() => {
      currentMatches = false;
      listeners.forEach(listener => {
        listener({ matches: false, media: '(min-width: 768px)' } as MediaQueryListEvent);
      });
    });

    expect(result.current).toBe(false);
  });
});
