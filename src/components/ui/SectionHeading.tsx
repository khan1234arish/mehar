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
    green: 'bg-[#00F59B]/10 text-[#00F59B] border-[#00F59B]/30',
    blue: 'bg-[#00D2FF]/10 text-[#00D2FF] border-[#00D2FF]/30',
    yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
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
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-[#94A3B8] mt-3 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
