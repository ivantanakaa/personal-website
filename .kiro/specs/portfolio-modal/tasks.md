# Implementation Plan: Portfolio Modal

## Overview

This implementation adds a modal dialog system to the portfolio section, allowing users to view full project details without truncation. The modal will be accessible, responsive, and visually consistent with the existing dark theme design system.

## Tasks

- [x] 1. Create PortfolioModal component with core functionality
  - Create `src/app/components/Portfolio/PortfolioModal.tsx`
  - Implement modal component with props interface (project, isOpen, onClose)
  - Add React Portal rendering to document.body
  - Implement early return for null/closed states
  - Add SSR safety checks for document.body access
  - _Requirements: 1.1, 1.3_

- [x] 2. Implement modal open/close behavior and scroll management
  - [x] 2.1 Add ESC key event listener with cleanup
    - Use useEffect to add/remove keydown event listener
    - Handle ESC key to call onClose
    - _Requirements: 2.3_
  
  - [x] 2.2 Add body scroll lock when modal is open
    - Use useEffect to set document.body.style.overflow = 'hidden' when open
    - Restore overflow on cleanup
    - _Requirements: 1.2, 2.1, 2.2, 2.3_
  
  - [ ]* 2.3 Write property test for modal closure and scroll restoration
    - **Property 3: Modal closure and scroll restoration**
    - **Validates: Requirements 2.1, 2.2, 2.3, 1.2**

- [x] 3. Build modal UI structure and styling
  - [x] 3.1 Create backdrop with click-to-close functionality
    - Add backdrop div with onClick handler calling onClose
    - Style with bg-black/60, backdrop-blur-sm, z-50
    - Add print:hidden class
    - _Requirements: 2.2, 5.2_
  
  - [x] 3.2 Create modal content container
    - Add modal content div with onClick stopPropagation
    - Style with glass morphism (backdrop-blur-xl, bg-bg-primary/95)
    - Add border, rounded corners, shadow, max-width
    - Make responsive (full screen mobile, centered desktop)
    - Add print:hidden class
    - _Requirements: 3.1, 3.2, 3.3, 3.5, 5.1_
  
  - [x] 3.3 Add close button with icon
    - Position absolute top-right
    - Use X icon from lucide-react
    - Add hover effects and rounded styling
    - Wire to onClose handler
    - _Requirements: 2.1_
  
  - [ ]* 3.4 Write unit tests for backdrop and close button
    - Test backdrop click calls onClose
    - Test modal content click does not call onClose
    - Test close button click calls onClose
    - _Requirements: 2.1, 2.2_

- [x] 4. Implement modal content display
  - [x] 4.1 Add project image display
    - Use Next.js Image component
    - Style with aspect-video, rounded-lg, full width
    - Use project.src and project.alt
    - _Requirements: 1.3_
  
  - [x] 4.2 Add project title and description
    - Display project.name with large heading styles
    - Render project.description with dangerouslySetInnerHTML for HTML content
    - Style description with text-text-secondary and leading-relaxed
    - _Requirements: 1.3, 1.4_
  
  - [x] 4.3 Add tags display
    - Map over project.tags array
    - Style tags consistently with ProjectCard (amber accent, rounded-full)
    - Use flex-wrap for responsive layout
    - _Requirements: 1.3_
  
  - [x] 4.4 Add conditional external link button
    - Check if project.link exists
    - Display button with ExternalLink icon from lucide-react
    - Extract URL and text from link (handle both string and object formats)
    - Add target="_blank" and rel="noopener,noreferrer"
    - Style with amber accent colors
    - _Requirements: 6.1, 6.2, 6.3_
  
  - [ ]* 4.5 Write property test for modal content display
    - **Property 2: Modal displays all required content**
    - **Validates: Requirements 1.3, 1.4**
  
  - [ ]* 4.6 Write property test for external link conditional rendering
    - **Property 7: External link conditional rendering**
    - **Validates: Requirements 6.1, 6.2, 6.3**

- [x] 5. Add accessibility features
  - [x] 5.1 Add ARIA attributes to modal
    - Add role="dialog"
    - Add aria-modal="true"
    - Add aria-labelledby pointing to title element
    - Give title element an id
    - _Requirements: 4.3_
  
  - [x] 5.2 Implement focus trap
    - Store reference to previously focused element on open
    - Set focus to modal on open
    - Handle TAB key to cycle focus within modal
    - Restore focus to previous element on close
    - _Requirements: 4.1, 4.2, 4.4_
  
  - [ ]* 5.3 Write property test for focus trap
    - **Property 5: Focus trap within modal**
    - **Validates: Requirements 4.1, 4.2**
  
  - [ ]* 5.4 Write property test for focus restoration
    - **Property 6: Focus restoration on close**
    - **Validates: Requirements 4.4**
  
  - [ ]* 5.5 Write unit tests for ARIA attributes
    - Verify role="dialog" exists
    - Verify aria-modal="true" exists
    - Verify aria-labelledby exists and points to title
    - _Requirements: 4.3_

- [x] 6. Checkpoint - Ensure modal component works in isolation
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Modify ProjectCard to trigger modal
  - [x] 7.1 Update ProjectCard props interface
    - Add onCardClick prop: (project: Project) => void
    - Keep existing project prop
    - _Requirements: 1.1_
  
  - [x] 7.2 Update ProjectCard click handler
    - Remove existing handleClick for external links
    - Add onClick to Card component calling onCardClick(project)
    - Keep hover effects for visual feedback
    - _Requirements: 1.1_
  
  - [ ]* 7.3 Write unit test for ProjectCard click behavior
    - Verify clicking card calls onCardClick with correct project
    - _Requirements: 1.1_

- [x] 8. Integrate modal into PortfolioGallery
  - [x] 8.1 Add modal state to PortfolioGallery
    - Add useState for selectedProject (Project | null)
    - Create handleCardClick handler to set selectedProject
    - Create handleCloseModal handler to set selectedProject to null
    - _Requirements: 1.1_
  
  - [x] 8.2 Pass onCardClick to ProjectCard components
    - Update ProjectCard usage to include onCardClick={handleCardClick}
    - _Requirements: 1.1_
  
  - [x] 8.3 Render PortfolioModal in PortfolioGallery
    - Add PortfolioModal component at end of PortfolioGallery
    - Pass project={selectedProject}
    - Pass isOpen={!!selectedProject}
    - Pass onClose={handleCloseModal}
    - _Requirements: 1.1, 2.1, 2.2, 2.3_
  
  - [ ]* 8.4 Write property test for modal opening
    - **Property 1: Modal opens with project data**
    - **Validates: Requirements 1.1**
  
  - [ ]* 8.5 Write integration test for full flow
    - Test clicking card opens modal with correct project
    - Test closing modal via different methods
    - Test opening different projects updates modal content
    - _Requirements: 1.1, 2.1, 2.2, 2.3_

- [x] 9. Add animations and polish
  - [x] 9.1 Add entrance/exit animations
    - Add Tailwind animation classes (fade-in, zoom-in, etc.)
    - Use conditional classes based on isOpen state
    - _Requirements: 3.1, 3.2_
  
  - [x] 9.2 Test responsive behavior
    - Verify modal works on mobile viewport
    - Verify modal works on tablet viewport
    - Verify modal works on desktop viewport
    - _Requirements: 3.5_
  
  - [ ]* 9.3 Write property test for responsive rendering
    - **Property 4: Responsive rendering**
    - **Validates: Requirements 3.5**

- [x] 10. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties using fast-check
- Unit tests validate specific examples and edge cases
- Focus on incremental progress - each task builds on previous work
- The modal uses React Portal for proper DOM hierarchy and z-index management
- Accessibility is a core requirement, not an afterthought
