'use client';

import React, { HTMLAttributes, forwardRef } from 'react';

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, hover = true, className = '', ...props }, ref) => {
    const baseClasses = 
      'glass-card rounded-xl p-6 transform-gpu transition-all duration-300 print:bg-white print:border print:border-slate-300 print:shadow-none';

    const hoverClasses = hover 
      ? 'hover-lift cursor-pointer' 
      : '';

    return (
      <div
        ref={ref}
        className={`${baseClasses} ${hoverClasses} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;
