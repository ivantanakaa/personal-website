# Design Document: Portfolio Modal

## Overview

This design implements a modal dialog system for displaying full portfolio project details. The modal will be triggered by clicking on project cards and will provide an accessible, responsive, and visually cohesive way to view complete project information without truncation.

The implementation follows React best practices using hooks for state management, portal rendering for proper DOM hierarchy, and keyboard event handling for accessibility.

## Architecture

### Component Hierarchy

```
PortfolioGallery (existing)
├── ProjectCard (modified)
│   └── onClick handler → opens modal
└── PortfolioModal (new)
    ├── Modal backdrop
    ├── Modal content container
    │   ├── Close button
    │   ├── Project image
    │   ├── Project title
    │   ├── Full description
    │   ├── Tags
    │   └── External link button (conditional)
    └── Portal to document.body
```

### State Management

The modal state will be managed at the `PortfolioGallery` level:
- `selectedProject`: Stores the currently selected project or null
- `isModalOpen`: Boolean flag for modal visibility

### Event Flow

1. User clicks ProjectCard → `setSelectedProject(project)` → Modal opens
2. User triggers close action → `setSelectedProject(null)` → Modal closes
3. ESC key pressed → Event listener → `setSelectedProject(null)` → Modal closes

## Components and Interfaces

### PortfolioModal Component

**File:** `src/app/components/Portfolio/PortfolioModal.tsx`

**Props Interface:**
```typescript
interface PortfolioModalProps {
  project: {
    name: string;
    alt: string;
    link?: string | { url: string; text: string };
    src: string;
    description: string;
    tags: string[];
  } | null;
  isOpen: boolean;
  onClose: () => void;
}
```

**Key Features:**
- Uses React Portal to render outside the normal DOM hierarchy
- Implements focus trap using `useEffect` and keyboard event listeners
- Prevents body scroll when open using `document.body.style.overflow`
- Handles ESC key press for dismissal
- Animates in/out using Tailwind transitions

**Implementation Approach:**
```typescript
export function PortfolioModal({ project, isOpen, onClose }: PortfolioModalProps) {
  // Early return if not open or no project
  if (!isOpen || !project) return null;

  // Effect for ESC key handling
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Effect for body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = 'unset'; };
    }
  }, [isOpen]);

  // Render modal with backdrop and content
  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal content */}
      </div>
    </div>,
    document.body
  );
}
```

### Modified ProjectCard Component

**Changes:**
- Add `onClick` handler that calls `onCardClick(project)`
- Remove existing `handleClick` for external links (move to modal)
- Keep hover effects for visual feedback

**New Props:**
```typescript
interface ProjectCardProps {
  project: { /* existing fields */ };
  onCardClick: (project: ProjectCardProps['project']) => void;
}
```

### Modified PortfolioGallery Component

**State Additions:**
```typescript
const [selectedProject, setSelectedProject] = useState<Project | null>(null);
```

**Handler:**
```typescript
const handleCardClick = (project: Project) => {
  setSelectedProject(project);
};

const handleCloseModal = () => {
  setSelectedProject(null);
};
```

## Data Models

### Project Type

```typescript
interface Project {
  name: string;
  alt: string;
  link?: string | ProjectLink;
  src: string;
  description: string;
  tags: string[];
}

interface ProjectLink {
  url: string;
  text: string;
}
```

This type is already implicitly defined by the JSON data structure. No changes needed to data models.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property Reflection

After analyzing all acceptance criteria, I've identified the following consolidations:

- Properties 2.1, 2.2, and 2.3 (close button, backdrop click, ESC key) all test modal closure mechanisms. These can be combined into a single property about "close actions trigger modal closure"
- Properties 1.2 and 2.1/2.2/2.3 both test scroll restoration. The scroll lock/unlock behavior is part of the modal open/close cycle, so this can be combined with the modal state property
- Properties 6.2 and 6.3 both test external link rendering. These can be combined into a single property about external link display

### Correctness Properties

Property 1: Modal opens with project data
*For any* project object, when a user clicks on its project card, the modal should open with isOpen=true and selectedProject set to that project object
**Validates: Requirements 1.1**

Property 2: Modal displays all required content
*For any* project object, when displayed in the modal, the rendered output should contain the project name, full description (with HTML rendered), image, and all tags
**Validates: Requirements 1.3, 1.4**

Property 3: Modal closure and scroll restoration
*For any* close action (close button click, backdrop click, or ESC key press), the modal should close (isOpen=false, selectedProject=null) and document.body.style.overflow should be restored to 'unset'
**Validates: Requirements 2.1, 2.2, 2.3, 1.2**

Property 4: Responsive rendering
*For any* viewport size (mobile, tablet, desktop), the modal should render without horizontal overflow and maintain readability
**Validates: Requirements 3.5**

Property 5: Focus trap within modal
*For any* open modal state, pressing TAB should cycle focus only among interactive elements within the modal (close button, external link button if present)
**Validates: Requirements 4.1, 4.2**

Property 6: Focus restoration on close
*For any* project card that opened the modal, when the modal closes, keyboard focus should return to that project card element
**Validates: Requirements 4.4**

Property 7: External link conditional rendering
*For any* project object, the external link button should be visible in the modal if and only if the project has a link property, and clicking it should open the URL in a new tab with the correct link text
**Validates: Requirements 6.1, 6.2, 6.3**

## Error Handling

### Invalid Project Data
- If `project` is null or undefined, the modal should not render (early return)
- If required fields (name, description, src) are missing, display fallback content or skip rendering

### Portal Rendering
- Ensure `document.body` exists before creating portal (SSR compatibility)
- Use conditional rendering to prevent hydration mismatches

### Event Listener Cleanup
- All event listeners (ESC key, click handlers) must be properly cleaned up in useEffect return functions
- Prevent memory leaks by removing listeners when component unmounts

### Focus Management
- Store reference to previously focused element before opening modal
- Safely restore focus even if the original element is no longer in the DOM
- Handle cases where focus restoration fails gracefully

## Testing Strategy

### Unit Tests

Unit tests will focus on specific examples and edge cases:

1. **Modal rendering with complete project data** - Verify all fields display correctly
2. **Modal rendering with minimal project data** - Test projects without optional fields (no link)
3. **Close button functionality** - Verify clicking close button calls onClose
4. **Backdrop click handling** - Verify clicking backdrop calls onClose, but clicking modal content does not
5. **ESC key handling** - Verify ESC key press calls onClose
6. **Null project handling** - Verify modal doesn't render when project is null
7. **ARIA attributes presence** - Verify role="dialog", aria-modal="true", aria-labelledby exist
8. **Print CSS classes** - Verify print:hidden classes are present on modal and backdrop
9. **External link rendering** - Verify link button appears for projects with links, hidden for projects without

### Property-Based Tests

Property-based tests will verify universal properties across all inputs using a PBT library (fast-check for TypeScript):

Each property test should run a minimum of 100 iterations to ensure comprehensive coverage through randomization.

**Test Configuration:**
- Library: fast-check (TypeScript/JavaScript property-based testing)
- Minimum iterations: 100 per property
- Each test must include a comment tag: `// Feature: portfolio-modal, Property N: [property text]`

**Property Test Cases:**

1. **Property 1: Modal opens with project data**
   - Generate random project objects
   - Simulate click on project card
   - Verify modal state updates correctly
   - Tag: `// Feature: portfolio-modal, Property 1: Modal opens with project data`

2. **Property 2: Modal displays all required content**
   - Generate random project objects with various HTML in descriptions
   - Render modal with each project
   - Verify all fields present in rendered output
   - Tag: `// Feature: portfolio-modal, Property 2: Modal displays all required content`

3. **Property 3: Modal closure and scroll restoration**
   - Generate random close actions (button, backdrop, ESC)
   - Trigger each close action
   - Verify modal closes and scroll is restored
   - Tag: `// Feature: portfolio-modal, Property 3: Modal closure and scroll restoration`

4. **Property 4: Responsive rendering**
   - Generate random viewport dimensions
   - Render modal at each size
   - Verify no overflow and content fits
   - Tag: `// Feature: portfolio-modal, Property 4: Responsive rendering`

5. **Property 5: Focus trap within modal**
   - Generate random modal states
   - Simulate TAB key presses
   - Verify focus cycles only within modal
   - Tag: `// Feature: portfolio-modal, Property 5: Focus trap within modal`

6. **Property 6: Focus restoration on close**
   - Generate random project cards
   - Open modal from each card
   - Close modal and verify focus returns to triggering card
   - Tag: `// Feature: portfolio-modal, Property 6: Focus restoration on close`

7. **Property 7: External link conditional rendering**
   - Generate random projects with and without links
   - Render modal for each
   - Verify link button presence matches link property existence
   - Verify link opens in new tab with correct text
   - Tag: `// Feature: portfolio-modal, Property 7: External link conditional rendering`

### Testing Balance

- Unit tests handle specific examples, edge cases (null data, missing fields), and ARIA/CSS verification
- Property tests handle universal behaviors across all possible project data and user interactions
- Together they provide comprehensive coverage: unit tests catch concrete bugs, property tests verify general correctness

## Visual Design Specifications

### Modal Container
- Background: `bg-bg-primary` (slate-950)
- Border: `border border-accent-primary/20`
- Rounded corners: `rounded-2xl`
- Glass effect: `backdrop-blur-xl bg-bg-primary/95`
- Shadow: `shadow-2xl`
- Max width: `max-w-4xl`
- Padding: `p-6 sm:p-8`

### Backdrop
- Background: `bg-black/60`
- Blur: `backdrop-blur-sm`
- Z-index: `z-50`
- Print: `print:hidden`

### Animations
- Modal entrance: `animate-in fade-in-0 zoom-in-95 duration-300`
- Modal exit: `animate-out fade-out-0 zoom-out-95 duration-200`
- Backdrop: `transition-opacity duration-300`

### Close Button
- Position: Absolute top-right
- Icon: X from lucide-react
- Hover: `hover:bg-accent-primary/10`
- Size: `w-10 h-10`
- Rounded: `rounded-full`

### Content Layout
- Image: Full width, `aspect-video`, `rounded-lg`, `mb-6`
- Title: `text-2xl sm:text-3xl font-bold mb-4`
- Description: `text-text-secondary mb-6 leading-relaxed`
- Tags: Flex wrap, same styling as ProjectCard
- External link: Button with ExternalLink icon, amber accent

### Responsive Breakpoints
- Mobile: Full screen with small padding
- Tablet: 90% width, centered
- Desktop: Max width 4xl, centered

## Implementation Notes

### React Portal Usage
Use `ReactDOM.createPortal()` to render modal at document.body level, preventing z-index and overflow issues.

### SSR Considerations
- Check for `typeof window !== 'undefined'` before accessing document.body
- Use `useEffect` for portal creation to avoid hydration mismatches
- Return null during SSR

### Performance
- Avoid re-rendering modal when closed (early return)
- Use `useCallback` for event handlers to prevent unnecessary re-renders
- Lazy load modal component if bundle size is a concern

### Accessibility Checklist
- [ ] role="dialog"
- [ ] aria-modal="true"
- [ ] aria-labelledby pointing to title
- [ ] Focus trap implemented
- [ ] ESC key closes modal
- [ ] Focus restoration on close
- [ ] Sufficient color contrast
- [ ] Keyboard navigation works

### Browser Compatibility
- Portal API: Supported in all modern browsers
- Backdrop blur: Fallback to solid background if not supported
- Focus trap: Use standard DOM APIs for maximum compatibility
