import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useIntersectionObserver } from '../useIntersectionObserver';

describe('useIntersectionObserver', () => {
  let mockIntersectionObserver: any;
  let observeCallback: IntersectionObserverCallback;
  let mockObserverInstance: any;

  beforeEach(() => {
    // Create mock observer instance
    mockObserverInstance = {
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
      takeRecords: vi.fn(),
      root: null,
      rootMargin: '',
      thresholds: []
    };

    // Mock IntersectionObserver as a constructor function
    mockIntersectionObserver = vi.fn(function(this: any, callback: IntersectionObserverCallback) {
      observeCallback = callback;
      return mockObserverInstance;
    });

    global.IntersectionObserver = mockIntersectionObserver as any;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return false initially', () => {
    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() => useIntersectionObserver(ref));
    
    expect(result.current).toBe(false);
  });

  it('should create IntersectionObserver with default options', () => {
    const ref = { current: document.createElement('div') };
    renderHook(() => useIntersectionObserver(ref));

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0,
        root: null,
        rootMargin: '0px'
      }
    );
  });

  it('should create IntersectionObserver with custom threshold', () => {
    const ref = { current: document.createElement('div') };
    renderHook(() => useIntersectionObserver(ref, { threshold: 0.5 }));

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0.5,
        root: null,
        rootMargin: '0px'
      }
    );
  });

  it('should create IntersectionObserver with multiple thresholds', () => {
    const ref = { current: document.createElement('div') };
    const thresholds = [0, 0.25, 0.5, 0.75, 1];
    renderHook(() => useIntersectionObserver(ref, { threshold: thresholds }));

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: thresholds,
        root: null,
        rootMargin: '0px'
      }
    );
  });

  it('should create IntersectionObserver with custom rootMargin', () => {
    const ref = { current: document.createElement('div') };
    renderHook(() => useIntersectionObserver(ref, { rootMargin: '100px' }));

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0,
        root: null,
        rootMargin: '100px'
      }
    );
  });

  it('should create IntersectionObserver with custom root element', () => {
    const ref = { current: document.createElement('div') };
    const rootElement = document.createElement('div');
    renderHook(() => useIntersectionObserver(ref, { root: rootElement }));

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0,
        root: rootElement,
        rootMargin: '0px'
      }
    );
  });

  it('should return true when element is intersecting', () => {
    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() => useIntersectionObserver(ref));

    // Simulate intersection
    const mockEntry = {
      isIntersecting: true,
      target: ref.current,
      intersectionRatio: 1,
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: null,
      time: Date.now()
    } as IntersectionObserverEntry;

    act(() => {
      observeCallback([mockEntry], {} as IntersectionObserver);
    });

    expect(result.current).toBe(true);
  });

  it('should return false when element is not intersecting', () => {
    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() => useIntersectionObserver(ref));

    // Simulate no intersection
    const mockEntry = {
      isIntersecting: false,
      target: ref.current,
      intersectionRatio: 0,
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: null,
      time: Date.now()
    } as IntersectionObserverEntry;

    act(() => {
      observeCallback([mockEntry], {} as IntersectionObserver);
    });

    expect(result.current).toBe(false);
  });

  it('should not create observer if ref.current is null', () => {
    const ref = { current: null };
    renderHook(() => useIntersectionObserver(ref));

    expect(mockIntersectionObserver).not.toHaveBeenCalled();
  });

  it('should disconnect observer on unmount', () => {
    const element = document.createElement('div');
    const ref = { current: element };
    const { unmount } = renderHook(() => useIntersectionObserver(ref));
    
    unmount();

    expect(mockObserverInstance.disconnect).toHaveBeenCalled();
  });

  it('should freeze observation once visible when freezeOnceVisible is true', () => {
    const ref = { current: document.createElement('div') };
    const { result, rerender } = renderHook(
      ({ freeze }) => useIntersectionObserver(ref, { freezeOnceVisible: freeze }),
      { initialProps: { freeze: true } }
    );

    // Simulate intersection
    const mockEntry = {
      isIntersecting: true,
      target: ref.current,
      intersectionRatio: 1,
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: null,
      time: Date.now()
    } as IntersectionObserverEntry;

    act(() => {
      observeCallback([mockEntry], {} as IntersectionObserver);
    });

    expect(result.current).toBe(true);

    // Clear mock calls
    mockIntersectionObserver.mockClear();

    // Rerender - should not create new observer since element is already visible
    rerender({ freeze: true });

    // Observer should not be created again
    expect(mockIntersectionObserver).not.toHaveBeenCalled();
  });

  it('should handle IntersectionObserver not being supported', () => {
    // Remove IntersectionObserver
    const originalIO = global.IntersectionObserver;
    (global as any).IntersectionObserver = undefined;

    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() => useIntersectionObserver(ref));

    expect(result.current).toBe(false);

    // Restore
    global.IntersectionObserver = originalIO;
  });

  it('should observe the element when created', () => {
    const element = document.createElement('div');
    const ref = { current: element };
    renderHook(() => useIntersectionObserver(ref));

    expect(mockObserverInstance.observe).toHaveBeenCalledWith(element);
  });

  it('should update when intersection state changes multiple times', () => {
    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() => useIntersectionObserver(ref));

    // Initially not intersecting
    expect(result.current).toBe(false);

    // Simulate entering viewport
    let mockEntry = {
      isIntersecting: true,
      target: ref.current,
      intersectionRatio: 1,
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: null,
      time: Date.now()
    } as IntersectionObserverEntry;

    act(() => {
      observeCallback([mockEntry], {} as IntersectionObserver);
    });
    expect(result.current).toBe(true);

    // Simulate leaving viewport
    mockEntry = {
      ...mockEntry,
      isIntersecting: false,
      intersectionRatio: 0
    };

    act(() => {
      observeCallback([mockEntry], {} as IntersectionObserver);
    });
    expect(result.current).toBe(false);

    // Simulate entering viewport again
    mockEntry = {
      ...mockEntry,
      isIntersecting: true,
      intersectionRatio: 1
    };

    act(() => {
      observeCallback([mockEntry], {} as IntersectionObserver);
    });
    expect(result.current).toBe(true);
  });
});
