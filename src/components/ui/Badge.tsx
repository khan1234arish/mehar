import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'blue' | 'yellow' | 'slate' | 'outline';
  className?: string;
}

export default function Badge({ children, variant = 'green', className = '' }: BadgeProps) {
  const variantStyles = {
    green: 'bg-theme-green/10 text-theme-green border-theme-green/30 shadow-sm',
    blue: 'bg-theme-blue/10 text-theme-blue border-theme-blue/30 shadow-sm',
    yellow: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    slate: 'bg-theme-elevated text-theme-secondary border-theme-border',
    outline: 'bg-theme-card text-theme-primary border-theme-border',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
