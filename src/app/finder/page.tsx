'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { APPLICATION_DOMAINS } from '@/data/applicationDomains';
import { BROAD_CATEGORIES } from '@/data/categories';
import { COMPANY_INFO } from '@/data/companyInfo';
import { analytics } from '@/lib/analytics';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import PlaceholderNotice from '@/components/ui/PlaceholderNotice';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function BatteryFinderPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form State for Customer Requirements Capture
  const [formData, setFormData] = useState({
    // Step 1: Application
    applicationDomainId: 'electric-mobility',
    customEquipment: '',
    // Step 2: Electrical Requirements
    targetVoltage: '48V',
    customVoltage: '',
    targetCapacityAh: '',
    targetRuntime: '',
    continuousCurrentA: '',
    peakCurrentA: '',
    chemistryPreference: 'NOT_SURE',
    // Step 3: Physical & Environment
    dimensionEnvelope: '',
    maxWeightKg: '',
    ipRatingRequirement: 'IP65',
    operatingTemp: 'NORMAL_TROPICAL',
    // Step 4: Commercial Scope
    batchVolume: 'COMMERCIAL_BATCH',
    projectStage: 'PROTOTYPE_DEVELOPMENT',
    additionalNotes: '',
  });

  const selectedDomain =
    APPLICATION_DOMAINS.find((d) => d.id === formData.applicationDomainId) ||
    APPLICATION_DOMAINS[0];

  const matchedCategory =
    BROAD_CATEGORIES.find((c) => c.slug === selectedDomain.categorySlug) ||
    BROAD_CATEGORIES[0];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const proceedToRfq = () => {
    analytics.useFinder(
      selectedDomain.name,
      formData.targetVoltage === 'CUSTOM' ? formData.customVoltage : formData.targetVoltage
    );
    const query = new URLSearchParams({
      category: matchedCategory.slug,
      application: selectedDomain.name,
      voltage: formData.targetVoltage === 'CUSTOM' ? formData.customVoltage : formData.targetVoltage,
      capacity: formData.targetCapacityAh,
      volume: formData.batchVolume,
      notes: `Requirements from Battery Finder: Equipment=${formData.customEquipment || selectedDomain.name}, Runtime=${formData.targetRuntime || 'N/A'}, Dimensions=${formData.dimensionEnvelope || 'N/A'}`,
    });
    router.push(`/rfq?${query.toString()}`);
  };

  return (
    <div className="py-12 space-y-12 bg-theme-base text-theme-primary transition-colors duration-200">
      {/* Header Banner */}
      <div className="max-w-6xl xl:max-w-[1360px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="p-8 sm:p-10 rounded-3xl bg-theme-card border border-theme-border shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-theme-green/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-3xl space-y-4 relative z-10">
            <Badge variant="green">B2B Requirements Capture</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-theme-primary tracking-tight">
              Battery Requirements Finder
            </h1>
            <p className="text-sm text-theme-secondary leading-relaxed">
              Capture your vehicle or equipment operating requirements. Our technical sales and engineering team at <strong className="text-theme-primary">{COMPANY_INFO.parentCompanyName}</strong> will evaluate your parameters and scope an engineered battery solution.
            </p>
          </div>

          {/* Stepper Indicator */}
          <div className="mt-8 pt-6 border-t border-theme-border grid grid-cols-4 gap-2 text-xs font-mono relative z-10">
            {[
              { num: 1, title: 'Application' },
              { num: 2, title: 'Electrical' },
              { num: 3, title: 'Mechanical' },
              { num: 4, title: 'Commercial' },
            ].map((s) => (
              <div
                key={s.num}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  step === s.num
                    ? 'bg-theme-green/10 border-theme-green text-theme-green font-bold shadow-sm'
                    : step > s.num
                    ? 'bg-theme-elevated border-theme-green/40 text-theme-green'
                    : 'bg-theme-elevated border-theme-border text-theme-muted'
                }`}
              >
                <span className="block text-[10px] uppercase">Step 0{s.num}</span>
                <span className="truncate block font-semibold">{s.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="max-w-6xl xl:max-w-[1360px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-theme-card border border-theme-border rounded-3xl p-8 sm:p-10 shadow-xl">
          {/* STEP 1: APPLICATION DOMAIN */}
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-theme-primary flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-theme-green text-white dark:text-[#0B0F14] font-bold flex items-center justify-center text-xs">
                    1
                  </span>
                  Select Your Application / Equipment Sector
                </h2>
                <p className="text-xs text-theme-secondary mt-1">
                  Choose the closest operational domain for your project to help us determine the appropriate duty cycle and environmental stress.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {APPLICATION_DOMAINS.map((domain) => {
                  const isSelected = formData.applicationDomainId === domain.id;
                  return (
                    <button
                      key={domain.id}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, applicationDomainId: domain.id })
                      }
                      className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-theme-green/10 border-theme-green ring-1 ring-theme-green shadow-sm'
                          : 'bg-theme-elevated border-theme-border hover:border-theme-green/50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-theme-primary">
                            {domain.name}
                          </span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-theme-green shrink-0" />
                          )}
                        </div>
                        <p className="text-[11px] text-theme-secondary line-clamp-2">
                          {domain.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-2 pt-2 border-t border-theme-border">
                <label className="text-xs font-mono font-bold text-theme-secondary block">
                  Specific Vehicle Model / Machinery Type (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1.5-ton warehouse pallet truck / High-speed delivery scooter"
                  value={formData.customEquipment}
                  onChange={(e) =>
                    setFormData({ ...formData, customEquipment: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs placeholder-theme-muted focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green"
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Continue to Electrical Parameters
                </Button>
              </div>
            </form>
          )}

          {/* STEP 2: ELECTRICAL REQUIREMENTS */}
          {step === 2 && (
            <form onSubmit={handleNext} className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-theme-primary flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-theme-green text-white dark:text-[#0B0F14] font-bold flex items-center justify-center text-xs">
                    2
                  </span>
                  Specify Your Target Electrical Parameters
                </h2>
                <p className="text-xs text-theme-secondary mt-1">
                  Enter your target system operating voltage, estimated energy storage capacity, and discharge current requirements.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-theme-secondary block">
                    Target Nominal Voltage <span className="text-theme-green">*</span>
                  </label>
                  <select
                    value={formData.targetVoltage}
                    onChange={(e) =>
                      setFormData({ ...formData, targetVoltage: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs font-medium focus:outline-none focus:border-theme-green"
                  >
                    <option value="12V">12V (Nominal)</option>
                    <option value="24V">24V (Nominal)</option>
                    <option value="48V">48V (Nominal / Telecom / E-Rickshaw)</option>
                    <option value="60V">60V (Nominal / High-Speed 2W)</option>
                    <option value="72V">72V (Nominal / Heavy Traction)</option>
                    <option value="CUSTOM">Custom / Non-Standard Voltage</option>
                    <option value="NOT_SURE">Not Sure / Recommend Based on Duty Cycle</option>
                  </select>
                </div>

                {formData.targetVoltage === 'CUSTOM' && (
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-theme-secondary block">
                      Custom Voltage Value (V)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 96V or 120V"
                      value={formData.customVoltage}
                      onChange={(e) =>
                        setFormData({ ...formData, customVoltage: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs placeholder-theme-muted focus:outline-none focus:border-theme-green"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-theme-secondary block">
                    Estimated Target Capacity (Ah / kWh)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 30Ah / 100Ah / 5.12kWh (or leave blank if unsure)"
                    value={formData.targetCapacityAh}
                    onChange={(e) =>
                      setFormData({ ...formData, targetCapacityAh: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs placeholder-theme-muted focus:outline-none focus:border-theme-green"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-theme-secondary block">
                    Desired Operational Runtime / Vehicle Range
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 4 hours continuous backup / 85 km range per charge"
                    value={formData.targetRuntime}
                    onChange={(e) =>
                      setFormData({ ...formData, targetRuntime: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs placeholder-theme-muted focus:outline-none focus:border-theme-green"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-theme-secondary block">
                    Continuous / Peak Current (If Known)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 40A Continuous / 80A Peak (10s)"
                    value={formData.continuousCurrentA}
                    onChange={(e) =>
                      setFormData({ ...formData, continuousCurrentA: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs placeholder-theme-muted focus:outline-none focus:border-theme-green"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-mono font-bold text-theme-secondary block">
                    Cell Chemistry Preference (Customer Preference)
                  </label>
                  <select
                    value={formData.chemistryPreference}
                    onChange={(e) =>
                      setFormData({ ...formData, chemistryPreference: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs font-medium focus:outline-none focus:border-theme-green"
                  >
                    <option value="NOT_SURE">Engineering Team Recommendation / Not Sure</option>
                    <option value="LIFEPO4">Lithium Iron Phosphate (LiFePO4 / LFP) Preference</option>
                    <option value="NMC">Nickel Manganese Cobalt (NMC) Preference</option>
                    <option value="TUBULAR">Tubular Lead-Acid Preference</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-theme-border">
                <Button
                  type="button"
                  onClick={handleBack}
                  variant="ghost"
                  size="md"
                  icon={<ArrowLeft className="w-4 h-4" />}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Continue to Mechanical &amp; Ingress
                </Button>
              </div>
            </form>
          )}

          {/* STEP 3: MECHANICAL & PHYSICAL CONSTRAINTS */}
          {step === 3 && (
            <form onSubmit={handleNext} className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-theme-primary flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-theme-green text-white dark:text-[#0B0F14] font-bold flex items-center justify-center text-xs">
                    3
                  </span>
                  Physical Dimensions &amp; Operating Environment
                </h2>
                <p className="text-xs text-theme-secondary mt-1">
                  Specify physical space constraints, weight limits, and environmental exposure for enclosure design.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-theme-secondary block">
                    Maximum Dimension Envelope (L x W x H in mm)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Max 350 x 200 x 180 mm"
                    value={formData.dimensionEnvelope}
                    onChange={(e) =>
                      setFormData({ ...formData, dimensionEnvelope: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs placeholder-theme-muted focus:outline-none focus:border-theme-green"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-theme-secondary block">
                    Maximum Permissible Pack Weight (kg)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Under 25 kg"
                    value={formData.maxWeightKg}
                    onChange={(e) =>
                      setFormData({ ...formData, maxWeightKg: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs placeholder-theme-muted focus:outline-none focus:border-theme-green"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-theme-secondary block">
                    Target Ingress Protection (IP Rating)
                  </label>
                  <select
                    value={formData.ipRatingRequirement}
                    onChange={(e) =>
                      setFormData({ ...formData, ipRatingRequirement: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs font-medium focus:outline-none focus:border-theme-green"
                  >
                    <option value="IP65">IP65 (Dust Tight, Water Jet Protected)</option>
                    <option value="IP67">IP67 (Dust Tight, Immersion Protected)</option>
                    <option value="INDOOR_STANDARD">Standard Indoor Enclosure (IP20/IP54)</option>
                    <option value="CUSTOM">Custom Environmental Requirement</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-theme-secondary block">
                    Operating Ambient Temperature Range
                  </label>
                  <select
                    value={formData.operatingTemp}
                    onChange={(e) =>
                      setFormData({ ...formData, operatingTemp: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs font-medium focus:outline-none focus:border-theme-green"
                  >
                    <option value="NORMAL_TROPICAL">Standard Tropical (0°C to 45°C)</option>
                    <option value="HIGH_HEAT">High Ambient / Heavy Duty (Up to 55°C)</option>
                    <option value="SUB_ZERO">Cold Storage / Sub-Zero (-10°C to 40°C)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-theme-border">
                <Button
                  type="button"
                  onClick={handleBack}
                  variant="ghost"
                  size="md"
                  icon={<ArrowLeft className="w-4 h-4" />}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Continue to Commercial Scope
                </Button>
              </div>
            </form>
          )}

          {/* STEP 4: COMMERCIAL & BATCH SCOPE */}
          {step === 4 && (
            <form onSubmit={handleNext} className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-theme-primary flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-theme-green text-white dark:text-[#0B0F14] font-bold flex items-center justify-center text-xs">
                    4
                  </span>
                  Procurement Volume &amp; Project Stage
                </h2>
                <p className="text-xs text-theme-secondary mt-1">
                  Specify your expected order volume tier and project timeline to help us allocate technical engineering resources.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-theme-secondary block">
                    Estimated Procurement / Supply Volume <span className="text-theme-green">*</span>
                  </label>
                  <select
                    value={formData.batchVolume}
                    onChange={(e) =>
                      setFormData({ ...formData, batchVolume: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs font-medium focus:outline-none focus:border-theme-green"
                  >
                    <option value="PILOT_SAMPLE">Pilot Evaluation Batch (1 – 10 Units)</option>
                    <option value="COMMERCIAL_BATCH">Commercial Production Batch (50 – 200 Units)</option>
                    <option value="OEM_ANNUAL">OEM Annual Supply Agreement (500+ Units/Month)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-theme-secondary block">
                    Current Project Stage
                  </label>
                  <select
                    value={formData.projectStage}
                    onChange={(e) =>
                      setFormData({ ...formData, projectStage: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs font-medium focus:outline-none focus:border-theme-green"
                  >
                    <option value="PROTOTYPE_DEVELOPMENT">Prototype Development &amp; CAD Design</option>
                    <option value="TESTING_VALIDATION">Vehicle / System Testing &amp; Field Trials</option>
                    <option value="READY_PRODUCTION">Ready for Commercial Mass Production</option>
                    <option value="EXISTING_REPLACEMENT">Replacement for Existing Battery Supplier</option>
                  </select>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-mono font-bold text-theme-secondary block">
                    Additional Engineering or Regulatory Requirements (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Specify target connectors, CANbus/telemetry protocol, thermal insulation, or custom enclosure mounting details..."
                    value={formData.additionalNotes}
                    onChange={(e) =>
                      setFormData({ ...formData, additionalNotes: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs placeholder-theme-muted focus:outline-none focus:border-theme-green"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-theme-border">
                <Button
                  type="button"
                  onClick={handleBack}
                  variant="ghost"
                  size="md"
                  icon={<ArrowLeft className="w-4 h-4" />}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  icon={<CheckCircle2 className="w-4 h-4" />}
                >
                  Generate Requirements Evaluation Summary
                </Button>
              </div>
            </form>
          )}

          {/* STEP 5: OUTPUT / EVALUATION SUMMARY */}
          {step === 5 && (
            <div className="space-y-8">
              {/* Primary Assessment Notice */}
              <div className="p-6 rounded-2xl bg-theme-green/10 border border-theme-green/30 space-y-3">
                <div className="flex items-center gap-2.5 text-theme-green">
                  <CheckCircle2 className="w-6 h-6 text-theme-green shrink-0" />
                  <h3 className="text-base font-bold">
                    Requirements Scoping Complete
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
                  Based on the information provided, our engineering team can evaluate a suitable battery solution tailored to your operational duty cycle and dimensional constraints.
                </p>
                <div className="pt-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold bg-theme-elevated text-amber-600 dark:text-amber-300 border border-amber-500/30">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                    Engineering Confirmation Required
                  </span>
                </div>
              </div>

              {/* Requirement Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Application & Category */}
                <div className="p-6 rounded-2xl bg-theme-elevated border border-theme-border space-y-3">
                  <span className="text-[10px] font-mono text-theme-secondary font-bold uppercase tracking-wider block">
                    Potential Application Category
                  </span>
                  <h4 className="text-base font-bold text-theme-primary">
                    {matchedCategory.name}
                  </h4>
                  <p className="text-xs text-theme-secondary">
                    {matchedCategory.description}
                  </p>
                  <div className="pt-2">
                    <span className="text-xs font-mono text-theme-green font-semibold">
                      Sector: {selectedDomain.name}
                    </span>
                  </div>
                </div>

                {/* Collected Electrical Parameters */}
                <div className="p-6 rounded-2xl bg-theme-elevated border border-theme-border space-y-2 text-xs font-mono">
                  <span className="text-[10px] text-theme-secondary font-bold uppercase tracking-wider block mb-2">
                    Customer Target Specifications
                  </span>
                  <div className="flex justify-between border-b border-theme-border pb-1">
                    <span className="text-theme-secondary">Target Voltage:</span>
                    <span className="font-bold text-theme-primary">
                      {formData.targetVoltage === 'CUSTOM'
                        ? formData.customVoltage || 'Custom'
                        : formData.targetVoltage}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-theme-border pb-1">
                    <span className="text-theme-secondary">Target Capacity:</span>
                    <span className="font-bold text-theme-primary">
                      {formData.targetCapacityAh || 'To be sized by Engineering'}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-theme-border pb-1">
                    <span className="text-theme-secondary">Chemistry Preference:</span>
                    <span className="font-bold text-theme-primary">
                      {formData.chemistryPreference}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-theme-border pb-1">
                    <span className="text-theme-secondary">Max Dimensions:</span>
                    <span className="font-bold text-theme-primary">
                      {formData.dimensionEnvelope || 'Standard Enclosure'}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-theme-secondary">Volume Scope:</span>
                    <span className="font-bold text-theme-green">
                      {formData.batchVolume}
                    </span>
                  </div>
                </div>
              </div>

              {/* Data Governance Disclaimer */}
              <PlaceholderNotice
                variant="banner"
                message="Final cell sizing, BMS safety thresholds, thermal design, and CAD dimensions require direct technical validation by Lawad Infrastructure engineers. No definitive product model is assigned until engineering confirmation."
              />

              {/* Action Buttons */}
              <div className="pt-4 border-t border-theme-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  variant="outline"
                  size="md"
                >
                  Modify Parameters
                </Button>

                <Button
                  type="button"
                  onClick={proceedToRfq}
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Proceed to Official RFQ Submission
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
