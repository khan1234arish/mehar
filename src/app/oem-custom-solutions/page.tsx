'use client';

import React, { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { COMPANY_INFO } from '@/data/companyInfo';
import { APPLICATION_DOMAINS } from '@/data/applicationDomains';
import { analytics } from '@/lib/analytics';
import OemProgressBar, { OEM_STEPS } from '@/components/oem/OemProgressBar';

import {
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  CheckCircle2,
  Upload,
  X,
  Copy,
  MessageSquare,
  Phone,
  Building2,
  ArrowLeft,
  Info,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────
// TYPE DEFINITIONS
// ─────────────────────────────────────────────────────────────────

interface ElectricalReqs {
  voltage: string;
  voltageUnit: string;
  capacity: string;
  capacityUnit: string;
  energy: string;
  energyUnit: string;
  continuousCurrent: string;
  peakCurrent: string;
  runtime: string;
  runtimeUnit: string;
  chemistryPreference: string;
}

interface MechanicalReqs {
  length: string;
  width: string;
  height: string;
  maxWeight: string;
  mountingReqs: string;
  connector: string;
  harness: string;
}

interface BmsReqs {
  bmsRequired: string;
  protocols: string[];
  otherProtocol: string;
}

interface EnvironmentalReqs {
  operatingTempMin: string;
  operatingTempMax: string;
  storageTempMin: string;
  storageTempMax: string;
  ipRating: string;
  vibrationShock: string;
  otherEnv: string;
}

interface CommercialReqs {
  protoQty: string;
  productionQty: string;
  annualQty: string;
  targetDate: string;
  projectStage: string;
}

interface CompanyInfo {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  gstin: string;
  website: string;
}

interface AttachmentFile {
  file: File;
  id: string;
}

interface FormErrors {
  [key: string]: string;
}

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────

const CHEMISTRY_OPTIONS = [
  'Not sure — please advise',
  'Lithium Iron Phosphate (LFP)',
  'Lithium NMC',
  'Lead Acid (Tubular / VRLA)',
  'Other / Open to recommendation',
];

const CONNECTOR_OPTIONS = [
  'Not yet decided',
  'Anderson SB50 / SB120 / SB175',
  'XT60 / XT90',
  'Deans T-Plug',
  'Anderson PP45',
  'Custom / Proprietary',
  'Other',
];

const PROJECT_STAGES = [
  'Concept / Research',
  'Prototype / Proof of Concept',
  'Pre-production / Pilot',
  'Volume Production',
  'Retrofit / Replacement',
];

const ANNUAL_QTY_OPTIONS = [
  'Under 500 units / year',
  '500 – 2,000 units / year',
  '2,000 – 10,000 units / year',
  '10,000 – 50,000 units / year',
  '50,000+ units / year',
  'Not yet estimated',
];

const ALLOWED_EXTENSIONS =
  /\.(pdf|jpg|jpeg|png|webp|doc|docx|xls|xlsx|step|stp|iges|igs|dwg|dxf)$/i;
const MAX_FILE_MB = 10;
const MAX_FILES = 5;

// ─────────────────────────────────────────────────────────────────
// FIELD COMPONENTS
// ─────────────────────────────────────────────────────────────────

function FieldLabel({
  children,
  required,
  hint,
  isCustomerReq = false,
}: {
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
  isCustomerReq?: boolean;
}) {
  return (
    <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 mb-1.5">
      <label className="text-xs font-bold text-[#E6EAF0]">
        {children}
        {required && <span className="text-[#EF4444] ml-0.5">*</span>}
      </label>
      {isCustomerReq && (
        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300">
          Customer Requirement
        </span>
      )}
      {hint && <p className="w-full text-[10px] text-[#A3AAB5] leading-tight">{hint}</p>}
    </div>
  );
}

function FormInput({
  id,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  disabled,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-[#E6EAF0] placeholder-[#64748B] bg-[#161C24] focus:outline-none focus:ring-2 focus:ring-[#39D353]/20 transition-colors ${
          error
            ? 'border-[#EF4444] focus:border-[#EF4444]'
            : 'border-[#1E2633] focus:border-[#39D353]'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
      {error && <p className="mt-1 text-[10px] text-[#EF4444] font-medium">{error}</p>}
    </div>
  );
}

function FormSelect({
  id,
  value,
  onChange,
  options,
  error,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  error?: string;
}) {
  return (
    <div>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-[#E6EAF0] bg-[#161C24] focus:outline-none focus:ring-2 focus:ring-[#39D353]/20 transition-colors ${
          error
            ? 'border-[#EF4444] focus:border-[#EF4444]'
            : 'border-[#1E2633] focus:border-[#39D353]'
        }`}
      >
        <option value="" className="bg-[#161C24] text-[#A3AAB5]">— Select —</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#161C24] text-[#E6EAF0]">{o}</option>
        ))}
      </select>
      {error && <p className="mt-1 text-[10px] text-[#EF4444] font-medium">{error}</p>}
    </div>
  );
}

function UnitInput({
  id,
  value,
  onChange,
  unitValue,
  onUnitChange,
  unitOptions,
  placeholder,
  error,
  type = 'number',
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  unitValue: string;
  onUnitChange: (u: string) => void;
  unitOptions: string[];
  placeholder?: string;
  error?: string;
  type?: string;
}) {
  return (
    <div>
      <div className="flex gap-2">
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={0}
          className={`flex-1 px-3.5 py-2.5 rounded-lg border text-sm text-[#E6EAF0] placeholder-[#64748B] bg-[#161C24] focus:outline-none focus:ring-2 focus:ring-[#39D353]/20 transition-colors ${
            error ? 'border-[#EF4444]' : 'border-[#1E2633] focus:border-[#39D353]'
          }`}
        />
        <select
          value={unitValue}
          onChange={(e) => onUnitChange(e.target.value)}
          className="px-2.5 py-2.5 rounded-lg border border-[#1E2633] text-xs text-[#E6EAF0] bg-[#161C24] focus:outline-none focus:border-[#39D353]"
        >
          {unitOptions.map((u) => <option key={u} value={u} className="bg-[#161C24] text-[#E6EAF0]">{u}</option>)}
        </select>
      </div>
      {error && <p className="mt-1 text-[10px] text-[#EF4444] font-medium">{error}</p>}
    </div>
  );
}

function CheckboxGroup({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (opt: string) => {
    if (selected.includes(opt)) onChange(selected.filter((s) => s !== opt));
    else onChange([...selected, opt]);
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
              active
                ? 'bg-[#39D353]/10 border-[#39D353] text-[#39D353]'
                : 'bg-[#161C24] border-[#1E2633] text-[#A3AAB5] hover:border-[#39D353]/50'
            }`}
          >
            {active ? '✓ ' : ''}{opt}
          </button>
        );
      })}
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#11161D] rounded-xl border border-[#1E2633] overflow-hidden shadow-lg">
      <div className="px-5 py-3 bg-[#0D1117] border-b border-[#1E2633]">
        <h3 className="text-sm font-bold text-[#E6EAF0]">{title}</h3>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

function ReviewRow({
  label,
  value,
}: {
  label: string;
  value: string | undefined | null;
}) {
  const display = value && value.trim() ? value : '—';
  return (
    <div className="flex justify-between items-start gap-4 py-1.5 border-b border-[#1E2633] last:border-0">
      <span className="text-[10px] font-bold text-[#A3AAB5] uppercase tracking-wider whitespace-nowrap flex-shrink-0">
        {label}
      </span>
      <span className="text-xs text-[#E6EAF0] text-right font-medium">{display}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────

export default function OemCustomSolutionsPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});

  // Step 1 — Application
  const [applicationId, setApplicationId] = useState('');
  const [applicationDetail, setApplicationDetail] = useState('');

  // Step 2 — Electrical
  const [elec, setElec] = useState<ElectricalReqs>({
    voltage: '',
    voltageUnit: 'V',
    capacity: '',
    capacityUnit: 'Ah',
    energy: '',
    energyUnit: 'Wh',
    continuousCurrent: '',
    peakCurrent: '',
    runtime: '',
    runtimeUnit: 'hours',
    chemistryPreference: '',
  });

  // Step 3 — Mechanical
  const [mech, setMech] = useState<MechanicalReqs>({
    length: '',
    width: '',
    height: '',
    maxWeight: '',
    mountingReqs: '',
    connector: '',
    harness: '',
  });

  // Step 4 — BMS
  const [bms, setBms] = useState<BmsReqs>({
    bmsRequired: '',
    protocols: [],
    otherProtocol: '',
  });

  // Step 5 — Environmental
  const [env, setEnv] = useState<EnvironmentalReqs>({
    operatingTempMin: '',
    operatingTempMax: '',
    storageTempMin: '',
    storageTempMax: '',
    ipRating: '',
    vibrationShock: '',
    otherEnv: '',
  });

  // Step 6 — Commercial
  const [comm, setComm] = useState<CommercialReqs>({
    protoQty: '',
    productionQty: '',
    annualQty: '',
    targetDate: '',
    projectStage: '',
  });

  // Step 7 — Company + Attachments
  const [company, setCompany] = useState<CompanyInfo>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    country: 'India',
    gstin: '',
    website: '',
  });
  const [attachments, setAttachments] = useState<AttachmentFile[]>([]);
  const [fileError, setFileError] = useState('');

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    enquiryNumber: string;
    waText: string;
    message: string;
  } | null>(null);
  const [submitError, setSubmitError] = useState('');
  const [copied, setCopied] = useState(false);

  // ── Validation ────────────────────────────────────────────────
  const validate = useCallback(
    (targetStep: number): boolean => {
      const errs: FormErrors = {};

      if (targetStep === 1) {
        if (!applicationId) errs.applicationId = 'Please select an application.';
      }

      if (targetStep === 7) {
        if (!company.companyName.trim()) errs.companyName = 'Company name is required.';
        if (!company.contactPerson.trim()) errs.contactPerson = 'Contact name is required.';
        if (!company.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(company.email))
          errs.email = 'A valid business email is required.';
        if (!company.phone.trim()) errs.phone = 'Phone number is required.';
        if (!company.city.trim()) errs.city = 'City is required.';
        if (!company.state.trim()) errs.state = 'State is required.';
      }

      setErrors(errs);
      return Object.keys(errs).length === 0;
    },
    [applicationId, company]
  );

  const handleNext = () => {
    if (!validate(step)) return;
    setErrors({});
    setStep((s) => Math.min(s + 1, OEM_STEPS.length));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── File handling ─────────────────────────────────────────────
  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    setFileError('');
    const toAdd: AttachmentFile[] = [];

    if (attachments.length + files.length > MAX_FILES) {
      setFileError(`Maximum ${MAX_FILES} files allowed.`);
      return;
    }

    for (const file of Array.from(files)) {
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        setFileError(`"${file.name}" exceeds ${MAX_FILE_MB}MB limit.`);
        return;
      }
      if (!ALLOWED_EXTENSIONS.test(file.name)) {
        setFileError(
          `"${file.name}" is not an accepted file type. Allowed: PDF, images, Office docs, CAD files.`
        );
        return;
      }
      toAdd.push({ file, id: `${Date.now()}-${Math.random()}` });
    }

    setAttachments((prev) => [...prev, ...toAdd]);
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
    setFileError('');
  };

  // ── Submit ────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!validate(7)) {
      setStep(7);
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    try {
      const applicationLabel =
        APPLICATION_DOMAINS.find((d) => d.id === applicationId)?.name ||
        applicationId;

      const formData = new FormData();
      formData.append('companyName', company.companyName);
      formData.append('contactPerson', company.contactPerson);
      formData.append('email', company.email);
      formData.append('phone', company.phone);
      formData.append('city', company.city);
      formData.append('state', company.state);
      formData.append('country', company.country);
      if (company.gstin) formData.append('gstin', company.gstin);
      if (company.website) formData.append('website', company.website);
      formData.append('applicationType', applicationLabel);
      if (applicationDetail) formData.append('applicationDetail', applicationDetail);

      formData.append('electricalRequirements', JSON.stringify(elec));
      formData.append('mechanicalRequirements', JSON.stringify(mech));
      formData.append('bmsRequirements', JSON.stringify(bms));
      formData.append('environmentalRequirements', JSON.stringify(env));
      formData.append('commercialRequirements', JSON.stringify(comm));

      attachments.forEach((a) => formData.append('attachments', a.file));

      const res = await fetch('/api/oem-enquiry', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Submission failed.');

      analytics.oemSubmit(applicationLabel, bms.bmsRequired === 'YES');
      setSubmissionResult(data);
    } catch (err) {

      setSubmitError(
        err instanceof Error ? err.message : 'An unexpected error occurred.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopy = () => {
    if (submissionResult) {
      navigator.clipboard.writeText(submissionResult.enquiryNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ── Helpers ───────────────────────────────────────────────────
  const applicationLabel =
    APPLICATION_DOMAINS.find((d) => d.id === applicationId)?.name || applicationId;

  const waUrl = submissionResult
    ? `https://wa.me/${COMPANY_INFO.whatsappDesk.replace(/[^0-9]/g, '')}?text=${submissionResult.waText}`
    : '#';

  // ─────────────────────────────────────────────────────────────
  // SUCCESS SCREEN
  // ─────────────────────────────────────────────────────────────

  if (submissionResult) {
    return (
      <main className="min-h-screen bg-[#0B0F14] text-[#E6EAF0] py-12 px-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-[#11161D] rounded-2xl border border-[#1E2633] shadow-xl overflow-hidden">
            <div className="p-6 bg-[#39D353]/10 border-b border-[#39D353]/25 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#39D353] text-[#0B0F14] flex items-center justify-center flex-shrink-0 font-bold shadow-[0_0_15px_rgba(57,211,83,0.3)]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#39D353]">OEM Enquiry Registered</h2>
                <p className="text-xs text-[#A3AAB5] mt-0.5">{submissionResult.message}</p>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Reference number */}
              <div>
                <p className="text-xs text-[#A3AAB5] mb-1.5 font-semibold">Your Enquiry Reference</p>
                <div className="flex items-center gap-2 p-3 bg-[#161C24] rounded-xl border border-[#1E2633]">
                  <code className="flex-1 font-mono text-sm font-bold text-[#39D353]">
                    {submissionResult.enquiryNumber}
                  </code>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors text-[#A3AAB5] hover:text-[#E6EAF0]"
                    title="Copy reference"
                  >
                    {copied ? (
                      <CheckCircle2 className="w-4 h-4 text-[#39D353]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-[10px] text-[#64748B] mt-1.5">
                  Please quote this reference in all future correspondence.
                </p>
              </div>

              {/* Engineering note */}
              <div className="flex items-start gap-2.5 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-amber-300">Engineering Evaluation Required</p>
                  <p className="text-[10px] text-amber-200/90 mt-0.5 leading-relaxed">
                    Final battery configuration, component selection, BMS parameters and mechanical design require engineering validation by Lawad Infrastructure engineers.
                  </p>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="space-y-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#39D353] text-[#0B0F14] text-sm font-bold hover:bg-[#2ec547] shadow-[0_0_15px_rgba(57,211,83,0.25)] transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Talk to Sales on WhatsApp
                </a>
                <Link
                  href="/contact?type=engineering"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[#00A3FF] text-[#00A3FF] bg-[#00A3FF]/10 text-sm font-bold hover:bg-[#00A3FF]/20 transition-colors"
                >
                  <Building2 className="w-4 h-4" />
                  Talk to Engineering
                </Link>
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#1E2633] text-[#A3AAB5] bg-[#161C24] text-sm font-semibold hover:bg-white/[0.06] hover:text-[#E6EAF0] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Business Enquiry
                </Link>
                <Link
                  href="/"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#1E2633] text-[#A3AAB5] bg-[#161C24] text-sm font-semibold hover:bg-white/[0.06] hover:text-[#E6EAF0] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to MEHAR Website
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // WIZARD
  // ─────────────────────────────────────────────────────────────

  return (
    <main className="min-h-screen bg-[#0B0F14] text-[#E6EAF0]">
      {/* Page header */}
      <div className="bg-[#11161D] border-b border-[#1E2633]">
        <div className="max-w-5xl xl:max-w-[1200px] 2xl:max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          <div className="flex items-center gap-3 mb-1">
            <Link href="/" className="text-[#A3AAB5] hover:text-[#39D353] transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="text-[11px] text-[#1E2633]">/</span>
            <span className="text-[11px] font-medium text-[#39D353]">OEM / ODM Custom Battery Solutions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#E6EAF0]">
            Custom OEM Battery Engineering Enquiry
          </h1>
          <p className="text-sm sm:text-base text-[#A3AAB5] mt-1">
            Capture your engineering requirements. All values are recorded as customer requirements for evaluation by Lawad Infrastructure engineers.
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-5xl xl:max-w-[1200px] 2xl:max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <OemProgressBar currentStep={step} />
      </div>

      {/* Engineering caveat banner */}
      <div className="max-w-5xl xl:max-w-[1200px] 2xl:max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mt-6">
        <div className="flex items-start gap-2 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl">
          <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-200/90 leading-relaxed">
            <strong>Engineering Assessment Required.</strong> All values entered below are <strong>customer-stated requirements</strong>. Suitability, feasibility, and final configuration require engineering validation by Lawad Infrastructure Pvt. Ltd. No product recommendation or capability claim is implied.
          </p>
        </div>
      </div>

      {/* Step content */}
      <div className="max-w-5xl xl:max-w-[1200px] 2xl:max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 space-y-6">

        {/* ═══ STEP 1 — APPLICATION ════════════════════════════════ */}
        {step === 1 && (
          <SectionCard title="Step 1 — Application Domain">
            <div>
              <FieldLabel required>What will the custom battery be used for?</FieldLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {APPLICATION_DOMAINS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => { setApplicationId(d.id); setErrors({}); }}
                    className={`text-left px-4 py-3 rounded-xl border text-xs font-semibold transition-all ${
                      applicationId === d.id
                        ? 'border-[#39D353] bg-[#39D353]/10 text-[#39D353]'
                        : 'border-[#1E2633] bg-[#161C24] text-[#E6EAF0] hover:border-[#39D353]/50'
                    }`}
                  >
                    <span className={applicationId === d.id ? 'text-[#39D353] mr-1' : 'mr-1 opacity-0'}>✓</span>
                    {d.name}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => { setApplicationId('other'); setErrors({}); }}
                  className={`text-left px-4 py-3 rounded-xl border text-xs font-semibold transition-all ${
                    applicationId === 'other'
                      ? 'border-[#059669] bg-[#F0FDF4] text-[#065F46]'
                      : 'border-[#E2E8F0] bg-white text-[#334155] hover:border-[#059669] hover:bg-[#F0FDF4]'
                  }`}
                >
                  <span className={applicationId === 'other' ? 'text-[#059669] mr-1' : 'mr-1 opacity-0'}>✓</span>
                  Other / Not listed
                </button>
              </div>
              {errors.applicationId && (
                <p className="mt-2 text-xs text-[#DC2626]">{errors.applicationId}</p>
              )}
            </div>

            <div>
              <FieldLabel hint="Describe the specific equipment, product, or use case.">
                Application Detail <span className="text-[#94A3B8] font-normal text-[11px]">(optional)</span>
              </FieldLabel>
              <textarea
                id="oem-application-detail"
                value={applicationDetail}
                onChange={(e) => setApplicationDetail(e.target.value)}
                placeholder="e.g. Electric cargo tricycle, 250kg load, 8 hour shift operation"
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-sm text-[#0F172A] placeholder-[#94A3B8] bg-white focus:outline-none focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/20 resize-y"
              />
            </div>
          </SectionCard>
        )}

        {/* ═══ STEP 2 — ELECTRICAL ══════════════════════════════════ */}
        {step === 2 && (
          <SectionCard title="Step 2 — Electrical Requirements (Customer Requirements)">
            <p className="text-xs text-[#64748B] -mt-1">
              All values are customer-stated requirements. They are not confirmed as MEHAR capabilities.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel isCustomerReq hint="Nominal system voltage required by your equipment.">
                  Required Voltage <span className="text-[#94A3B8] font-normal text-[11px]">(optional)</span>
                </FieldLabel>
                <UnitInput
                  id="oem-voltage"
                  value={elec.voltage}
                  onChange={(v) => setElec({ ...elec, voltage: v })}
                  unitValue={elec.voltageUnit}
                  onUnitChange={(u) => setElec({ ...elec, voltageUnit: u })}
                  unitOptions={['V', 'kV']}
                  placeholder="e.g. 48"
                />
              </div>

              <div>
                <FieldLabel isCustomerReq hint="Ampere-hours required.">
                  Capacity <span className="text-[#94A3B8] font-normal text-[11px]">(optional)</span>
                </FieldLabel>
                <UnitInput
                  id="oem-capacity"
                  value={elec.capacity}
                  onChange={(v) => setElec({ ...elec, capacity: v })}
                  unitValue={elec.capacityUnit}
                  onUnitChange={(u) => setElec({ ...elec, capacityUnit: u })}
                  unitOptions={['Ah', 'mAh']}
                  placeholder="e.g. 100"
                />
              </div>

              <div>
                <FieldLabel isCustomerReq hint="Energy in Wh or kWh if known.">
                  Energy <span className="text-[#94A3B8] font-normal text-[11px]">(optional)</span>
                </FieldLabel>
                <UnitInput
                  id="oem-energy"
                  value={elec.energy}
                  onChange={(v) => setElec({ ...elec, energy: v })}
                  unitValue={elec.energyUnit}
                  onUnitChange={(u) => setElec({ ...elec, energyUnit: u })}
                  unitOptions={['Wh', 'kWh']}
                  placeholder="e.g. 4800"
                />
              </div>

              <div>
                <FieldLabel isCustomerReq hint="Continuous discharge current requirement.">
                  Continuous Current <span className="text-[#94A3B8] font-normal text-[11px]">(optional)</span>
                </FieldLabel>
                <UnitInput
                  id="oem-cont-current"
                  value={elec.continuousCurrent}
                  onChange={(v) => setElec({ ...elec, continuousCurrent: v })}
                  unitValue="A"
                  onUnitChange={() => {}}
                  unitOptions={['A']}
                  placeholder="e.g. 50"
                />
              </div>

              <div>
                <FieldLabel isCustomerReq hint="Maximum instantaneous peak current.">
                  Peak Current <span className="text-[#94A3B8] font-normal text-[11px]">(optional)</span>
                </FieldLabel>
                <UnitInput
                  id="oem-peak-current"
                  value={elec.peakCurrent}
                  onChange={(v) => setElec({ ...elec, peakCurrent: v })}
                  unitValue="A"
                  onUnitChange={() => {}}
                  unitOptions={['A']}
                  placeholder="e.g. 200"
                />
              </div>

              <div>
                <FieldLabel isCustomerReq>
                  Runtime / Range <span className="text-[#94A3B8] font-normal text-[11px]">(optional)</span>
                </FieldLabel>
                <UnitInput
                  id="oem-runtime"
                  value={elec.runtime}
                  onChange={(v) => setElec({ ...elec, runtime: v })}
                  unitValue={elec.runtimeUnit}
                  onUnitChange={(u) => setElec({ ...elec, runtimeUnit: u })}
                  unitOptions={['hours', 'km', 'cycles/shift']}
                  placeholder="e.g. 8"
                />
              </div>
            </div>

            <div>
              <FieldLabel isCustomerReq hint="Your preference only — final chemistry is subject to engineering evaluation.">
                Chemistry Preference <span className="text-[#94A3B8] font-normal text-[11px]">(optional)</span>
              </FieldLabel>
              <FormSelect
                id="oem-chemistry"
                value={elec.chemistryPreference}
                onChange={(v) => setElec({ ...elec, chemistryPreference: v })}
                options={CHEMISTRY_OPTIONS}
              />
            </div>
          </SectionCard>
        )}

        {/* ═══ STEP 3 — MECHANICAL ═════════════════════════════════ */}
        {step === 3 && (
          <SectionCard title="Step 3 — Mechanical Requirements (Customer Requirements)">
            <p className="text-xs text-[#64748B] -mt-1">
              All dimensions and constraints are customer-stated. Final form factor requires engineering design.
            </p>

            <div>
              <FieldLabel isCustomerReq hint="Maximum external envelope dimensions of the battery pack.">
                Maximum Dimensions (L × W × H) <span className="text-[#94A3B8] font-normal text-[11px]">(optional)</span>
              </FieldLabel>
              <div className="grid grid-cols-3 gap-2">
                {(['length', 'width', 'height'] as const).map((dim) => (
                  <div key={dim}>
                    <div className="relative">
                      <input
                        id={`oem-${dim}`}
                        type="number"
                        min={0}
                        value={mech[dim]}
                        onChange={(e) => setMech({ ...mech, [dim]: e.target.value })}
                        placeholder="mm"
                        className="w-full px-3 py-2.5 rounded-lg border border-[#CBD5E1] text-sm text-[#0F172A] placeholder-[#94A3B8] bg-white focus:outline-none focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/20"
                      />
                    </div>
                    <p className="text-[9px] text-[#94A3B8] mt-0.5 capitalize text-center">{dim} (mm)</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <FieldLabel isCustomerReq>
                Maximum Weight <span className="text-[#94A3B8] font-normal text-[11px]">(optional)</span>
              </FieldLabel>
              <UnitInput
                id="oem-weight"
                value={mech.maxWeight}
                onChange={(v) => setMech({ ...mech, maxWeight: v })}
                unitValue="kg"
                onUnitChange={() => {}}
                unitOptions={['kg', 'lbs']}
                placeholder="e.g. 12"
              />
            </div>

            <div>
              <FieldLabel isCustomerReq>
                Mounting Requirements <span className="text-[#94A3B8] font-normal text-[11px]">(optional)</span>
              </FieldLabel>
              <FormInput
                id="oem-mounting"
                value={mech.mountingReqs}
                onChange={(v) => setMech({ ...mech, mountingReqs: v })}
                placeholder="e.g. Rear frame bolt-on, 4× M8 threaded inserts"
              />
            </div>

            <div>
              <FieldLabel isCustomerReq>
                Connector / Interface <span className="text-[#94A3B8] font-normal text-[11px]">(optional)</span>
              </FieldLabel>
              <FormSelect
                id="oem-connector"
                value={mech.connector}
                onChange={(v) => setMech({ ...mech, connector: v })}
                options={CONNECTOR_OPTIONS}
              />
            </div>

            <div>
              <FieldLabel isCustomerReq>
                Cable / Harness Requirements <span className="text-[#94A3B8] font-normal text-[11px]">(optional)</span>
              </FieldLabel>
              <FormInput
                id="oem-harness"
                value={mech.harness}
                onChange={(v) => setMech({ ...mech, harness: v })}
                placeholder="e.g. 600mm pigtail, 16mm² cable, crimped lugs"
              />
            </div>
          </SectionCard>
        )}

        {/* ═══ STEP 4 — BMS / COMMS ════════════════════════════════ */}
        {step === 4 && (
          <SectionCard title="Step 4 — BMS & Communication Requirements">
            <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-lg p-3 text-[10px] text-[#78350F] leading-relaxed">
              MEHAR does not confirm specific BMS features or communication protocols without engineering review. The selections below are your stated requirements only.
            </div>

            <div>
              <FieldLabel isCustomerReq required>
                Is a Battery Management System (BMS) required?
              </FieldLabel>
              <div className="flex gap-2 flex-wrap mt-1">
                {['Yes', 'No', 'Not sure'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setBms({ ...bms, bmsRequired: opt })}
                    className={`px-4 py-2 rounded-lg border text-xs font-semibold transition-all ${
                      bms.bmsRequired === opt
                        ? 'border-[#059669] bg-[#F0FDF4] text-[#065F46]'
                        : 'border-[#CBD5E1] bg-white text-[#334155] hover:border-[#059669]'
                    }`}
                  >
                    {bms.bmsRequired === opt ? '✓ ' : ''}{opt}
                  </button>
                ))}
              </div>
            </div>

            {bms.bmsRequired === 'Yes' && (
              <>
                <div>
                  <FieldLabel isCustomerReq hint="Select all communication protocols your system requires. These are customer requirements pending engineering evaluation.">
                    Communication Protocol(s) <span className="text-[#94A3B8] font-normal text-[11px]">(optional)</span>
                  </FieldLabel>
                  <CheckboxGroup
                    options={['CAN bus', 'RS485 / Modbus', 'SMBus', 'UART', 'Bluetooth', 'None required', 'Not sure']}
                    selected={bms.protocols}
                    onChange={(v) => setBms({ ...bms, protocols: v })}
                  />
                </div>

                <div>
                  <FieldLabel isCustomerReq>
                    Other BMS / Protocol Requirements <span className="text-[#94A3B8] font-normal text-[11px]">(optional)</span>
                  </FieldLabel>
                  <FormInput
                    id="oem-bms-other"
                    value={bms.otherProtocol}
                    onChange={(v) => setBms({ ...bms, otherProtocol: v })}
                    placeholder="e.g. Custom SOC reporting via CAN J1939, cell balancing required"
                  />
                </div>
              </>
            )}
          </SectionCard>
        )}

        {/* ═══ STEP 5 — ENVIRONMENT ════════════════════════════════ */}
        {step === 5 && (
          <SectionCard title="Step 5 — Environmental Requirements (Customer Requirements)">
            <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-lg p-3 text-[10px] text-[#78350F] leading-relaxed">
              IP ratings and environmental certifications are not confirmed. All values are customer requirements subject to engineering review.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel isCustomerReq hint="Minimum and maximum operating temperature.">
                  Operating Temperature Range <span className="text-[#94A3B8] font-normal text-[11px]">(optional)</span>
                </FieldLabel>
                <div className="flex gap-2 items-center">
                  <input
                    id="oem-op-temp-min"
                    type="number"
                    value={env.operatingTempMin}
                    onChange={(e) => setEnv({ ...env, operatingTempMin: e.target.value })}
                    placeholder="Min °C"
                    className="flex-1 px-3 py-2.5 rounded-lg border border-[#CBD5E1] text-sm bg-white focus:outline-none focus:border-[#059669]"
                  />
                  <span className="text-[#94A3B8] text-xs">to</span>
                  <input
                    id="oem-op-temp-max"
                    type="number"
                    value={env.operatingTempMax}
                    onChange={(e) => setEnv({ ...env, operatingTempMax: e.target.value })}
                    placeholder="Max °C"
                    className="flex-1 px-3 py-2.5 rounded-lg border border-[#CBD5E1] text-sm bg-white focus:outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div>
                <FieldLabel isCustomerReq>
                  Storage Temperature Range <span className="text-[#94A3B8] font-normal text-[11px]">(optional)</span>
                </FieldLabel>
                <div className="flex gap-2 items-center">
                  <input
                    id="oem-store-temp-min"
                    type="number"
                    value={env.storageTempMin}
                    onChange={(e) => setEnv({ ...env, storageTempMin: e.target.value })}
                    placeholder="Min °C"
                    className="flex-1 px-3 py-2.5 rounded-lg border border-[#CBD5E1] text-sm bg-white focus:outline-none focus:border-[#059669]"
                  />
                  <span className="text-[#94A3B8] text-xs">to</span>
                  <input
                    id="oem-store-temp-max"
                    type="number"
                    value={env.storageTempMax}
                    onChange={(e) => setEnv({ ...env, storageTempMax: e.target.value })}
                    placeholder="Max °C"
                    className="flex-1 px-3 py-2.5 rounded-lg border border-[#CBD5E1] text-sm bg-white focus:outline-none focus:border-[#059669]"
                  />
                </div>
              </div>
            </div>

            <div>
              <FieldLabel isCustomerReq hint="Customer-stated IP rating requirement — suitability subject to engineering evaluation.">
                Water / Dust Ingress Protection (IP Rating) <span className="text-[#94A3B8] font-normal text-[11px]">(optional)</span>
              </FieldLabel>
              <div className="flex flex-wrap gap-2">
                {['No requirement', 'IP44', 'IP54', 'IP55', 'IP65', 'IP67', 'IP68', 'Not sure'].map((ip) => (
                  <button
                    key={ip}
                    type="button"
                    onClick={() => setEnv({ ...env, ipRating: ip })}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                      env.ipRating === ip
                        ? 'border-[#059669] bg-[#F0FDF4] text-[#065F46]'
                        : 'border-[#CBD5E1] bg-white text-[#334155] hover:border-[#059669]'
                    }`}
                  >
                    {env.ipRating === ip ? '✓ ' : ''}{ip}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <FieldLabel isCustomerReq>
                Vibration / Shock Requirements <span className="text-[#94A3B8] font-normal text-[11px]">(optional)</span>
              </FieldLabel>
              <FormInput
                id="oem-vibration"
                value={env.vibrationShock}
                onChange={(v) => setEnv({ ...env, vibrationShock: v })}
                placeholder="e.g. IEC 60068-2-6 Class 2, 5–500Hz, 2g"
              />
            </div>

            <div>
              <FieldLabel isCustomerReq>
                Other Environmental Requirements <span className="text-[#94A3B8] font-normal text-[11px]">(optional)</span>
              </FieldLabel>
              <textarea
                id="oem-env-other"
                value={env.otherEnv}
                onChange={(e) => setEnv({ ...env, otherEnv: e.target.value })}
                placeholder="e.g. Outdoor roof-mounted, exposed to rain, UV, altitude 2000m"
                rows={2}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-sm text-[#0F172A] placeholder-[#94A3B8] bg-white focus:outline-none focus:border-[#059669] resize-y"
              />
            </div>
          </SectionCard>
        )}

        {/* ═══ STEP 6 — COMMERCIAL ═════════════════════════════════ */}
        {step === 6 && (
          <SectionCard title="Step 6 — Commercial Requirements">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel hint="Initial prototype / sample units needed.">
                  Prototype / Sample Quantity <span className="text-[#94A3B8] font-normal text-[11px]">(optional)</span>
                </FieldLabel>
                <div className="flex flex-wrap gap-2">
                  {['1 – 3 units', '4 – 10 units', '10+ units', 'Not yet decided'].map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => setComm({ ...comm, protoQty: o })}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                        comm.protoQty === o
                          ? 'border-[#059669] bg-[#F0FDF4] text-[#065F46]'
                          : 'border-[#CBD5E1] bg-white text-[#334155] hover:border-[#059669]'
                      }`}
                    >
                      {comm.protoQty === o ? '✓ ' : ''}{o}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <FieldLabel>
                  First Production Run Quantity <span className="text-[#94A3B8] font-normal text-[11px]">(optional)</span>
                </FieldLabel>
                <FormInput
                  id="oem-production-qty"
                  value={comm.productionQty}
                  onChange={(v) => setComm({ ...comm, productionQty: v })}
                  placeholder="e.g. 200 units"
                />
              </div>
            </div>

            <div>
              <FieldLabel>
                Estimated Annual Volume <span className="text-[#94A3B8] font-normal text-[11px]">(optional)</span>
              </FieldLabel>
              <FormSelect
                id="oem-annual-qty"
                value={comm.annualQty}
                onChange={(v) => setComm({ ...comm, annualQty: v })}
                options={ANNUAL_QTY_OPTIONS}
              />
            </div>

            <div>
              <FieldLabel hint="Target date for first delivery or production start.">
                Target Production / Delivery Date <span className="text-[#94A3B8] font-normal text-[11px]">(optional)</span>
              </FieldLabel>
              <FormInput
                id="oem-target-date"
                type="date"
                value={comm.targetDate}
                onChange={(v) => setComm({ ...comm, targetDate: v })}
              />
            </div>

            <div>
              <FieldLabel required>Current Project Stage</FieldLabel>
              <div className="flex flex-wrap gap-2 mt-1">
                {PROJECT_STAGES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setComm({ ...comm, projectStage: s })}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                      comm.projectStage === s
                        ? 'border-[#059669] bg-[#F0FDF4] text-[#065F46]'
                        : 'border-[#CBD5E1] bg-white text-[#334155] hover:border-[#059669]'
                    }`}
                  >
                    {comm.projectStage === s ? '✓ ' : ''}{s}
                  </button>
                ))}
              </div>
            </div>
          </SectionCard>
        )}

        {/* ═══ STEP 7 — COMPANY + ATTACHMENTS ══════════════════════ */}
        {step === 7 && (
          <div className="space-y-5">
            <SectionCard title="Company & Contact Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <FieldLabel required>Company Name</FieldLabel>
                  <FormInput
                    id="oem-company-name"
                    value={company.companyName}
                    onChange={(v) => setCompany({ ...company, companyName: v })}
                    placeholder="Your company / organisation name"
                    error={errors.companyName}
                  />
                </div>
                <div>
                  <FieldLabel required>Contact Person</FieldLabel>
                  <FormInput
                    id="oem-contact-person"
                    value={company.contactPerson}
                    onChange={(v) => setCompany({ ...company, contactPerson: v })}
                    placeholder="Full name"
                    error={errors.contactPerson}
                  />
                </div>
                <div>
                  <FieldLabel required>Official Business Email</FieldLabel>
                  <FormInput
                    id="oem-email"
                    type="email"
                    value={company.email}
                    onChange={(v) => setCompany({ ...company, email: v })}
                    placeholder="name@company.com"
                    error={errors.email}
                  />
                </div>
                <div>
                  <FieldLabel required>Phone Number</FieldLabel>
                  <FormInput
                    id="oem-phone"
                    type="tel"
                    value={company.phone}
                    onChange={(v) => setCompany({ ...company, phone: v })}
                    placeholder="+91 XXXXX XXXXX"
                    error={errors.phone}
                  />
                </div>
                <div>
                  <FieldLabel required>City</FieldLabel>
                  <FormInput
                    id="oem-city"
                    value={company.city}
                    onChange={(v) => setCompany({ ...company, city: v })}
                    placeholder="City"
                    error={errors.city}
                  />
                </div>
                <div>
                  <FieldLabel required>State / Province</FieldLabel>
                  <FormInput
                    id="oem-state"
                    value={company.state}
                    onChange={(v) => setCompany({ ...company, state: v })}
                    placeholder="State"
                    error={errors.state}
                  />
                </div>
                <div>
                  <FieldLabel>Country</FieldLabel>
                  <FormInput
                    id="oem-country"
                    value={company.country}
                    onChange={(v) => setCompany({ ...company, country: v })}
                    placeholder="India"
                  />
                </div>
                <div>
                  <FieldLabel hint="For Indian businesses.">
                    GSTIN <span className="text-[#94A3B8] font-normal text-[11px]">(optional)</span>
                  </FieldLabel>
                  <FormInput
                    id="oem-gstin"
                    value={company.gstin}
                    onChange={(v) => setCompany({ ...company, gstin: v })}
                    placeholder="15-character GSTIN"
                  />
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel>
                    Website <span className="text-[#94A3B8] font-normal text-[11px]">(optional)</span>
                  </FieldLabel>
                  <FormInput
                    id="oem-website"
                    type="url"
                    value={company.website}
                    onChange={(v) => setCompany({ ...company, website: v })}
                    placeholder="https://www.yourcompany.com"
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Engineering Documents & Attachments">
              <p className="text-xs text-[#64748B] -mt-1">
                Upload relevant documents such as CAD drawings, existing battery datasheets, product photos, or connector drawings. Maximum {MAX_FILES} files, {MAX_FILE_MB}MB each.
              </p>
              <p className="text-[10px] text-[#94A3B8]">
                Accepted: PDF, JPEG, PNG, WEBP, DOCX, XLSX, STEP, IGES, DWG, DXF
              </p>

              {/* Drop zone */}
              <div
                className="border-2 border-dashed border-[#CBD5E1] rounded-xl p-8 text-center hover:border-[#059669] hover:bg-[#F0FDF4] transition-all cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFiles(e.dataTransfer.files);
                }}
              >
                <Upload className="w-8 h-8 text-[#94A3B8] mx-auto mb-2" />
                <p className="text-sm font-semibold text-[#334155]">Click to upload or drag & drop</p>
                <p className="text-xs text-[#64748B] mt-0.5">
                  {attachments.length}/{MAX_FILES} files selected
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx,.xls,.xlsx,.step,.stp,.iges,.igs,.dwg,.dxf"
                  onChange={(e) => handleFiles(e.target.files)}
                  className="hidden"
                  id="oem-file-input"
                />
              </div>

              {fileError && (
                <p className="text-xs text-[#DC2626] font-medium">{fileError}</p>
              )}

              {/* Attachment list */}
              {attachments.length > 0 && (
                <ul className="space-y-2">
                  {attachments.map((a) => (
                    <li
                      key={a.id}
                      className="flex items-center gap-3 px-3.5 py-2.5 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#0F172A] truncate">{a.file.name}</p>
                        <p className="text-[10px] text-[#64748B]">
                          {(a.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAttachment(a.id)}
                        className="p-1 rounded-lg hover:bg-[#FEE2E2] hover:text-[#DC2626] text-[#94A3B8] transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </SectionCard>
          </div>
        )}

        {/* ═══ STEP 8 — REVIEW ══════════════════════════════════════ */}
        {step === 8 && (
          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
              <div className="px-5 py-3 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#0F172A]">Customer Requirements Summary</h3>
                <span className="text-[9px] px-2 py-1 rounded bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] font-bold uppercase tracking-wider">
                  Customer Requirements Only
                </span>
              </div>

              <div className="p-5 space-y-5">
                {/* Application */}
                <div>
                  <p className="text-[10px] font-bold text-[#059669] uppercase tracking-wider mb-2">Application</p>
                  <ReviewRow label="Application" value={applicationLabel || undefined} />
                  <ReviewRow label="Detail" value={applicationDetail || undefined} />
                </div>

                {/* Electrical */}
                <div>
                  <p className="text-[10px] font-bold text-[#059669] uppercase tracking-wider mb-2">Electrical</p>
                  <ReviewRow label="Voltage" value={elec.voltage ? `${elec.voltage} ${elec.voltageUnit}` : undefined} />
                  <ReviewRow label="Capacity" value={elec.capacity ? `${elec.capacity} ${elec.capacityUnit}` : undefined} />
                  <ReviewRow label="Energy" value={elec.energy ? `${elec.energy} ${elec.energyUnit}` : undefined} />
                  <ReviewRow label="Continuous Current" value={elec.continuousCurrent ? `${elec.continuousCurrent} A` : undefined} />
                  <ReviewRow label="Peak Current" value={elec.peakCurrent ? `${elec.peakCurrent} A` : undefined} />
                  <ReviewRow label="Runtime" value={elec.runtime ? `${elec.runtime} ${elec.runtimeUnit}` : undefined} />
                  <ReviewRow label="Chemistry Pref." value={elec.chemistryPreference || undefined} />
                </div>

                {/* Mechanical */}
                <div>
                  <p className="text-[10px] font-bold text-[#059669] uppercase tracking-wider mb-2">Mechanical</p>
                  <ReviewRow
                    label="Dimensions (L×W×H)"
                    value={
                      mech.length || mech.width || mech.height
                        ? `${mech.length || '—'} × ${mech.width || '—'} × ${mech.height || '—'} mm`
                        : undefined
                    }
                  />
                  <ReviewRow label="Max Weight" value={mech.maxWeight ? `${mech.maxWeight} kg` : undefined} />
                  <ReviewRow label="Mounting" value={mech.mountingReqs || undefined} />
                  <ReviewRow label="Connector" value={mech.connector || undefined} />
                  <ReviewRow label="Harness" value={mech.harness || undefined} />
                </div>

                {/* BMS */}
                <div>
                  <p className="text-[10px] font-bold text-[#059669] uppercase tracking-wider mb-2">BMS / Communication</p>
                  <ReviewRow label="BMS Required" value={bms.bmsRequired || undefined} />
                  <ReviewRow label="Protocols" value={bms.protocols.length > 0 ? bms.protocols.join(', ') : undefined} />
                  <ReviewRow label="Other" value={bms.otherProtocol || undefined} />
                </div>

                {/* Environment */}
                <div>
                  <p className="text-[10px] font-bold text-[#059669] uppercase tracking-wider mb-2">Environment</p>
                  <ReviewRow
                    label="Operating Temp"
                    value={
                      env.operatingTempMin || env.operatingTempMax
                        ? `${env.operatingTempMin || '—'}°C to ${env.operatingTempMax || '—'}°C`
                        : undefined
                    }
                  />
                  <ReviewRow
                    label="Storage Temp"
                    value={
                      env.storageTempMin || env.storageTempMax
                        ? `${env.storageTempMin || '—'}°C to ${env.storageTempMax || '—'}°C`
                        : undefined
                    }
                  />
                  <ReviewRow label="IP Rating" value={env.ipRating || undefined} />
                  <ReviewRow label="Vibration/Shock" value={env.vibrationShock || undefined} />
                  <ReviewRow label="Other Env." value={env.otherEnv || undefined} />
                </div>

                {/* Commercial */}
                <div>
                  <p className="text-[10px] font-bold text-[#059669] uppercase tracking-wider mb-2">Commercial</p>
                  <ReviewRow label="Prototype Qty" value={comm.protoQty || undefined} />
                  <ReviewRow label="Production Qty" value={comm.productionQty || undefined} />
                  <ReviewRow label="Annual Volume" value={comm.annualQty || undefined} />
                  <ReviewRow label="Target Date" value={comm.targetDate || undefined} />
                  <ReviewRow label="Project Stage" value={comm.projectStage || undefined} />
                </div>

                {/* Company */}
                <div>
                  <p className="text-[10px] font-bold text-[#059669] uppercase tracking-wider mb-2">Company & Contact</p>
                  <ReviewRow label="Company" value={company.companyName} />
                  <ReviewRow label="Contact" value={company.contactPerson} />
                  <ReviewRow label="Email" value={company.email} />
                  <ReviewRow label="Phone" value={company.phone} />
                  <ReviewRow label="City / State" value={`${company.city}, ${company.state}`} />
                  <ReviewRow label="Country" value={company.country} />
                  {company.gstin && <ReviewRow label="GSTIN" value={company.gstin} />}
                  {company.website && <ReviewRow label="Website" value={company.website} />}
                </div>

                {/* Attachments */}
                {attachments.length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold text-[#059669] uppercase tracking-wider mb-2">Attachments</p>
                    <ul className="space-y-1">
                      {attachments.map((a) => (
                        <li key={a.id} className="text-xs text-[#334155] flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                          {a.file.name} <span className="text-[#94A3B8]">({(a.file.size / 1024).toFixed(0)} KB)</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Engineering caveat */}
            <div className="flex items-start gap-3 p-4 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl">
              <AlertTriangle className="w-5 h-5 text-[#D97706] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-[#92400E]">Engineering Evaluation Required</p>
                <p className="text-xs text-[#78350F] mt-1 leading-relaxed">
                  Final battery configuration, component selection, BMS parameters and mechanical design require engineering validation by Lawad Infrastructure Pvt. Ltd. The information above represents customer-stated requirements only.
                </p>
              </div>
            </div>

            {/* Submit error */}
            {submitError && (
              <div className="flex items-start gap-2 p-3.5 bg-[#FEF2F2] border border-[#FECACA] rounded-xl">
                <AlertTriangle className="w-4 h-4 text-[#DC2626] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-[#991B1B]">{submitError}</p>
              </div>
            )}
          </div>
        )}

        {/* ── Navigation buttons ─────────────────────────────────── */}
        <div className="flex items-center justify-between pt-2 pb-8">
          <button
            type="button"
            onClick={step === 1 ? () => router.back() : handleBack}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#1E2633] text-sm font-semibold text-[#A3AAB5] bg-[#161C24] hover:bg-white/[0.06] hover:text-[#E6EAF0] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            {step === 1 ? 'Back to site' : 'Back'}
          </button>

          {step < OEM_STEPS.length ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#39D353] text-[#0B0F14] text-sm font-bold hover:bg-[#2ec547] shadow-[0_0_15px_rgba(57,211,83,0.25)] transition-colors"
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#39D353] text-[#0B0F14] text-sm font-bold hover:bg-[#2ec547] shadow-[0_0_15px_rgba(57,211,83,0.25)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting…' : 'Submit OEM Enquiry'}
              {!submitting && <ChevronRight className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Edit button on review */}
        {step === 8 && !submitting && (
          <div className="text-center -mt-4 pb-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs text-[#A3AAB5] hover:text-[#39D353] underline underline-offset-2"
            >
              Edit Requirements from Step 1
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
