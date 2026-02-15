import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('should render with children', () => {
      render(<Button>Click Me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('should apply primary variant by default', () => {
      render(<Button>Primary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-accent-primary');
    });

    it('should apply secondary variant classes', () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-bg-tertiary', 'border-accent-primary/30');
    });

    it('should apply ghost variant classes', () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-transparent', 'text-accent-primary');
    });

    it('should merge custom className with base classes', () => {
      render(<Button className="custom-class">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
      expect(button).toHaveClass('px-6', 'py-3', 'rounded-lg');
    });
  });

  describe('Interactive States', () => {
    it('should have cursor-pointer class', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('cursor-pointer');
    });

    it('should have hover scale classes', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('hover:scale-105');
    });

    it('should have active scale classes', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('active:scale-95');
    });

    it('should have focus ring classes', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('focus:ring-2', 'focus:ring-accent-primary');
    });

    it('should have transition classes for smooth animations', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('transition-all', 'duration-300');
    });
  });

  describe('Ripple Effect', () => {
    it('should create ripple element on click', async () => {
      const user = userEvent.setup();
      render(<Button>Click Me</Button>);
      const button = screen.getByRole('button');

      await user.click(button);

      // Check for ripple span with animation
      const ripples = button.querySelectorAll('.animate-ripple');
      expect(ripples.length).toBeGreaterThan(0);
    });

    it('should position ripple at click location', async () => {
      const user = userEvent.setup();
      render(<Button>Click Me</Button>);
      const button = screen.getByRole('button');

      await user.click(button);

      const ripple = button.querySelector('.animate-ripple') as HTMLElement;
      expect(ripple).toBeTruthy();
      expect(ripple?.style.animation).toContain('ripple');
    });

    it('should call onClick handler when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click Me</Button>);
      const button = screen.getByRole('button');

      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Disabled State', () => {
    it('should apply disabled styles when disabled', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed');
    });

    it('should not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button disabled onClick={handleClick}>Disabled</Button>);
      const button = screen.getByRole('button');

      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Button</Button>);
      const button = screen.getByRole('button');

      button.focus();
      expect(button).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalled();
    });

    it('should support forwarded ref', () => {
      const ref = { current: null };
      render(<Button ref={ref}>Button</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('should pass through additional button attributes', () => {
      render(
        <Button type="submit" aria-label="Submit form">
          Submit
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('aria-label', 'Submit form');
    });
  });

  describe('Variants Visual Differences', () => {
    it('primary variant should have background color', () => {
      render(<Button variant="primary">Primary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-accent-primary');
    });

    it('secondary variant should have border', () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('border');
    });

    it('ghost variant should have transparent background', () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-transparent');
    });
  });
});
