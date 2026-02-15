import { describe, it, expect } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import fc from 'fast-check';
import Card from '../Card';

describe('Feature: futuristic-portfolio, Card Component Property Tests', () => {
  describe('Property 12: Consistent skill card styling', () => {
    /**
     * **Validates: Requirements 5.2**
     * 
     * For any skill element in the Skills_Grid, it should have consistent styling 
     * (same classes, dimensions, and visual treatment) as all other skill elements.
     */
    it('should maintain consistent base styling across all card instances', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
          fc.boolean(),
          (content, hover) => {
            const { container } = render(<Card hover={hover}>{content}</Card>);
            const card = container.firstChild as HTMLElement;
            
            // All cards should have consistent base classes
            expect(card.className).toMatch(/bg-bg-secondary/);
            expect(card.className).toMatch(/border/);
            expect(card.className).toMatch(/rounded-xl/);
            expect(card.className).toMatch(/p-6/);
            expect(card.className).toMatch(/shadow-card/);
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

  describe('Property 15: Consistent project card dimensions', () => {
    /**
     * **Validates: Requirements 6.1**
     * 
     * For any project card in the Portfolio_Gallery, it should have the same 
     * computed dimensions (width and height) as all other project cards in the grid.
     */
    it('should have consistent padding and border radius across all cards', () => {
      fc.assert(
        fc.property(
          fc.array(fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0), { minLength: 2, maxLength: 10 }),
          (contents) => {
            const { container } = render(
              <>
                {contents.map((content, index) => (
                  <Card key={index} data-testid={`card-${index}`}>
                    {content}
                  </Card>
                ))}
              </>
            );
            
            const cards = container.querySelectorAll('[data-testid^="card-"]');
            expect(cards.length).toBeGreaterThan(1);
            
            // All cards should have the same padding class
            cards.forEach(card => {
              expect(card.className).toMatch(/p-6/);
              expect(card.className).toMatch(/rounded-xl/);
            });
            
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
          (content) => {
            const { container } = render(<Card hover={true}>{content}</Card>);
            const card = container.firstChild as HTMLElement;
            
            expect(card.className).toMatch(/cursor-pointer/);
            
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should not have cursor-pointer when hover is disabled', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
          (content) => {
            const { container } = render(<Card hover={false}>{content}</Card>);
            const card = container.firstChild as HTMLElement;
            
            expect(card.className).not.toMatch(/cursor-pointer/);
            
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
            const { container } = render(<Card hover={hover}>{content}</Card>);
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
            const { container } = render(<Card hover={hover}>{content}</Card>);
            const card = container.firstChild as HTMLElement;
            
            // Check for transform-gpu class
            expect(card.className).toMatch(/transform-gpu/);
            
            // Verify that hover state uses transform (translateY)
            if (hover) {
              expect(card.className).toMatch(/hover:-translate-y-2/);
            }
            
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 16: Project card hover reveal', () => {
    /**
     * **Validates: Requirements 6.2**
     * 
     * For any project card, when a user hovers over it, additional information 
     * should be revealed with smooth opacity and transform transitions.
     */
    it('should have hover effects with transform transitions when hover is enabled', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
          (content) => {
            const { container } = render(<Card hover={true}>{content}</Card>);
            const card = container.firstChild as HTMLElement;
            
            // Check for hover transform (lift effect)
            expect(card.className).toMatch(/hover:-translate-y-2/);
            
            // Check for hover shadow enhancement
            expect(card.className).toMatch(/hover:shadow-xl/);
            
            // Check for hover border enhancement
            expect(card.className).toMatch(/hover:border-accent-primary\/40/);
            
            // Ensure smooth transitions
            expect(card.className).toMatch(/transition-all/);
            
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Hover effects consistency', () => {
    it('should apply consistent hover effects when enabled', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
          (content) => {
            const { container } = render(<Card hover={true}>{content}</Card>);
            const card = container.firstChild as HTMLElement;
            
            // All hover-enabled cards should have these classes
            expect(card.className).toMatch(/hover:border-accent-primary\/40/);
            expect(card.className).toMatch(/hover:shadow-xl/);
            expect(card.className).toMatch(/hover:-translate-y-2/);
            expect(card.className).toMatch(/cursor-pointer/);
            
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should not apply hover effects when disabled', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
          (content) => {
            const { container } = render(<Card hover={false}>{content}</Card>);
            const card = container.firstChild as HTMLElement;
            
            // Hover-disabled cards should not have hover classes
            expect(card.className).not.toMatch(/hover:border-accent-primary\/40/);
            expect(card.className).not.toMatch(/cursor-pointer/);
            
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Custom className handling', () => {
    it('should preserve base classes when custom className is provided', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
          fc.stringMatching(/^[a-zA-Z][a-zA-Z0-9-_]*$/).filter(s => s.trim().length > 0), // Valid CSS class names only
          (content, customClass) => {
            const { container } = render(
              <Card className={customClass}>{content}</Card>
            );
            const card = container.firstChild as HTMLElement;
            
            // Custom class should be present
            expect(card.className).toContain(customClass);
            
            // Base classes should still be present
            expect(card.className).toMatch(/bg-bg-secondary/);
            expect(card.className).toMatch(/rounded-xl/);
            expect(card.className).toMatch(/p-6/);
            
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
