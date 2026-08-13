import React from 'react';
import { Check } from 'lucide-react';

export interface OemStep {
  number: number;
  label: string;
  shortLabel: string;
}

export const OEM_STEPS: OemStep[] = [
  { number: 1, label: 'Application', shortLabel: 'App' },
  { number: 2, label: 'Electrical', shortLabel: 'Elec.' },
  { number: 3, label: 'Mechanical', shortLabel: 'Mech.' },
  { number: 4, label: 'BMS / Comms', shortLabel: 'BMS' },
  { number: 5, label: 'Environment', shortLabel: 'Env.' },
  { number: 6, label: 'Commercial', shortLabel: 'Comm.' },
  { number: 7, label: 'Company & Files', shortLabel: 'Info' },
  { number: 8, label: 'Review', shortLabel: 'Review' },
];

interface OemProgressBarProps {
  currentStep: number; // 1-indexed
}

export default function OemProgressBar({ currentStep }: OemProgressBarProps) {
  const pct = Math.round(((currentStep - 1) / (OEM_STEPS.length - 1)) * 100);

  return (
    <div className="bg-[#11161D] border-b border-[#1E2633] px-4 sm:px-8 py-4">
      {/* Percentage bar */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-[#39D353]">
          Step {currentStep} of {OEM_STEPS.length}
          <span className="ml-2 text-[#A3AAB5] font-normal">— {OEM_STEPS[currentStep - 1]?.label}</span>
        </span>
        <span className="text-xs text-[#64748B] font-mono">{pct}% complete</span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-[#161C24] overflow-hidden mb-4">
        <div
          className="h-full rounded-full bg-[#39D353] shadow-[0_0_8px_rgba(57,211,83,0.5)] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Step dots */}
      <div className="hidden md:flex items-start justify-between gap-1">
        {OEM_STEPS.map((step) => {
          const done = step.number < currentStep;
          const active = step.number === currentStep;
          return (
            <div key={step.number} className="flex flex-col items-center gap-1 flex-1 min-w-0">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold border transition-colors ${
                  done
                    ? 'bg-[#39D353] border-[#39D353] text-[#0B0F14]'
                    : active
                    ? 'bg-[#161C24] border-[#39D353] text-[#39D353] shadow-[0_0_8px_rgba(57,211,83,0.3)]'
                    : 'bg-[#161C24] border-[#1E2633] text-[#64748B]'
                }`}
              >
                {done ? <Check className="w-3 h-3 stroke-[3]" /> : step.number}
              </div>
              <span
                className={`text-[9px] text-center leading-tight font-semibold truncate w-full text-center ${
                  active ? 'text-[#39D353]' : done ? 'text-[#A3AAB5]' : 'text-[#64748B]'
                }`}
              >
                {step.shortLabel}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
