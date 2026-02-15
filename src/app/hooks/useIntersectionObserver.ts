'use client';

import { useState, useEffect, RefObject } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

/**
 * Custom hook to detect when an element enters the viewport using Intersection Observer API
 * Supports configurable thresholds and root margins for flexible visibility detection
 * 
 * @param {RefObject<Element>} ref - React ref object pointing to the element to observe
 * @param {UseIntersectionObserverOptions} options - Configuration options for the observer
 * @param {number | number[]} options.threshold - Percentage of element visibility to trigger (0-1). Default: 0
 * @param {Element | null} options.root - Root element for intersection. Default: viewport
 * @param {string} options.rootMargin - Margin around root element. Default: '0px'
 * @param {boolean} options.freezeOnceVisible - Stop observing after element becomes visible once. Default: false
 * @returns {boolean} Whether the element is currently intersecting (visible in viewport)
 */
export function useIntersectionObserver(
  ref: RefObject<Element>,
  options: UseIntersectionObserverOptions = {}
): boolean {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;

    // Early return if element doesn't exist or IntersectionObserver is not supported
    if (!element || typeof IntersectionObserver === 'undefined') {
      return;
    }

    // If freezeOnceVisible is true and element is already visible, don't observe
    if (freezeOnceVisible && isIntersecting) {
      return;
    }

    // Create intersection observer instance
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when intersection changes
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold,
        root,
        rootMargin
      }
    );

    // Start observing the element
    observer.observe(element);

    // Cleanup function to disconnect observer
    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, root, rootMargin, freezeOnceVisible, isIntersecting]);

  return isIntersecting;
}
