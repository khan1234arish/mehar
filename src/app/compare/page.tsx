'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { BROAD_CATEGORIES, CategoryData } from '@/data/categories';
import { COMPANY_INFO } from '@/data/companyInfo';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import PlaceholderNotice from '@/components/ui/PlaceholderNotice';
import {
  SlidersHorizontal,
  Plus,
  X,
  ArrowRight,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  FileSpreadsheet,
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
    <div className="py-12 space-y-12 bg-white text-[#0F172A]">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0]">
          <div className="max-w-3xl space-y-4">
            <Badge variant="green">Technical Evaluation</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Category & Application Comparison Matrix
            </h1>
            <p className="text-sm text-[#475569] leading-relaxed">
              Compare broad battery categories side-by-side to evaluate application suitability, operating parameters, and custom engineering scope.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4 text-xs">
            <PlaceholderNotice
              message="Numerical specification cells are marked 'Not yet verified / Coming soon' until official client catalogue release."
            />

            {/* Category Selector Buttons */}
            {availableToAdd.length > 0 && selectedSlugs.length < 4 && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#64748B]">Add to Compare:</span>
                <div className="flex flex-wrap gap-1.5">
                  {availableToAdd.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => addCategory(cat.slug)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#CBD5E1] text-[11px] font-semibold text-[#0F172A] hover:border-[#059669] hover:bg-[#ECFDF5] hover:text-[#065F46] transition-colors"
                    >
                      <Plus className="w-3 h-3 text-[#059669]" />
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-white border border-[#E2E8F0] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <th className="py-5 px-6 font-mono uppercase text-[11px] font-bold text-[#64748B] w-64 min-w-[200px]">
                    Comparison Feature
                  </th>
                  {selectedCategories.map((cat) => (
                    <th
                      key={cat.id}
                      className="py-5 px-6 min-w-[260px] align-top border-l border-[#E2E8F0]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono text-[#059669] font-bold block mb-1 uppercase">
                            Broad Category
                          </span>
                          <h3 className="text-sm font-bold text-[#0F172A] leading-snug">
                            {cat.name}
                          </h3>
                        </div>
                        {selectedCategories.length > 1 && (
                          <button
                            onClick={() => removeCategory(cat.slug)}
                            className="p-1 rounded-md text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#E2E8F0] transition-colors shrink-0"
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
              <tbody className="divide-y divide-[#E2E8F0] text-[#334155]">
                {/* 1. Target Applications */}
                <tr className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#0F172A] bg-[#F8FAFC]/50">
                    Primary Target Applications
                  </td>
                  {selectedCategories.map((cat) => (
                    <td key={cat.id} className="py-4 px-6 border-l border-[#E2E8F0]">
                      <div className="flex flex-wrap gap-1.5">
                        {cat.keyApplications.map((app) => (
                          <span
                            key={app}
                            className="px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[11px] font-medium text-[#334155]"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 2. Typical Operating Voltage */}
                <tr className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#0F172A] bg-[#F8FAFC]/50">
                    Nominal Voltage & Capacity
                  </td>
                  {selectedCategories.map((cat) => (
                    <td key={cat.id} className="py-4 px-6 border-l border-[#E2E8F0]">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono bg-[#FEFCE8] text-[#854D0E] border border-[#FEF08A] font-semibold">
                        <Clock className="w-3 h-3 text-[#CA8A04]" /> Not yet verified
                      </span>
                    </td>
                  ))}
                </tr>

                {/* 3. Chemistry Suitability */}
                <tr className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#0F172A] bg-[#F8FAFC]/50">
                    Electrochemistry Focus
                  </td>
                  {selectedCategories.map((cat) => (
                    <td key={cat.id} className="py-4 px-6 border-l border-[#E2E8F0]">
                      <p className="text-xs text-[#475569] leading-relaxed">
                        Evaluated per customer duty cycle (LiFePO4, NMC, or Advanced Tubular).
                      </p>
                    </td>
                  ))}
                </tr>

                {/* 4. BMS & Telemetry Capabilities */}
                <tr className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#0F172A] bg-[#F8FAFC]/50">
                    BMS & Telemetry Protocols
                  </td>
                  {selectedCategories.map((cat) => (
                    <td key={cat.id} className="py-4 px-6 border-l border-[#E2E8F0]">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono bg-[#FEFCE8] text-[#854D0E] border border-[#FEF08A] font-semibold">
                        <Clock className="w-3 h-3 text-[#CA8A04]" /> Sized per OEM Spec
                      </span>
                    </td>
                  ))}
                </tr>

                {/* 5. Ingress & Mechanical Enclosure */}
                <tr className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#0F172A] bg-[#F8FAFC]/50">
                    Ingress & Enclosure Types
                  </td>
                  {selectedCategories.map((cat) => (
                    <td key={cat.id} className="py-4 px-6 border-l border-[#E2E8F0]">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono bg-[#FEFCE8] text-[#854D0E] border border-[#FEF08A] font-semibold">
                        <Clock className="w-3 h-3 text-[#CA8A04]" /> Not yet verified
                      </span>
                    </td>
                  ))}
                </tr>

                {/* 6. Cycle Life Rating */}
                <tr className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#0F172A] bg-[#F8FAFC]/50">
                    Cycle Life & Durability
                  </td>
                  {selectedCategories.map((cat) => (
                    <td key={cat.id} className="py-4 px-6 border-l border-[#E2E8F0]">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono bg-[#FEFCE8] text-[#854D0E] border border-[#FEF08A] font-semibold">
                        <Clock className="w-3 h-3 text-[#CA8A04]" /> Specifications coming soon
                      </span>
                    </td>
                  ))}
                </tr>

                {/* 7. Direct Action CTA */}
                <tr className="bg-[#F8FAFC]">
                  <td className="py-4 px-6 font-bold text-[#0F172A]">
                    Procurement Next Step
                  </td>
                  {selectedCategories.map((cat) => (
                    <td key={cat.id} className="py-4 px-6 border-l border-[#E2E8F0]">
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
    <Suspense fallback={<div className="p-12 text-center text-xs text-[#64748B]">Loading comparison matrix...</div>}>
      <CompareContent />
    </Suspense>
  );
}
