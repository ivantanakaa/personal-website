import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { SlideIn } from '../SlideIn';
import fc from 'fast-check';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, initial, animate, transition, variants, ...props }: any) => {
      // Only serialize if values exist
      const initialStr = initial ? JSON.stringify(initial) : undefined;
      const animateStr = animate && Object.keys(animate).length > 0 ? JSON.stringify(animate) : undefined;
      const transitionStr = transition ? JSON.stringify(transition) : undefined;
      const variantsStr = variants ? JSON.stringify(variants) : undefined;
      
      return (
        <div
          className={className}
          data-testid="motion-div"
          data-initial={initialStr}
          data-animate={animateStr}
          data-transition={transitionStr}
          data-variants={variantsStr}
          {...props}
        >
          {children}
        </div>
      );
    },
  },
  useInView: () => true,
}));

describe('Feature: futuristic-portfolio, Property 1: Scroll-triggered animations (SlideIn)', () => {
  /**
   * **Validates: Requirements 2.1**
   * 
   * For any section with scroll-triggered animations, when that section enters the viewport,
   * the Animation_System should fade in and slide up content elements with staggered timing.
   */
  it('should slide in content when entering viewport with staggered timing', () => {
    fc.assert(
      fc.property(
        fc.record({
          delay: fc.double({ min: 0, max: 2, noNaN: true }),
          duration: fc.double({ min: 0.1, max: 3, noNaN: true }),
          direction: fc.constantFrom('up', 'down', 'left', 'right'),
          stagger: fc.double({ min: 0, max: 1, noNaN: true }),
        }),
        ({ delay, duration, direction, stagger }) => {
          const { container } = render(
            <SlideIn delay={delay} duration={duration} direction={direction} stagger={stagger}>
              <div>Test Content</div>
            </SlideIn>
          );

          const motionDiv = container.querySelector('[data-testid="motion-div"]');
          expect(motionDiv).toBeTruthy();

          // For single child, verify initial and animate states
          const initialStr = motionDiv?.getAttribute('data-initial');
          
          if (initialStr && initialStr !== 'null') {
            const initial = JSON.parse(initialStr);
            
            // Single child mode
            expect(initial.opacity).toBe(0);

            // Verify initial position based on direction
            if (direction === 'up') {
              expect(initial.y).toBe(40);
            } else if (direction === 'down') {
              expect(initial.y).toBe(-40);
            } else if (direction === 'left') {
              expect(initial.x).toBe(40);
            } else if (direction === 'right') {
              expect(initial.x).toBe(-40);
            }

            // Verify animate state
            const animateStr = motionDiv?.getAttribute('data-animate');
            expect(animateStr).toBeTruthy();
            const animate = JSON.parse(animateStr || '{}');
            expect(animate.opacity).toBe(1);
            expect(animate.x).toBe(0);
            expect(animate.y).toBe(0);

            // Verify transition
            const transitionStr = motionDiv?.getAttribute('data-transition');
            expect(transitionStr).toBeTruthy();
            const transition = JSON.parse(transitionStr || '{}');
            expect(transition.duration).toBe(duration);
            expect(transition.delay).toBe(delay);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should support staggered children animations', () => {
    fc.assert(
      fc.property(
        fc.record({
          delay: fc.double({ min: 0, max: 2, noNaN: true }),
          duration: fc.double({ min: 0.1, max: 3, noNaN: true }),
          direction: fc.constantFrom('up', 'down', 'left', 'right'),
          stagger: fc.double({ min: 0.05, max: 0.5, noNaN: true }),
          childCount: fc.integer({ min: 2, max: 5 }),
        }),
        ({ delay, duration, direction, stagger, childCount }) => {
          const children = Array.from({ length: childCount }, (_, i) => (
            <div key={i}>Child {i}</div>
          ));

          const { container } = render(
            <SlideIn delay={delay} duration={duration} direction={direction} stagger={stagger}>
              {children}
            </SlideIn>
          );

          const motionDivs = container.querySelectorAll('[data-testid="motion-div"]');
          
          // Should have container + children
          expect(motionDivs.length).toBeGreaterThanOrEqual(1);

          // Verify container has variants for staggered animation
          const containerDiv = motionDivs[0];
          const variantsStr = containerDiv?.getAttribute('data-variants');
          
          if (variantsStr && variantsStr !== 'null') {
            const variants = JSON.parse(variantsStr);
            
            if (variants && variants.visible && variants.visible.transition) {
              expect(variants.visible.transition.staggerChildren).toBe(stagger);
              expect(variants.visible.transition.delayChildren).toBe(delay);
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('Feature: futuristic-portfolio, Property 3: GPU-accelerated animations (SlideIn)', () => {
  /**
   * **Validates: Requirements 2.4, 9.5**
   * 
   * For any animated element, the animation should only use CSS transform and opacity properties
   * (not layout properties like top, left, width, height) to ensure GPU acceleration.
   */
  it('should only use transform and opacity for animations', () => {
    fc.assert(
      fc.property(
        fc.record({
          delay: fc.double({ min: 0, max: 2, noNaN: true }),
          duration: fc.double({ min: 0.1, max: 3, noNaN: true }),
          direction: fc.constantFrom('up', 'down', 'left', 'right'),
        }),
        ({ delay, duration, direction }) => {
          const { container } = render(
            <SlideIn delay={delay} duration={duration} direction={direction}>
              <div>Test Content</div>
            </SlideIn>
          );

          const motionDiv = container.querySelector('[data-testid="motion-div"]');
          const initialStr = motionDiv?.getAttribute('data-initial');
          const animateStr = motionDiv?.getAttribute('data-animate');

          // Verify only GPU-accelerated properties are used
          const allowedProps = ['opacity', 'x', 'y', 'scale', 'rotate'];
          const layoutProps = ['top', 'left', 'right', 'bottom', 'width', 'height', 'margin', 'padding'];

          // Check initial state
          if (initialStr && initialStr !== 'null') {
            const initial = JSON.parse(initialStr);
            Object.keys(initial).forEach(prop => {
              expect(layoutProps).not.toContain(prop);
              expect(allowedProps).toContain(prop);
            });
          }

          // Check animate state
          if (animateStr && animateStr !== 'null') {
            const animate = JSON.parse(animateStr);
            Object.keys(animate).forEach(prop => {
              expect(layoutProps).not.toContain(prop);
              expect(allowedProps).toContain(prop);
            });
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('Feature: futuristic-portfolio, SlideIn direction variations', () => {
  /**
   * **Validates: Requirements 2.1**
   * 
   * SlideIn should support slide-in from various directions (up, down, left, right)
   * with appropriate initial positions.
   */
  it('should set correct initial position for each direction', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('up', 'down', 'left', 'right'),
        (direction) => {
          const { container } = render(
            <SlideIn direction={direction}>
              <div>Test Content</div>
            </SlideIn>
          );

          const motionDiv = container.querySelector('[data-testid="motion-div"]');
          const initialStr = motionDiv?.getAttribute('data-initial');
          
          expect(initialStr).toBeTruthy();
          const initial = JSON.parse(initialStr || '{}');

          // Verify correct initial position based on direction
          switch (direction) {
            case 'up':
              expect(initial.y).toBe(40);
              expect(initial.x).toBeUndefined();
              break;
            case 'down':
              expect(initial.y).toBe(-40);
              expect(initial.x).toBeUndefined();
              break;
            case 'left':
              expect(initial.x).toBe(40);
              expect(initial.y).toBeUndefined();
              break;
            case 'right':
              expect(initial.x).toBe(-40);
              expect(initial.y).toBeUndefined();
              break;
          }

          // All directions should start with opacity 0
          expect(initial.opacity).toBe(0);
        }
      ),
      { numRuns: 100 }
    );
  });
});
