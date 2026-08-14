'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { BROAD_CATEGORIES } from '@/data/categories';
import { COMPANY_INFO } from '@/data/companyInfo';
import { getWhatsAppUrl, getCleanWhatsAppDigits } from '@/lib/whatsapp';
import { analytics } from '@/lib/analytics';
import Button from '@/components/ui/Button';
import {
  Send,
  CheckCircle2,
  Copy,
  MessageSquare,
  Building2,
  Cpu,
  Layers,
} from 'lucide-react';

export default function RfqBuilderClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialProduct = searchParams.get('product') || '';
  const initialMoqParam = searchParams.get('moq');
  const initialMoq = initialMoqParam ? parseInt(initialMoqParam, 10) : null;
  const initialVoltage = searchParams.get('voltage') || '';
  const initialCapacity = searchParams.get('capacity') || '';
  const initialVolume = searchParams.get('volume') || 'COMMERCIAL_BATCH';
  const initialNotes = searchParams.get('notes') || '';

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : [BROAD_CATEGORIES[0].slug]
  );

  const [requestedQuantity, setRequestedQuantity] = useState<string>('');

  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    cityState: '',
    gstin: '',
    targetVoltage: initialVoltage || '48V',
    targetCapacity: initialCapacity || '',
    continuousCurrent: '',
    peakCurrent: '',
    dimensionEnvelope: '',
    chemistryPreference: 'NOT_SURE',
    bmsProtocol: 'STANDARD',
    volumeTier: initialVolume,
    timeline: 'WITHIN_30_DAYS',
    notes: initialNotes,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    rfqNumber: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const toggleCategory = (slug: string) => {
    if (selectedCategories.includes(slug)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter((s) => s !== slug));
      }
    } else {
      setSelectedCategories([...selectedCategories, slug]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          categories: selectedCategories,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.rfqNumber) {
        setSubmissionResult({ rfqNumber: data.rfqNumber });
        analytics.rfqSubmit(
          selectedCategories.length,
          Boolean(formData.gstin),
          formData.timeline,
          formData.volumeTier
        );
      } else {
        setErrorMessage(
          data.error ||
            'Unable to register quotation request at this time. Please try again or contact our sales desk directly.'
        );
      }
    } catch {
      setErrorMessage(
        'A network error occurred while submitting your quotation request. Please check your connection or contact our sales desk directly.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const copyRfqNumber = () => {
    if (submissionResult?.rfqNumber) {
      navigator.clipboard.writeText(submissionResult.rfqNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (submissionResult) {
    const rawWhatsappText = `Hello MEHAR Sales Desk, I have submitted an official B2B RFQ with Reference Number: ${submissionResult.rfqNumber}. Company: ${formData.companyName}. Looking forward to your technical review.`;
    const whatsappUrl = getWhatsAppUrl(rawWhatsappText, COMPANY_INFO.whatsappDesk);
    const hasValidWhatsApp = !!getCleanWhatsAppDigits(COMPANY_INFO.whatsappDesk);

    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-theme-card border border-theme-green/30 text-center space-y-6 max-w-2xl mx-auto shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-theme-elevated border border-theme-green/30 flex items-center justify-center text-theme-green mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-theme-green uppercase tracking-wider">
            Official B2B RFQ Registered
          </span>
          <h2 className="text-2xl font-extrabold text-theme-primary">
            Quotation Request Received
          </h2>
          <p className="text-xs sm:text-sm text-theme-secondary max-w-lg mx-auto leading-relaxed">
            Thank you, <strong className="text-theme-primary">{formData.contactPerson}</strong> from <strong className="text-theme-primary">{formData.companyName}</strong>. Your technical parameters have been routed to the commercial sales desk at <strong className="text-theme-primary">{COMPANY_INFO.parentCompanyName}</strong>.
          </p>
        </div>

        {/* Traceable Reference Code */}
        <div className="p-4 rounded-xl bg-theme-elevated border border-theme-border inline-flex items-center gap-3 font-mono text-sm shadow-sm">
          <span className="text-theme-secondary text-xs">RFQ Reference ID:</span>
          <span className="font-bold text-theme-green">{submissionResult.rfqNumber}</span>
          <button
            onClick={copyRfqNumber}
            className="p-1 rounded text-theme-green hover:bg-theme-green/10 transition-colors"
            title="Copy RFQ ID"
            aria-label="Copy RFQ Reference Number"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
        {copied && (
          <span className="block text-[11px] font-mono text-theme-green font-semibold">
            Copied to clipboard!
          </span>
        )}

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={whatsappUrl}
            target={hasValidWhatsApp ? '_blank' : undefined}
            rel={hasValidWhatsApp ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-theme-green text-white dark:text-[#0B0F14] text-xs font-bold hover:bg-theme-green-hover shadow-sm transition-all w-full sm:w-auto"
          >
            <MessageSquare className="w-4 h-4" /> Connect with Sales on WhatsApp
          </a>

          <Button
            onClick={() => setSubmissionResult(null)}
            variant="outline"
            size="md"
            className="w-full sm:w-auto"
          >
            Submit Another RFQ
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* 1. Category Selection */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-mono font-bold text-theme-green uppercase tracking-wider block">
            Step 1
          </span>
          <h3 className="text-lg font-bold text-theme-primary flex items-center gap-2">
            <Layers className="w-5 h-5 text-theme-green" />
            Select Equipment &amp; Application Categories
          </h3>
          <p className="text-xs text-theme-secondary mt-0.5">
            Select one or multiple battery categories to configure for your procurement quotation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {BROAD_CATEGORIES.map((cat) => {
            const isSelected = selectedCategories.includes(cat.slug);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleCategory(cat.slug)}
                className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                  isSelected
                    ? 'border-theme-green bg-theme-green/10 text-theme-primary shadow-sm'
                    : 'border-theme-border bg-theme-elevated text-theme-secondary hover:border-theme-green/40 hover:text-theme-primary'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                    isSelected
                      ? 'bg-theme-green border-theme-green text-white dark:text-[#0B0F14]'
                      : 'border-theme-border bg-theme-card text-transparent'
                  }`}
                >
                  ✓
                </div>
                <div>
                  <span className="text-xs font-bold block">{cat.name}</span>
                  <span className="text-[11px] text-theme-secondary line-clamp-1 mt-0.5">
                    {cat.tagline}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {initialProduct && (
          <div className="p-3.5 rounded-xl bg-theme-elevated border border-theme-green/30 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-mono">
              <span className="text-theme-secondary">Prefilled for Product:</span>
              <strong className="text-theme-green font-bold">{initialProduct}</strong>
            </div>
            {initialMoq && (
              <span className="px-2.5 py-0.5 rounded-md bg-theme-green/10 text-theme-green border border-theme-green/20 font-mono text-[10px] font-bold">
                Standard MOQ: {initialMoq} Units
              </span>
            )}
          </div>
        )}
      </div>

      {/* 2. Technical Parameters */}
      <div className="space-y-4 pt-6 border-t border-theme-border">
        <div>
          <span className="text-xs font-mono font-bold text-theme-green uppercase tracking-wider block">
            Step 2
          </span>
          <h3 className="text-lg font-bold text-theme-primary flex items-center gap-2">
            <Cpu className="w-5 h-5 text-theme-green" />
            Technical &amp; Electrical Requirements
          </h3>
          <p className="text-xs text-theme-secondary mt-0.5">
            Specify desired voltage, capacity, and current limits.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-theme-secondary block">
              Target Voltage <span className="text-theme-green">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 48V, 60.8V, 73.6V"
              value={formData.targetVoltage}
              onChange={(e) => setFormData({ ...formData, targetVoltage: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs font-mono focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-theme-secondary block">
              Target Capacity (Ah)
            </label>
            <input
              type="text"
              placeholder="e.g. 100Ah, 200Ah"
              value={formData.targetCapacity}
              onChange={(e) => setFormData({ ...formData, targetCapacity: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs font-mono focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-theme-secondary block">
              Continuous Current (A)
            </label>
            <input
              type="text"
              placeholder="e.g. 50A continuous"
              value={formData.continuousCurrent}
              onChange={(e) => setFormData({ ...formData, continuousCurrent: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs font-mono focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-theme-secondary block">
              Peak Discharge Current (A)
            </label>
            <input
              type="text"
              placeholder="e.g. 100A for 10 sec"
              value={formData.peakCurrent}
              onChange={(e) => setFormData({ ...formData, peakCurrent: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs font-mono focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-theme-secondary block">
              Chemistry Preference
            </label>
            <select
              value={formData.chemistryPreference}
              onChange={(e) => setFormData({ ...formData, chemistryPreference: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors"
            >
              <option value="NOT_SURE">Engineering Recommendation (Recommended)</option>
              <option value="LIFEPO4">LiFePO4 (Lithium Iron Phosphate - High Cycle Life)</option>
              <option value="NMC">NMC (High Energy Density &amp; Compact Volume)</option>
              <option value="LTO">LTO (Ultra-Fast Charging / Extreme Cold)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-theme-secondary block">
              Smart BMS Telemetry Protocol
            </label>
            <select
              value={formData.bmsProtocol}
              onChange={(e) => setFormData({ ...formData, bmsProtocol: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors"
            >
              <option value="STANDARD">Standard Microprocessor BMS (Discrete Cutoff)</option>
              <option value="CAN2B">CAN 2.0B Protocol (Vehicle Cluster / Inverter)</option>
              <option value="RS485">RS485 / Modbus RTU (Industrial &amp; Solar)</option>
              <option value="BLE_IOT">Bluetooth 5.0 + 4G Cloud Telemetry Gateway</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-theme-secondary block">
              Enclosure Dimensions / Constraints
            </label>
            <input
              type="text"
              placeholder="e.g. Max 400x300x250mm"
              value={formData.dimensionEnvelope}
              onChange={(e) => setFormData({ ...formData, dimensionEnvelope: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs font-mono focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors"
            />
          </div>
        </div>
      </div>

      {/* 3. Procurement Volume & Timeline */}
      <div className="space-y-4 pt-6 border-t border-theme-border">
        <div>
          <span className="text-xs font-mono font-bold text-theme-green uppercase tracking-wider block">
            Step 3
          </span>
          <h3 className="text-lg font-bold text-theme-primary flex items-center gap-2">
            <Building2 className="w-5 h-5 text-theme-green" />
            Procurement Tier &amp; Delivery Schedule
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-theme-secondary block">
              Procurement Volume Tier <span className="text-theme-green">*</span>
            </label>
            <select
              value={formData.volumeTier}
              onChange={(e) => setFormData({ ...formData, volumeTier: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors"
            >
              <option value="PROTOTYPE">Prototype / Sample Lot (1-10 units)</option>
              <option value="COMMERCIAL_BATCH">Commercial Pilot (10-50 units)</option>
              <option value="PRODUCTION_RUN">Production Batch (50-200 units)</option>
              <option value="ANNUAL_CONTRACT">Annual Supply Contract (200+ units)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-theme-secondary block">
              Required Units Quantity
            </label>
            <input
              type="text"
              placeholder="e.g. 50 packs"
              value={requestedQuantity}
              onChange={(e) => setRequestedQuantity(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs font-mono focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-theme-secondary block">
              Project Timeline
            </label>
            <select
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors"
            >
              <option value="IMMEDIATE">Immediate Requirement (&lt; 15 days)</option>
              <option value="WITHIN_30_DAYS">Standard Dispatch (Within 30 days)</option>
              <option value="WITHIN_60_DAYS">Next Quarter (Within 60 days)</option>
              <option value="FUTURE_PLANNING">Future Planning / Budgetary Stage</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Company & Contact Details */}
      <div className="space-y-4 pt-6 border-t border-theme-border">
        <div>
          <span className="text-xs font-mono font-bold text-theme-green uppercase tracking-wider block">
            Step 4
          </span>
          <h3 className="text-lg font-bold text-theme-primary flex items-center gap-2">
            <Building2 className="w-5 h-5 text-theme-green" />
            Company &amp; Commercial Contact Information
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-theme-secondary block">
              Company / Entity Name <span className="text-theme-green">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Green Mobility Innovations LLP"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs placeholder-theme-muted focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-theme-secondary block">
              Contact Person &amp; Designation <span className="text-theme-green">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Anand Sharma (VP Procurement)"
              value={formData.contactPerson}
              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs placeholder-theme-muted focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-theme-secondary block">
              Official Corporate Email <span className="text-theme-green">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="e.g. anand@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs placeholder-theme-muted focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-theme-secondary block">
              Commercial Phone / Mobile <span className="text-theme-green">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="e.g. +91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs placeholder-theme-muted focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-theme-secondary block">
              City &amp; State <span className="text-theme-green">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Gurugram, Haryana"
              value={formData.cityState}
              onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs placeholder-theme-muted focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-theme-secondary block">
              GSTIN / Corporate Tax ID <span className="text-theme-muted font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 07AAAAA0000A1Z5"
              value={formData.gstin}
              onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs placeholder-theme-muted font-mono focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-theme-secondary block">
              Project Context / Special Mechanical Demands
            </label>
            <input
              type="text"
              placeholder="e.g. Must fit into standard 2W floor cavity with Anderson SB50"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs placeholder-theme-muted focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Error Message Display */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-600 dark:text-red-400 space-y-2">
          <p className="font-bold">{errorMessage}</p>
          <p className="text-[11px] text-theme-secondary">
            You can also connect directly via phone at <span className="font-mono font-semibold">{COMPANY_INFO.salesPhone}</span> or email at <a href={`mailto:${COMPANY_INFO.salesEmail}`} className="underline">{COMPANY_INFO.salesEmail}</a>.
          </p>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-6 border-t border-theme-border space-y-3">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full justify-center"
          disabled={submitting}
          icon={<Send className="w-4 h-4" />}
        >
          {submitting ? 'Submitting Official B2B RFQ...' : 'Submit Official B2B RFQ'}
        </Button>

        <p className="text-[11px] text-theme-secondary text-center font-mono">
          Strictly B2B Wholesale &amp; OEM Supply • Engineering confirmation required for final pack specifications.
        </p>
      </div>
    </form>
  );
}
