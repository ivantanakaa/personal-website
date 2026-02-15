'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

/**
 * ParallaxSection component with parallax scrolling effect
 * Implements parallax scrolling for background elements with configurable speed
 * 
 * @param children - Content to apply parallax effect to
 * @param speed - Parallax speed multiplier (default: 0.5, range: -1 to 1)
 *                Positive values move slower than scroll (background effect)
 *                Negative values move faster than scroll (foreground effect)
 *                0 = no parallax, 1 = moves at same speed as scroll
 * @param className - Additional CSS classes
 * 
 * Validates: Requirements 2.6
 */
export function ParallaxSection({
  children,
  speed = 0.5,
  className = '',
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this element
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Transform scroll progress to Y position based on speed
  // Speed of 0.5 means element moves at half the scroll speed
  // Creating a parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{ y }}
        transition={{
          ease: 'linear',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
