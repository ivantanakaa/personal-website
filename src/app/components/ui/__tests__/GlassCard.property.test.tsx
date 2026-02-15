import { describe, it, expect } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import fc from 'fast-check';
import GlassCard from '../GlassCard';

describe('Feature: futuristic-portfolio, GlassCard Component Property Tests', () => {
  describe('Property 13: Skill card hover effects', () => {
    /**
     * **Validates: Requirements 5.3**
     * 
     * For any skill card, when a user hovers over it, the Animation_System 
     * should apply a lift effect (translateY) with shadow enhancement.
     */
    it('should apply hover-lift class when hover is enabled', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
          fc.boolean(),
          (content, hoverEnabled) => {
            const { container } = render(
              <GlassCard hover={hoverEnabled}>{content}</GlassCard>
            );
            const card = container.firstChild as HTMLElement;
            
            if (hoverEnabled) {
              // Should have hover-lift class for translateY effect
              expect(card.className).toMatch(/hover-lift/);
            } else {
              // Should not have hover-lift when disabled
              expect(card.className).not.toMatch(/hover-lift/);
            }
            
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 2: Hover transition timing', () => {
    /**
     * **Validates: Requirements 2.2, 7.6**
     * 
     * For any interactive element (buttons, links, cards), when a user hovers 
     * over it, all transitions should complete within 200-300ms.
     */
    it('should have transition duration of 300ms', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
          fc.boolean(),
          (content, hover) => {
            const { container } = render(
              <GlassCard hover={hover}>{content}</GlassCard>
            );
            const card = container.firstChild as HTMLElement;
            
            // Check for duration-300 class (300ms transition)
            expect(card.className).toMatch(/duration-300/);
            
            // Ensure transition-all is present for smooth transitions
            expect(card.className).toMatch(/transition-all/);
            
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 3: GPU-accelerated animations', () => {
    /**
     * **Validates: Requirements 2.4, 9.5**
     * 
     * For any animated element, the animation should only use CSS transform 
     * and opacity properties to ensure GPU acceleration.
     */
    it('should use transform-gpu class for GPU acceleration', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
          fc.boolean(),
          (content, hover) => {
            const { container } = render(
              <GlassCard hover={hover}>{content}</GlassCard>
            );
            const card = container.firstChild as HTMLElement;
            
            // Check for transform-gpu class
            expect(card.className).toMatch(/transform-gpu/);
            
            // The hover-lift utility uses transform: translateY(-8px)
            // which is GPU-accelerated
            if (hover) {
              expect(card.className).toMatch(/hover-lift/);
            }
            
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 12: Consistent skill card styling', () => {
    /**
     * **Validates: Requirements 5.2**
     * 
     * For any skill element in the Skills_Grid, it should have consistent 
     * styling (same classes, dimensions, and visual treatment) as all other 
     * skill elements.
     */
    it('should maintain consistent base classes regardless of content', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
          fc.boolean(),
          fc.string({ minLength: 0, maxLength: 50 }),
          (content, hover, customClass) => {
            const { container } = render(
              <GlassCard hover={hover} className={customClass}>
                {content}
              </GlassCard>
            );
            const card = container.firstChild as HTMLElement;
            
            // All GlassCards should have consistent base styling
            expect(card.className).toMatch(/glass-card/);
            expect(card.className).toMatch(/rounded-xl/);
            expect(card.className).toMatch(/p-6/);
            expect(card.className).toMatch(/transform-gpu/);
            expect(card.className).toMatch(/transition-all/);
            expect(card.className).toMatch(/duration-300/);
            
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 23: Interactive cursor styling', () => {
    /**
     * **Validates: Requirements 7.3**
     * 
     * For any interactive element (buttons, links, clickable cards), 
     * the CSS cursor property should be set to "pointer".
     */
    it('should have cursor-pointer when hover is enabled', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
          fc.boolean(),
          (content, hoverEnabled) => {
            const { container } = render(
              <GlassCard hover={hoverEnabled}>{content}</GlassCard>
            );
            const card = container.firstChild as HTMLElement;
            
            if (hoverEnabled) {
              // Interactive cards should have cursor-pointer
              expect(card.className).toMatch(/cursor-pointer/);
            } else {
              // Non-interactive cards should not have cursor-pointer
              expect(card.className).not.toMatch(/cursor-pointer/);
            }
            
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Glassmorphism implementation', () => {
    /**
     * **Validates: Requirements 1.2**
     * 
     * The Portfolio_System SHALL implement glassmorphism effects on card 
     * components with backdrop blur.
     */
    it('should have glass-card class for glassmorphism effect', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
          fc.boolean(),
          fc.string({ minLength: 0, maxLength: 50 }),
          (content, hover, customClass) => {
            const { container } = render(
              <GlassCard hover={hover} className={customClass}>
                {content}
              </GlassCard>
            );
            const card = container.firstChild as HTMLElement;
            
            // Must have glass-card class which applies:
            // - backdrop-filter: blur(12px)
            // - border: 1px solid var(--glass-border)
            // - background: var(--glass-bg)
            expect(card.className).toMatch(/glass-card/);
            
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Border and shadow effects', () => {
    /**
     * **Validates: Requirements 1.2, 5.3**
     * 
     * GlassCard should have border effects (via glass-card class) and 
     * shadow effects (via hover-lift class when hovered).
     */
    it('should have glassmorphism border via glass-card class', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
          (content) => {
            const { container } = render(<GlassCard>{content}</GlassCard>);
            const card = container.firstChild as HTMLElement;
            
            // glass-card class provides border styling
            expect(card.className).toMatch(/glass-card/);
            
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Custom className merging', () => {
    it('should preserve custom classes while maintaining base classes', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
          fc.array(fc.string({ minLength: 1, maxLength: 20 }).filter(s => s.trim().length > 0), { minLength: 0, maxLength: 5 }),
          (content, customClasses) => {
            const customClass = customClasses.join(' ');
            const { container } = render(
              <GlassCard className={customClass}>{content}</GlassCard>
            );
            const card = container.firstChild as HTMLElement;
            
            // Should have base classes
            expect(card.className).toMatch(/glass-card/);
            expect(card.className).toMatch(/rounded-xl/);
            
            // Should include custom classes
            customClasses.forEach(cls => {
              if (cls.trim()) {
                expect(card.className).toContain(cls);
              }
            });
            
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Ref forwarding', () => {
    it('should properly forward refs to the underlying div element', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
          (content) => {
            const ref = { current: null };
            render(<GlassCard ref={ref}>{content}</GlassCard>);
            
            // Ref should be assigned to an HTMLDivElement
            expect(ref.current).toBeInstanceOf(HTMLDivElement);
            
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
