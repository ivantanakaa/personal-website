# Design Document: Futuristic Portfolio Enhancement

## Overview

This design document outlines the technical approach for enhancing an existing Next.js portfolio website with a minimalist, futuristic aesthetic. The enhancement will transform the current portfolio into a visually striking, performant, and accessible showcase of a fullstack programmer's work.

The design leverages modern web technologies including CSS Grid, Flexbox, CSS custom properties, Framer Motion for animations, and Next.js optimization features. The approach prioritizes performance through GPU-accelerated animations, lazy loading, and efficient rendering strategies while maintaining a delightful user experience across all devices.

### Design Principles

1. **Performance First**: All visual enhancements must maintain excellent performance metrics
2. **Progressive Enhancement**: Core content accessible without JavaScript, enhanced with animations when available
3. **Mobile-First**: Design and implement for mobile devices first, then scale up
4. **Accessibility**: WCAG 2.1 AA compliance for all interactive elements
5. **Maintainability**: Clean, modular component structure for easy updates

## Architecture

### Component Structure

The portfolio will be organized into the following component hierarchy:

```
app/
├── layout.tsx (Root layout with theme provider)
├── page.tsx (Main portfolio page)
├── components/
│   ├── Hero/
│   │   ├── HeroSection.tsx
│   │   ├── AnimatedTitle.tsx
│   │   └── BackgroundEffects.tsx
│   ├── Navigation/
│   │   ├── Header.tsx
│   │   ├── MobileMenu.tsx
│   │   └── ScrollProgress.tsx
│   ├── Skills/
│   │   ├── SkillsGrid.tsx
│   │   └── SkillCard.tsx
│   ├── Portfolio/
│   │   ├── PortfolioGallery.tsx
│   │   ├── ProjectCard.tsx
│   │   └── ProjectFilter.tsx
│   ├── Experience/
│   │   ├── Timeline.tsx
│   │   └── ExperienceCard.tsx
│   ├── Contact/
│   │   └── ContactSection.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── GlassCard.tsx
│   └── animations/
│       ├── FadeIn.tsx
│       ├── SlideIn.tsx
│       └── ParallaxSection.tsx
├── hooks/
│   ├── useScrollAnimation.ts
│   ├── useIntersectionObserver.ts
│   └── useMediaQuery.ts
└── styles/
    ├── globals.css
    └── animations.css
```

### Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion for complex animations, CSS transitions for simple effects
- **Icons**: Lucide React (already in use)
- **Performance**: Next.js Image component, dynamic imports, React Server Components

### State Management

The portfolio is primarily static content with minimal state requirements:

- **Navigation State**: Active section tracking for navigation highlighting
- **UI State**: Mobile menu open/closed, filter selections
- **Scroll State**: Scroll position for animations and navigation behavior

State will be managed using React hooks (useState, useReducer) at the component level. No global state management library is needed.

## Components and Interfaces

### Core Components

#### 1. HeroSection Component

```typescript
interface HeroSectionProps {
  name: string;
  tagline: string;
  description: string[];
  ctaButtons: {
    primary: { text: string; href: string };
    secondary: { text: string; href: string };
  };
}

// Features:
// - Animated gradient text for name
// - Staggered fade-in for description paragraphs
// - Floating geometric shapes background
// - Responsive typography scaling
```

#### 2. Navigation Component

```typescript
interface NavigationProps {
  sections: Array<{
    id: string;
    label: string;
  }>;
  activeSection: string;
}

// Features:
// - Fixed positioning with backdrop blur
// - Smooth scroll to sections
// - Active section highlighting
// - Mobile hamburger menu
// - Scroll progress indicator
```

#### 3. SkillsGrid Component

```typescript
interface Skill {
  name: string;
  category: string;
}

interface SkillsGridProps {
  skills: Record<string, string[]>;
}

// Features:
// - Responsive grid layout (1/2/4 columns)
// - Glassmorphism card effects
// - Hover animations with lift effect
// - Category icons
```

#### 4. ProjectCard Component

```typescript
interface Project {
  name: string;
  description: string;
  tags: string[];
  link?: string | { url: string; text: string };
  src: string;
  alt: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

// Features:
// - Image with lazy loading
// - Hover reveal of full description
// - Technology tag display
// - External link indicator
// - 3D tilt effect on hover
```

#### 5. Timeline Component

```typescript
interface Experience {
  position: string;
  corporate: string;
  corporate_link: string;
  start_date: string;
  end_date: string | null;
  jobs: string[];
}

interface TimelineProps {
  experiences: Experience[];
}

// Features:
// - Vertical timeline with connecting line
// - Animated dots on scroll
// - Hover effects on entries
// - Responsive layout
```

### Animation Components

#### FadeIn Wrapper

```typescript
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

// Uses Framer Motion for scroll-triggered fade-in animations
```

#### ParallaxSection

```typescript
interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
}

// Implements parallax scrolling effect for background elements
```

### Custom Hooks

#### useScrollAnimation

```typescript
function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Returns scroll position and progress percentage
  return { scrollY, scrollProgress };
}
```

#### useIntersectionObserver

```typescript
function useIntersectionObserver(
  ref: RefObject<Element>,
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  // Returns whether element is in viewport
  return isIntersecting;
}
```

#### useMediaQuery

```typescript
function useMediaQuery(query: string): boolean {
  // Returns whether media query matches
  // Example: useMediaQuery('(min-width: 768px)')
}
```

## Data Models

### Portfolio Data Structure

The existing data files will be used as-is, with TypeScript interfaces for type safety:

```typescript
// types/portfolio.ts

export interface About {
  years_of_experience_start: number;
  description: string[];
}

export interface Career {
  position: string;
  corporate: string;
  corporate_link: string;
  start_date: string;
  end_date: string | null;
  jobs: string[];
}

export interface Portfolio {
  name: string;
  alt: string;
  link?: string | { url: string; text: string };
  src: string;
  description: string;
  tags: string[];
}

export interface Skills {
  [category: string]: string[];
}

export interface Certificate {
  title: string;
  issued_by: string;
  issue_date: string;
  link: string;
}

export interface Education {
  university: string;
  degree: string;
  start_date: string;
  end_date: string;
  achievements: string[];
}

export interface Contact {
  label: string;
  link: string;
  alt: string;
}
```

### Theme Configuration

```typescript
// Design tokens for consistent theming
export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    text: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
  spacing: {
    section: string;
    container: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  animations: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    easing: {
      default: string;
      smooth: string;
      bounce: string;
    };
  };
}
```

## Design System

### Color Palette

```css
/* Futuristic dark theme with amber accents */
:root {
  /* Background colors */
  --bg-primary: #020617;      /* slate-950 */
  --bg-secondary: #0f172a;    /* slate-900 */
  --bg-tertiary: #1e293b;     /* slate-800 */
  
  /* Accent colors */
  --accent-primary: #f59e0b;  /* amber-500 */
  --accent-secondary: #d97706; /* amber-600 */
  --accent-light: #fbbf24;    /* amber-400 */
  
  /* Text colors */
  --text-primary: #f8fafc;    /* slate-50 */
  --text-secondary: #cbd5e1;  /* slate-300 */
  --text-muted: #64748b;      /* slate-500 */
  
  /* Glassmorphism */
  --glass-bg: rgba(15, 23, 42, 0.6);
  --glass-border: rgba(203, 213, 225, 0.1);
  
  /* Shadows and glows */
  --glow-amber: 0 0 20px rgba(245, 158, 11, 0.3);
  --shadow-card: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}
```

### Typography Scale

```css
/* Font sizes with responsive scaling */
:root {
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */
  --text-5xl: 3rem;        /* 48px */
  --text-6xl: 3.75rem;     /* 60px */
  
  /* Font weights */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
}

@media (min-width: 768px) {
  :root {
    --text-4xl: 2.5rem;
    --text-5xl: 3.5rem;
    --text-6xl: 4.5rem;
  }
}
```

### Spacing System

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */
}
```

### Animation Specifications

#### Fade In Animation

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}
```

#### Glow Pulse Animation

```css
@keyframes glowPulse {
  0%, 100% {
    box-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(245, 158, 11, 0.5);
  }
}

.glow-pulse {
  animation: glowPulse 2s ease-in-out infinite;
}
```

#### Hover Lift Effect

```css
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4);
}
```

### Glassmorphism Effect

```css
.glass-card {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(203, 213, 225, 0.1);
  border-radius: 1rem;
}
```

## Implementation Strategy

### Phase 1: Foundation

1. Set up design tokens in Tailwind config
2. Create base UI components (Button, Card, GlassCard)
3. Implement custom hooks (useScrollAnimation, useIntersectionObserver, useMediaQuery)
4. Set up Framer Motion and animation utilities

### Phase 2: Core Components

1. Refactor Hero section with new animations
2. Implement Navigation with scroll behavior
3. Create Skills grid with glassmorphism
4. Build Portfolio gallery with enhanced cards
5. Develop Timeline for work experience

### Phase 3: Enhancements

1. Add micro-interactions (hover effects, ripples)
2. Implement parallax backgrounds
3. Add scroll progress indicator
4. Create loading states and skeleton screens
5. Implement project filtering

### Phase 4: Optimization

1. Optimize images with Next.js Image
2. Implement lazy loading for below-fold content
3. Add content-visibility for performance
4. Optimize animation performance
5. Test and improve Lighthouse scores

### Phase 5: Accessibility & Polish

1. Add ARIA labels and semantic HTML
2. Implement keyboard navigation
3. Add focus indicators
4. Test with screen readers
5. Implement prefers-reduced-motion support

## Performance Considerations

### Animation Performance

All animations will use CSS transforms and opacity to leverage GPU acceleration:

```typescript
// Good: GPU-accelerated
transform: translateY(20px);
opacity: 0;

// Avoid: Causes layout recalculation
top: 20px;
height: 100px;
```

### Image Optimization

```typescript
import Image from 'next/image';

<Image
  src={project.src}
  alt={project.alt}
  width={600}
  height={400}
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Code Splitting

```typescript
// Dynamic imports for heavy components
const ProjectFilter = dynamic(() => import('./ProjectFilter'), {
  loading: () => <FilterSkeleton />,
  ssr: false
});
```

### Content Visibility

```css
.optimize-render {
  content-visibility: auto;
  contain-intrinsic-size: 1px 500px;
}
```

## Responsive Breakpoints

```typescript
const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
};

// Tailwind config
module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
};
```

### Responsive Layout Patterns

- **Mobile (< 768px)**: Single column, stacked layout, hamburger menu
- **Tablet (768px - 1024px)**: Two-column grids, visible navigation
- **Desktop (> 1024px)**: Multi-column layouts, enhanced animations, parallax effects



## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: Scroll-triggered animations

*For any* section with scroll-triggered animations, when that section enters the viewport, the Animation_System should fade in and slide up content elements with staggered timing.

**Validates: Requirements 2.1**

### Property 2: Hover transition timing

*For any* interactive element (buttons, links, cards), when a user hovers over it, all transitions should complete within 200-300ms.

**Validates: Requirements 2.2, 7.6**

### Property 3: GPU-accelerated animations

*For any* animated element, the animation should only use CSS transform and opacity properties (not layout properties like top, left, width, height) to ensure GPU acceleration.

**Validates: Requirements 2.4, 9.5**

### Property 4: Smooth section navigation

*For any* navigation link to a section, when clicked, the Portfolio_System should smooth scroll to the target section with easing.

**Validates: Requirements 2.5, 8.3**

### Property 5: Mobile responsive layout

*For any* viewport width between 320px and 768px, content sections should display in a single-column layout.

**Validates: Requirements 3.1**

### Property 6: Tablet responsive layout

*For any* viewport width between 768px and 1024px, appropriate content sections should display in two-column layouts.

**Validates: Requirements 3.2**

### Property 7: Desktop responsive layout

*For any* viewport width above 1024px, content sections should display in multi-column layouts with optimal spacing.

**Validates: Requirements 3.3**

### Property 8: Responsive font scaling

*For any* text element, the computed font size should scale proportionally based on the current viewport breakpoint (mobile < tablet < desktop).

**Validates: Requirements 3.4**

### Property 9: Mobile navigation transformation

*For any* viewport width below 768px, the Navigation_System should display a mobile-friendly hamburger menu instead of the full navigation bar.

**Validates: Requirements 3.5**

### Property 10: Portfolio gallery grid responsiveness

*For any* viewport width, the Portfolio_Gallery grid should display 1 column on mobile (< 768px), 2 columns on tablet (768px-1024px), and 3 columns on desktop (> 1024px).

**Validates: Requirements 3.6, 5.6**

### Property 11: Hero section minimum height

*For any* viewport, the Hero_Section should occupy at least 80vh on desktop (> 1024px) and 100vh on mobile (< 768px).

**Validates: Requirements 4.6**

### Property 12: Consistent skill card styling

*For any* skill element in the Skills_Grid, it should have consistent styling (same classes, dimensions, and visual treatment) as all other skill elements.

**Validates: Requirements 5.2**

### Property 13: Skill card hover effects

*For any* skill card, when a user hovers over it, the Animation_System should apply a lift effect (translateY) with shadow enhancement.

**Validates: Requirements 5.3**

### Property 14: Color contrast compliance

*For any* text element in the Portfolio_System, the color contrast ratio between text and background should be at least 4.5:1 for normal text and 3:1 for large text.

**Validates: Requirements 5.5, 10.1**

### Property 15: Consistent project card dimensions

*For any* project card in the Portfolio_Gallery, it should have the same computed dimensions (width and height) as all other project cards in the grid.

**Validates: Requirements 6.1**

### Property 16: Project card hover reveal

*For any* project card, when a user hovers over it, additional information should be revealed with smooth opacity and transform transitions.

**Validates: Requirements 6.2**

### Property 17: Complete project information display

*For any* project in the Portfolio_Gallery, the card should display all required information: thumbnail image, title, description, and technology tags.

**Validates: Requirements 6.3**

### Property 18: External link indicators

*For any* project with an external link, the project card should display a visual indicator (icon) and the link should have target="_blank" and rel="noopener noreferrer" attributes.

**Validates: Requirements 6.4**

### Property 19: Image lazy loading

*For any* image element below the fold (not immediately visible on page load), it should have the loading="lazy" attribute or use Next.js Image component with lazy loading enabled.

**Validates: Requirements 6.5, 9.2**

### Property 20: Project filtering functionality

*For any* technology filter selection, the Portfolio_Gallery should display only projects that include that technology in their tags array.

**Validates: Requirements 6.6**

### Property 21: Button hover effects

*For any* button element, when a user hovers over it, the Animation_System should apply scale transforms and color changes.

**Validates: Requirements 7.1**

### Property 22: Link hover effects

*For any* link element, when a user hovers over it, the Animation_System should display underline animations or color transitions.

**Validates: Requirements 7.2**

### Property 23: Interactive cursor styling

*For any* interactive element (buttons, links, clickable cards), the CSS cursor property should be set to "pointer".

**Validates: Requirements 7.3**

### Property 24: Button click feedback

*For any* button element, when a user clicks it, the Animation_System should apply a press-down effect with scale reduction (e.g., scale(0.95)).

**Validates: Requirements 7.4**

### Property 25: Focus state visibility

*For any* focusable interactive element, when it receives keyboard focus, it should display a visible focus indicator (outline or ring) with at least 2px width.

**Validates: Requirements 7.5, 10.6**

### Property 26: Next.js Image optimization

*For any* image in the Portfolio_System, it should use the Next.js Image component for automatic optimization, or have explicit width, height, and optimization attributes.

**Validates: Requirements 9.3**

### Property 27: Content visibility optimization

*For any* section that is initially off-screen (below the fold), it should have the content-visibility: auto CSS property to improve rendering performance.

**Validates: Requirements 9.6**

### Property 28: Keyboard navigation support

*For any* interactive element, it should be reachable and operable via keyboard navigation (Tab key) with proper tabindex values.

**Validates: Requirements 10.2**

### Property 29: ARIA labels for icon buttons

*For any* button or link that contains only an icon (no visible text), it should have an aria-label or aria-labelledby attribute describing its purpose.

**Validates: Requirements 10.3**

### Property 30: Contact link functionality

*For any* contact method link, the href attribute should correctly open the appropriate application or service (mailto:, tel:, https://).

**Validates: Requirements 11.3**

### Property 31: Contact button completeness

*For any* contact button, it should display both an icon and a text label for clarity.

**Validates: Requirements 11.4**

### Property 32: Contact button hover effects

*For any* contact button, when a user hovers over it, the Animation_System should apply visual effects (color change, scale, or shadow).

**Validates: Requirements 11.5**

### Property 33: Chronological experience ordering

*For any* sequence of work experience entries, they should be ordered in reverse chronological order (most recent first) based on start_date or end_date.

**Validates: Requirements 12.1**

### Property 34: Complete experience information

*For any* work experience entry, it should display all required information: company name, position, dates (start and end), and key achievements.

**Validates: Requirements 12.2**

### Property 35: Experience entry hover effects

*For any* experience entry, when a user hovers over it, the Animation_System should highlight the entry with subtle effects (color change, glow, or scale).

**Validates: Requirements 12.4**

### Property 36: Company logo display

*For any* work experience entry where company logo data is available, the logo or icon should be displayed alongside the company name.

**Validates: Requirements 12.5**

### Property 37: Consistent date formatting

*For any* date display in the Portfolio_System (experience, education, certificates), it should follow a consistent format pattern (e.g., "MMM YYYY" or "Jan 2020").

**Validates: Requirements 12.6**

### Property 38: Social icon hover animations

*For any* social media icon, when a user hovers over it, the Animation_System should apply rotation, bounce, or scale effects.

**Validates: Requirements 13.1**

### Property 39: Button ripple effects

*For any* button element, when clicked, the Animation_System should implement a ripple effect emanating from the click position.

**Validates: Requirements 13.4**

### Property 40: Project card tilt effect

*For any* project card, when a user hovers over it, the Animation_System should tilt the card slightly based on cursor position (3D transform effect).

**Validates: Requirements 13.6**

### Property 41: Limited font family usage

*For all* elements in the Portfolio_System, the total number of unique font-family values used should be between 2 and 3.

**Validates: Requirements 14.1**

### Property 42: Body text line height

*For any* body text element (paragraphs, list items), the line-height should be between 1.5 and 1.8 for optimal readability.

**Validates: Requirements 14.4**

### Property 43: Optimal line length

*For any* text block (paragraphs, descriptions), the container width should limit line length to approximately 60-80 characters for optimal readability.

**Validates: Requirements 14.5**

### Property 44: Heading letter spacing

*For any* heading element (h1, h2, h3) or uppercase text, the letter-spacing CSS property should be explicitly set for improved readability.

**Validates: Requirements 14.6**

### Property 45: Image loading placeholders

*For any* image element, while loading, it should display a placeholder background with a loading animation or blur effect.

**Validates: Requirements 15.2**

### Property 46: Content fade-in transitions

*For any* dynamically loaded content, when it becomes available, it should fade in with smooth opacity transitions.

**Validates: Requirements 15.3**

### Property 47: Progressive image loading

*For any* image using Next.js Image component, it should implement progressive loading with blur-up technique using placeholder="blur".

**Validates: Requirements 15.4**

## Error Handling

### Animation Errors

**Reduced Motion Preference**: When users have `prefers-reduced-motion: reduce` set in their system preferences, all animations should be disabled or significantly reduced. This is handled via CSS media query:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Validates: Requirements 10.5**

### Image Loading Errors

**Missing Images**: When an image fails to load, display a fallback placeholder with an icon or text indicating the content type:

```typescript
<Image
  src={project.src}
  alt={project.alt}
  onError={(e) => {
    e.currentTarget.src = '/assets/images/placeholder.png';
  }}
/>
```

**Invalid Image Paths**: Validate image paths exist in the data files. Log warnings for missing images during development.

### Navigation Errors

**Invalid Section IDs**: When a navigation link references a non-existent section ID, gracefully handle by scrolling to top or showing a console warning in development mode.

```typescript
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (!element) {
    console.warn(`Section ${sectionId} not found`);
    return;
  }
  element.scrollIntoView({ behavior: 'smooth' });
};
```

### Responsive Layout Errors

**Viewport Edge Cases**: Handle very small viewports (< 320px) and very large viewports (> 2560px) gracefully with min/max width constraints:

```css
.container {
  max-width: min(1280px, 100vw);
  min-width: 320px;
}
```

### Data Validation

**Missing Required Fields**: Validate that all required fields exist in data files. Provide sensible defaults or skip rendering incomplete entries:

```typescript
const isValidProject = (project: Portfolio): boolean => {
  return !!(project.name && project.description && project.tags);
};

const validProjects = portfolios.filter(isValidProject);
```

### Performance Degradation

**Slow Animations**: If frame rate drops below 30fps, automatically reduce animation complexity or disable non-essential animations. This can be monitored using the Performance API:

```typescript
let lastFrameTime = performance.now();
const checkFrameRate = () => {
  const now = performance.now();
  const fps = 1000 / (now - lastFrameTime);
  if (fps < 30) {
    document.body.classList.add('reduce-animations');
  }
  lastFrameTime = now;
  requestAnimationFrame(checkFrameRate);
};
```

## Testing Strategy

### Dual Testing Approach

The portfolio enhancement will use both unit tests and property-based tests for comprehensive coverage:

**Unit Tests**: Focus on specific examples, edge cases, and integration points
- Specific component rendering (Hero section displays correct content)
- Edge cases (empty project arrays, missing data fields)
- User interactions (button clicks, navigation)
- Accessibility features (ARIA labels, semantic HTML)

**Property-Based Tests**: Verify universal properties across all inputs
- Responsive behavior at all viewport widths
- Animation consistency across all interactive elements
- Color contrast for all text/background combinations
- Data validation for all portfolio entries

### Testing Framework

**Framework**: Vitest for unit and property-based tests
**Property Testing Library**: fast-check for TypeScript
**Component Testing**: React Testing Library
**E2E Testing**: Playwright for critical user flows
**Accessibility Testing**: axe-core for automated accessibility checks

### Property-Based Test Configuration

Each property-based test will:
- Run a minimum of 100 iterations with randomized inputs
- Reference the corresponding design document property
- Use the tag format: `Feature: futuristic-portfolio, Property {number}: {property_text}`

Example property test structure:

```typescript
import fc from 'fast-check';
import { describe, it, expect } from 'vitest';

describe('Feature: futuristic-portfolio, Property 14: Color contrast compliance', () => {
  it('should maintain 4.5:1 contrast ratio for all text elements', () => {
    fc.assert(
      fc.property(
        fc.record({
          textColor: fc.hexaString({ minLength: 6, maxLength: 6 }),
          bgColor: fc.hexaString({ minLength: 6, maxLength: 6 }),
        }),
        ({ textColor, bgColor }) => {
          const contrast = calculateContrastRatio(textColor, bgColor);
          expect(contrast).toBeGreaterThanOrEqual(4.5);
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Unit Test Examples

```typescript
describe('HeroSection', () => {
  it('should render name with gradient effect', () => {
    render(<HeroSection {...mockProps} />);
    const nameElement = screen.getByRole('heading', { level: 1 });
    expect(nameElement).toHaveClass('gradient-text');
  });

  it('should animate on mount', async () => {
    render(<HeroSection {...mockProps} />);
    const title = screen.getByRole('heading', { level: 1 });
    await waitFor(() => {
      expect(title).toHaveStyle({ opacity: '1' });
    });
  });
});

describe('ProjectCard', () => {
  it('should display external link indicator when link exists', () => {
    const project = { ...mockProject, link: 'https://example.com' };
    render(<ProjectCard project={project} />);
    expect(screen.getByLabelText(/external link/i)).toBeInTheDocument();
  });

  it('should open links in new tab', () => {
    const project = { ...mockProject, link: 'https://example.com' };
    render(<ProjectCard project={project} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
```

### Accessibility Testing

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<PortfolioPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should support keyboard navigation', () => {
    render(<Navigation sections={mockSections} />);
    const firstLink = screen.getAllByRole('link')[0];
    firstLink.focus();
    expect(firstLink).toHaveFocus();
    
    userEvent.tab();
    const secondLink = screen.getAllByRole('link')[1];
    expect(secondLink).toHaveFocus();
  });
});
```

### Performance Testing

```typescript
describe('Performance', () => {
  it('should lazy load images below the fold', () => {
    render(<PortfolioGallery projects={mockProjects} />);
    const images = screen.getAllByRole('img');
    const belowFoldImages = images.slice(3); // Assuming first 3 are above fold
    
    belowFoldImages.forEach(img => {
      expect(img).toHaveAttribute('loading', 'lazy');
    });
  });

  it('should use GPU-accelerated properties for animations', () => {
    render(<ProjectCard project={mockProject} />);
    const card = screen.getByTestId('project-card');
    const styles = window.getComputedStyle(card);
    
    // Check that animations use transform/opacity, not layout properties
    expect(styles.transition).toMatch(/transform|opacity/);
    expect(styles.transition).not.toMatch(/top|left|width|height/);
  });
});
```

### Test Coverage Goals

- **Unit Test Coverage**: Minimum 80% code coverage
- **Property Test Coverage**: All universal properties from design document
- **Accessibility Coverage**: Zero critical or serious axe violations
- **Performance Coverage**: All performance-critical paths tested

### Continuous Integration

Tests will run automatically on:
- Every pull request
- Every commit to main branch
- Nightly builds for comprehensive property testing (1000+ iterations)

### Testing Best Practices

1. **Avoid Testing Implementation Details**: Test behavior, not internal state
2. **Use Semantic Queries**: Prefer getByRole, getByLabelText over getByTestId
3. **Test User Interactions**: Simulate real user behavior with userEvent
4. **Mock External Dependencies**: Mock data files, API calls, browser APIs
5. **Keep Tests Fast**: Unit tests should run in < 5 seconds total
6. **Property Tests for Ranges**: Use property tests for testing across viewport widths, color combinations, etc.
7. **Balance Unit and Property Tests**: Don't write excessive unit tests when property tests provide better coverage
