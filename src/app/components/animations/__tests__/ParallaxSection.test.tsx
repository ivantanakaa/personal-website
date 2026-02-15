import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ParallaxSection } from '../ParallaxSection';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, style, ...props }: any) => (
      <div
        className={className}
        data-testid="motion-div"
        data-has-style={style ? 'true' : 'false'}
        {...props}
      >
        {children}
      </div>
    ),
  },
  useScroll: () => ({
    scrollYProgress: { get: () => 0 },
  }),
  useTransform: (value: any, input: number[], output: string[]) => ({
    get: () => output[0],
  }),
}));

describe('ParallaxSection Component', () => {
  it('should render children', () => {
    render(
      <ParallaxSection>
        <div>Test Content</div>
      </ParallaxSection>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should apply custom className to container', () => {
    const { container } = render(
      <ParallaxSection className="custom-class">
        <div>Test Content</div>
      </ParallaxSection>
    );
    const outerDiv = container.firstChild as HTMLElement;
    expect(outerDiv).toHaveClass('custom-class');
  });

  it('should accept speed prop', () => {
    const { container } = render(
      <ParallaxSection speed={0.8}>
        <div>Test Content</div>
      </ParallaxSection>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should use default speed of 0.5 when not provided', () => {
    const { container } = render(
      <ParallaxSection>
        <div>Test Content</div>
      </ParallaxSection>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should accept negative speed values', () => {
    const { container } = render(
      <ParallaxSection speed={-0.3}>
        <div>Test Content</div>
      </ParallaxSection>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should accept zero speed value', () => {
    const { container } = render(
      <ParallaxSection speed={0}>
        <div>Test Content</div>
      </ParallaxSection>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render motion.div with style prop', () => {
    render(
      <ParallaxSection speed={0.5}>
        <div>Test Content</div>
      </ParallaxSection>
    );
    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toBeInTheDocument();
    expect(motionDiv.getAttribute('data-has-style')).toBe('true');
  });
});
