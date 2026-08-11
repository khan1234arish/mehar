import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'blue' | 'yellow' | 'slate' | 'outline';
  className?: string;
}

export default function Badge({ children, variant = 'green', className = '' }: BadgeProps) {
  const variantStyles = {
    green: 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]',
    blue: 'bg-[#F0F9FF] text-[#0369A1] border-[#BAE6FD]',
    yellow: 'bg-[#FEFCE8] text-[#854D0E] border-[#FEF08A]',
    slate: 'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]',
    outline: 'bg-white text-[#334155] border-[#CBD5E1]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
