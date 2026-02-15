'use client';

import { useState, useEffect, useCallback } from 'react';

interface ScrollAnimationState {
  scrollY: number;
  scrollProgress: number;
}

/**
 * Custom hook to track scroll position and progress percentage
 * Debounces scroll events for performance optimization
 * 
 * @returns {ScrollAnimationState} Object containing scrollY position and scrollProgress percentage (0-100)
 */
export function useScrollAnimation(): ScrollAnimationState {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const calculateScrollProgress = useCallback(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    
    // Calculate progress as percentage (0-100)
    const maxScroll = documentHeight - windowHeight;
    const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
    
    return {
      scrollY: scrollTop,
      scrollProgress: Math.min(100, Math.max(0, progress))
    };
  }, []);

  useEffect(() => {
    // Set initial values
    const initial = calculateScrollProgress();
    setScrollY(initial.scrollY);
    setScrollProgress(initial.scrollProgress);

    let timeoutId: NodeJS.Timeout | null = null;
    let rafId: number | null = null;

    // Debounced scroll handler using requestAnimationFrame for smooth updates
    const handleScroll = () => {
      // Cancel any pending timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Use requestAnimationFrame for smooth, GPU-optimized updates
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        const { scrollY: newScrollY, scrollProgress: newProgress } = calculateScrollProgress();
        setScrollY(newScrollY);
        setScrollProgress(newProgress);
      });

      // Debounce: only update after scrolling stops for 100ms
      timeoutId = setTimeout(() => {
        const { scrollY: finalScrollY, scrollProgress: finalProgress } = calculateScrollProgress();
        setScrollY(finalScrollY);
        setScrollProgress(finalProgress);
      }, 100);
    };

    // Add scroll event listener with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [calculateScrollProgress]);

  return { scrollY, scrollProgress };
}
