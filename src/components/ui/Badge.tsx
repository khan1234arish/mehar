import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'blue' | 'yellow' | 'slate' | 'outline';
  className?: string;
}

export default function Badge({ children, variant = 'green', className = '' }: BadgeProps) {
  const variantStyles = {
    green: 'bg-[#00F59B]/10 text-[#00F59B] border-[#00F59B]/30',
    blue: 'bg-[#00D2FF]/10 text-[#00D2FF] border-[#00D2FF]/30',
    yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    slate: 'bg-[#1E293B] text-[#94A3B8] border-[#334155]',
    outline: 'bg-transparent text-white border-[#334155]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
