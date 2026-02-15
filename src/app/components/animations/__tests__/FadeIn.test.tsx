import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FadeIn } from '../FadeIn';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => (
      <div className={className} data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
  useInView: () => true,
}));

describe('FadeIn Component', () => {
  it('should render children', () => {
    render(
      <FadeIn>
        <div>Test Content</div>
      </FadeIn>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(
      <FadeIn className="custom-class">
        <div>Test Content</div>
      </FadeIn>
    );
    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toHaveClass('custom-class');
  });

  it('should accept delay prop', () => {
    const { container } = render(
      <FadeIn delay={0.5}>
        <div>Test Content</div>
      </FadeIn>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should accept duration prop', () => {
    const { container } = render(
      <FadeIn duration={1.2}>
        <div>Test Content</div>
      </FadeIn>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should accept direction prop', () => {
    const directions: Array<'up' | 'down' | 'left' | 'right'> = [
      'up',
      'down',
      'left',
      'right',
    ];

    directions.forEach((direction) => {
      const { container } = render(
        <FadeIn direction={direction}>
          <div>Test Content {direction}</div>
        </FadeIn>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('should use default values when props are not provided', () => {
    const { container } = render(
      <FadeIn>
        <div>Test Content</div>
      </FadeIn>
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
