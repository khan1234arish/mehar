import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'blue' | 'yellow' | 'slate' | 'outline';
  className?: string;
}

export default function Badge({ children, variant = 'green', className = '' }: BadgeProps) {
  const variantStyles = {
    green: 'bg-[#39D353]/10 text-[#39D353] border-[#39D353]/30 shadow-[0_0_10px_rgba(57,211,83,0.1)]',
    blue: 'bg-[#00A3FF]/10 text-[#00A3FF] border-[#00A3FF]/30 shadow-[0_0_10px_rgba(0,163,255,0.1)]',
    yellow: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    slate: 'bg-[#161C24] text-[#A3AAB5] border-[#1E2633]',
    outline: 'bg-[#11161D] text-[#E6EAF0] border-white/10',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
