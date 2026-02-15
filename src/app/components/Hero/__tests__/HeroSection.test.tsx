import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroSection } from '../HeroSection';

// Mock Framer Motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useInView: () => true,
}));

describe('HeroSection', () => {
  const mockProps = {
    name: 'Ivan Tanaka',
    tagline: 'Fullstack Software Engineer',
    ctaButtons: {
      primary: { text: 'View Projects', href: '#portfolio' },
      secondary: { text: 'Contact Me', href: '#contact' },
    },
  };

  it('should render name with gradient effect', () => {
    render(<HeroSection {...mockProps} />);
    const nameElement = screen.getByText('Ivan Tanaka');
    expect(nameElement).toBeInTheDocument();
    expect(nameElement.className).toContain('bg-gradient-to-r');
    expect(nameElement.className).toContain('bg-clip-text');
    expect(nameElement.className).toContain('text-transparent');
  });

  it('should render tagline', () => {
    render(<HeroSection {...mockProps} />);
    const tagline = screen.getByText('Fullstack Software Engineer');
    expect(tagline).toBeInTheDocument();
  });

  it('should render description paragraphs from about.json', () => {
    render(<HeroSection {...mockProps} />);
    // Check that description content is rendered (contains key phrases)
    expect(screen.getByText(/software engineer/i)).toBeInTheDocument();
  });

  it('should render CTA buttons with correct links', () => {
    render(<HeroSection {...mockProps} />);
    const primaryButton = screen.getByText('View Projects');
    const secondaryButton = screen.getByText('Contact Me');
    
    expect(primaryButton).toBeInTheDocument();
    expect(secondaryButton).toBeInTheDocument();
    
    // Check parent anchor tags
    const primaryLink = primaryButton.closest('a');
    const secondaryLink = secondaryButton.closest('a');
    
    expect(primaryLink).toHaveAttribute('href', '#portfolio');
    expect(secondaryLink).toHaveAttribute('href', '#contact');
  });

  it('should not render CTA buttons when not provided', () => {
    const propsWithoutCTA = {
      name: 'Ivan Tanaka',
      tagline: 'Fullstack Software Engineer',
    };
    render(<HeroSection {...propsWithoutCTA} />);
    
    expect(screen.queryByText('View Projects')).not.toBeInTheDocument();
    expect(screen.queryByText('Contact Me')).not.toBeInTheDocument();
  });

  it('should have responsive height classes', () => {
    const { container } = render(<HeroSection {...mockProps} />);
    const section = container.querySelector('section');
    
    expect(section?.className).toContain('min-h-screen');
    expect(section?.className).toContain('lg:min-h-[80vh]');
  });

  it('should have proper semantic HTML structure', () => {
    render(<HeroSection {...mockProps} />);
    const section = screen.getByRole('region', { name: /hero section/i });
    expect(section).toBeInTheDocument();
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('should replace years_of_experience placeholder', () => {
    render(<HeroSection {...mockProps} />);
    const currentYear = new Date().getFullYear();
    const expectedYears = currentYear - 2018;
    
    expect(screen.getByText(new RegExp(`${expectedYears} years of experience`, 'i'))).toBeInTheDocument();
  });

  it('should have gradient animation class on name', () => {
    render(<HeroSection {...mockProps} />);
    const nameElement = screen.getByText('Ivan Tanaka');
    expect(nameElement.className).toContain('animate-gradient');
  });

  it('should render with responsive text sizes', () => {
    render(<HeroSection {...mockProps} />);
    const nameElement = screen.getByText('Ivan Tanaka').closest('h1');
    
    // Check for responsive text size classes
    expect(nameElement?.className).toMatch(/text-5xl|sm:text-6xl|md:text-7xl|lg:text-8xl/);
  });
});
