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
      <div className={`p-4 rounded-xl bg-[#FEFCE8] border border-[#FEF08A] flex items-start gap-3 text-xs text-[#854D0E] shadow-sm ${className}`}>
        <AlertCircle className="w-4 h-4 text-[#CA8A04] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-[#854D0E] block mb-0.5">Placeholder Notice:</span>
          <p className="text-[#713F12] leading-relaxed">{message}</p>
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-center ${className}`}>
        <div className="w-10 h-10 rounded-full bg-[#FEFCE8] border border-[#FEF08A] flex items-center justify-center text-[#CA8A04] mx-auto mb-3">
          <AlertCircle className="w-5 h-5" />
        </div>
        <h4 className="text-sm font-bold text-[#0F172A] mb-1">Specifications Coming Soon</h4>
        <p className="text-xs text-[#64748B] max-w-md mx-auto">{message}</p>
      </div>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#FEFCE8] text-[#854D0E] border border-[#FEF08A] ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#CA8A04]"></span>
      {message}
    </span>
  );
}
