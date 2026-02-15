# Tech Stack

## Framework & Runtime
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Node.js 22.x
- Bun (package manager and runtime)

## Styling
- Tailwind CSS 3.4
- Custom color palette: `txt-light`, `txt-dark`, amber accent colors
- Print-specific styles using `print:` modifiers

## Key Libraries
- `lucide-react` - Icon components
- `html2pdf.js` - PDF export functionality
- `react-to-print` - Print functionality
- `@next/third-parties` - Google Analytics integration

## Development Tools
- ESLint (Next.js config)
- PostCSS with Autoprefixer
- SVGO for SVG optimization

## Common Commands

```bash
# Development
bun dev              # Start dev server on localhost:3000

# Build & Production
bun build            # Create production build
bun start            # Start production server

# Code Quality
bun lint             # Run ESLint

# SVG Optimization
bun svgo             # Optimize SVG files
```

## Path Aliases
- `@/*` maps to `./src/*` for cleaner imports
