'use client';

import React, { HTMLAttributes, forwardRef } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, hover = true, className = '', ...props }, ref) => {
    const baseClasses = 
      'bg-bg-secondary border border-accent-primary/20 rounded-xl p-6 shadow-card transform-gpu transition-all duration-300 print:bg-white print:border-slate-300 print:shadow-none';

    const hoverClasses = hover 
      ? 'hover:border-accent-primary/40 hover:shadow-xl hover:-translate-y-2 cursor-pointer' 
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

Card.displayName = 'Card';

export default Card;
