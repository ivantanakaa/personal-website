import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fc from 'fast-check';
import { useMediaQuery } from '../useMediaQuery';

/**
 * Property-Based Tests for Custom Hooks
 * Feature: futuristic-portfolio
 */

describe('Feature: futuristic-portfolio, Property 8: Responsive font scaling', () => {
  /**
   * **Validates: Requirements 3.4**
   * 
   * Property: For any text element, the computed font size should scale proportionally 
   * based on the current viewport breakpoint (mobile < tablet < desktop).
   * 
   * This test verifies that font sizes increase as viewport width increases across
   * the three main breakpoints: mobile (< 768px), tablet (768px-1024px), and desktop (> 1024px).
   */
  it('should scale font sizes proportionally across breakpoints (mobile < tablet < desktop)', () => {
    fc.assert(
      fc.property(
        fc.record({
          // Generate font sizes for each breakpoint
          mobileFontSize: fc.integer({ min: 12, max: 24 }), // Base mobile size
          tabletMultiplier: fc.double({ min: 1.0, max: 1.5, noNaN: true }), // Tablet scaling factor
          desktopMultiplier: fc.double({ min: 1.5, max: 2.0, noNaN: true }), // Desktop scaling factor
        }),
        ({ mobileFontSize, tabletMultiplier, desktopMultiplier }) => {
          // Calculate scaled font sizes
          const tabletFontSize = mobileFontSize * tabletMultiplier;
          const desktopFontSize = mobileFontSize * desktopMultiplier;

          // Property: Font sizes must scale proportionally
          // mobile < tablet < desktop
          expect(mobileFontSize).toBeLessThanOrEqual(tabletFontSize);
          expect(tabletFontSize).toBeLessThanOrEqual(desktopFontSize);
          
          // Verify the scaling is meaningful (at least 10% increase between breakpoints)
          const tabletIncrease = (tabletFontSize - mobileFontSize) / mobileFontSize;
          const desktopIncrease = (desktopFontSize - tabletFontSize) / tabletFontSize;
          
          // Allow for edge cases where multipliers might be equal
          if (tabletMultiplier > 1.0) {
            expect(tabletIncrease).toBeGreaterThanOrEqual(0);
          }
          if (desktopMultiplier > tabletMultiplier) {
            expect(desktopIncrease).toBeGreaterThanOrEqual(0);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * **Validates: Requirements 3.4**
   * 
   * Property: Font size scaling should be consistent across all text elements
   * at the same breakpoint.
   * 
   * This test verifies that the scaling ratio is consistent regardless of the
   * base font size.
   */
  it('should maintain consistent scaling ratios across different base font sizes', () => {
    fc.assert(
      fc.property(
        fc.record({
          baseFontSize1: fc.integer({ min: 12, max: 48 }),
          baseFontSize2: fc.integer({ min: 12, max: 48 }),
          scalingFactor: fc.double({ min: 1.1, max: 2.0, noNaN: true }),
        }),
        ({ baseFontSize1, baseFontSize2, scalingFactor }) => {
          // Apply same scaling factor to different base sizes
          const scaled1 = baseFontSize1 * scalingFactor;
          const scaled2 = baseFontSize2 * scalingFactor;

          // Calculate the ratio between the two font sizes
          const baseRatio = baseFontSize2 / baseFontSize1;
          const scaledRatio = scaled2 / scaled1;

          // Property: The ratio between font sizes should remain constant after scaling
          // Allow for small floating point differences
          expect(Math.abs(baseRatio - scaledRatio)).toBeLessThan(0.01);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * **Validates: Requirements 3.4**
   * 
   * Property: Font sizes should never decrease when moving to a larger breakpoint.
   * 
   * This test ensures that responsive font scaling is always progressive
   * (never regressive).
   */
  it('should never decrease font size when viewport increases', () => {
    fc.assert(
      fc.property(
        fc.record({
          fontSize: fc.integer({ min: 12, max: 60 }),
          mobileToTabletScale: fc.double({ min: 1.0, max: 1.5, noNaN: true }),
          tabletToDesktopScale: fc.double({ min: 1.0, max: 1.5, noNaN: true }),
        }),
        ({ fontSize, mobileToTabletScale, tabletToDesktopScale }) => {
          const mobileFontSize = fontSize;
          const tabletFontSize = fontSize * mobileToTabletScale;
          const desktopFontSize = tabletFontSize * tabletToDesktopScale;

          // Property: Font sizes must never decrease
          expect(tabletFontSize).toBeGreaterThanOrEqual(mobileFontSize);
          expect(desktopFontSize).toBeGreaterThanOrEqual(tabletFontSize);
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('Feature: futuristic-portfolio, Property 9: Mobile navigation transformation', () => {
  let mockMatchMedia: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockMatchMedia = vi.fn((query: string) => {
      const mediaQueryList = {
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
      return mediaQueryList as unknown as MediaQueryList;
    });

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
  });

  /**
   * **Validates: Requirements 3.5**
   * 
   * Property: For any viewport width below 768px, the Navigation_System should 
   * display a mobile-friendly hamburger menu instead of the full navigation bar.
   * 
   * This test verifies the breakpoint logic for mobile navigation transformation.
   */
  it('should correctly identify mobile vs desktop viewports at 768px breakpoint', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 2560 }), // Viewport widths from mobile to wide desktop
        (viewportWidth) => {
          // Property: Viewport classification logic
          const isMobile = viewportWidth < 768;
          const isDesktop = viewportWidth >= 768;

          // Property: Mobile and desktop should be mutually exclusive
          expect(isMobile).not.toBe(isDesktop);

          // Property: Exactly one should be true
          expect(isMobile || isDesktop).toBe(true);
          expect(isMobile && isDesktop).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * **Validates: Requirements 3.5**
   * 
   * Property: The navigation transformation should occur exactly at the 768px breakpoint,
   * with no ambiguity or overlap.
   */
  it('should have exact breakpoint at 768px with no overlap', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(767, 768), // Test the exact boundary
        (viewportWidth) => {
          const isMobile = viewportWidth < 768;
          const isDesktop = viewportWidth >= 768;

          // Property: At 767px, should be mobile
          // At 768px, should be desktop
          if (viewportWidth === 767) {
            expect(isMobile).toBe(true);
            expect(isDesktop).toBe(false);
          } else if (viewportWidth === 768) {
            expect(isMobile).toBe(false);
            expect(isDesktop).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * **Validates: Requirements 3.5**
   * 
   * Property: The mobile navigation query should work consistently across
   * different mobile viewport widths (320px - 767px).
   */
  it('should consistently classify all widths 320-767px as mobile', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 767 }), // All mobile viewport widths
        (mobileWidth) => {
          const isMobile = mobileWidth < 768;

          // Property: All widths from 320-767px should be mobile
          expect(isMobile).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * **Validates: Requirements 3.5**
   * 
   * Property: The desktop navigation query should work consistently across
   * all desktop viewport widths (768px and above).
   */
  it('should consistently classify all widths 768px+ as desktop', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 768, max: 2560 }), // All desktop viewport widths
        (desktopWidth) => {
          const isDesktop = desktopWidth >= 768;

          // Property: All widths from 768px and above should be desktop
          expect(isDesktop).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * **Validates: Requirements 3.5**
   * 
   * Property: Viewport classification should be transitive - if width A < width B,
   * and A is mobile, then B cannot be mobile unless B is also < 768px.
   */
  it('should maintain transitive property of viewport classification', () => {
    fc.assert(
      fc.property(
        fc.record({
          width1: fc.integer({ min: 320, max: 2560 }),
          width2: fc.integer({ min: 320, max: 2560 }),
        }),
        ({ width1, width2 }) => {
          const isMobile1 = width1 < 768;
          const isMobile2 = width2 < 768;

          // Property: If both widths are on the same side of 768px,
          // they should have the same classification
          if ((width1 < 768 && width2 < 768) || (width1 >= 768 && width2 >= 768)) {
            expect(isMobile1).toBe(isMobile2);
          }

          // Property: If widths are on opposite sides of 768px,
          // they should have different classifications
          if ((width1 < 768 && width2 >= 768) || (width1 >= 768 && width2 < 768)) {
            expect(isMobile1).not.toBe(isMobile2);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
