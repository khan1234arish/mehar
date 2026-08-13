'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BROAD_CATEGORIES } from '@/data/categories';
import { COMPANY_INFO } from '@/data/companyInfo';
import { analytics } from '@/lib/analytics';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import {
  FileSpreadsheet,
  Send,
  CheckCircle2,
  Copy,
  MessageSquare,
  Building2,
  Cpu,
  Layers,
} from 'lucide-react';

function RfqBuilderInner() {
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
      <div className="p-8 sm:p-12 rounded-3xl bg-[#11161D] border border-[#39D353]/30 text-center space-y-6 max-w-2xl mx-auto shadow-2xl shadow-black/80">
        <div className="w-16 h-16 rounded-full bg-[#161C24] border border-[#39D353]/30 flex items-center justify-center text-[#39D353] mx-auto shadow-[0_0_20px_rgba(57,211,83,0.2)]">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-[#39D353] uppercase tracking-wider">
            Official B2B RFQ Registered
          </span>
          <h2 className="text-2xl font-extrabold text-[#E6EAF0]">
            Quotation Request Received
          </h2>
          <p className="text-xs sm:text-sm text-[#A3AAB5] max-w-lg mx-auto leading-relaxed">
            Thank you, <strong className="text-[#E6EAF0]">{formData.contactPerson}</strong> from <strong className="text-[#E6EAF0]">{formData.companyName}</strong>. Your technical parameters have been routed to the commercial sales desk at <strong className="text-[#E6EAF0]">{COMPANY_INFO.parentCompanyName}</strong>.
          </p>
        </div>

        {/* Traceable Reference Code */}
        <div className="p-4 rounded-xl bg-[#161C24] border border-[#1E2633] inline-flex items-center gap-3 font-mono text-sm shadow-sm">
          <span className="text-[#A3AAB5] text-xs">RFQ Reference ID:</span>
          <span className="font-bold text-[#39D353]">{submissionResult.rfqNumber}</span>
          <button
            onClick={copyRfqNumber}
            className="p-1 rounded text-[#39D353] hover:bg-[#39D353]/10 transition-colors"
            title="Copy RFQ ID"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
        {copied && (
          <span className="block text-[11px] font-mono text-[#39D353] font-semibold">
            Copied to clipboard!
          </span>
        )}

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappDesk.replace(/[^0-9]/g, '')}?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#39D353] text-[#0B0F14] text-xs font-bold hover:bg-[#2ec547] shadow-[0_0_15px_rgba(57,211,83,0.25)] transition-all w-full sm:w-auto"
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
          <h3 className="text-base font-bold text-[#E6EAF0] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#39D353]" />
            1. Select Battery Category(ies) of Interest
          </h3>
          <p className="text-xs text-[#A3AAB5] mt-0.5">
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
                    ? 'bg-[#39D353]/10 border-[#39D353] ring-1 ring-[#39D353]'
                    : 'bg-[#161C24] border-[#1E2633] hover:border-[#39D353]/50'
                }`}
              >
                <div>
                  <span className="text-xs font-bold text-[#E6EAF0] block">
                    {cat.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#A3AAB5]">
                    {cat.tagline}
                  </span>
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-[#39D353] shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Technical Requirements (Customer Input) */}
      <div className="space-y-4 pt-6 border-t border-[#1E2633]">
        <div>
          <h3 className="text-base font-bold text-[#E6EAF0] flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#39D353]" />
            2. Customer Target Technical Requirements
          </h3>
          <p className="text-xs text-[#A3AAB5] mt-0.5">
            Provide your target electrical, physical, and protocol preferences for engineering scoping.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
              Target System Voltage
            </label>
            <input
              type="text"
              placeholder="e.g. 48V / 60V / 72V / Custom"
              value={formData.targetVoltage}
              onChange={(e) => setFormData({ ...formData, targetVoltage: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs focus:outline-none focus:border-[#39D353]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
              Required Energy / Capacity (Ah / kWh)
            </label>
            <input
              type="text"
              placeholder="e.g. 30Ah / 100Ah / 5kWh"
              value={formData.targetCapacity}
              onChange={(e) => setFormData({ ...formData, targetCapacity: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs focus:outline-none focus:border-[#39D353]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
              Discharge Current (Continuous / Peak)
            </label>
            <input
              type="text"
              placeholder="e.g. 40A Continuous / 80A Peak"
              value={formData.continuousCurrent}
              onChange={(e) => setFormData({ ...formData, continuousCurrent: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs focus:outline-none focus:border-[#39D353]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
              Max Dimension Envelope (L x W x H mm)
            </label>
            <input
              type="text"
              placeholder="e.g. Max 380 x 220 x 190 mm"
              value={formData.dimensionEnvelope}
              onChange={(e) => setFormData({ ...formData, dimensionEnvelope: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs focus:outline-none focus:border-[#39D353]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
              Chemistry Preference (Customer Input)
            </label>
            <select
              value={formData.chemistryPreference}
              onChange={(e) => setFormData({ ...formData, chemistryPreference: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs font-medium focus:outline-none focus:border-[#39D353]"
            >
              <option value="NOT_SURE">Engineering Team Recommendation / Sizing</option>
              <option value="LIFEPO4">Lithium Iron Phosphate (LiFePO4) Preference</option>
              <option value="NMC">Nickel Manganese Cobalt (NMC) Preference</option>
              <option value="TUBULAR">Tubular Lead-Acid Preference</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
              BMS Communication Protocol
            </label>
            <select
              value={formData.bmsProtocol}
              onChange={(e) => setFormData({ ...formData, bmsProtocol: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs font-medium focus:outline-none focus:border-[#39D353]"
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
      <div className="space-y-4 pt-6 border-t border-[#1E2633]">
        <div>
          <h3 className="text-base font-bold text-[#E6EAF0] flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#39D353]" />
            3. Procurement Scope &amp; Schedule
          </h3>
        </div>

        {initialProduct && (
          <div className="p-4 rounded-2xl bg-[#161C24] border border-[#1E2633] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono font-bold text-[#39D353] uppercase tracking-wider block">
                Target Product Inquired
              </span>
              <span className="text-sm font-bold text-[#E6EAF0]">{initialProduct}</span>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[11px] font-mono text-[#A3AAB5] block font-bold uppercase">
                Minimum Order Quantity (MOQ)
              </span>
              <span className="text-xs font-mono font-bold text-[#E6EAF0]">
                {initialMoq ? `${initialMoq} units` : 'Contact MEHAR'}
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
              Procurement Batch Volume <span className="text-[#39D353]">*</span>
            </label>
            <select
              value={formData.volumeTier}
              onChange={(e) => setFormData({ ...formData, volumeTier: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs font-medium focus:outline-none focus:border-[#39D353]"
            >
              <option value="PILOT_SAMPLE">Evaluation / Prototype Batch (1 – 10 Units)</option>
              <option value="COMMERCIAL_BATCH">Commercial Production Batch (50 – 200 Units)</option>
              <option value="OEM_ANNUAL">OEM Annual Supply Agreement (500+ Units/Month)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
              Specific Unit Quantity
            </label>
            <input
              type="number"
              min="1"
              placeholder={initialMoq ? `e.g. ${initialMoq} units` : 'e.g. 50 units'}
              value={requestedQuantity}
              onChange={(e) => setRequestedQuantity(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs focus:outline-none focus:border-[#39D353]"
            />
          </div>

          {/* Advisory Warning if quantity is below configured MOQ */}
          {initialMoq &&
            requestedQuantity &&
            parseInt(requestedQuantity, 10) > 0 &&
            parseInt(requestedQuantity, 10) < initialMoq && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-3 sm:col-span-2 shadow-sm">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center font-bold flex-shrink-0 text-xs text-amber-300">
                  !
                </div>
                <div>
                  <strong className="font-bold block mb-0.5">MOQ Advisory Notice</strong>
                  Requested quantity is below the minimum order quantity for this product ({initialMoq} units). Please increase the quantity or contact MEHAR for assistance.
                </div>
              </div>
            )}

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
              Required Delivery Timeline
            </label>
            <select
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs font-medium focus:outline-none focus:border-[#39D353]"
            >
              <option value="IMMEDIATE">Immediate Pilot Requirement (Within 15 Days)</option>
              <option value="WITHIN_30_DAYS">Standard Schedule (Within 30 – 45 Days)</option>
              <option value="Q3_Q4_PLANNING">Upcoming Quarter Project Rollout</option>
            </select>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
              Project Notes &amp; Custom Requirements
            </label>
            <textarea
              rows={3}
              placeholder="Provide target vehicle duty cycle, peak elevation gradients, enclosure mounting bracket details..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs placeholder-[#64748B] focus:outline-none focus:border-[#39D353]"
            />
          </div>
        </div>
      </div>

      {/* 4. B2B Company Profile */}
      <div className="space-y-4 pt-6 border-t border-[#1E2633]">
        <div>
          <h3 className="text-base font-bold text-[#E6EAF0] flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#39D353]" />
            4. B2B Corporate Identity &amp; Delivery Contact
          </h3>
          <p className="text-xs text-[#A3AAB5] mt-0.5">
            Please provide official corporate credentials for quote preparation and dispatch estimation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
              Company / Entity Name <span className="text-[#39D353]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Apex EV Technologies Pvt. Ltd."
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs focus:outline-none focus:border-[#39D353]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
              Contact Person Name <span className="text-[#39D353]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rajesh Sharma"
              value={formData.contactPerson}
              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs focus:outline-none focus:border-[#39D353]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
              Official Corporate Email <span className="text-[#39D353]">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="e.g. rajesh@apexev.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs focus:outline-none focus:border-[#39D353]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
              Phone / Mobile Number <span className="text-[#39D353]">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="e.g. +91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs focus:outline-none focus:border-[#39D353]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
              Delivery City &amp; State
            </label>
            <input
              type="text"
              placeholder="e.g. Pune, Maharashtra"
              value={formData.cityState}
              onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs focus:outline-none focus:border-[#39D353]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
              Company GSTIN (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. 27AAAAA0000A1Z5"
              value={formData.gstin}
              onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs focus:outline-none focus:border-[#39D353]"
            />
          </div>
        </div>
      </div>

      {/* Error State Banner */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-left space-y-2">
          <div className="flex items-center gap-2 text-red-400 text-xs font-bold font-mono">
            <span>Submission Error</span>
          </div>
          <p className="text-xs text-red-300 leading-relaxed">{errorMessage}</p>
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            <a
              href={`mailto:${COMPANY_INFO.salesEmail}?subject=B2B%20RFQ%20Submission%20Enquiry`}
              className="text-[#39D353] font-bold hover:underline font-mono"
            >
              Email Sales: {COMPANY_INFO.salesEmail}
            </a>
            <span className="text-[#1E2633]">•</span>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappDesk.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#39D353] font-bold hover:underline font-mono"
            >
              WhatsApp Sales Desk
            </a>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-6 border-t border-[#1E2633] space-y-3">
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

        <p className="text-[11px] text-[#A3AAB5] text-center font-mono">
          Strictly B2B Wholesale &amp; OEM Supply • Engineering confirmation required for final pack specifications.
        </p>
      </div>
    </form>
  );
}

export default function RfqPage() {
  return (
    <div className="py-12 space-y-12 bg-[#0B0F14] text-[#E6EAF0]">
      {/* Header */}
      <div className="max-w-6xl xl:max-w-[1360px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#11161D] border border-[#1E2633] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#39D353]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-3xl space-y-4 relative z-10">
            <Badge variant="green">Official B2B Procurement</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#E6EAF0] tracking-tight">
              Request for Quotation (RFQ) Builder
            </h1>
            <p className="text-sm text-[#A3AAB5] leading-relaxed">
              Configure multi-parameter batch quotations for battery packs, custom OEM enclosures, and energy storage systems by <strong className="text-[#E6EAF0]">{COMPANY_INFO.parentCompanyName}</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Main Form Box */}
      <div className="max-w-6xl xl:max-w-[1360px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-[#11161D] border border-[#1E2633] rounded-3xl p-8 sm:p-10 shadow-xl">
          <Suspense fallback={<div className="p-12 text-center text-xs text-[#A3AAB5]">Loading RFQ builder...</div>}>
            <RfqBuilderInner />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
