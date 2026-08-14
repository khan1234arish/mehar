'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { Sun, Moon, Monitor, Check } from 'lucide-react';

interface ThemeToggleProps {
  variant?: 'compact' | 'segmented' | 'inline';
  className?: string;
}

export default function ThemeToggle({ variant = 'compact', className = '' }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-xl border border-[#2A3649] bg-[#161C24] flex items-center justify-center opacity-50 ${className}`}>
        <Sun className="w-4 h-4 text-[#E6EAF0]" />
      </div>
    );
  }

  // Segmented mode (ideal for mobile menu or settings panels)
  if (variant === 'segmented') {
    return (
      <div className={`p-1 rounded-xl bg-[#161C24] border border-[#2A3649] flex items-center gap-1 ${className}`}>
        {(
          [
            { id: 'light', label: 'Light', icon: Sun },
            { id: 'dark', label: 'Dark', icon: Moon },
            { id: 'system', label: 'System', icon: Monitor },
          ] as const
        ).map((item) => {
          const Icon = item.icon;
          const isActive = theme === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTheme(item.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#39D353]/20 text-[#39D353] font-bold border border-[#39D353]/30 shadow-sm'
                  : 'text-[#E6EAF0] hover:text-white hover:bg-white/[0.06]'
              }`}
              aria-label={`Switch to ${item.label} theme`}
              aria-pressed={isActive}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Compact dropdown (ideal for Header navbar & Admin navbar)
  const CurrentIcon =
    theme === 'system' ? Monitor : resolvedTheme === 'dark' ? Moon : Sun;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-xl bg-[#161C24] border border-[#2A3649] text-[#E6EAF0] hover:text-[#39D353] hover:border-[#39D353]/50 flex items-center justify-center transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#39D353]/30"
        aria-label="Select theme"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <CurrentIcon className="w-4 h-4 text-[#E6EAF0] transition-transform duration-200" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-36 p-1.5 rounded-2xl bg-[#0D1117] border border-[#2A3649] shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="space-y-1" role="listbox">
            {(
              [
                { id: 'light', label: 'Light', icon: Sun },
                { id: 'dark', label: 'Dark', icon: Moon },
                { id: 'system', label: 'System', icon: Monitor },
              ] as const
            ).map((item) => {
              const Icon = item.icon;
              const isSelected = theme === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setTheme(item.id);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-[#39D353]/20 text-[#39D353] font-bold border border-[#39D353]/30 shadow-sm'
                      : 'text-[#E6EAF0] hover:text-[#39D353] hover:bg-white/[0.08]'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#39D353]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
