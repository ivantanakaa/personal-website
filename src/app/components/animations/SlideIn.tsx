'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SlideInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  stagger?: number;
  className?: string;
}

/**
 * SlideIn component with slide animation from various directions
 * Supports staggered children animations for sequential reveals
 * Uses Framer Motion with viewport detection for scroll-triggered animations
 * 
 * @param children - Content to animate (can be single element or array)
 * @param delay - Animation delay in seconds (default: 0)
 * @param duration - Animation duration in seconds (default: 0.6)
 * @param direction - Slide direction: 'up', 'down', 'left', 'right' (default: 'up')
 * @param stagger - Delay between children animations in seconds (default: 0.1)
 * @param className - Additional CSS classes
 * 
 * Validates: Requirements 2.1
 */
export function SlideIn({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  stagger = 0.1,
  className = '',
}: SlideInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Calculate initial position based on direction
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 40 };
      case 'down':
        return { y: -40 };
      case 'left':
        return { x: 40 };
      case 'right':
        return { x: -40 };
      default:
        return { y: 40 };
    }
  };

  // Container variants for staggered children
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  // Child variants for individual items
  const childVariants = {
    hidden: {
      opacity: 0,
      ...getInitialPosition(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  // Check if children is an array for staggered animation
  const childrenArray = Array.isArray(children) ? children : [children];
  const shouldStagger = childrenArray.length > 1;

  if (shouldStagger) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className={className}
      >
        {childrenArray.map((child, index) => (
          <motion.div key={index} variants={childVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // Single child - no stagger needed
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
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
