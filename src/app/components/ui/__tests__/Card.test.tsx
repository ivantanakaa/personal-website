import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Card from '../Card';

describe('Card Component', () => {
  it('should render children correctly', () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should apply base classes for consistent styling', () => {
    render(<Card data-testid="card">Test Content</Card>);
    const card = screen.getByTestId('card');
    
    // Check for base styling classes
    expect(card).toHaveClass('bg-bg-secondary');
    expect(card).toHaveClass('border');
    expect(card).toHaveClass('rounded-xl');
    expect(card).toHaveClass('p-6');
    expect(card).toHaveClass('shadow-card');
    expect(card).toHaveClass('transform-gpu');
    expect(card).toHaveClass('transition-all');
    expect(card).toHaveClass('duration-300');
  });

  it('should apply hover classes by default', () => {
    render(<Card data-testid="card">Test Content</Card>);
    const card = screen.getByTestId('card');
    
    expect(card).toHaveClass('hover:border-accent-primary/40');
    expect(card).toHaveClass('hover:shadow-xl');
    expect(card).toHaveClass('hover:-translate-y-2');
    expect(card).toHaveClass('cursor-pointer');
  });

  it('should not apply hover classes when hover is false', () => {
    render(<Card hover={false} data-testid="card">Test Content</Card>);
    const card = screen.getByTestId('card');
    
    expect(card).not.toHaveClass('hover:border-accent-primary/40');
    expect(card).not.toHaveClass('cursor-pointer');
  });

  it('should accept and apply custom className', () => {
    render(<Card className="custom-class" data-testid="card">Test Content</Card>);
    const card = screen.getByTestId('card');
    
    expect(card).toHaveClass('custom-class');
    // Should still have base classes
    expect(card).toHaveClass('bg-bg-secondary');
  });

  it('should forward ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Card ref={ref}>Test Content</Card>);
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('should pass through HTML attributes', () => {
    render(
      <Card data-testid="card" aria-label="Test Card" role="article">
        Test Content
      </Card>
    );
    const card = screen.getByTestId('card');
    
    expect(card).toHaveAttribute('aria-label', 'Test Card');
    expect(card).toHaveAttribute('role', 'article');
  });

  it('should have consistent dimensions with other cards', () => {
    const { container } = render(
      <>
        <Card data-testid="card1">Card 1</Card>
        <Card data-testid="card2">Card 2</Card>
      </>
    );
    
    const card1 = screen.getByTestId('card1');
    const card2 = screen.getByTestId('card2');
    
    // Both cards should have the same padding class
    expect(card1).toHaveClass('p-6');
    expect(card2).toHaveClass('p-6');
    
    // Both cards should have the same border radius
    expect(card1).toHaveClass('rounded-xl');
    expect(card2).toHaveClass('rounded-xl');
  });

  it('should use GPU-accelerated transforms', () => {
    render(<Card data-testid="card">Test Content</Card>);
    const card = screen.getByTestId('card');
    
    // Check for transform-gpu class which enables GPU acceleration
    expect(card).toHaveClass('transform-gpu');
  });

  it('should have pointer cursor when hover is enabled', () => {
    render(<Card data-testid="card">Test Content</Card>);
    const card = screen.getByTestId('card');
    
    expect(card).toHaveClass('cursor-pointer');
  });

  it('should not have pointer cursor when hover is disabled', () => {
    render(<Card hover={false} data-testid="card">Test Content</Card>);
    const card = screen.getByTestId('card');
    
    expect(card).not.toHaveClass('cursor-pointer');
  });
});
