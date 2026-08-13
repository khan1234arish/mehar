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
    <div className="py-12 space-y-12 bg-[#0B0F14] text-[#E6EAF0]">
      {/* Header Banner */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#11161D] border border-[#1E2633] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#39D353]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-3xl space-y-4 relative z-10">
            <Badge variant="green">Technical Evaluation</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#E6EAF0] tracking-tight">
              Category &amp; Application Comparison Matrix
            </h1>
            <p className="text-sm text-[#A3AAB5] leading-relaxed">
              Compare broad battery categories side-by-side to evaluate application suitability, operating parameters, and custom engineering scope.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#1E2633] flex flex-wrap items-center justify-between gap-4 text-xs relative z-10">
            <PlaceholderNotice
              message="Numerical specification cells are marked 'Not yet verified / Coming soon' until official client catalogue release."
            />

            {/* Category Selector Buttons */}
            {availableToAdd.length > 0 && selectedSlugs.length < 4 && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#A3AAB5]">Add to Compare:</span>
                <div className="flex flex-wrap gap-1.5">
                  {availableToAdd.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => addCategory(cat.slug)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#161C24] border border-[#1E2633] text-[11px] font-semibold text-[#E6EAF0] hover:border-[#39D353] hover:bg-[#39D353]/10 hover:text-[#39D353] transition-colors"
                    >
                      <Plus className="w-3 h-3 text-[#39D353]" />
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
        <div className="rounded-3xl bg-[#11161D] border border-[#1E2633] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#0D1117] border-b border-[#1E2633]">
                  <th className="py-5 px-6 font-mono uppercase text-[11px] font-bold text-[#A3AAB5] w-64 min-w-[200px]">
                    Comparison Feature
                  </th>
                  {selectedCategories.map((cat) => (
                    <th
                      key={cat.id}
                      className="py-5 px-6 min-w-[260px] align-top border-l border-[#1E2633]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono text-[#39D353] font-bold block mb-1 uppercase">
                            Broad Category
                          </span>
                          <h3 className="text-sm font-bold text-[#E6EAF0] leading-snug">
                            {cat.name}
                          </h3>
                        </div>
                        {selectedCategories.length > 1 && (
                          <button
                            onClick={() => removeCategory(cat.slug)}
                            className="p-1 rounded-md text-[#64748B] hover:text-[#EF4444] hover:bg-red-500/10 transition-colors shrink-0"
                            title="Remove from comparison"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2633] text-[#E6EAF0]">
                {/* 1. Target Applications */}
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#E6EAF0] bg-[#161C24]/50">
                    Primary Target Applications
                  </td>
                  {selectedCategories.map((cat) => (
                    <td key={cat.id} className="py-4 px-6 border-l border-[#1E2633]">
                      <div className="flex flex-wrap gap-1.5">
                        {cat.keyApplications.map((app) => (
                          <span
                            key={app}
                            className="px-2 py-0.5 rounded-md bg-[#161C24] border border-[#1E2633] text-[11px] font-mono text-[#A3AAB5]"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 2. Typical Operating Voltage */}
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#E6EAF0] bg-[#161C24]/50">
                    Nominal Voltage &amp; Capacity Scope
                  </td>
                  {selectedCategories.map((cat) => {
                    let voltageInfo = 'Application dependent';
                    if (cat.slug === 'electric-2-wheeler-batteries') voltageInfo = '36V, 48V, 60V, 72V (7.5Ah - 34Ah)';
                    else if (cat.slug === 'electric-3-wheeler-batteries') voltageInfo = '51.2V, 60.8V (86Ah - 200Ah)';
                    else if (cat.slug === 'energy-storage-inverter-batteries') voltageInfo = '12.8V, 25.6V, 51.2V (100Ah - 200Ah)';
                    else if (cat.slug === 'solar-renewable-energy-batteries') voltageInfo = '51.2V (100Ah - 200Ah ESS)';
                    else if (cat.slug === 'cylindrical-li-ion-cells') voltageInfo = '3.6V - 3.7V Nominal / 18650, 21700, 32700';
                    else if (cat.slug === 'custom-oem-industrial-batteries') voltageInfo = '24V - 400V+ (Custom Configured)';

                    return (
                      <td key={cat.id} className="py-4 px-6 border-l border-[#1E2633]">
                        <span className="text-xs font-mono font-semibold text-[#39D353]">{voltageInfo}</span>
                      </td>
                    );
                  })}
                </tr>

                {/* 3. Chemistry Suitability */}
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#E6EAF0] bg-[#161C24]/50">
                    Electrochemistry Architecture
                  </td>
                  {selectedCategories.map((cat) => {
                    let chemInfo = 'LiFePO4 / NMC';
                    if (cat.slug === 'electric-2-wheeler-batteries') chemInfo = 'NMC & Li-ion (High Energy Density)';
                    else if (cat.slug === 'electric-3-wheeler-batteries') chemInfo = 'LiFePO4 (Thermal Stability & Long Life)';
                    else if (cat.slug === 'energy-storage-inverter-batteries') chemInfo = 'LiFePO4 (Maintenance-Free Deep Cycle)';
                    else if (cat.slug === 'solar-renewable-energy-batteries') chemInfo = 'LiFePO4 (High Charge Acceptance)';
                    else if (cat.slug === 'cylindrical-li-ion-cells') chemInfo = 'NMC / Li-Ion / LiFePO4 Cylindrical Formats';
                    else if (cat.slug === 'custom-oem-industrial-batteries') chemInfo = 'LiFePO4 / NMC / High-C Polymer';

                    return (
                      <td key={cat.id} className="py-4 px-6 border-l border-[#1E2633]">
                        <p className="text-xs text-[#A3AAB5] leading-relaxed font-medium">{chemInfo}</p>
                      </td>
                    );
                  })}
                </tr>

                {/* 4. BMS & Telemetry Capabilities */}
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#E6EAF0] bg-[#161C24]/50">
                    BMS &amp; Telemetry Integration
                  </td>
                  {selectedCategories.map((cat) => {
                    let bmsInfo = 'Smart BMS Protection';
                    if (cat.slug === 'electric-2-wheeler-batteries') bmsInfo = 'Multi-Tier Smart BMS (Optional CAN / RS485)';
                    else if (cat.slug === 'electric-3-wheeler-batteries') bmsInfo = 'CAN 2.0B / RS485 / IoT Fleet Telematics';
                    else if (cat.slug === 'energy-storage-inverter-batteries') bmsInfo = 'Digital Thermal Guard & Cell Balancing';
                    else if (cat.slug === 'solar-renewable-energy-batteries') bmsInfo = 'RS485 / CAN Hybrid Inverter Protocol Mapping';
                    else if (cat.slug === 'cylindrical-li-ion-cells') bmsInfo = 'Individual Cell Welded Arrays with Module BMS';
                    else if (cat.slug === 'custom-oem-industrial-batteries') bmsInfo = 'Industrial CANbus / Modbus / Custom Harness';

                    return (
                      <td key={cat.id} className="py-4 px-6 border-l border-[#1E2633]">
                        <span className="text-xs text-[#A3AAB5]">{bmsInfo}</span>
                      </td>
                    );
                  })}
                </tr>

                {/* 5. Ingress & Mechanical Enclosure */}
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#E6EAF0] bg-[#161C24]/50">
                    Ingress Protection &amp; Enclosure
                  </td>
                  {selectedCategories.map((cat) => {
                    let ipInfo = 'IP65 Standard';
                    if (cat.slug === 'electric-2-wheeler-batteries') ipInfo = 'IP65 / IP67 Aluminum / MS Powder Coated';
                    else if (cat.slug === 'electric-3-wheeler-batteries') ipInfo = 'IP65 Vibration-Resistant Reinforced MS Casing';
                    else if (cat.slug === 'energy-storage-inverter-batteries') ipInfo = 'IP54 / Indoor Enclosure / 19" Rack-Mount';
                    else if (cat.slug === 'solar-renewable-energy-batteries') ipInfo = 'IP54 Wall-Mount / Modular Floor Cabinet';
                    else if (cat.slug === 'cylindrical-li-ion-cells') ipInfo = 'Standard Steel Canister with Heat-Shrink Sleeve';
                    else if (cat.slug === 'custom-oem-industrial-batteries') ipInfo = 'Custom Heavy Steel / Molded Bay Enclosures';

                    return (
                      <td key={cat.id} className="py-4 px-6 border-l border-[#1E2633]">
                        <span className="text-xs text-[#A3AAB5]">{ipInfo}</span>
                      </td>
                    );
                  })}
                </tr>

                {/* 6. Cycle Life Rating */}
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#E6EAF0] bg-[#161C24]/50">
                    Cycle Life Rating (@ 80%–85% DoD)
                  </td>
                  {selectedCategories.map((cat) => {
                    let cycleInfo = '2,000+ cycles';
                    if (cat.slug === 'electric-2-wheeler-batteries') cycleInfo = '800 - 1,200+ cycles (NMC / Li-ion)';
                    else if (cat.slug === 'electric-3-wheeler-batteries') cycleInfo = '2,000+ cycles @ 85% DoD (LiFePO4)';
                    else if (cat.slug === 'energy-storage-inverter-batteries') cycleInfo = '3,000+ cycles (LiFePO4)';
                    else if (cat.slug === 'solar-renewable-energy-batteries') cycleInfo = '3,000+ cycles (LiFePO4)';
                    else if (cat.slug === 'cylindrical-li-ion-cells') cycleInfo = '800 - 2,000+ cycles (Format & Chemistry Dependent)';
                    else if (cat.slug === 'custom-oem-industrial-batteries') cycleInfo = '2,000+ to 3,000+ cycles (Chemistry dependent)';

                    return (
                      <td key={cat.id} className="py-4 px-6 border-l border-[#1E2633]">
                        <span className="text-xs font-mono font-bold text-[#39D353]">{cycleInfo}</span>
                      </td>
                    );
                  })}
                </tr>

                {/* 7. Direct Action CTA */}
                <tr className="bg-[#0D1117]">
                  <td className="py-4 px-6 font-bold text-[#E6EAF0]">
                    Procurement Next Step
                  </td>
                  {selectedCategories.map((cat) => (
                    <td key={cat.id} className="py-4 px-6 border-l border-[#1E2633]">
                      <Button
                        href={`/rfq?category=${cat.slug}`}
                        variant="primary"
                        size="sm"
                        className="w-full justify-center"
                        icon={<ArrowUpRight className="w-3.5 h-3.5" />}
                      >
                        Inquire for {cat.name.split(' ')[0]}
                      </Button>
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
    <Suspense fallback={<div className="p-12 text-center text-xs text-[#A3AAB5]">Loading comparison matrix...</div>}>
      <CompareContent />
    </Suspense>
  );
}
