'use client';

import { useScrollAnimation } from '@/app/hooks/useScrollAnimation';

export function ScrollProgress() {
  const { scrollProgress } = useScrollAnimation();

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-bg-tertiary z-50">
      <div
        className="h-full bg-gradient-to-r from-accent-light via-accent-primary to-accent-secondary transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
