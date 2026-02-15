# Requirements Document

## Introduction

This feature adds a modal popup to the portfolio section that displays full project details when a user clicks on a project card. The modal will make all text content easily readable without truncation, addressing the current limitation where project descriptions are limited to 3 lines with `line-clamp-3`.

## Glossary

- **Modal**: A dialog overlay that appears on top of the main content, displaying detailed information
- **Project_Card**: The existing card component that displays portfolio project summaries
- **Portfolio_Modal**: The new modal component that displays full project details
- **Backdrop**: The semi-transparent overlay behind the modal that dims the background content
- **Close_Action**: Any user interaction that dismisses the modal (clicking backdrop, close button, or ESC key)

## Requirements

### Requirement 1: Modal Display

**User Story:** As a user, I want to click on a portfolio project card to view full details in a modal, so that I can read all project information without truncation.

#### Acceptance Criteria

1. WHEN a user clicks on any Project_Card, THEN THE Portfolio_Modal SHALL open and display the full project details
2. WHEN THE Portfolio_Modal opens, THEN THE System SHALL prevent scrolling of the background content
3. WHEN THE Portfolio_Modal is displayed, THEN THE System SHALL show the project name, full description, image, tags, and external link (if available)
4. WHEN THE Portfolio_Modal displays HTML content in descriptions, THEN THE System SHALL render it correctly (bold text, links, etc.)

### Requirement 2: Modal Dismissal

**User Story:** As a user, I want multiple ways to close the modal, so that I can easily return to browsing the portfolio.

#### Acceptance Criteria

1. WHEN a user clicks the close button, THEN THE Portfolio_Modal SHALL close and restore background scrolling
2. WHEN a user clicks the Backdrop, THEN THE Portfolio_Modal SHALL close and restore background scrolling
3. WHEN a user presses the ESC key, THEN THE Portfolio_Modal SHALL close and restore background scrolling
4. WHEN THE Portfolio_Modal closes, THEN THE System SHALL smoothly animate the modal out

### Requirement 3: Visual Design

**User Story:** As a user, I want the modal to match the site's design system, so that the experience feels cohesive and professional.

#### Acceptance Criteria

1. THE Portfolio_Modal SHALL use the existing dark theme color palette (slate-950 background, slate-300 text, amber accents)
2. THE Portfolio_Modal SHALL use glass morphism effects consistent with other UI components
3. WHEN THE Portfolio_Modal is displayed, THEN THE Backdrop SHALL dim the background content with a semi-transparent overlay
4. THE Portfolio_Modal SHALL animate smoothly when opening and closing
5. THE Portfolio_Modal SHALL be responsive and work on mobile, tablet, and desktop screen sizes

### Requirement 4: Accessibility

**User Story:** As a user with accessibility needs, I want the modal to be keyboard navigable and screen reader friendly, so that I can access all content.

#### Acceptance Criteria

1. WHEN THE Portfolio_Modal opens, THEN THE System SHALL trap keyboard focus within the modal
2. WHEN THE Portfolio_Modal is open, THEN THE System SHALL allow TAB navigation between interactive elements
3. THE Portfolio_Modal SHALL include appropriate ARIA attributes for screen readers
4. WHEN THE Portfolio_Modal closes, THEN THE System SHALL return focus to the triggering Project_Card

### Requirement 5: Print Compatibility

**User Story:** As a user printing the portfolio, I want the modal to not interfere with print output, so that the printed resume remains clean.

#### Acceptance Criteria

1. WHEN a user prints the page, THEN THE Portfolio_Modal SHALL be hidden from print output
2. WHEN a user prints the page, THEN THE Backdrop SHALL be hidden from print output
3. THE System SHALL preserve existing print functionality for Project_Card components

### Requirement 6: External Links

**User Story:** As a user viewing project details in the modal, I want to easily access external project links, so that I can view live demos or repositories.

#### Acceptance Criteria

1. WHERE a project has an external link, THE Portfolio_Modal SHALL display a prominent link button
2. WHEN a user clicks the external link button, THEN THE System SHALL open the link in a new tab
3. THE Portfolio_Modal SHALL display the link text from the project data (e.g., "Watch Demo", "ayovest.id")
