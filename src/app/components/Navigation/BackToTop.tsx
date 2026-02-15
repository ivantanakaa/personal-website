'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useScrollAnimation } from '@/app/hooks/useScrollAnimation';

export function BackToTop() {
  const { scrollY } = useScrollAnimation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button after scrolling 100vh
    const viewportHeight = window.innerHeight;
    setIsVisible(scrollY > viewportHeight);
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 right-6 sm:bottom-24 sm:right-8 p-3 sm:p-4 bg-accent-primary text-bg-primary rounded-full shadow-lg hover:bg-accent-secondary transition-all duration-300 hover:scale-110 active:scale-95 z-40 print:hidden"
      aria-label="Back to top"
    >
      <ArrowUp size={20} className="sm:w-6 sm:h-6" />
    </button>
  );
}
