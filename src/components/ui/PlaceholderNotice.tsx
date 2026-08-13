import React from 'react';
import { AlertCircle } from 'lucide-react';

interface PlaceholderNoticeProps {
  message?: string;
  variant?: 'inline' | 'banner' | 'card';
  className?: string;
}

export default function PlaceholderNotice({
  message = 'Specifications coming soon. Official verified data will be provided upon catalogue release.',
  variant = 'inline',
  className = '',
}: PlaceholderNoticeProps) {
  if (variant === 'banner') {
    return (
      <div className={`p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-300 shadow-sm ${className}`}>
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-amber-300 block mb-0.5 font-mono">Notice:</span>
          <p className="text-amber-200/90 leading-relaxed">{message}</p>
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`p-6 rounded-2xl bg-[#11161D] border border-[#1E2633] text-center ${className}`}>
        <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-3">
          <AlertCircle className="w-5 h-5" />
        </div>
        <h4 className="text-sm font-bold text-[#E6EAF0] mb-1">Specifications In Scoping</h4>
        <p className="text-xs text-[#A3AAB5] max-w-md mx-auto">{message}</p>
      </div>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30 ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
      {message}
    </span>
  );
}
