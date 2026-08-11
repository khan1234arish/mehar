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
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#080D1A] disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#00F59B] text-[#04070F] hover:bg-[#00D887] hover:shadow-glow-green focus:ring-[#00F59B]',
    secondary:
      'bg-[#00D2FF] text-[#04070F] hover:bg-[#00B4D8] hover:shadow-glow-blue focus:ring-[#00D2FF]',
    outline:
      'bg-transparent border border-[#1E293B] text-white hover:border-[#00F59B] hover:text-[#00F59B] hover:bg-[#00F59B]/5 focus:ring-[#00F59B]',
    ghost:
      'bg-[#131F37] border border-[#1E293B] text-[#CBD5E1] hover:text-white hover:border-[#334155] focus:ring-[#1E293B]',
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
