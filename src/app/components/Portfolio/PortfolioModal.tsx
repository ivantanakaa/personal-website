'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X, ExternalLink } from 'lucide-react';

interface ProjectLink {
  url: string;
  text: string;
}

interface PortfolioModalProps {
  project: {
    name: string;
    alt: string;
    link?: string | ProjectLink;
    src: string;
    description: string;
    tags: string[];
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PortfolioModal({ project, isOpen, onClose }: PortfolioModalProps) {
  // Refs for focus management
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  
  // Animation state - track if modal is animating in/out
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Handle animation lifecycle
  useEffect(() => {
    if (isOpen) {
      // Start rendering and trigger entrance animation
      setShouldRender(true);
      // Small delay to ensure DOM is ready before animating
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else if (shouldRender) {
      // Trigger exit animation
      setIsAnimating(false);
      // Wait for exit animation to complete before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 200); // Match exit animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  // ESC key event listener with cleanup
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Body scroll lock when modal is open
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      // Store the original overflow value
      const originalOverflow = document.body.style.overflow;
      
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      
      // Restore overflow on cleanup
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Focus trap and focus management
  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;

    // Store the currently focused element before opening modal
    previouslyFocusedElement.current = document.activeElement as HTMLElement;

    // Set focus to modal container
    if (modalRef.current) {
      modalRef.current.focus();
    }

    // Handle TAB key to trap focus within modal
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !modalRef.current) return;

      // Get all focusable elements within the modal
      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const focusableArray = Array.from(focusableElements);
      const firstElement = focusableArray[0];
      const lastElement = focusableArray[focusableArray.length - 1];

      // If no focusable elements, prevent default
      if (focusableArray.length === 0) {
        e.preventDefault();
        return;
      }

      // Handle Shift+Tab (backwards)
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } 
      // Handle Tab (forwards)
      else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);

    // Cleanup: restore focus to previously focused element
    return () => {
      document.removeEventListener('keydown', handleTabKey);
      
      // Restore focus to the element that opened the modal
      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
      }
    };
  }, [isOpen]);

  // Early return if not rendering - AFTER all hooks
  if (!shouldRender || !project) return null;

  // SSR safety check - ensure document.body exists
  if (typeof window === 'undefined' || !document.body) return null;

  // Render modal using React Portal
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 print:hidden">
      {/* Backdrop - click to close with fade animation */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm print:hidden transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Content Container with glass morphism and zoom/fade animation */}
      <div 
        ref={modalRef}
        className={`relative backdrop-blur-xl bg-bg-primary/95 border border-accent-primary/20 rounded-2xl shadow-2xl max-w-4xl w-full print:hidden transition-all duration-300 ${
          isAnimating 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-accent-primary/10 transition-colors text-text-secondary hover:text-text-primary"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="p-6 sm:p-8">
          {/* Project Image */}
          <div className="w-full aspect-video rounded-lg overflow-hidden mb-6">
            <Image
              src={project.src}
              alt={project.alt}
              width={1200}
              height={675}
              className="w-full h-full object-cover"
            />
          </div>
          
          <h2 
            id="modal-title"
            className="text-2xl sm:text-3xl font-bold text-text-primary mb-4"
          >
            {project.name}
          </h2>
          
          {/* Project Description */}
          <div 
            className="text-text-secondary leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-accent-primary/10 text-accent-primary rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* External Link Button */}
          {project.link && (
            <a
              href={typeof project.link === 'string' ? project.link : project.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary/10 hover:bg-accent-primary/20 text-accent-primary rounded-lg transition-colors font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{typeof project.link === 'string' ? 'View Project' : project.link.text}</span>
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
