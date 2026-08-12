import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  badgeVariant?: 'green' | 'blue' | 'yellow';
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  badge,
  badgeVariant = 'green',
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const badgeColors = {
    green: 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]',
    blue: 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]',
    yellow: 'bg-[#F8FAFC] text-[#334155] border-[#E2E8F0]',
  };

  const alignStyles = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start';

  return (
    <div className={`flex flex-col mb-10 max-w-3xl ${alignStyles} ${className}`}>
      {badge && (
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border mb-3 ${badgeColors[badgeVariant]}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#059669]"></span>
          {badge}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm text-[#64748B] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
