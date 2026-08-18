'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BROAD_CATEGORIES, CategoryData } from '@/data/categories';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import PlaceholderNotice from '@/components/ui/PlaceholderNotice';
import {
  Plus,
  X,
  ArrowUpRight,
} from 'lucide-react';

function CompareContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');

  // Initial selected categories (up to 4)
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(() => {
    if (initialCategory && BROAD_CATEGORIES.some((c) => c.slug === initialCategory)) {
      return [initialCategory, BROAD_CATEGORIES.find((c) => c.slug !== initialCategory)?.slug || ''].filter(Boolean);
    }
    return [BROAD_CATEGORIES[0].slug, BROAD_CATEGORIES[1].slug];
  });

  const selectedCategories = selectedSlugs
    .map((slug) => BROAD_CATEGORIES.find((c) => c.slug === slug))
    .filter((c): c is CategoryData => Boolean(c));

  const availableToAdd = BROAD_CATEGORIES.filter(
    (c) => !selectedSlugs.includes(c.slug)
  );

  const addCategory = (slug: string) => {
    if (selectedSlugs.length < 4 && !selectedSlugs.includes(slug)) {
      setSelectedSlugs([...selectedSlugs, slug]);
    }
  };

  const removeCategory = (slug: string) => {
    if (selectedSlugs.length > 1) {
      setSelectedSlugs(selectedSlugs.filter((s) => s !== slug));
    }
  };

  return (
    <div className="py-8 sm:py-12 space-y-8 sm:space-y-12 bg-theme-base text-theme-primary transition-colors duration-200">
      {/* Header Banner */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="p-5 sm:p-8 lg:p-10 rounded-3xl bg-theme-card border border-theme-border shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-theme-green/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-3xl space-y-3 sm:space-y-4 relative z-10">
            <Badge variant="green">Technical Evaluation</Badge>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-theme-primary tracking-tight">
              Category &amp; Application Comparison Matrix
            </h1>
            <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
              Compare broad battery categories side-by-side to evaluate application suitability, operating parameters, and custom engineering scope.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-theme-border flex flex-wrap items-center justify-between gap-4 text-xs relative z-10">
            <PlaceholderNotice
              message="Numerical specification cells are marked 'Not yet verified / Coming soon' until official client catalogue release."
            />

            {/* Category Selector Buttons */}
            {availableToAdd.length > 0 && selectedSlugs.length < 4 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-theme-secondary">Add to Compare:</span>
                <div className="flex flex-wrap gap-1.5">
                  {availableToAdd.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => addCategory(cat.slug)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-theme-elevated border border-theme-border text-[11px] font-semibold text-theme-primary hover:border-theme-green hover:bg-theme-green/10 hover:text-theme-green transition-colors min-h-[32px] touch-manipulation"
                    >
                      <Plus className="w-3 h-3 text-theme-green shrink-0" />
                      <span className="truncate max-w-[140px]">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comparison Grid Table */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="rounded-3xl bg-theme-card border border-theme-border overflow-hidden shadow-xl">
          {/* Mobile Swipe Cue */}
          <div className="block sm:hidden px-4 py-2 bg-theme-surface border-b border-theme-border text-[11px] font-mono text-theme-secondary text-center">
            ← Swipe horizontally to view all columns →
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[540px]">
              <thead>
                <tr className="bg-theme-surface border-b border-theme-border">
                  <th className="py-4 px-4 sm:py-5 sm:px-6 font-mono uppercase text-[10px] sm:text-[11px] font-bold text-theme-secondary w-56 min-w-[160px] sm:min-w-[200px]">
                    Comparison Feature
                  </th>
                  {selectedCategories.map((cat) => (
                    <th
                      key={cat.id}
                      className="py-4 px-4 sm:py-5 sm:px-6 font-bold text-theme-primary text-xs sm:text-sm min-w-[180px] sm:min-w-[240px] border-l border-theme-border relative"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-theme-green font-mono text-[10px] font-bold uppercase block mb-1">
                            Category
                          </span>
                          <span className="leading-tight block font-extrabold">{cat.name}</span>
                        </div>
                        {selectedCategories.length > 1 && (
                          <button
                            onClick={() => removeCategory(cat.slug)}
                            className="p-1 rounded-lg bg-theme-elevated border border-theme-border text-theme-secondary hover:text-red-400 hover:border-red-400/40 transition-colors flex-shrink-0 touch-manipulation"
                            title="Remove from comparison"
                            aria-label={`Remove ${cat.name} from comparison`}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-theme-border text-theme-primary">
                {/* Tagline / Purpose */}
                <tr className="hover:bg-theme-elevated transition-colors">
                  <td className="py-4 px-6 font-mono text-theme-secondary font-bold">
                    Primary Purpose
                  </td>
                  {selectedCategories.map((cat) => (
                    <td
                      key={cat.id}
                      className="py-4 px-6 text-xs text-theme-secondary leading-relaxed border-l border-theme-border"
                    >
                      {cat.tagline}
                    </td>
                  ))}
                </tr>

                {/* Target Applications */}
                <tr className="hover:bg-theme-elevated transition-colors">
                  <td className="py-4 px-6 font-mono text-theme-secondary font-bold">
                    Typical Applications
                  </td>
                  {selectedCategories.map((cat) => (
                    <td key={cat.id} className="py-4 px-6 border-l border-theme-border">
                      <div className="flex flex-wrap gap-1.5">
                        {cat.keyApplications.map((app) => (
                          <span
                            key={app}
                            className="px-2 py-0.5 rounded-md bg-theme-elevated border border-theme-border text-[11px] font-mono text-theme-primary"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Dominant Chemistry */}
                <tr className="hover:bg-theme-elevated transition-colors">
                  <td className="py-4 px-6 font-mono text-theme-secondary font-bold">
                    Electrochemistry
                  </td>
                  {selectedCategories.map((cat) => (
                    <td
                      key={cat.id}
                      className="py-4 px-6 font-mono font-bold text-theme-green border-l border-theme-border text-xs"
                    >
                      {cat.id === 'cylindrical-cells'
                        ? 'Lithium-Ion / NMC / LFP'
                        : cat.id === 'custom-oem'
                        ? 'LFP / NMC (Application Dependent)'
                        : 'Lithium Iron Phosphate (LiFePO4)'}
                    </td>
                  ))}
                </tr>

                {/* Cell Form Factor */}
                <tr className="hover:bg-theme-elevated transition-colors">
                  <td className="py-4 px-6 font-mono text-theme-secondary font-bold">
                    Cell Packaging Form Factor
                  </td>
                  {selectedCategories.map((cat) => (
                    <td
                      key={cat.id}
                      className="py-4 px-6 font-mono text-xs text-theme-secondary border-l border-theme-border"
                    >
                      {cat.id === 'cylindrical-cells'
                        ? '18650 / 21700 / 32700 Steel Can'
                        : cat.id === 'electric-3w' || cat.id === 'ess-inverter' || cat.id === 'solar-storage'
                        ? 'Prismatic Aluminum Enclosed Cells'
                        : 'Cylindrical or Prismatic (Custom)'}
                    </td>
                  ))}
                </tr>

                {/* Common System Voltages */}
                <tr className="hover:bg-theme-elevated transition-colors">
                  <td className="py-4 px-6 font-mono text-theme-secondary font-bold">
                    Typical Voltage Range
                  </td>
                  {selectedCategories.map((cat) => (
                    <td
                      key={cat.id}
                      className="py-4 px-6 font-mono text-xs text-theme-secondary border-l border-theme-border"
                    >
                      {cat.id === 'electric-2w'
                        ? '48V, 60V, 72V'
                        : cat.id === 'electric-3w'
                        ? '48V / 51.2V (60V–72V Cargo)'
                        : cat.id === 'ess-inverter' || cat.id === 'solar-storage'
                        ? '12.8V, 25.6V, 48V, 51.2V Rack Mount'
                        : cat.id === 'cylindrical-cells'
                        ? '3.2V (LFP) / 3.6V–3.7V (NMC)'
                        : 'Tailored 12V to 400V+'}
                    </td>
                  ))}
                </tr>

                {/* Duty Cycle Profile */}
                <tr className="hover:bg-theme-elevated transition-colors">
                  <td className="py-4 px-6 font-mono text-theme-secondary font-bold">
                    Duty Cycle Profile
                  </td>
                  {selectedCategories.map((cat) => (
                    <td
                      key={cat.id}
                      className="py-4 px-6 text-xs text-theme-secondary border-l border-theme-border leading-relaxed"
                    >
                      {cat.id === 'electric-2w' || cat.id === 'electric-3w'
                        ? 'High continuous discharge, frequent acceleration bursts, regenerative braking acceptance.'
                        : cat.id === 'solar-storage' || cat.id === 'ess-inverter'
                        ? 'Deep daily DoD discharge cycling with steady solar MPPT or grid recharge.'
                        : 'High drain multi-cell arrays configured for specific load profiles.'}
                    </td>
                  ))}
                </tr>

                {/* BMS & Telemetry */}
                <tr className="hover:bg-theme-elevated transition-colors">
                  <td className="py-4 px-6 font-mono text-theme-secondary font-bold">
                    BMS &amp; Telemetry
                  </td>
                  {selectedCategories.map((cat) => (
                    <td
                      key={cat.id}
                      className="py-4 px-6 text-xs text-theme-secondary border-l border-theme-border"
                    >
                      {cat.id === 'cylindrical-cells'
                        ? 'Raw Cell Form Factor (External BMS Required)'
                        : 'Integrated Smart BMS with multi-point temperature sensing, passive/active balancing & CAN/RS485 option'}
                    </td>
                  ))}
                </tr>

                {/* Category Action */}
                <tr className="bg-theme-surface/50">
                  <td className="py-5 px-6 font-mono text-theme-secondary font-bold">
                    Next Step
                  </td>
                  {selectedCategories.map((cat) => (
                    <td key={cat.id} className="py-5 px-6 border-l border-theme-border">
                      <div className="flex flex-col gap-2">
                        <Button
                          href={`/products/${cat.slug}`}
                          variant="primary"
                          size="sm"
                          className="w-full justify-center text-xs"
                          icon={<ArrowUpRight className="w-3.5 h-3.5" />}
                        >
                          View Models &amp; Datasheet
                        </Button>
                        <Button
                          href={`/rfq?category=${cat.slug}`}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-center text-xs"
                        >
                          Request Category RFQ
                        </Button>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-theme-secondary">Loading comparison matrix...</div>}>
      <CompareContent />
    </Suspense>
  );
}
