# Project Structure

## Directory Organization

```
src/
├── app/                    # Next.js App Router
│   ├── components/         # React components
│   │   ├── PrintButton.tsx
│   │   └── PrintWrapper.tsx
│   ├── page.tsx           # Main portfolio page
│   ├── layout.tsx         # Root layout with metadata
│   ├── globals.css        # Global styles
│   └── utils.ts           # Utility functions
├── data/                  # JSON data files
│   ├── about.json
│   ├── careers.json
│   ├── certificates.json
│   ├── contacts.json
│   ├── educations.json
│   ├── honors.json
│   ├── portfolios.json
│   └── skills.json
└── types/                 # TypeScript type definitions
    └── html2pdf.d.ts

public/
└── assets/
    └── images/            # Static images
        ├── certificates/  # Certificate images
        ├── portfolios/    # Portfolio screenshots
        └── *.svg         # Icon files

.kiro/
├── specs/                 # Feature specifications
└── steering/              # AI assistant guidance
```

## Key Conventions

### Data-Driven Content
- All content is stored in JSON files under `src/data/`
- Components import and render data dynamically
- Use `dangerouslySetInnerHTML` for HTML content in JSON (e.g., bold text, links)

### Component Patterns
- Single-page application structure in `page.tsx`
- Sections organized as semantic HTML elements
- Print-specific components in `app/components/`

### Styling Approach
- Tailwind utility classes for all styling
- Dark theme by default (slate-950 background, slate-300 text)
- Print styles using `print:` prefix (converts to light theme)
- Amber color scheme for accents and highlights
- Responsive design with `sm:`, `md:`, `lg:` breakpoints

### Import Patterns
- Use `@/` alias for src imports: `import data from "@/data/file.json"`
- Import icons from `lucide-react`
- Keep imports organized: external libraries, then local files

### Naming Conventions
- Components: PascalCase (e.g., `PrintWrapper.tsx`)
- Data files: lowercase with hyphens (e.g., `careers.json`)
- CSS classes: Tailwind utilities only, no custom classes
