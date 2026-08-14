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
    green: 'bg-theme-green/10 text-theme-green border-theme-green/30 shadow-sm',
    blue: 'bg-theme-blue/10 text-theme-blue border-theme-blue/30 shadow-sm',
    yellow: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
  };

  const dotColors = {
    green: 'bg-theme-green',
    blue: 'bg-theme-blue',
    yellow: 'bg-amber-500',
  };

  const alignStyles = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start';

  return (
    <div className={`flex flex-col mb-10 max-w-4xl ${alignStyles} ${className}`}>
      {badge && (
        <span
          className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold border mb-3 ${badgeColors[badgeVariant]}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${dotColors[badgeVariant]} animate-pulse`}></span>
          {badge}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-theme-primary tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base lg:text-lg text-theme-secondary leading-relaxed max-w-3xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
