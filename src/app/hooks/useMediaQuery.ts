'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to detect viewport breakpoints and match custom media queries
 * Provides reactive updates when viewport size changes
 * 
 * @param {string} query - Media query string to match (e.g., '(min-width: 768px)')
 * @returns {boolean} Whether the media query currently matches
 * 
 * @example
 * // Detect mobile viewport
 * const isMobile = useMediaQuery('(max-width: 767px)');
 * 
 * @example
 * // Detect tablet and above
 * const isTablet = useMediaQuery('(min-width: 768px)');
 * 
 * @example
 * // Detect desktop
 * const isDesktop = useMediaQuery('(min-width: 1024px)');
 * 
 * @example
 * // Detect dark mode preference
 * const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with false for SSR compatibility
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if window and matchMedia are available (client-side only)
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    // Create media query list
    const mediaQueryList = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQueryList.matches);

    // Handler for media query changes
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add event listener
    // Use addEventListener for modern browsers, addListener for older browsers
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQueryList.addListener(handleChange);
    }

    // Cleanup function
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQueryList.removeListener(handleChange);
      }
    };
  }, [query]);

  return matches;
}
