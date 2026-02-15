import { describe, it, expect } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import fc from 'fast-check';
import Button from '../Button';

describe('Feature: futuristic-portfolio, Button Component Property Tests', () => {
  describe('Property 21: Button hover effects', () => {
    /**
     * **Validates: Requirements 7.1**
     * 
     * For any button element, when a user hovers over it, the Animation_System 
     * should apply scale transforms and color changes.
     */
    it('should apply hover scale and color transition classes for all variants', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('primary' as const, 'secondary' as const, 'ghost' as const),
          fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
          (variant, text) => {
            render(<Button variant={variant}>{text}</Button>);
            const button = screen.getByRole('button');
            
            // Check for scale transform on hover
            expect(button.className).toMatch(/hover:scale-105/);
            
            // Check for transition classes (enables smooth color changes)
            expect(button.className).toMatch(/transition-all/);
            expect(button.className).toMatch(/duration-300/);
            
            // Check variant-specific hover color changes
            if (variant === 'primary') {
              expect(button.className).toMatch(/hover:bg-accent-secondary/);
            } else if (variant === 'secondary') {
              expect(button.className).toMatch(/hover:bg-bg-secondary/);
              expect(button.className).toMatch(/hover:border-accent-primary/);
            } else if (variant === 'ghost') {
              expect(button.className).toMatch(/hover:bg-accent-primary\/10/);
            }
            
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
    it('should have cursor-pointer class for all button variants', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('primary' as const, 'secondary' as const, 'ghost' as const),
          fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
          fc.boolean(),
          (variant, text, disabled) => {
            render(
              <Button variant={variant} disabled={disabled}>
                {text}
              </Button>
            );
            const button = screen.getByRole('button');
            
            // All buttons should have cursor-pointer class
            expect(button.className).toMatch(/cursor-pointer/);
            
            // Disabled buttons should also have cursor-not-allowed
            if (disabled) {
              expect(button.className).toMatch(/disabled:cursor-not-allowed/);
            }
            
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 24: Button click feedback', () => {
    /**
     * **Validates: Requirements 7.4**
     * 
     * For any button element, when a user clicks it, the Animation_System 
     * should apply a press-down effect with scale reduction (e.g., scale(0.95)).
     */
    it('should have active scale-down class for all variants', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('primary' as const, 'secondary' as const, 'ghost' as const),
          fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
          (variant, text) => {
            render(<Button variant={variant}>{text}</Button>);
            const button = screen.getByRole('button');
            
            // Check for active scale-down effect (scale(0.95))
            expect(button.className).toMatch(/active:scale-95/);
            
            // Ensure transform-gpu for smooth animations
            expect(button.className).toMatch(/transform-gpu/);
            
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 39: Button ripple effects', () => {
    /**
     * **Validates: Requirements 13.4**
     * 
     * For any button element, when clicked, the Animation_System should 
     * implement a ripple effect emanating from the click position.
     */
    it('should have overflow-hidden and relative positioning for ripple effect', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('primary' as const, 'secondary' as const, 'ghost' as const),
          fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
          (variant, text) => {
            render(<Button variant={variant}>{text}</Button>);
            const button = screen.getByRole('button');
            
            // Button must have relative positioning for ripple positioning
            expect(button.className).toMatch(/relative/);
            
            // Button must have overflow-hidden to contain ripple
            expect(button.className).toMatch(/overflow-hidden/);
            
            // Check that button has the structure to support ripple
            // (the ripple span is added dynamically on click)
            expect(button.querySelector('span')).toBeTruthy();
            
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
    it('should have transition duration of 300ms for all variants', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('primary' as const, 'secondary' as const, 'ghost' as const),
          fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
          (variant, text) => {
            render(<Button variant={variant}>{text}</Button>);
            const button = screen.getByRole('button');
            
            // Check for duration-300 class (300ms transition)
            expect(button.className).toMatch(/duration-300/);
            
            // Ensure transition-all is present for smooth transitions
            expect(button.className).toMatch(/transition-all/);
            
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 25: Focus state visibility', () => {
    /**
     * **Validates: Requirements 7.5, 10.6**
     * 
     * For any focusable interactive element, when it receives keyboard focus, 
     * it should display a visible focus indicator (outline or ring) with at least 2px width.
     */
    it('should have visible focus ring for all variants', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('primary' as const, 'secondary' as const, 'ghost' as const),
          fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
          (variant, text) => {
            render(<Button variant={variant}>{text}</Button>);
            const button = screen.getByRole('button');
            
            // Check for focus ring classes (ring-2 = 2px width)
            expect(button.className).toMatch(/focus:ring-2/);
            expect(button.className).toMatch(/focus:ring-accent-primary/);
            expect(button.className).toMatch(/focus:ring-offset-2/);
            
            // Ensure focus outline is removed (using ring instead)
            expect(button.className).toMatch(/focus:outline-none/);
            
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
          fc.constantFrom('primary' as const, 'secondary' as const, 'ghost' as const),
          fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
          (variant, text) => {
            render(<Button variant={variant}>{text}</Button>);
            const button = screen.getByRole('button');
            
            // Check for transform-gpu class
            expect(button.className).toMatch(/transform-gpu/);
            
            // Verify that hover and active states use transform (scale)
            expect(button.className).toMatch(/hover:scale-105/);
            expect(button.className).toMatch(/active:scale-95/);
            
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Consistent styling across variants', () => {
    it('should maintain consistent base classes across all variants', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('primary' as const, 'secondary' as const, 'ghost' as const),
          fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
          (variant, text) => {
            render(<Button variant={variant}>{text}</Button>);
            const button = screen.getByRole('button');
            
            // All variants should have consistent base styling
            expect(button.className).toMatch(/px-6/);
            expect(button.className).toMatch(/py-3/);
            expect(button.className).toMatch(/rounded-lg/);
            expect(button.className).toMatch(/font-medium/);
            expect(button.className).toMatch(/relative/);
            expect(button.className).toMatch(/overflow-hidden/);
            
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
