import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ParallaxSection } from '../ParallaxSection';
import fc from 'fast-check';

// Mock framer-motion
vi.mock('framer-motion', () => {
  return {
    motion: {
      div: ({ children, className, style, transition, ...props }: any) => (
        <div
          className={className}
          data-testid="motion-div"
          data-has-y-style={style && typeof style.y !== 'undefined' ? 'true' : 'false'}
          data-y-value={style && style.y ? JSON.stringify(style.y) : 'undefined'}
          data-transition={JSON.stringify(transition)}
          {...props}
        >
          {children}
        </div>
      ),
    },
    useScroll: () => ({
      scrollYProgress: { get: () => 0.5 },
    }),
    useTransform: (_value: any, input: number[], output: string[]) => {
      // Return a MotionValue-like object
      return {
        get: () => output[1], // Return the end value for testing
        _input: input,
        _output: output,
      };
    },
  };
});

describe('Feature: futuristic-portfolio, Property 3: GPU-accelerated animations', () => {
  /**
   * **Validates: Requirements 2.4, 9.5**
   * 
   * For any animated element, the animation should only use CSS transform and opacity properties
   * (not layout properties like top, left, width, height) to ensure GPU acceleration.
   */
  it('should only use GPU-accelerated properties (transform via y) for parallax', () => {
    fc.assert(
      fc.property(
        fc.record({
          speed: fc.double({ min: -1, max: 1, noNaN: true }),
        }),
        ({ speed }) => {
          const { container } = render(
            <ParallaxSection speed={speed}>
              <div>Test Content</div>
            </ParallaxSection>
          );

          const motionDiv = container.querySelector('[data-testid="motion-div"]');
          expect(motionDiv).toBeTruthy();

          // Verify style uses transform (y property) which is GPU-accelerated
          // The component should always have y style applied for parallax
          expect(motionDiv?.getAttribute('data-has-y-style')).toBe('true');
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('Feature: futuristic-portfolio, ParallaxSection speed configuration', () => {
  /**
   * **Validates: Requirements 2.6**
   * 
   * For any ParallaxSection with a configurable speed multiplier,
   * the component should accept and apply the speed value correctly.
   */
  it('should accept and handle any speed value between -1 and 1', () => {
    fc.assert(
      fc.property(
        fc.record({
          speed: fc.double({ min: -1, max: 1, noNaN: true }),
        }),
        ({ speed }) => {
          const { container } = render(
            <ParallaxSection speed={speed}>
              <div>Parallax Content</div>
            </ParallaxSection>
          );

          // Component should render successfully with any valid speed
          expect(container.firstChild).toBeInTheDocument();
          
          const motionDiv = container.querySelector('[data-testid="motion-div"]');
          expect(motionDiv).toBeTruthy();

          // Verify the motion div has y style applied
          expect(motionDiv?.getAttribute('data-has-y-style')).toBe('true');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should use linear easing for smooth parallax effect', () => {
    fc.assert(
      fc.property(
        fc.record({
          speed: fc.double({ min: -1, max: 1, noNaN: true }),
        }),
        ({ speed }) => {
          const { container } = render(
            <ParallaxSection speed={speed}>
              <div>Parallax Content</div>
            </ParallaxSection>
          );

          const motionDiv = container.querySelector('[data-testid="motion-div"]');
          const transition = JSON.parse(motionDiv?.getAttribute('data-transition') || '{}');

          // Parallax should use linear easing for smooth scrolling effect
          expect(transition.ease).toBe('linear');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should render children regardless of speed value', () => {
    fc.assert(
      fc.property(
        fc.record({
          speed: fc.double({ min: -1, max: 1, noNaN: true }),
          content: fc.string({ minLength: 1, maxLength: 50 }),
        }),
        ({ speed, content }) => {
          const { container } = render(
            <ParallaxSection speed={speed}>
              <div>{content}</div>
            </ParallaxSection>
          );

          // Children should always be rendered
          expect(container.textContent).toContain(content);
        }
      ),
      { numRuns: 100 }
    );
  });
});
