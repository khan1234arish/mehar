import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  icon,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-theme-base disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-theme-green text-white dark:text-[#0B0F14] font-bold hover:bg-theme-green-hover shadow-sm focus:ring-theme-green',
    secondary:
      'bg-theme-blue/10 border-2 border-theme-blue text-theme-blue font-bold hover:bg-theme-blue/20 shadow-sm focus:ring-theme-blue',
    outline:
      'bg-theme-card border border-theme-border text-theme-primary hover:border-theme-green hover:text-theme-green hover:bg-theme-green/10 focus:ring-theme-green shadow-sm',
    ghost:
      'bg-theme-elevated border border-theme-border text-theme-secondary hover:bg-theme-card hover:text-theme-primary hover:border-theme-border-strong focus:ring-theme-green',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
        {icon && <span className="shrink-0">{icon}</span>}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
      {icon && <span className="shrink-0">{icon}</span>}
    </button>
  );
}
