import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { FadeIn } from '../FadeIn';
import fc from 'fast-check';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, initial, animate, transition, ...props }: any) => {
      // Only serialize if values exist
      const initialStr = initial ? JSON.stringify(initial) : undefined;
      const animateStr = animate && Object.keys(animate).length > 0 ? JSON.stringify(animate) : undefined;
      const transitionStr = transition ? JSON.stringify(transition) : undefined;
      
      return (
        <div
          className={className}
          data-testid="motion-div"
          data-initial={initialStr}
          data-animate={animateStr}
          data-transition={transitionStr}
          {...props}
        >
          {children}
        </div>
      );
    },
  },
  useInView: () => true,
}));

describe('Feature: futuristic-portfolio, Property 1: Scroll-triggered animations', () => {
  /**
   * **Validates: Requirements 2.1**
   * 
   * For any section with scroll-triggered animations, when that section enters the viewport,
   * the Animation_System should fade in and slide up content elements with staggered timing.
   */
  it('should fade in and slide content when entering viewport', () => {
    fc.assert(
      fc.property(
        fc.record({
          delay: fc.double({ min: 0, max: 2, noNaN: true }),
          duration: fc.double({ min: 0.1, max: 3, noNaN: true }),
          direction: fc.constantFrom('up', 'down', 'left', 'right'),
        }),
        ({ delay, duration, direction }) => {
          const { container } = render(
            <FadeIn delay={delay} duration={duration} direction={direction}>
              <div>Test Content</div>
            </FadeIn>
          );

          const motionDiv = container.querySelector('[data-testid="motion-div"]');
          expect(motionDiv).toBeTruthy();

          // Verify initial state includes opacity 0
          const initialStr = motionDiv?.getAttribute('data-initial');
          expect(initialStr).toBeTruthy();
          const initial = JSON.parse(initialStr || '{}');
          expect(initial.opacity).toBe(0);

          // Verify initial position based on direction
          if (direction === 'up') {
            expect(initial.y).toBe(20);
          } else if (direction === 'down') {
            expect(initial.y).toBe(-20);
          } else if (direction === 'left') {
            expect(initial.x).toBe(20);
          } else if (direction === 'right') {
            expect(initial.x).toBe(-20);
          }

          // Verify animate state includes opacity 1 and reset position
          const animateStr = motionDiv?.getAttribute('data-animate');
          expect(animateStr).toBeTruthy();
          const animate = JSON.parse(animateStr || '{}');
          expect(animate.opacity).toBe(1);
          expect(animate.x).toBe(0);
          expect(animate.y).toBe(0);

          // Verify transition includes delay and duration
          const transitionStr = motionDiv?.getAttribute('data-transition');
          expect(transitionStr).toBeTruthy();
          const transition = JSON.parse(transitionStr || '{}');
          expect(transition.duration).toBe(duration);
          expect(transition.delay).toBe(delay);
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('Feature: futuristic-portfolio, Property 3: GPU-accelerated animations', () => {
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
            <FadeIn delay={delay} duration={duration} direction={direction}>
              <div>Test Content</div>
            </FadeIn>
          );

          const motionDiv = container.querySelector('[data-testid="motion-div"]');
          const initialStr = motionDiv?.getAttribute('data-initial');
          const animateStr = motionDiv?.getAttribute('data-animate');
          
          expect(initialStr).toBeTruthy();
          expect(animateStr).toBeTruthy();
          
          const initial = JSON.parse(initialStr || '{}');
          const animate = JSON.parse(animateStr || '{}');

          // Verify only GPU-accelerated properties are used
          const allowedProps = ['opacity', 'x', 'y', 'scale', 'rotate'];
          const initialProps = Object.keys(initial);
          const animateProps = Object.keys(animate);

          // Check that no layout properties are used
          const layoutProps = ['top', 'left', 'right', 'bottom', 'width', 'height', 'margin', 'padding'];
          
          initialProps.forEach(prop => {
            expect(layoutProps).not.toContain(prop);
            expect(allowedProps).toContain(prop);
          });

          animateProps.forEach(prop => {
            expect(layoutProps).not.toContain(prop);
            expect(allowedProps).toContain(prop);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
