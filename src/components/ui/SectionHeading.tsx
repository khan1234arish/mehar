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
    blue: 'bg-[#F0F9FF] text-[#0369A1] border-[#BAE6FD]',
    yellow: 'bg-[#FEFCE8] text-[#854D0E] border-[#FEF08A]',
  };

  const alignStyles = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start';

  return (
    <div className={`flex flex-col mb-12 max-w-3xl ${alignStyles} ${className}`}>
      {badge && (
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border mb-3 ${badgeColors[badgeVariant]}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
          {badge}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-[#475569] mt-3 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
