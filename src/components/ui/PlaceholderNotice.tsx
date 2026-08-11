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
      <div className={`p-4 rounded-xl bg-[#0F172A] border border-yellow-500/20 flex items-start gap-3 text-xs text-[#94A3B8] ${className}`}>
        <AlertCircle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-yellow-400 block mb-0.5">Placeholder Notice:</span>
          <p>{message}</p>
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`p-6 rounded-xl bg-[#0F172A]/80 border border-[#1E293B] text-center ${className}`}>
        <div className="w-10 h-10 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 mx-auto mb-3">
          <AlertCircle className="w-5 h-5" />
        </div>
        <h4 className="text-sm font-bold text-white mb-1">Specifications Coming Soon</h4>
        <p className="text-xs text-[#94A3B8] max-w-md mx-auto">{message}</p>
      </div>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
      {message}
    </span>
  );
}
