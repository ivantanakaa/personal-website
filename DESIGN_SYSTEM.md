# Futuristic Portfolio Design System

This document describes the design system foundation for the futuristic portfolio enhancement.

## Overview

The design system provides a consistent set of design tokens, utilities, and patterns for building a modern, futuristic portfolio interface with smooth animations and glassmorphism effects.

## Design Tokens

### Colors

#### Background Colors
- `--bg-primary`: #020617 (slate-950) - Main background
- `--bg-secondary`: #0f172a (slate-900) - Secondary surfaces
- `--bg-tertiary`: #1e293b (slate-800) - Tertiary surfaces

#### Accent Colors
- `--accent-primary`: #f59e0b (amber-500) - Primary accent
- `--accent-secondary`: #d97706 (amber-600) - Secondary accent
- `--accent-light`: #fbbf24 (amber-400) - Light accent

#### Text Colors
- `--text-primary`: #f8fafc (slate-50) - Primary text
- `--text-secondary`: #cbd5e1 (slate-300) - Secondary text
- `--text-muted`: #64748b (slate-500) - Muted text

#### Special Effects
- `--glass-bg`: rgba(15, 23, 42, 0.6) - Glassmorphism background
- `--glass-border`: rgba(203, 213, 225, 0.1) - Glass border
- `--glow-amber`: 0 0 20px rgba(245, 158, 11, 0.3) - Glow effect
- `--shadow-card`: 0 4px 6px -1px rgba(0, 0, 0, 0.3) - Card shadow

### Typography

#### Font Sizes
- `--text-xs`: 0.75rem (12px)
- `--text-sm`: 0.875rem (14px)
- `--text-base`: 1rem (16px)
- `--text-lg`: 1.125rem (18px)
- `--text-xl`: 1.25rem (20px)
- `--text-2xl`: 1.5rem (24px)
- `--text-3xl`: 1.875rem (30px)
- `--text-4xl`: 2.25rem (36px) - scales to 2.5rem on tablet+
- `--text-5xl`: 3rem (48px) - scales to 3.5rem on tablet+
- `--text-6xl`: 3.75rem (60px) - scales to 4.5rem on tablet+

#### Font Weights
- `--font-light`: 300
- `--font-normal`: 400
- `--font-medium`: 500
- `--font-semibold`: 600
- `--font-bold`: 700
- `--font-extrabold`: 800

### Spacing

- `--space-1`: 0.25rem (4px)
- `--space-2`: 0.5rem (8px)
- `--space-3`: 0.75rem (12px)
- `--space-4`: 1rem (16px)
- `--space-6`: 1.5rem (24px)
- `--space-8`: 2rem (32px)
- `--space-12`: 3rem (48px)
- `--space-16`: 4rem (64px)
- `--space-24`: 6rem (96px)
- `--space-32`: 8rem (128px)

### Animation

#### Durations
- `--duration-fast`: 200ms - Quick interactions
- `--duration-normal`: 300ms - Standard transitions
- `--duration-slow`: 600ms - Entrance animations

#### Easing Functions
- `--easing-default`: cubic-bezier(0.4, 0, 0.2, 1) - Standard easing
- `--easing-smooth`: cubic-bezier(0.4, 0, 0.6, 1) - Smooth deceleration
- `--easing-bounce`: cubic-bezier(0.68, -0.55, 0.265, 1.55) - Bounce effect

## Tailwind Utilities

### Custom Classes

#### Glassmorphism
```css
.glass-card
```
Creates a frosted glass effect with backdrop blur and subtle border.

#### Gradient Text
```css
.gradient-text
```
Applies an amber gradient to text (primary → secondary → light).

#### Hover Effects
```css
.hover-lift
```
Lifts element on hover with smooth transform and shadow transition.

#### GPU Acceleration
```css
.transform-gpu
```
Ensures GPU-accelerated rendering for smooth animations.

### Animations

#### Tailwind Animation Classes
- `animate-fade-in` - Fade in with slide up (0.6s)
- `animate-slide-up` - Slide up animation (0.6s)
- `animate-glow-pulse` - Pulsing glow effect (2s infinite)
- `animate-float` - Floating animation (3s infinite)

## Usage Examples

### Glassmorphism Card
```tsx
<div className="glass-card rounded-xl p-6">
  <h3 className="gradient-text text-2xl font-bold">Title</h3>
  <p className="text-text-secondary">Content</p>
</div>
```

### Hover Lift Effect
```tsx
<button className="hover-lift bg-accent-primary text-bg-primary px-6 py-3 rounded-lg">
  Click Me
</button>
```

### Animated Section
```tsx
<section className="animate-fade-in">
  <h2 className="text-4xl font-bold gradient-text">Section Title</h2>
</section>
```

## Accessibility

### Reduced Motion Support
The design system respects `prefers-reduced-motion` settings. When enabled:
- All animations are reduced to 0.01ms
- Scroll behavior becomes instant
- Transitions are minimized

### Color Contrast
All color combinations meet WCAG 2.1 AA standards:
- Text on backgrounds: minimum 4.5:1 ratio
- Large text: minimum 3:1 ratio

## Testing

### Running Tests
```bash
bun test              # Run all tests
bun test:ui           # Run with UI
bun test:coverage     # Run with coverage report
```

### Test Structure
- Unit tests validate specific design token values
- Property-based tests verify consistency across ranges
- Tests are located in `src/app/__tests__/`

## Technologies

- **Styling**: Tailwind CSS 3.4 with custom configuration
- **Animations**: Framer Motion + CSS animations
- **Testing**: Vitest + fast-check for property-based testing
- **Framework**: Next.js 16 with App Router

## Next Steps

With the foundation in place, you can now:
1. Create reusable UI components (Button, Card, etc.)
2. Build animation wrapper components
3. Implement custom hooks for scroll and intersection observers
4. Develop the enhanced Hero, Skills, and Portfolio sections
