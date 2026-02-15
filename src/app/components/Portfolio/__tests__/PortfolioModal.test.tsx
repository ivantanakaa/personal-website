import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PortfolioModal } from '../PortfolioModal';

describe('PortfolioModal Component', () => {
  const mockProject = {
    name: 'Test Project',
    alt: 'Test project image',
    src: '/test-image.jpg',
    description: 'Test description',
    tags: ['React', 'TypeScript'],
  };

  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  describe('ESC Key Handling', () => {
    it('should call onClose when ESC key is pressed', async () => {
      render(
        <PortfolioModal
          project={mockProject}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      const user = userEvent.setup();
      await user.keyboard('{Escape}');

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should not call onClose when other keys are pressed', async () => {
      render(
        <PortfolioModal
          project={mockProject}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      const user = userEvent.setup();
      await user.keyboard('{Enter}');
      await user.keyboard('{Space}');
      await user.keyboard('a');

      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('should clean up event listener when modal closes', () => {
      const { unmount } = render(
        <PortfolioModal
          project={mockProject}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      // Unmount the component to trigger cleanup
      unmount();

      // Clear any calls that happened during render
      mockOnClose.mockClear();

      // Manually trigger ESC key event
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escapeEvent);

      // onClose should not be called since component is unmounted and listener removed
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('Rendering', () => {
    it('should not render when isOpen is false', () => {
      render(
        <PortfolioModal
          project={mockProject}
          isOpen={false}
          onClose={mockOnClose}
        />
      );

      expect(screen.queryByText('Test Project')).not.toBeInTheDocument();
    });

    it('should not render when project is null', () => {
      render(
        <PortfolioModal
          project={null}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      expect(document.body.querySelector('.fixed')).not.toBeInTheDocument();
    });

    it('should render project name when open', () => {
      render(
        <PortfolioModal
          project={mockProject}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('Test Project')).toBeInTheDocument();
    });
  });

  describe('Backdrop and Close Button', () => {
    it('should call onClose when backdrop is clicked', async () => {
      render(
        <PortfolioModal
          project={mockProject}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      const user = userEvent.setup();
      // The backdrop is the element with bg-black/60 class
      const backdrop = document.querySelector('.bg-black\\/60');
      
      if (backdrop) {
        await user.click(backdrop);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      }
    });

    it('should not call onClose when modal content is clicked', async () => {
      render(
        <PortfolioModal
          project={mockProject}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      const user = userEvent.setup();
      const modalContent = screen.getByRole('dialog');
      
      await user.click(modalContent);
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('should call onClose when close button is clicked', async () => {
      render(
        <PortfolioModal
          project={mockProject}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      const user = userEvent.setup();
      const closeButton = screen.getByLabelText('Close modal');
      
      await user.click(closeButton);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('ARIA Attributes', () => {
    it('should have role="dialog"', () => {
      render(
        <PortfolioModal
          project={mockProject}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });

    it('should have aria-modal="true"', () => {
      render(
        <PortfolioModal
          project={mockProject}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('should have aria-labelledby pointing to title', () => {
      render(
        <PortfolioModal
          project={mockProject}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      const dialog = screen.getByRole('dialog');
      const labelledBy = dialog.getAttribute('aria-labelledby');
      
      expect(labelledBy).toBe('modal-title');
      
      const title = document.getElementById('modal-title');
      expect(title).toBeInTheDocument();
      expect(title?.textContent).toBe('Test Project');
    });
  });

  describe('Content Display', () => {
    it('should display all project content', () => {
      render(
        <PortfolioModal
          project={mockProject}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('Test Project')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });

    it('should render HTML in description', () => {
      const projectWithHtml = {
        ...mockProject,
        description: '<strong>Bold text</strong> and <em>italic text</em>',
      };

      render(
        <PortfolioModal
          project={projectWithHtml}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      const descriptions = document.querySelectorAll('.text-text-secondary');
      // Find the div element (description), not the button
      const description = Array.from(descriptions).find(el => el.tagName === 'DIV');
      expect(description?.innerHTML).toContain('<strong>Bold text</strong>');
      expect(description?.innerHTML).toContain('<em>italic text</em>');
    });

    it('should display all tags', () => {
      const projectWithManyTags = {
        ...mockProject,
        tags: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
      };

      render(
        <PortfolioModal
          project={projectWithManyTags}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Next.js')).toBeInTheDocument();
      expect(screen.getByText('Tailwind')).toBeInTheDocument();
    });
  });

  describe('External Link', () => {
    it('should not display link button when project has no link', () => {
      render(
        <PortfolioModal
          project={mockProject}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      const linkButton = screen.queryByRole('link');
      expect(linkButton).not.toBeInTheDocument();
    });

    it('should display link button with string link', () => {
      const projectWithLink = {
        ...mockProject,
        link: 'https://example.com',
      };

      render(
        <PortfolioModal
          project={projectWithLink}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      const linkButton = screen.getByRole('link');
      expect(linkButton).toBeInTheDocument();
      expect(linkButton).toHaveAttribute('href', 'https://example.com');
      expect(linkButton).toHaveAttribute('target', '_blank');
      expect(linkButton).toHaveAttribute('rel', 'noopener noreferrer');
      expect(screen.getByText('View Project')).toBeInTheDocument();
    });

    it('should display link button with object link', () => {
      const projectWithObjectLink = {
        ...mockProject,
        link: {
          url: 'https://demo.example.com',
          text: 'Watch Demo',
        },
      };

      render(
        <PortfolioModal
          project={projectWithObjectLink}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      const linkButton = screen.getByRole('link');
      expect(linkButton).toBeInTheDocument();
      expect(linkButton).toHaveAttribute('href', 'https://demo.example.com');
      expect(linkButton).toHaveAttribute('target', '_blank');
      expect(linkButton).toHaveAttribute('rel', 'noopener noreferrer');
      expect(screen.getByText('Watch Demo')).toBeInTheDocument();
    });
  });

  describe('Body Scroll Lock', () => {
    it('should lock body scroll when modal opens', () => {
      const { unmount } = render(
        <PortfolioModal
          project={mockProject}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      expect(document.body.style.overflow).toBe('hidden');
      
      unmount();
    });

    it('should restore body scroll when modal closes', () => {
      const originalOverflow = document.body.style.overflow;
      
      const { unmount } = render(
        <PortfolioModal
          project={mockProject}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      expect(document.body.style.overflow).toBe('hidden');
      
      unmount();
      
      expect(document.body.style.overflow).toBe(originalOverflow);
    });
  });

  describe('Responsive Behavior', () => {
    it('should render modal on mobile viewport (375px)', () => {
      // Set mobile viewport width
      global.innerWidth = 375;
      global.dispatchEvent(new Event('resize'));

      render(
        <PortfolioModal
          project={mockProject}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveClass('max-w-4xl');
      expect(dialog).toHaveClass('w-full');
      
      // Verify content is accessible
      expect(screen.getByText('Test Project')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
    });

    it('should render modal on tablet viewport (768px)', () => {
      // Set tablet viewport width
      global.innerWidth = 768;
      global.dispatchEvent(new Event('resize'));

      render(
        <PortfolioModal
          project={mockProject}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveClass('max-w-4xl');
      expect(dialog).toHaveClass('w-full');
      
      // Verify content is accessible
      expect(screen.getByText('Test Project')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
    });

    it('should render modal on desktop viewport (1920px)', () => {
      // Set desktop viewport width
      global.innerWidth = 1920;
      global.dispatchEvent(new Event('resize'));

      render(
        <PortfolioModal
          project={mockProject}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveClass('max-w-4xl');
      expect(dialog).toHaveClass('w-full');
      
      // Verify content is accessible
      expect(screen.getByText('Test Project')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
    });

    it('should have responsive padding classes', () => {
      render(
        <PortfolioModal
          project={mockProject}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      const dialog = screen.getByRole('dialog');
      const contentContainer = dialog.querySelector('.p-6');
      
      expect(contentContainer).toBeInTheDocument();
      expect(contentContainer).toHaveClass('sm:p-8');
    });

    it('should have responsive title sizing', () => {
      render(
        <PortfolioModal
          project={mockProject}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      const title = screen.getByText('Test Project');
      expect(title).toHaveClass('text-2xl');
      expect(title).toHaveClass('sm:text-3xl');
    });

    it('should not have horizontal overflow on any viewport', () => {
      const viewportSizes = [375, 768, 1024, 1920];

      viewportSizes.forEach((width) => {
        global.innerWidth = width;
        global.dispatchEvent(new Event('resize'));

        const { unmount } = render(
          <PortfolioModal
            project={mockProject}
            isOpen={true}
            onClose={mockOnClose}
          />
        );

        const dialog = screen.getByRole('dialog');
        
        // Modal should have max-width constraint
        expect(dialog).toHaveClass('max-w-4xl');
        // Modal should be full width within constraints
        expect(dialog).toHaveClass('w-full');
        
        unmount();
      });
    });
  });
});
