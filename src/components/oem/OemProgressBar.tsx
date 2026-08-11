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
    <div className="bg-white border-b border-[#E2E8F0] px-4 sm:px-8 py-4">
      {/* Percentage bar */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-[#059669]">
          Step {currentStep} of {OEM_STEPS.length}
          <span className="ml-2 text-[#64748B] font-normal">— {OEM_STEPS[currentStep - 1]?.label}</span>
        </span>
        <span className="text-xs text-[#94A3B8] font-mono">{pct}% complete</span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-[#F1F5F9] overflow-hidden mb-4">
        <div
          className="h-full rounded-full bg-[#059669] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Step dots — hidden on small screens, shown on md+ */}
      <div className="hidden md:flex items-start justify-between gap-1">
        {OEM_STEPS.map((step) => {
          const done = step.number < currentStep;
          const active = step.number === currentStep;
          return (
            <div key={step.number} className="flex flex-col items-center gap-1 flex-1 min-w-0">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold border transition-colors ${
                  done
                    ? 'bg-[#059669] border-[#059669] text-white'
                    : active
                    ? 'bg-white border-[#059669] text-[#059669]'
                    : 'bg-white border-[#CBD5E1] text-[#94A3B8]'
                }`}
              >
                {done ? <Check className="w-3 h-3" /> : step.number}
              </div>
              <span
                className={`text-[9px] text-center leading-tight font-semibold truncate w-full text-center ${
                  active ? 'text-[#059669]' : done ? 'text-[#64748B]' : 'text-[#94A3B8]'
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
