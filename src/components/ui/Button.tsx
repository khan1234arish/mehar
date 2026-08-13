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
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0B0F14] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#39D353] text-[#0B0F14] font-bold hover:bg-[#2ec547] shadow-[0_0_20px_rgba(57,211,83,0.25)] hover:shadow-[0_0_25px_rgba(57,211,83,0.4)] focus:ring-[#39D353]',
    secondary:
      'bg-[#00A3FF]/10 border-2 border-[#00A3FF] text-[#00A3FF] font-bold hover:bg-[#00A3FF]/20 shadow-[0_0_15px_rgba(0,163,255,0.15)] hover:shadow-[0_0_25px_rgba(0,163,255,0.35)] focus:ring-[#00A3FF]',
    outline:
      'bg-[#11161D] border border-[#1E2633] text-[#E6EAF0] hover:border-[#39D353]/60 hover:text-[#39D353] hover:bg-[#39D353]/10 focus:ring-[#39D353]',
    ghost:
      'bg-white/[0.03] border border-white/10 text-[#A3AAB5] hover:bg-white/[0.08] hover:text-[#E6EAF0] hover:border-white/20 focus:ring-[#39D353]',
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
