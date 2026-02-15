import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GlassCard from '../GlassCard';

describe('GlassCard Component', () => {
  describe('Rendering', () => {
    it('should render with children', () => {
      render(<GlassCard>Card Content</GlassCard>);
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('should apply glassmorphism classes', () => {
      const { container } = render(<GlassCard>Content</GlassCard>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('glass-card');
    });

    it('should apply rounded corners', () => {
      const { container } = render(<GlassCard>Content</GlassCard>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('rounded-xl');
    });

    it('should apply padding', () => {
      const { container } = render(<GlassCard>Content</GlassCard>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('p-6');
    });

    it('should merge custom className with base classes', () => {
      const { container } = render(<GlassCard className="custom-class">Content</GlassCard>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('custom-class');
      expect(card).toHaveClass('glass-card', 'rounded-xl', 'p-6');
    });
  });

  describe('Hover Effects', () => {
    it('should apply hover-lift class by default', () => {
      const { container } = render(<GlassCard>Content</GlassCard>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('hover-lift');
    });

    it('should apply cursor-pointer when hover is enabled', () => {
      const { container } = render(<GlassCard>Content</GlassCard>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('cursor-pointer');
    });

    it('should not apply hover classes when hover is disabled', () => {
      const { container } = render(<GlassCard hover={false}>Content</GlassCard>);
      const card = container.firstChild as HTMLElement;
      expect(card).not.toHaveClass('hover-lift');
      expect(card).not.toHaveClass('cursor-pointer');
    });

    it('should have transition classes for smooth animations', () => {
      const { container } = render(<GlassCard>Content</GlassCard>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('transition-all', 'duration-300');
    });
  });

  describe('GPU Acceleration', () => {
    it('should have transform-gpu class for performance', () => {
      const { container } = render(<GlassCard>Content</GlassCard>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('transform-gpu');
    });
  });

  describe('Accessibility', () => {
    it('should support forwarded ref', () => {
      const ref = { current: null };
      render(<GlassCard ref={ref}>Content</GlassCard>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('should pass through additional div attributes', () => {
      render(
        <GlassCard role="article" aria-label="Card content">
          Content
        </GlassCard>
      );
      const card = screen.getByRole('article');
      expect(card).toHaveAttribute('aria-label', 'Card content');
    });

    it('should support data attributes', () => {
      const { container } = render(
        <GlassCard data-testid="test-card">Content</GlassCard>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute('data-testid', 'test-card');
    });
  });

  describe('Glassmorphism Effect', () => {
    it('should have backdrop blur effect', () => {
      const { container } = render(<GlassCard>Content</GlassCard>);
      const card = container.firstChild as HTMLElement;
      // glass-card class applies backdrop-filter: blur(12px)
      expect(card).toHaveClass('glass-card');
    });

    it('should have border styling', () => {
      const { container } = render(<GlassCard>Content</GlassCard>);
      const card = container.firstChild as HTMLElement;
      // glass-card class applies border: 1px solid var(--glass-border)
      expect(card).toHaveClass('glass-card');
    });
  });

  describe('Hover Prop Variations', () => {
    it('should enable hover effects when hover=true', () => {
      const { container } = render(<GlassCard hover={true}>Content</GlassCard>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('hover-lift', 'cursor-pointer');
    });

    it('should disable hover effects when hover=false', () => {
      const { container } = render(<GlassCard hover={false}>Content</GlassCard>);
      const card = container.firstChild as HTMLElement;
      expect(card).not.toHaveClass('hover-lift');
      expect(card).not.toHaveClass('cursor-pointer');
    });
  });

  describe('Complex Children', () => {
    it('should render complex nested children', () => {
      render(
        <GlassCard>
          <h2>Title</h2>
          <p>Description</p>
          <button>Action</button>
        </GlassCard>
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });
  });
});
