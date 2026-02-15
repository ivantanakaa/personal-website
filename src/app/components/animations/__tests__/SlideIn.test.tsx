import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SlideIn } from '../SlideIn';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, variants, ...props }: any) => (
      <div
        className={className}
        data-testid="motion-div"
        data-variants={JSON.stringify(variants)}
        {...props}
      >
        {children}
      </div>
    ),
  },
  useInView: () => true,
}));

describe('SlideIn Component', () => {
  it('should render children', () => {
    render(
      <SlideIn>
        <div>Test Content</div>
      </SlideIn>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(
      <SlideIn className="custom-class">
        <div>Test Content</div>
      </SlideIn>
    );
    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toHaveClass('custom-class');
  });

  it('should accept delay prop', () => {
    const { container } = render(
      <SlideIn delay={0.5}>
        <div>Test Content</div>
      </SlideIn>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should accept duration prop', () => {
    const { container } = render(
      <SlideIn duration={1.2}>
        <div>Test Content</div>
      </SlideIn>
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
        <SlideIn direction={direction}>
          <div>Test Content {direction}</div>
        </SlideIn>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('should accept stagger prop', () => {
    const { container } = render(
      <SlideIn stagger={0.2}>
        <div>Test Content</div>
      </SlideIn>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should use default values when props are not provided', () => {
    const { container } = render(
      <SlideIn>
        <div>Test Content</div>
      </SlideIn>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should handle single child without stagger', () => {
    render(
      <SlideIn>
        <div>Single Child</div>
      </SlideIn>
    );
    expect(screen.getByText('Single Child')).toBeInTheDocument();
  });

  it('should handle multiple children with stagger', () => {
    render(
      <SlideIn stagger={0.1}>
        {[
          <div key="1">Child 1</div>,
          <div key="2">Child 2</div>,
          <div key="3">Child 3</div>,
        ]}
      </SlideIn>
    );
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
    expect(screen.getByText('Child 3')).toBeInTheDocument();
  });

  it('should render array of children', () => {
    const children = [
      <p key="1">First</p>,
      <p key="2">Second</p>,
      <p key="3">Third</p>,
    ];

    render(<SlideIn>{children}</SlideIn>);
    
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('Third')).toBeInTheDocument();
  });
});
