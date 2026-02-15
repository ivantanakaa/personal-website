'use client';

import React, { ButtonHTMLAttributes, forwardRef, useState, MouseEvent } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

interface RippleEffect {
  x: number;
  y: number;
  size: number;
  id: number;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className = '', children, onClick, ...props }, ref) => {
    const [ripples, setRipples] = useState<RippleEffect[]>([]);

    const baseClasses = 
      'relative overflow-hidden px-6 py-3 rounded-lg font-medium transition-all duration-300 transform-gpu cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-primary';

    const variantClasses = {
      primary: 
        'bg-accent-primary text-bg-primary hover:bg-accent-secondary hover:scale-105 active:scale-95 focus:ring-accent-primary shadow-lg hover:shadow-xl',
      secondary: 
        'bg-bg-tertiary text-text-primary border border-accent-primary/30 hover:border-accent-primary hover:bg-bg-secondary hover:scale-105 active:scale-95 focus:ring-accent-primary',
      ghost: 
        'bg-transparent text-accent-primary hover:bg-accent-primary/10 hover:scale-105 active:scale-95 focus:ring-accent-primary',
    };

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const newRipple: RippleEffect = {
        x,
        y,
        size,
        id: Date.now(),
      };

      setRipples((prev) => [...prev, newRipple]);

      // Remove ripple after animation completes
      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
      }, 600);

      // Call the original onClick handler if provided
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        onClick={handleClick}
        {...props}
      >
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 pointer-events-none animate-ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              animation: 'ripple 600ms ease-out',
            }}
          />
        ))}
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
