'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

/**
 * FadeIn component with slide animation
 * Uses Framer Motion with viewport detection for scroll-triggered animations
 * 
 * @param children - Content to animate
 * @param delay - Animation delay in seconds (default: 0)
 * @param duration - Animation duration in seconds (default: 0.6)
 * @param direction - Slide direction: 'up', 'down', 'left', 'right' (default: 'up')
 * @param className - Additional CSS classes
 * 
 * Validates: Requirements 2.1, 2.3
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  className = '',
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Calculate initial position based on direction
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 20 };
      case 'down':
        return { y: -20 };
      case 'left':
        return { x: 20 };
      case 'right':
        return { x: -20 };
      default:
        return { y: 20 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...getInitialPosition(),
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
            }
          : {}
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing for smooth animation
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
