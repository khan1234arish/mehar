'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BROAD_CATEGORIES } from '@/data/categories';
import { COMPANY_INFO } from '@/data/companyInfo';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import PlaceholderNotice from '@/components/ui/PlaceholderNotice';
import {
  FileSpreadsheet,
  Send,
  CheckCircle2,
  Copy,
  MessageSquare,
  Building2,
  Cpu,
  Layers,
  ArrowRight,
} from 'lucide-react';

function RfqBuilderInner() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialVoltage = searchParams.get('voltage') || '';
  const initialCapacity = searchParams.get('capacity') || '';
  const initialVolume = searchParams.get('volume') || 'COMMERCIAL_BATCH';
  const initialNotes = searchParams.get('notes') || '';

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : [BROAD_CATEGORIES[0].slug]
  );

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
      } else {
        setErrorMessage(
          data.error ||
            'Unable to register quotation request at this time. Please try again or contact our sales desk directly.'
        );
      }
    } catch (err) {
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
    const whatsappText = encodeURIComponent(
      `Hello MEHAR Sales Desk, I have submitted an official B2B RFQ with Reference Number: ${submissionResult.rfqNumber}. Company: ${formData.companyName}. Looking forward to your technical review.`
    );

    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-[#ECFDF5] border border-[#A7F3D0] text-center space-y-6 max-w-2xl mx-auto shadow-sm">
        <div className="w-16 h-16 rounded-full bg-white border border-[#A7F3D0] flex items-center justify-center text-[#059669] mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-[#065F46] uppercase tracking-wider">
            Official B2B RFQ Registered
          </span>
          <h2 className="text-2xl font-extrabold text-[#064E3B]">
            Quotation Request Received
          </h2>
          <p className="text-xs sm:text-sm text-[#047857] max-w-lg mx-auto leading-relaxed">
            Thank you, <strong className="text-[#064E3B]">{formData.contactPerson}</strong> from <strong className="text-[#064E3B]">{formData.companyName}</strong>. Your technical parameters have been routed to the commercial sales desk at <strong className="text-[#064E3B]">{COMPANY_INFO.parentCompanyName}</strong>.
          </p>
        </div>

        {/* Traceable Reference Code */}
        <div className="p-4 rounded-xl bg-white border border-[#CBD5E1] inline-flex items-center gap-3 font-mono text-sm shadow-sm">
          <span className="text-[#64748B] text-xs">RFQ Reference ID:</span>
          <span className="font-bold text-[#0F172A]">{submissionResult.rfqNumber}</span>
          <button
            onClick={copyRfqNumber}
            className="p-1 rounded text-[#059669] hover:bg-[#ECFDF5] transition-colors"
            title="Copy RFQ ID"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
        {copied && (
          <span className="block text-[11px] font-mono text-[#059669] font-semibold">
            Copied to clipboard!
          </span>
        )}

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappDesk.replace(/[^0-9]/g, '')}?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#059669] text-white text-xs font-bold hover:bg-[#047857] transition-all w-full sm:w-auto"
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
          <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#059669]" />
            1. Select Battery Category(ies) of Interest
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Select one or more broad classifications for your procurement requirement.
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
                className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#ECFDF5] border-[#059669] ring-1 ring-[#059669]'
                    : 'bg-white border-[#CBD5E1] hover:border-[#059669]'
                }`}
              >
                <div>
                  <span className="text-xs font-bold text-[#0F172A] block">
                    {cat.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#64748B]">
                    {cat.tagline}
                  </span>
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Technical Requirements (Customer Input) */}
      <div className="space-y-4 pt-6 border-t border-[#E2E8F0]">
        <div>
          <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#059669]" />
            2. Customer Target Technical Requirements
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Provide your target electrical, physical, and protocol preferences for engineering scoping.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#334155] block">
              Target System Voltage
            </label>
            <input
              type="text"
              placeholder="e.g. 48V / 60V / 72V / Custom"
              value={formData.targetVoltage}
              onChange={(e) => setFormData({ ...formData, targetVoltage: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs focus:outline-none focus:border-[#059669]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#334155] block">
              Required Energy / Capacity (Ah / kWh)
            </label>
            <input
              type="text"
              placeholder="e.g. 30Ah / 100Ah / 5kWh"
              value={formData.targetCapacity}
              onChange={(e) => setFormData({ ...formData, targetCapacity: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs focus:outline-none focus:border-[#059669]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#334155] block">
              Discharge Current (Continuous / Peak)
            </label>
            <input
              type="text"
              placeholder="e.g. 40A Continuous / 80A Peak"
              value={formData.continuousCurrent}
              onChange={(e) => setFormData({ ...formData, continuousCurrent: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs focus:outline-none focus:border-[#059669]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#334155] block">
              Max Dimension Envelope (L x W x H mm)
            </label>
            <input
              type="text"
              placeholder="e.g. Max 380 x 220 x 190 mm"
              value={formData.dimensionEnvelope}
              onChange={(e) => setFormData({ ...formData, dimensionEnvelope: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs focus:outline-none focus:border-[#059669]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#334155] block">
              Chemistry Preference (Customer Input)
            </label>
            <select
              value={formData.chemistryPreference}
              onChange={(e) => setFormData({ ...formData, chemistryPreference: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs font-medium focus:outline-none focus:border-[#059669]"
            >
              <option value="NOT_SURE">Engineering Team Recommendation / Sizing</option>
              <option value="LIFEPO4">Lithium Iron Phosphate (LiFePO4) Preference</option>
              <option value="NMC">Nickel Manganese Cobalt (NMC) Preference</option>
              <option value="TUBULAR">Tubular Lead-Acid Preference</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#334155] block">
              BMS Communication Protocol
            </label>
            <select
              value={formData.bmsProtocol}
              onChange={(e) => setFormData({ ...formData, bmsProtocol: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs font-medium focus:outline-none focus:border-[#059669]"
            >
              <option value="STANDARD">Standard Protection Hardware BMS</option>
              <option value="CANBUS">CAN 2.0B Protocol Integration</option>
              <option value="RS485">RS485 Telemetry Protocol</option>
              <option value="BLUETOOTH">Bluetooth BLE Monitoring App</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Procurement Volume & Timeline */}
      <div className="space-y-4 pt-6 border-t border-[#E2E8F0]">
        <div>
          <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#059669]" />
            3. Procurement Scope & Schedule
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#334155] block">
              Procurement Batch Volume <span className="text-[#059669]">*</span>
            </label>
            <select
              value={formData.volumeTier}
              onChange={(e) => setFormData({ ...formData, volumeTier: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs font-medium focus:outline-none focus:border-[#059669]"
            >
              <option value="PILOT_SAMPLE">Evaluation / Prototype Batch (1 – 10 Units)</option>
              <option value="COMMERCIAL_BATCH">Commercial Production Batch (50 – 200 Units)</option>
              <option value="OEM_ANNUAL">OEM Annual Supply Agreement (500+ Units/Month)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#334155] block">
              Required Delivery Timeline
            </label>
            <select
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs font-medium focus:outline-none focus:border-[#059669]"
            >
              <option value="IMMEDIATE">Immediate Pilot Requirement (Within 15 Days)</option>
              <option value="WITHIN_30_DAYS">Standard Schedule (Within 30 – 45 Days)</option>
              <option value="Q3_Q4_PLANNING">Upcoming Quarter Project Rollout</option>
            </select>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-mono font-bold text-[#334155] block">
              Project Notes & Custom Requirements
            </label>
            <textarea
              rows={3}
              placeholder="Provide target vehicle duty cycle, peak elevation gradients, enclosure mounting bracket details..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs placeholder-[#94A3B8] focus:outline-none focus:border-[#059669]"
            />
          </div>
        </div>
      </div>

      {/* 4. B2B Company Profile */}
      <div className="space-y-4 pt-6 border-t border-[#E2E8F0]">
        <div>
          <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#059669]" />
            4. B2B Corporate Identity & Delivery Contact
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Please provide official corporate credentials for quote preparation and dispatch estimation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#334155] block">
              Company / Entity Name <span className="text-[#059669]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Apex EV Technologies Pvt. Ltd."
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs focus:outline-none focus:border-[#059669]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#334155] block">
              Contact Person Name <span className="text-[#059669]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rajesh Sharma"
              value={formData.contactPerson}
              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs focus:outline-none focus:border-[#059669]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#334155] block">
              Official Corporate Email <span className="text-[#059669]">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="e.g. rajesh@apexev.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs focus:outline-none focus:border-[#059669]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#334155] block">
              Phone / Mobile Number <span className="text-[#059669]">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="e.g. +91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs focus:outline-none focus:border-[#059669]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#334155] block">
              Delivery City & State
            </label>
            <input
              type="text"
              placeholder="e.g. Pune, Maharashtra"
              value={formData.cityState}
              onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs focus:outline-none focus:border-[#059669]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#334155] block">
              Company GSTIN (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. 27AAAAA0000A1Z5"
              value={formData.gstin}
              onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs focus:outline-none focus:border-[#059669]"
            />
          </div>
        </div>
      </div>

      {/* Error State Banner */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-left space-y-2">
          <div className="flex items-center gap-2 text-[#991B1B] text-xs font-bold">
            <span>Submission Error</span>
          </div>
          <p className="text-xs text-[#B91C1C] leading-relaxed">{errorMessage}</p>
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            <a
              href={`mailto:${COMPANY_INFO.salesEmail}?subject=B2B%20RFQ%20Submission%20Enquiry`}
              className="text-[#059669] font-bold hover:underline font-mono"
            >
              Email Sales: {COMPANY_INFO.salesEmail}
            </a>
            <span className="text-[#CBD5E1]">•</span>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappDesk.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#059669] font-bold hover:underline font-mono"
            >
              WhatsApp Sales Desk
            </a>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-6 border-t border-[#E2E8F0] space-y-3">
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

        <p className="text-[11px] text-[#64748B] text-center font-mono">
          Strictly B2B Wholesale &amp; OEM Supply • Engineering confirmation required for final pack specifications.
        </p>
      </div>
    </form>
  );
}

export default function RfqPage() {
  return (
    <div className="py-12 space-y-12 bg-white text-[#0F172A]">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0]">
          <div className="max-w-3xl space-y-4">
            <Badge variant="green">Official B2B Procurement</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Request for Quotation (RFQ) Builder
            </h1>
            <p className="text-sm text-[#475569] leading-relaxed">
              Configure multi-parameter batch quotations for battery packs, custom OEM enclosures, and energy storage systems by <strong className="text-[#0F172A]">{COMPANY_INFO.parentCompanyName}</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Main Form Box */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 sm:p-10 shadow-sm">
          <Suspense fallback={<div className="p-12 text-center text-xs text-[#64748B]">Loading RFQ builder...</div>}>
            <RfqBuilderInner />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
