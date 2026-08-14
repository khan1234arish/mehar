'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { COMPANY_INFO } from '@/data/companyInfo';
import { APPLICATION_DOMAINS } from '@/data/applicationDomains';
import {
  MessageSquare,
  X,
  Minus,
  ArrowLeft,
  RotateCcw,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  Search,
  Layers,
  FileText,
  Handshake,
  Phone,
  Building2,
  MessageCircle,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────

type Flow =
  | 'welcome'
  | 'finder'
  | 'oem'
  | 'bulk_rfq'
  | 'dealer'
  | 'sales'
  | 'summary';

interface RequirementsData {
  application?: string;
  applicationLabel?: string;
  voltageKnown?: 'yes' | 'no';
  voltage?: string;
  voltageUnit?: string;
  capacityKnown?: 'yes' | 'no';
  capacity?: string;
  capacityUnit?: string;
  runtime?: string;
  runtimeUnit?: string;
  continuousCurrent?: string;
  peakCurrent?: string;
  dimensions?: string;
  ipRating?: string;
  quantity?: string;
  projectStage?: string;
}

interface OemData {
  application?: string;
  applicationLabel?: string;
  voltage?: string;
  capacity?: string;
  dimensions?: string;
  weightLimit?: string;
  currentReq?: string;
  connector?: string;
  bmsReq?: string;
  environmentalReq?: string;
  protoQty?: string;
  annualQty?: string;
}

interface BulkRfqData {
  application?: string;
  applicationLabel?: string;
  quantity?: string;
  hasSpec?: 'yes' | 'no';
  keyRequirements?: string;
  companyName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
}

interface DealerData {
  companyName?: string;
  location?: string;
  businessType?: string;
  existingMarket?: string;
  expectedVolume?: string;
  website?: string;
  contactInfo?: string;
}

// ─────────────────────────────────────────────────────────────────
// FINDER STEPS
// ─────────────────────────────────────────────────────────────────

type FinderStep =
  | 'application'
  | 'voltage_known'
  | 'voltage_value'
  | 'capacity_known'
  | 'capacity_value'
  | 'runtime'
  | 'current'
  | 'dimensions'
  | 'quantity'
  | 'project_stage'
  | 'summary';

const FINDER_STEPS: FinderStep[] = [
  'application',
  'voltage_known',
  'voltage_value',
  'capacity_known',
  'capacity_value',
  'runtime',
  'current',
  'dimensions',
  'quantity',
  'project_stage',
  'summary',
];

const SKIPPABLE_STEPS: FinderStep[] = [
  'voltage_value',
  'capacity_value',
  'runtime',
  'current',
  'dimensions',
];

// ─────────────────────────────────────────────────────────────────
// OEM STEPS
// ─────────────────────────────────────────────────────────────────

type OemStep =
  | 'application'
  | 'voltage'
  | 'capacity'
  | 'dimensions'
  | 'weight_limit'
  | 'current_req'
  | 'connector'
  | 'bms_req'
  | 'environmental_req'
  | 'proto_qty'
  | 'annual_qty'
  | 'summary';

const OEM_STEPS: OemStep[] = [
  'application',
  'voltage',
  'capacity',
  'dimensions',
  'weight_limit',
  'current_req',
  'connector',
  'bms_req',
  'environmental_req',
  'proto_qty',
  'annual_qty',
  'summary',
];

// ─────────────────────────────────────────────────────────────────
// BULK RFQ STEPS
// ─────────────────────────────────────────────────────────────────

type BulkStep =
  | 'application'
  | 'quantity'
  | 'has_spec'
  | 'key_requirements'
  | 'company_name'
  | 'contact_name'
  | 'email'
  | 'phone'
  | 'summary';

// ─────────────────────────────────────────────────────────────────
// DEALER STEPS
// ─────────────────────────────────────────────────────────────────

type DealerStep =
  | 'company_name'
  | 'location'
  | 'business_type'
  | 'existing_market'
  | 'expected_volume'
  | 'website'
  | 'contact_info'
  | 'summary';

// ─────────────────────────────────────────────────────────────────
// UTILITY
// ─────────────────────────────────────────────────────────────────

function buildRfqUrl(req: RequirementsData): string {
  const params = new URLSearchParams();
  if (req.application) params.set('category', req.application);
  if (req.voltage && req.voltageKnown === 'yes')
    params.set('voltage', `${req.voltage}${req.voltageUnit || 'V'}`);
  if (req.capacity && req.capacityKnown === 'yes')
    params.set('capacity', req.capacity);
  if (req.quantity) params.set('volume', 'COMMERCIAL_BATCH');
  const notes = [
    req.runtime ? `Runtime/Range: ${req.runtime} ${req.runtimeUnit || ''}` : '',
    req.continuousCurrent ? `Continuous current: ${req.continuousCurrent}A` : '',
    req.peakCurrent ? `Peak current: ${req.peakCurrent}A` : '',
    req.dimensions ? `Dimensions: ${req.dimensions}` : '',
    req.ipRating ? `IP Rating: ${req.ipRating}` : '',
    req.projectStage ? `Project stage: ${req.projectStage}` : '',
  ]
    .filter(Boolean)
    .join(' | ');
  if (notes) params.set('notes', notes);
  return `/rfq?${params.toString()}`;
}

function buildOemRfqUrl(oem: OemData): string {
  const params = new URLSearchParams();
  if (oem.application) params.set('category', oem.application);
  if (oem.voltage) params.set('voltage', oem.voltage);
  if (oem.capacity) params.set('capacity', oem.capacity);
  const notes = [
    oem.dimensions ? `Dimensions: ${oem.dimensions}` : '',
    oem.weightLimit ? `Weight limit: ${oem.weightLimit}` : '',
    oem.currentReq ? `Current req: ${oem.currentReq}` : '',
    oem.connector ? `Connector: ${oem.connector}` : '',
    oem.bmsReq ? `BMS/Comms: ${oem.bmsReq}` : '',
    oem.environmentalReq ? `Environmental: ${oem.environmentalReq}` : '',
    oem.protoQty ? `Prototype qty: ${oem.protoQty}` : '',
    oem.annualQty ? `Annual qty: ${oem.annualQty}` : '',
  ]
    .filter(Boolean)
    .join(' | ');
  if (notes) params.set('notes', notes);
  return `/rfq?${params.toString()}`;
}

function buildBulkRfqUrl(bulk: BulkRfqData): string {
  const params = new URLSearchParams();
  if (bulk.application) params.set('category', bulk.application);
  if (bulk.quantity) params.set('volume', 'ANNUAL_VOLUME');
  const notes = [
    bulk.hasSpec === 'yes' ? 'Customer has existing spec/datasheet' : 'No existing spec — requires engineering scoping',
    bulk.keyRequirements ? `Key requirements: ${bulk.keyRequirements}` : '',
    bulk.companyName ? `Company: ${bulk.companyName}` : '',
    bulk.contactName ? `Contact: ${bulk.contactName}` : '',
    bulk.email ? `Email: ${bulk.email}` : '',
    bulk.phone ? `Phone: ${bulk.phone}` : '',
  ]
    .filter(Boolean)
    .join(' | ');
  if (notes) params.set('notes', notes);
  return `/rfq?${params.toString()}`;
}

// ─────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────

function QuickReplies({
  options,
  onSelect,
}: {
  options: { label: string; value?: string }[];
  onSelect: (label: string, value?: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {options.map((opt) => (
        <button
          key={opt.value ?? opt.label}
          onClick={() => onSelect(opt.label, opt.value)}
          className="px-3 py-1.5 rounded-lg bg-white border border-[#CBD5E1] text-[11px] font-semibold text-[#0F172A] hover:border-[#059669] hover:bg-[#ECFDF5] hover:text-[#065F46] transition-all duration-150 text-left leading-snug"
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function TextInput({
  placeholder,
  onSubmit,
  onSkip,
  buttonLabel = 'Continue',
  type = 'text',
  unit,
  unitOptions,
  onUnitChange,
  skippable = false,
}: {
  placeholder: string;
  onSubmit: (value: string) => void;
  onSkip?: () => void;
  buttonLabel?: string;
  type?: string;
  unit?: string;
  unitOptions?: string[];
  onUnitChange?: (u: string) => void;
  skippable?: boolean;
}) {
  const [val, setVal] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (val.trim()) onSubmit(val.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-1.5">
      <div className="flex gap-1.5">
        <input
          ref={inputRef}
          type={type}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder={placeholder}
          className="flex-1 min-w-0 px-3 py-2 text-xs rounded-lg bg-white border border-[#CBD5E1] text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]/30"
        />
        {unitOptions && unit && onUnitChange && (
          <select
            value={unit}
            onChange={(e) => onUnitChange(e.target.value)}
            className="px-2 py-2 text-xs rounded-lg bg-white border border-[#CBD5E1] text-[#0F172A] focus:outline-none focus:border-[#059669]"
          >
            {unitOptions.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        )}
        <button
          type="submit"
          disabled={!val.trim()}
          className="px-3 py-2 rounded-lg bg-[#059669] text-white text-xs font-semibold hover:bg-[#047857] transition-colors disabled:opacity-40 whitespace-nowrap"
        >
          {buttonLabel}
        </button>
      </div>
      {skippable && onSkip && (
        <button
          type="button"
          onClick={onSkip}
          className="text-[10px] text-[#64748B] hover:text-[#059669] transition-colors"
        >
          Skip this →
        </button>
      )}
    </form>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-3 py-1.5 border-b border-[#F1F5F9] last:border-0">
      <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider whitespace-nowrap">
        {label}
      </span>
      <span className="text-[11px] text-[#0F172A] text-right font-medium">{value}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────

export default function MeharAssistant() {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [flow, setFlow] = useState<Flow>('welcome');
  const [historyStack, setHistoryStack] = useState<Flow[]>([]);

  // Finder state
  const [finderStep, setFinderStep] = useState<FinderStep>('application');
  const [finderStepHistory, setFinderStepHistory] = useState<FinderStep[]>([]);
  const [requirements, setRequirements] = useState<RequirementsData>({});

  // OEM state
  const [oemStep, setOemStep] = useState<OemStep>('application');
  const [oemStepHistory, setOemStepHistory] = useState<OemStep[]>([]);
  const [oemData, setOemData] = useState<OemData>({});
  const [oemUnit, setOemUnit] = useState('V');

  // Bulk RFQ state
  const [bulkStep, setBulkStep] = useState<BulkStep>('application');
  const [bulkStepHistory, setBulkStepHistory] = useState<BulkStep[]>([]);
  const [bulkData, setBulkData] = useState<BulkRfqData>({});

  // Dealer state
  const [dealerStep, setDealerStep] = useState<DealerStep>('company_name');
  const [dealerStepHistory, setDealerStepHistory] = useState<DealerStep[]>([]);
  const [dealerData, setDealerData] = useState<DealerData>({});

  // Finder unit state
  const [voltageUnit, setVoltageUnit] = useState('V');
  const [capacityUnit, setCapacityUnit] = useState('Ah');
  const [runtimeUnit, setRuntimeUnit] = useState('hours');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [flow, finderStep, oemStep, bulkStep, dealerStep]);

  // ─── Context-aware suggestions ───────────────────────────────
  const contextPrompt = (() => {
    if (pathname === '/finder')
      return {
        text: 'Need help choosing what to enter?',
        cta: 'Start guided assessment',
        action: () => { setFlow('finder'); setFinderStep('application'); },
      };
    if (pathname === '/rfq')
      return {
        text: 'Need help preparing your RFQ?',
        cta: 'Guide me through it',
        action: () => { setFlow('bulk_rfq'); setBulkStep('application'); },
      };
    if (pathname?.startsWith('/products'))
      return {
        text: 'Looking for a battery solution?',
        cta: 'Find a solution',
        action: () => { setFlow('finder'); setFinderStep('application'); },
      };
    if (pathname === '/compare')
      return {
        text: 'Not sure which category fits?',
        cta: 'Start requirement assessment',
        action: () => { setFlow('finder'); setFinderStep('application'); },
      };
    return null;
  })();

  // ─── Navigation helpers ───────────────────────────────────────
  const goToFlow = useCallback((f: Flow) => {
    setHistoryStack((h) => [...h, flow]);
    setFlow(f);
  }, [flow]);

  const goBack = useCallback(() => {
    if (flow === 'finder' && finderStepHistory.length > 0) {
      const prev = [...finderStepHistory];
      const last = prev.pop()!;
      setFinderStepHistory(prev);
      setFinderStep(last);
      return;
    }
    if (flow === 'oem' && oemStepHistory.length > 0) {
      const prev = [...oemStepHistory];
      const last = prev.pop()!;
      setOemStepHistory(prev);
      setOemStep(last);
      return;
    }
    if (flow === 'bulk_rfq' && bulkStepHistory.length > 0) {
      const prev = [...bulkStepHistory];
      const last = prev.pop()!;
      setBulkStepHistory(prev);
      setBulkStep(last);
      return;
    }
    if (flow === 'dealer' && dealerStepHistory.length > 0) {
      const prev = [...dealerStepHistory];
      const last = prev.pop()!;
      setDealerStepHistory(prev);
      setDealerStep(last);
      return;
    }
    if (historyStack.length > 0) {
      const prev = [...historyStack];
      const last = prev.pop()!;
      setHistoryStack(prev);
      setFlow(last);
    }
  }, [flow, finderStepHistory, oemStepHistory, bulkStepHistory, dealerStepHistory, historyStack]);

  const startOver = useCallback(() => {
    setFlow('welcome');
    setHistoryStack([]);
    setFinderStep('application');
    setFinderStepHistory([]);
    setRequirements({});
    setOemStep('application');
    setOemStepHistory([]);
    setOemData({});
    setOemUnit('V');
    setBulkStep('application');
    setBulkStepHistory([]);
    setBulkData({});
    setDealerStep('company_name');
    setDealerStepHistory([]);
    setDealerData({});
    setVoltageUnit('V');
    setCapacityUnit('Ah');
    setRuntimeUnit('hours');
  }, []);

  const canGoBack =
    flow !== 'welcome' ||
    finderStepHistory.length > 0 ||
    oemStepHistory.length > 0 ||
    bulkStepHistory.length > 0 ||
    dealerStepHistory.length > 0;

  // ─── Finder flow helpers ──────────────────────────────────────
  const advanceFinder = (next: FinderStep) => {
    setFinderStepHistory((h) => [...h, finderStep]);
    setFinderStep(next);
  };

  const advanceOem = (next: OemStep) => {
    setOemStepHistory((h) => [...h, oemStep]);
    setOemStep(next);
  };

  const advanceBulk = (next: BulkStep) => {
    setBulkStepHistory((h) => [...h, bulkStep]);
    setBulkStep(next);
  };

  const advanceDealer = (next: DealerStep) => {
    setDealerStepHistory((h) => [...h, dealerStep]);
    setDealerStep(next);
  };

  // ─── Progress calculation ─────────────────────────────────────
  const finderProgress = (() => {
    const idx = FINDER_STEPS.indexOf(finderStep);
    return Math.round((idx / (FINDER_STEPS.length - 1)) * 100);
  })();

  const oemProgress = (() => {
    const idx = OEM_STEPS.indexOf(oemStep);
    return Math.round((idx / (OEM_STEPS.length - 1)) * 100);
  })();

  // ─── WhatsApp URL ─────────────────────────────────────────────
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappDesk.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello, I am enquiring about MEHAR battery solutions (Lawad Infrastructure Pvt. Ltd.).')}`;

  // ─────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────

  const applicationOptions = APPLICATION_DOMAINS.map((d) => ({
    label: d.name,
    value: d.id,
  })).concat([{ label: 'Other / Not listed', value: 'other' }]);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">

      {/* ── Floating Trigger Button ── */}
      {!isOpen && (
        <button
          id="mehar-assistant-trigger"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-theme-green text-white dark:text-[#0B0F14] font-bold shadow-lg hover:bg-theme-green-hover hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-theme-green/30"
          aria-label="Open MEHAR Battery Assistant"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white border border-theme-border animate-pulse" />
          </div>
          <span className="text-xs font-bold tracking-wide">MEHAR Assistant</span>
        </button>
      )}

      {/* ── Chat Window ── */}
      {isOpen && (
        <div
          ref={containerRef}
          className={`
            w-[calc(100vw-2rem)] sm:w-[420px]
            ${isMinimized ? 'h-auto' : 'h-[580px] max-h-[85vh]'}
            bg-theme-card border border-theme-border text-theme-primary rounded-2xl shadow-2xl flex flex-col overflow-hidden
            transition-all duration-200
          `}
          role="dialog"
          aria-label="MEHAR Battery Assistant"
        >

          {/* ── Header ── */}
          <div className="flex-shrink-0 px-4 py-3 bg-theme-surface border-b border-theme-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-theme-green/10 border border-theme-green/25 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-theme-green" />
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-bold text-theme-primary leading-tight">MEHAR Battery Assistant</p>
                  <p className="text-[10px] text-theme-secondary leading-tight">B2B Solutions &amp; Engineering Enquiry</p>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {flow !== 'welcome' && (
                  <button
                    onClick={startOver}
                    title="Start Over"
                    className="p-1.5 rounded-lg text-theme-secondary hover:text-theme-primary hover:bg-theme-elevated transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setIsMinimized((v) => !v)}
                  title={isMinimized ? 'Expand' : 'Minimise'}
                  className="p-1.5 rounded-lg text-theme-secondary hover:text-theme-primary hover:bg-theme-elevated transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-theme-secondary hover:text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Back button row + progress */}
            {!isMinimized && (flow !== 'welcome') && (
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={goBack}
                  className="flex items-center gap-1 text-[10px] text-theme-muted hover:text-theme-green transition-colors"
                >
                  <ArrowLeft className="w-3 h-3" /> Back
                </button>
                {(flow === 'finder') && (
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 h-1 rounded-full bg-theme-card-subtle overflow-hidden">
                      <div
                        className="h-full rounded-full bg-theme-green transition-all duration-300"
                        style={{ width: `${finderProgress}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-theme-muted whitespace-nowrap">{finderProgress}%</span>
                  </div>
                )}
                {(flow === 'oem') && (
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 h-1 rounded-full bg-theme-card-subtle overflow-hidden">
                      <div
                        className="h-full rounded-full bg-theme-green transition-all duration-300"
                        style={{ width: `${oemProgress}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-theme-muted whitespace-nowrap">{oemProgress}%</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Body ── */}
          {!isMinimized && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">

              {/* ════════════════════════════════════════════════
                  WELCOME SCREEN
              ════════════════════════════════════════════════ */}
              {flow === 'welcome' && (
                <div className="space-y-4">

                  {/* Context-aware banner */}
                  {contextPrompt && (
                    <div className="bg-theme-green/10 border border-theme-green/25 rounded-xl p-3">
                      <p className="text-[11px] text-theme-green font-medium mb-1.5">{contextPrompt.text}</p>
                      <button
                        onClick={contextPrompt.action}
                        className="flex items-center gap-1 text-[11px] font-bold text-theme-green hover:text-theme-green-hover"
                      >
                        {contextPrompt.cta} <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* Welcome message */}
                  <div className="bg-theme-elevated border border-theme-border rounded-xl p-3.5">
                    <p className="text-[11px] font-bold text-theme-primary mb-1">Welcome to MEHAR.</p>
                    <p className="text-[11px] text-theme-secondary leading-relaxed">
                      I can help you scope a battery requirement, prepare an RFQ, or connect you with the appropriate business or engineering team.
                    </p>
                  </div>

                  {/* Main action cards */}
                  <div className="space-y-2">
                    <ActionCard
                      icon={<Search className="w-4 h-4 text-theme-green" />}
                      title="Find a Battery Solution"
                      subtitle="Tell us about your application and requirements."
                      onClick={() => { setFlow('finder'); setFinderStep('application'); }}
                    />
                    <ActionCard
                      icon={<Layers className="w-4 h-4 text-theme-green" />}
                      title="Design a Custom OEM Battery"
                      subtitle="For custom form factor, electrical, BMS and mechanical requirements."
                      onClick={() => { setFlow('oem'); setOemStep('application'); }}
                    />
                    <ActionCard
                      icon={<FileText className="w-4 h-4 text-theme-green" />}
                      title="Prepare a Bulk RFQ"
                      subtitle="Submit your requirements and company details."
                      onClick={() => { setFlow('bulk_rfq'); setBulkStep('application'); }}
                    />
                    <ActionCard
                      icon={<Handshake className="w-4 h-4 text-theme-green" />}
                      title="Dealer / Distribution Enquiry"
                      subtitle="For channel and distribution enquiries."
                      onClick={() => { setFlow('dealer'); setDealerStep('company_name'); }}
                    />
                    <ActionCard
                      icon={<Phone className="w-4 h-4 text-theme-green" />}
                      title="Talk to Sales"
                      subtitle="Contact the MEHAR business team."
                      onClick={() => setFlow('sales')}
                    />
                  </div>

                  {/* Secondary option */}
                  <button
                    onClick={() => { setFlow('finder'); setFinderStep('application'); }}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 border border-dashed border-theme-border rounded-xl text-[11px] font-semibold text-theme-green hover:border-theme-green hover:bg-theme-green/10 transition-colors"
                  >
                    Start with my requirements <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* ════════════════════════════════════════════════
                  FINDER FLOW
              ════════════════════════════════════════════════ */}
              {flow === 'finder' && (
                <div className="space-y-3" key={finderStep}>
                  {finderStep === 'application' && (
                    <>
                      <BotMessage text="What will the battery be used for?" />
                      <QuickReplies
                        options={applicationOptions}
                        onSelect={(label, value) => {
                          const dom = APPLICATION_DOMAINS.find((d) => d.id === value);
                          setRequirements((r) => ({
                            ...r,
                            application: value,
                            applicationLabel: label,
                          }));
                          advanceFinder('voltage_known');
                        }}
                      />
                    </>
                  )}

                  {finderStep === 'voltage_known' && (
                    <>
                      <BotMessage text="Do you already know the required voltage?" />
                      <QuickReplies
                        options={[
                          { label: 'Yes, I know the voltage', value: 'yes' },
                          { label: 'No / Not sure', value: 'no' },
                        ]}
                        onSelect={(_, value) => {
                          setRequirements((r) => ({ ...r, voltageKnown: value as 'yes' | 'no' }));
                          if (value === 'yes') advanceFinder('voltage_value');
                          else advanceFinder('capacity_known');
                        }}
                      />
                    </>
                  )}

                  {finderStep === 'voltage_value' && (
                    <>
                      <BotMessage text="What is the required voltage?" />
                      <TextInput
                        placeholder="e.g. 48"
                        type="number"
                        unit={voltageUnit}
                        unitOptions={['V', 'kV']}
                        onUnitChange={setVoltageUnit}
                        onSubmit={(v) => {
                          setRequirements((r) => ({ ...r, voltage: v, voltageUnit }));
                          advanceFinder('capacity_known');
                        }}
                        onSkip={() => advanceFinder('capacity_known')}
                        skippable
                      />
                    </>
                  )}

                  {finderStep === 'capacity_known' && (
                    <>
                      <BotMessage text="Do you know the required capacity (Ah)?" />
                      <QuickReplies
                        options={[
                          { label: 'Yes, I know the capacity', value: 'yes' },
                          { label: 'No / Not sure', value: 'no' },
                        ]}
                        onSelect={(_, value) => {
                          setRequirements((r) => ({ ...r, capacityKnown: value as 'yes' | 'no' }));
                          if (value === 'yes') advanceFinder('capacity_value');
                          else advanceFinder('runtime');
                        }}
                      />
                    </>
                  )}

                  {finderStep === 'capacity_value' && (
                    <>
                      <BotMessage text="What is the required capacity?" />
                      <TextInput
                        placeholder="e.g. 100"
                        type="number"
                        unit={capacityUnit}
                        unitOptions={['Ah', 'kWh', 'Wh']}
                        onUnitChange={setCapacityUnit}
                        onSubmit={(v) => {
                          setRequirements((r) => ({ ...r, capacity: v, capacityUnit }));
                          advanceFinder('runtime');
                        }}
                        onSkip={() => advanceFinder('runtime')}
                        skippable
                      />
                    </>
                  )}

                  {finderStep === 'runtime' && (
                    <>
                      <BotMessage text="What is the required runtime or range?" />
                      <TextInput
                        placeholder="e.g. 8"
                        type="number"
                        unit={runtimeUnit}
                        unitOptions={['hours', 'km', 'cycles/day']}
                        onUnitChange={setRuntimeUnit}
                        onSubmit={(v) => {
                          setRequirements((r) => ({ ...r, runtime: v, runtimeUnit }));
                          advanceFinder('current');
                        }}
                        onSkip={() => advanceFinder('current')}
                        skippable
                      />
                    </>
                  )}

                  {finderStep === 'current' && (
                    <>
                      <BotMessage text="What is the continuous discharge current? (Optional)" />
                      <TextInput
                        placeholder="Continuous current in Amps"
                        type="number"
                        onSubmit={(v) => {
                          setRequirements((r) => ({ ...r, continuousCurrent: v }));
                          advanceFinder('dimensions');
                        }}
                        onSkip={() => advanceFinder('dimensions')}
                        skippable
                      />
                    </>
                  )}

                  {finderStep === 'dimensions' && (
                    <>
                      <BotMessage text="Are there space or dimensional constraints? (Optional)" />
                      <TextInput
                        placeholder="e.g. 300×200×150 mm"
                        onSubmit={(v) => {
                          setRequirements((r) => ({ ...r, dimensions: v }));
                          advanceFinder('quantity');
                        }}
                        onSkip={() => advanceFinder('quantity')}
                        skippable
                      />
                    </>
                  )}

                  {finderStep === 'quantity' && (
                    <>
                      <BotMessage text="What quantity do you require?" />
                      <QuickReplies
                        options={[
                          { label: 'Evaluation / Sample (1–10 units)', value: '1–10 units' },
                          { label: 'Small batch (10–50 units)', value: '10–50 units' },
                          { label: 'Commercial batch (50–200 units)', value: '50–200 units' },
                          { label: 'Annual volume (500+ units)', value: '500+ units' },
                          { label: 'Not yet decided', value: 'Not yet decided' },
                        ]}
                        onSelect={(_, value) => {
                          setRequirements((r) => ({ ...r, quantity: value }));
                          advanceFinder('project_stage');
                        }}
                      />
                    </>
                  )}

                  {finderStep === 'project_stage' && (
                    <>
                      <BotMessage text="What stage is your project at?" />
                      <QuickReplies
                        options={[
                          { label: 'Concept / Research', value: 'Concept / Research' },
                          { label: 'Prototype', value: 'Prototype' },
                          { label: 'Pre-production', value: 'Pre-production' },
                          { label: 'Volume production', value: 'Volume production' },
                          { label: 'Retrofit / Upgrade', value: 'Retrofit / Upgrade' },
                        ]}
                        onSelect={(_, value) => {
                          setRequirements((r) => ({ ...r, projectStage: value }));
                          advanceFinder('summary');
                        }}
                      />
                    </>
                  )}

                  {finderStep === 'summary' && (
                    <FinderSummary
                      requirements={requirements}
                      onStartRfq={() => {
                        const url = buildRfqUrl(requirements);
                        setIsOpen(false);
                        router.push(url);
                      }}
                      onReview={() => {
                        setFinderStep('application');
                        setFinderStepHistory([]);
                      }}
                      onTalkEngineering={() => {
                        setIsOpen(false);
                        router.push('/contact?type=engineering');
                      }}
                    />
                  )}
                </div>
              )}

              {/* ════════════════════════════════════════════════
                  OEM FLOW
              ════════════════════════════════════════════════ */}
              {flow === 'oem' && (
                <div className="space-y-3" key={oemStep}>
                  {oemStep === 'application' && (
                    <>
                      <div className="bg-[#F0FDF4] border border-[#A7F3D0] rounded-xl p-3 mb-2">
                        <p className="text-[11px] text-[#065F46] leading-relaxed">
                          Custom battery projects can involve electrical, mechanical, BMS, environmental and application requirements. Final configuration requires engineering validation.
                        </p>
                      </div>
                      <BotMessage text="What is the application for this custom battery?" />
                      <QuickReplies
                        options={applicationOptions}
                        onSelect={(label, value) => {
                          setOemData((d) => ({ ...d, application: value, applicationLabel: label }));
                          advanceOem('voltage');
                        }}
                      />
                    </>
                  )}

                  {oemStep === 'voltage' && (
                    <>
                      <BotMessage text="What voltage is required? (Enter if known)" />
                      <TextInput
                        placeholder="e.g. 48"
                        type="number"
                        unit={oemUnit}
                        unitOptions={['V', 'kV']}
                        onUnitChange={setOemUnit}
                        onSubmit={(v) => {
                          setOemData((d) => ({ ...d, voltage: `${v}${oemUnit}` }));
                          advanceOem('capacity');
                        }}
                        onSkip={() => advanceOem('capacity')}
                        skippable
                      />
                    </>
                  )}

                  {oemStep === 'capacity' && (
                    <>
                      <BotMessage text="What capacity is required? (Ah or Wh if known)" />
                      <TextInput
                        placeholder="e.g. 50Ah or 2.4kWh"
                        onSubmit={(v) => {
                          setOemData((d) => ({ ...d, capacity: v }));
                          advanceOem('dimensions');
                        }}
                        onSkip={() => advanceOem('dimensions')}
                        skippable
                      />
                    </>
                  )}

                  {oemStep === 'dimensions' && (
                    <>
                      <BotMessage text="What are the maximum external dimensions? (L × W × H)" />
                      <TextInput
                        placeholder="e.g. 400×200×120 mm"
                        onSubmit={(v) => {
                          setOemData((d) => ({ ...d, dimensions: v }));
                          advanceOem('weight_limit');
                        }}
                        onSkip={() => advanceOem('weight_limit')}
                        skippable
                      />
                    </>
                  )}

                  {oemStep === 'weight_limit' && (
                    <>
                      <BotMessage text="Is there a weight limit for the battery pack?" />
                      <TextInput
                        placeholder="e.g. 12 kg"
                        onSubmit={(v) => {
                          setOemData((d) => ({ ...d, weightLimit: v }));
                          advanceOem('current_req');
                        }}
                        onSkip={() => advanceOem('current_req')}
                        skippable
                      />
                    </>
                  )}

                  {oemStep === 'current_req' && (
                    <>
                      <BotMessage text="What is the continuous / peak discharge current?" />
                      <TextInput
                        placeholder="e.g. 50A continuous / 100A peak"
                        onSubmit={(v) => {
                          setOemData((d) => ({ ...d, currentReq: v }));
                          advanceOem('connector');
                        }}
                        onSkip={() => advanceOem('connector')}
                        skippable
                      />
                    </>
                  )}

                  {oemStep === 'connector' && (
                    <>
                      <BotMessage text="Any specific connector or interface requirement?" />
                      <QuickReplies
                        options={[
                          { label: 'Standard Anderson SB', value: 'Anderson SB' },
                          { label: 'XT60 / XT90', value: 'XT60/XT90' },
                          { label: 'Custom / proprietary', value: 'Custom / proprietary' },
                          { label: 'Not yet decided', value: 'Not yet decided' },
                        ]}
                        onSelect={(_, value) => {
                          setOemData((d) => ({ ...d, connector: value }));
                          advanceOem('bms_req');
                        }}
                      />
                    </>
                  )}

                  {oemStep === 'bms_req' && (
                    <>
                      <BotMessage text="Any BMS or communication protocol requirements?" />
                      <TextInput
                        placeholder="e.g. CAN, RS485, UART, None"
                        onSubmit={(v) => {
                          setOemData((d) => ({ ...d, bmsReq: v }));
                          advanceOem('environmental_req');
                        }}
                        onSkip={() => advanceOem('environmental_req')}
                        skippable
                      />
                    </>
                  )}

                  {oemStep === 'environmental_req' && (
                    <>
                      <BotMessage text="What are the environmental requirements?" />
                      <TextInput
                        placeholder="e.g. IP65, -20°C to 60°C, vibration spec"
                        onSubmit={(v) => {
                          setOemData((d) => ({ ...d, environmentalReq: v }));
                          advanceOem('proto_qty');
                        }}
                        onSkip={() => advanceOem('proto_qty')}
                        skippable
                      />
                    </>
                  )}

                  {oemStep === 'proto_qty' && (
                    <>
                      <BotMessage text="How many prototype / sample units do you need initially?" />
                      <QuickReplies
                        options={[
                          { label: '1–3 units', value: '1–3' },
                          { label: '4–10 units', value: '4–10' },
                          { label: '10+ units', value: '10+' },
                          { label: 'Not yet decided', value: 'Not yet decided' },
                        ]}
                        onSelect={(_, value) => {
                          setOemData((d) => ({ ...d, protoQty: value }));
                          advanceOem('annual_qty');
                        }}
                      />
                    </>
                  )}

                  {oemStep === 'annual_qty' && (
                    <>
                      <BotMessage text="What is the estimated annual production volume?" />
                      <QuickReplies
                        options={[
                          { label: 'Under 500 units / year', value: '<500' },
                          { label: '500–2,000 units / year', value: '500–2000' },
                          { label: '2,000–10,000 units / year', value: '2000–10000' },
                          { label: '10,000+ units / year', value: '10000+' },
                          { label: 'Not yet estimated', value: 'Not yet estimated' },
                        ]}
                        onSelect={(_, value) => {
                          setOemData((d) => ({ ...d, annualQty: value }));
                          advanceOem('summary');
                        }}
                      />
                    </>
                  )}

                  {oemStep === 'summary' && (
                    <OemSummary
                      data={oemData}
                      onContinue={() => {
                        setIsOpen(false);
                        router.push('/oem-custom-solutions');
                      }}
                    />
                  )}
                </div>
              )}

              {/* ════════════════════════════════════════════════
                  BULK RFQ FLOW
              ════════════════════════════════════════════════ */}
              {flow === 'bulk_rfq' && (
                <div className="space-y-3" key={bulkStep}>
                  {bulkStep === 'application' && (
                    <>
                      <BotMessage text="What application category does this RFQ cover?" />
                      <QuickReplies
                        options={applicationOptions}
                        onSelect={(label, value) => {
                          setBulkData((d) => ({ ...d, application: value, applicationLabel: label }));
                          advanceBulk('quantity');
                        }}
                      />
                    </>
                  )}

                  {bulkStep === 'quantity' && (
                    <>
                      <BotMessage text="What quantity are you looking to procure?" />
                      <TextInput
                        placeholder="e.g. 500 units"
                        onSubmit={(v) => {
                          setBulkData((d) => ({ ...d, quantity: v }));
                          advanceBulk('has_spec');
                        }}
                      />
                    </>
                  )}

                  {bulkStep === 'has_spec' && (
                    <>
                      <BotMessage text="Do you have an existing battery specification or datasheet?" />
                      <QuickReplies
                        options={[
                          { label: 'Yes — I have a specification', value: 'yes' },
                          { label: 'No — I need engineering input', value: 'no' },
                        ]}
                        onSelect={(_, value) => {
                          setBulkData((d) => ({ ...d, hasSpec: value as 'yes' | 'no' }));
                          advanceBulk('key_requirements');
                        }}
                      />
                    </>
                  )}

                  {bulkStep === 'key_requirements' && (
                    <>
                      <BotMessage text="Summarise the key requirements or constraints." />
                      <TextInput
                        placeholder="e.g. 48V 100Ah, IP65, delivery in 45 days"
                        onSubmit={(v) => {
                          setBulkData((d) => ({ ...d, keyRequirements: v }));
                          advanceBulk('company_name');
                        }}
                        onSkip={() => advanceBulk('company_name')}
                        skippable
                      />
                    </>
                  )}

                  {bulkStep === 'company_name' && (
                    <>
                      <BotMessage text="What is your company name?" />
                      <TextInput
                        placeholder="Company / Organisation name"
                        onSubmit={(v) => {
                          setBulkData((d) => ({ ...d, companyName: v }));
                          advanceBulk('contact_name');
                        }}
                      />
                    </>
                  )}

                  {bulkStep === 'contact_name' && (
                    <>
                      <BotMessage text="Your name / contact person?" />
                      <TextInput
                        placeholder="Full name"
                        onSubmit={(v) => {
                          setBulkData((d) => ({ ...d, contactName: v }));
                          advanceBulk('email');
                        }}
                      />
                    </>
                  )}

                  {bulkStep === 'email' && (
                    <>
                      <BotMessage text="Business email address?" />
                      <TextInput
                        placeholder="name@company.com"
                        type="email"
                        onSubmit={(v) => {
                          setBulkData((d) => ({ ...d, email: v }));
                          advanceBulk('phone');
                        }}
                      />
                    </>
                  )}

                  {bulkStep === 'phone' && (
                    <>
                      <BotMessage text="Contact phone number?" />
                      <TextInput
                        placeholder="+91 XXXXX XXXXX"
                        type="tel"
                        onSubmit={(v) => {
                          setBulkData((d) => ({ ...d, phone: v }));
                          advanceBulk('summary');
                        }}
                        onSkip={() => advanceBulk('summary')}
                        skippable
                      />
                    </>
                  )}

                  {bulkStep === 'summary' && (
                    <BulkRfqSummary
                      data={bulkData}
                      onBuildRfq={() => {
                        const url = buildBulkRfqUrl(bulkData);
                        setIsOpen(false);
                        router.push(url);
                      }}
                    />
                  )}
                </div>
              )}

              {/* ════════════════════════════════════════════════
                  DEALER FLOW
              ════════════════════════════════════════════════ */}
              {flow === 'dealer' && (
                <div className="space-y-3" key={dealerStep}>
                  {dealerStep === 'company_name' && (
                    <>
                      <BotMessage text="To process your dealership / distribution enquiry, let's start with your company name." />
                      <TextInput
                        placeholder="Company / Organisation name"
                        onSubmit={(v) => {
                          setDealerData((d) => ({ ...d, companyName: v }));
                          advanceDealer('location');
                        }}
                      />
                    </>
                  )}

                  {dealerStep === 'location' && (
                    <>
                      <BotMessage text="What is your business location? (City, State)" />
                      <TextInput
                        placeholder="e.g. Pune, Maharashtra"
                        onSubmit={(v) => {
                          setDealerData((d) => ({ ...d, location: v }));
                          advanceDealer('business_type');
                        }}
                      />
                    </>
                  )}

                  {dealerStep === 'business_type' && (
                    <>
                      <BotMessage text="What type of business do you operate?" />
                      <QuickReplies
                        options={[
                          { label: 'Distributor', value: 'Distributor' },
                          { label: 'Dealer / Reseller', value: 'Dealer / Reseller' },
                          { label: 'System Integrator', value: 'System Integrator' },
                          { label: 'EV Service Centre', value: 'EV Service Centre' },
                          { label: 'Industrial Supplier', value: 'Industrial Supplier' },
                          { label: 'Other', value: 'Other' },
                        ]}
                        onSelect={(_, value) => {
                          setDealerData((d) => ({ ...d, businessType: value }));
                          advanceDealer('existing_market');
                        }}
                      />
                    </>
                  )}

                  {dealerStep === 'existing_market' && (
                    <>
                      <BotMessage text="Which market segments do you currently serve?" />
                      <TextInput
                        placeholder="e.g. Electric mobility, Solar, Industrial"
                        onSubmit={(v) => {
                          setDealerData((d) => ({ ...d, existingMarket: v }));
                          advanceDealer('expected_volume');
                        }}
                        onSkip={() => advanceDealer('expected_volume')}
                        skippable
                      />
                    </>
                  )}

                  {dealerStep === 'expected_volume' && (
                    <>
                      <BotMessage text="What monthly / annual battery volume do you expect to handle?" />
                      <QuickReplies
                        options={[
                          { label: 'Under 50 units / month', value: '<50/month' },
                          { label: '50–200 units / month', value: '50–200/month' },
                          { label: '200–500 units / month', value: '200–500/month' },
                          { label: '500+ units / month', value: '500+/month' },
                          { label: 'Not yet estimated', value: 'Not yet estimated' },
                        ]}
                        onSelect={(_, value) => {
                          setDealerData((d) => ({ ...d, expectedVolume: value }));
                          advanceDealer('website');
                        }}
                      />
                    </>
                  )}

                  {dealerStep === 'website' && (
                    <>
                      <BotMessage text="Company website? (Optional)" />
                      <TextInput
                        placeholder="https://www.yourcompany.com"
                        type="url"
                        onSubmit={(v) => {
                          setDealerData((d) => ({ ...d, website: v }));
                          advanceDealer('contact_info');
                        }}
                        onSkip={() => advanceDealer('contact_info')}
                        skippable
                      />
                    </>
                  )}

                  {dealerStep === 'contact_info' && (
                    <>
                      <BotMessage text="Your contact email and phone number?" />
                      <TextInput
                        placeholder="email@company.com / +91 XXXXX XXXXX"
                        onSubmit={(v) => {
                          setDealerData((d) => ({ ...d, contactInfo: v }));
                          advanceDealer('summary');
                        }}
                      />
                    </>
                  )}

                  {dealerStep === 'summary' && (
                    <DealerSummary
                      data={dealerData}
                      onSubmit={() => {
                        const notes = [
                          dealerData.companyName ? `Company: ${dealerData.companyName}` : '',
                          dealerData.location ? `Location: ${dealerData.location}` : '',
                          dealerData.businessType ? `Type: ${dealerData.businessType}` : '',
                          dealerData.existingMarket ? `Market: ${dealerData.existingMarket}` : '',
                          dealerData.expectedVolume ? `Volume: ${dealerData.expectedVolume}` : '',
                          dealerData.website ? `Website: ${dealerData.website}` : '',
                          dealerData.contactInfo ? `Contact: ${dealerData.contactInfo}` : '',
                        ]
                          .filter(Boolean)
                          .join(' | ');
                        const url = `/contact?type=dealership&notes=${encodeURIComponent(notes)}`;
                        setIsOpen(false);
                        router.push(url);
                      }}
                    />
                  )}
                </div>
              )}

              {/* ════════════════════════════════════════════════
                  SALES FLOW
              ════════════════════════════════════════════════ */}
              {flow === 'sales' && (
                <div className="space-y-3">
                  <BotMessage text="How would you like to contact MEHAR?" />

                  <div className="space-y-2 mt-1">
                    <SalesCard
                      icon={<Building2 className="w-4 h-4 text-[#059669]" />}
                      label="Business Enquiry"
                      href="/contact?type=business"
                      onClick={() => setIsOpen(false)}
                    />
                    <SalesCard
                      icon={<Layers className="w-4 h-4 text-[#059669]" />}
                      label="Technical / Engineering Enquiry"
                      href="/contact?type=engineering"
                      onClick={() => setIsOpen(false)}
                    />
                    <SalesCard
                      icon={<MessageSquare className="w-4 h-4 text-[#059669]" />}
                      label="WhatsApp"
                      href={whatsappUrl}
                      external
                      onClick={() => setIsOpen(false)}
                    />
                    <SalesCard
                      icon={<Phone className="w-4 h-4 text-[#059669]" />}
                      label="Request Callback"
                      href="/contact?type=callback"
                      onClick={() => setIsOpen(false)}
                    />
                  </div>

                  <div className="mt-2 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                    <p className="text-[10px] text-[#64748B]">Sales enquiries: <span className="font-semibold text-[#0F172A]">{COMPANY_INFO.salesEmail}</span></p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}

          {/* ── Footer ── */}
          {!isMinimized && (
            <div className="flex-shrink-0 px-4 py-2 bg-[#F8FAFC] border-t border-[#E2E8F0]">
              <p className="text-center text-[9px] text-[#94A3B8]">
                Requirements captured for engineering evaluation only.&nbsp;No product recommendation implied.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// HELPER SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────

function BotMessage({ text }: { text: string }) {
  return (
    <div className="bg-theme-surface border border-theme-border rounded-xl rounded-tl-sm p-3">
      <p className="text-[11px] text-theme-secondary leading-relaxed">{text}</p>
    </div>
  );
}

function ActionCard({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-start gap-3 p-3 rounded-xl border border-theme-border bg-theme-elevated hover:border-theme-green hover:bg-theme-card transition-all duration-150 text-left group"
    >
      <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-theme-green/10 border border-theme-green/25 flex items-center justify-center group-hover:bg-theme-green/20">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-bold text-theme-primary group-hover:text-theme-green transition-colors">{title}</p>
        <p className="text-[10px] text-theme-secondary leading-snug mt-0.5">{subtitle}</p>
      </div>
      <ChevronRight className="flex-shrink-0 w-3.5 h-3.5 text-theme-muted group-hover:text-theme-green mt-0.5 ml-auto" />
    </button>
  );
}

function SalesCard({
  icon,
  label,
  href,
  external,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  external?: boolean;
  onClick?: () => void;
}) {
  const cls =
    'w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-theme-border bg-theme-elevated hover:border-theme-green hover:bg-theme-card transition-all duration-150 text-left group';
  const content = (
    <>
      <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-theme-green/10 border border-theme-green/25 flex items-center justify-center">
        {icon}
      </div>
      <span className="flex-1 text-[11px] font-semibold text-theme-primary group-hover:text-theme-green">{label}</span>
      <ChevronRight className="w-3.5 h-3.5 text-theme-muted group-hover:text-theme-green" />
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} onClick={onClick}>
      {content}
    </Link>
  );
}

// ─── Finder Summary ───────────────────────────────────────────────

function FinderSummary({
  requirements,
  onStartRfq,
  onReview,
  onTalkEngineering,
}: {
  requirements: RequirementsData;
  onStartRfq: () => void;
  onReview: () => void;
  onTalkEngineering: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="bg-theme-surface border border-theme-border rounded-xl p-3.5 space-y-1">
        <SummaryRow label="Application" value={requirements.applicationLabel || 'Not specified'} />
        <SummaryRow
          label="Voltage"
          value={
            requirements.voltageKnown === 'yes' && requirements.voltage
              ? `${requirements.voltage} ${requirements.voltageUnit || 'V'} — Customer requirement`
              : 'Not specified'
          }
        />
        <SummaryRow
          label="Capacity"
          value={
            requirements.capacityKnown === 'yes' && requirements.capacity
              ? `${requirements.capacity} ${requirements.capacityUnit || 'Ah'} — Customer requirement`
              : 'Not specified'
          }
        />
        <SummaryRow
          label="Runtime"
          value={
            requirements.runtime
              ? `${requirements.runtime} ${requirements.runtimeUnit || ''}`
              : 'Not specified'
          }
        />
        <SummaryRow label="Quantity" value={requirements.quantity || 'Not specified'} />
        <SummaryRow label="Project Stage" value={requirements.projectStage || 'Not specified'} />
      </div>

      <div className="flex items-start gap-2 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-[10px] font-bold text-amber-600 dark:text-amber-300 uppercase tracking-wider">Engineering Assessment Required</p>
          <p className="text-[10px] text-theme-secondary mt-0.5 leading-relaxed">
            Based on the information provided, our engineering team can evaluate a suitable battery solution.
          </p>
        </div>
      </div>

      <div className="space-y-1.5">
        <button
          onClick={onStartRfq}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-theme-green text-white dark:text-[#0B0F14] text-[11px] font-bold hover:bg-theme-green-hover transition-colors shadow-sm"
        >
          <CheckCircle className="w-3.5 h-3.5" /> Start RFQ
        </button>
        <button
          onClick={onTalkEngineering}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-theme-green text-theme-green text-[11px] font-bold hover:bg-theme-green/10 transition-colors"
        >
          Talk to Engineering
        </button>
        <button
          onClick={onReview}
          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border border-theme-border text-theme-secondary text-[11px] font-semibold hover:bg-theme-card transition-colors"
        >
          Review Requirements
        </button>
      </div>
    </div>
  );
}

// ─── OEM Summary ──────────────────────────────────────────────────

function OemSummary({
  data,
  onContinue,
}: {
  data: OemData;
  onContinue: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="bg-theme-surface border border-theme-border rounded-xl p-3.5 space-y-1">
        <SummaryRow label="Application" value={data.applicationLabel || 'Not specified'} />
        <SummaryRow label="Voltage" value={data.voltage || 'Not specified'} />
        <SummaryRow label="Capacity" value={data.capacity || 'Not specified'} />
        <SummaryRow label="Dimensions" value={data.dimensions || 'Not specified'} />
        <SummaryRow label="Weight Limit" value={data.weightLimit || 'Not specified'} />
        <SummaryRow label="Current Req." value={data.currentReq || 'Not specified'} />
        <SummaryRow label="Connector" value={data.connector || 'Not specified'} />
        <SummaryRow label="BMS / Comms" value={data.bmsReq || 'Not specified'} />
        <SummaryRow label="Environmental" value={data.environmentalReq || 'Not specified'} />
        <SummaryRow label="Prototype Qty" value={data.protoQty || 'Not specified'} />
        <SummaryRow label="Annual Volume" value={data.annualQty || 'Not specified'} />
      </div>

      <div className="flex items-start gap-2 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-[10px] text-theme-secondary leading-relaxed">
          All custom OEM battery configurations require direct engineering validation by Lawad Infrastructure engineers.
        </p>
      </div>

      <button
        onClick={onContinue}
        className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-theme-green text-white dark:text-[#0B0F14] text-[11px] font-bold hover:bg-theme-green-hover transition-colors shadow-sm"
      >
        Continue to OEM Enquiry
      </button>
    </div>
  );
}

// ─── Bulk RFQ Summary ─────────────────────────────────────────────

function BulkRfqSummary({
  data,
  onBuildRfq,
}: {
  data: BulkRfqData;
  onBuildRfq: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="bg-theme-surface border border-theme-border rounded-xl p-3.5 space-y-1">
        <SummaryRow label="Application" value={data.applicationLabel || 'Not specified'} />
        <SummaryRow label="Quantity" value={data.quantity || 'Not specified'} />
        <SummaryRow label="Existing Spec" value={data.hasSpec === 'yes' ? 'Available' : 'Needs engineering scope'} />
        <SummaryRow label="Key Requirements" value={data.keyRequirements || 'Not specified'} />
        <SummaryRow label="Company" value={data.companyName || 'Not specified'} />
        <SummaryRow label="Contact" value={data.contactName || 'Not specified'} />
        <SummaryRow label="Email" value={data.email || 'Not specified'} />
        <SummaryRow label="Phone" value={data.phone || 'Not specified'} />
      </div>

      <button
        onClick={onBuildRfq}
        className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-theme-green text-white dark:text-[#0B0F14] text-[11px] font-bold hover:bg-theme-green-hover transition-colors shadow-sm"
      >
        <FileText className="w-3.5 h-3.5" /> Build RFQ
      </button>
    </div>
  );
}

// ─── Dealer Summary ───────────────────────────────────────────────

function DealerSummary({
  data,
  onSubmit,
}: {
  data: DealerData;
  onSubmit: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="bg-theme-surface border border-theme-border rounded-xl p-3.5 space-y-1">
        <SummaryRow label="Company" value={data.companyName || 'Not specified'} />
        <SummaryRow label="Location" value={data.location || 'Not specified'} />
        <SummaryRow label="Business Type" value={data.businessType || 'Not specified'} />
        <SummaryRow label="Market" value={data.existingMarket || 'Not specified'} />
        <SummaryRow label="Est. Volume" value={data.expectedVolume || 'Not specified'} />
        <SummaryRow label="Website" value={data.website || 'Not specified'} />
        <SummaryRow label="Contact" value={data.contactInfo || 'Not specified'} />
      </div>

      <p className="text-[10px] text-theme-muted leading-relaxed">
        Your dealership enquiry will be forwarded to the MEHAR commercial desk. A team member will be in touch to discuss channel partnership terms.
      </p>

      <button
        onClick={onSubmit}
        className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-theme-green text-white dark:text-[#0B0F14] text-[11px] font-bold hover:bg-theme-green-hover transition-colors shadow-sm"
      >
        <Handshake className="w-3.5 h-3.5" /> Submit Dealership Enquiry
      </button>
    </div>
  );
}
