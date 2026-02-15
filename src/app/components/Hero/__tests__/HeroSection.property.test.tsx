import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { HeroSection } from '../HeroSection';
import fc from 'fast-check';

// Mock Framer Motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useInView: () => true,
}));

/**
 * Property-Based Tests for HeroSection Component
 * Feature: futuristic-portfolio
 */

describe('Feature: futuristic-portfolio, Property 11: Hero section minimum height', () => {
  /**
   * **Validates: Requirements 4.6**
   * 
   * Property: For any viewport, the Hero_Section should occupy at least 80vh on desktop (> 1024px) 
   * and 100vh on mobile (< 768px).
   */
  it('should have min-h-screen class for mobile and lg:min-h-[80vh] for desktop', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string({ minLength: 1, maxLength: 50 }),
          tagline: fc.string({ minLength: 1, maxLength: 100 }),
          primaryText: fc.string({ minLength: 1, maxLength: 30 }),
          primaryHref: fc.webUrl(),
          secondaryText: fc.string({ minLength: 1, maxLength: 30 }),
          secondaryHref: fc.webUrl(),
        }),
        ({ name, tagline, primaryText, primaryHref, secondaryText, secondaryHref }) => {
          const props = {
            name,
            tagline,
            ctaButtons: {
              primary: { text: primaryText, href: primaryHref },
              secondary: { text: secondaryText, href: secondaryHref },
            },
          };

          const { container } = render(<HeroSection {...props} />);
          const section = container.querySelector('section');

          // Verify the section has responsive height classes
          expect(section).toBeTruthy();
          expect(section?.className).toContain('min-h-screen'); // 100vh for mobile
          expect(section?.className).toContain('lg:min-h-[80vh]'); // 80vh for desktop
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('Feature: futuristic-portfolio, Hero section content rendering', () => {
  /**
   * Property: For any valid name and tagline, the HeroSection should render them correctly
   * with gradient styling.
   */
  it('should render name and tagline with proper styling for any valid input', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string({ minLength: 1, maxLength: 50 }),
          tagline: fc.string({ minLength: 1, maxLength: 100 }),
        }),
        ({ name, tagline }) => {
          const { container } = render(<HeroSection name={name} tagline={tagline} />);
          
          // Name should have gradient classes
          const nameElement = container.querySelector('h1 span');
          expect(nameElement).toBeTruthy();
          expect(nameElement?.className).toContain('bg-gradient-to-r');
          expect(nameElement?.className).toContain('bg-clip-text');
          expect(nameElement?.className).toContain('text-transparent');
          expect(nameElement?.className).toContain('animate-gradient');
          
          // Tagline should be rendered
          expect(container.textContent).toContain(tagline);
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('Feature: futuristic-portfolio, CTA buttons rendering', () => {
  /**
   * Property: For any valid CTA button configuration, buttons should render with correct
   * links and be wrapped in anchor tags.
   */
  it('should render CTA buttons with correct hrefs for any valid button config', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string({ minLength: 1, maxLength: 50 }),
          tagline: fc.string({ minLength: 1, maxLength: 100 }),
          primaryText: fc.string({ minLength: 1, maxLength: 30 }),
          primaryHref: fc.oneof(fc.webUrl(), fc.constant('#section')),
          secondaryText: fc.string({ minLength: 1, maxLength: 30 }),
          secondaryHref: fc.oneof(fc.webUrl(), fc.constant('#contact')),
        }),
        ({ name, tagline, primaryText, primaryHref, secondaryText, secondaryHref }) => {
          const props = {
            name,
            tagline,
            ctaButtons: {
              primary: { text: primaryText, href: primaryHref },
              secondary: { text: secondaryText, href: secondaryHref },
            },
          };

          const { container } = render(<HeroSection {...props} />);
          
          // Find anchor tags
          const anchors = container.querySelectorAll('a');
          expect(anchors.length).toBeGreaterThanOrEqual(2);
          
          // Check that hrefs are set correctly
          const hrefs = Array.from(anchors).map(a => a.getAttribute('href'));
          expect(hrefs).toContain(primaryHref);
          expect(hrefs).toContain(secondaryHref);
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('Feature: futuristic-portfolio, Responsive text sizing', () => {
  /**
   * Property: For any content, the hero section should have responsive text size classes
   * that scale from mobile to desktop.
   */
  it('should have responsive text size classes for all viewport sizes', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string({ minLength: 1, maxLength: 50 }),
          tagline: fc.string({ minLength: 1, maxLength: 100 }),
        }),
        ({ name, tagline }) => {
          const { container } = render(<HeroSection name={name} tagline={tagline} />);
          
          const h1 = container.querySelector('h1');
          expect(h1).toBeTruthy();
          
          // Should have base mobile size and responsive breakpoint sizes
          const hasResponsiveClasses = 
            h1?.className.includes('text-5xl') && // base mobile
            h1?.className.includes('sm:text-6xl') && // small screens
            h1?.className.includes('md:text-7xl') && // medium screens
            h1?.className.includes('lg:text-8xl'); // large screens
          
          expect(hasResponsiveClasses).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });
});
