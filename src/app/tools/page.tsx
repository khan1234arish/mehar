'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Zap,
  Timer,
  GitBranch,
  ArrowLeftRight,
  ArrowLeft,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────

function round(val: number, dp = 2): string {
  if (!isFinite(val) || isNaN(val)) return '—';
  return val.toFixed(dp);
}

// ─────────────────────────────────────────────────────────────────
// SHARED UI COMPONENTS
// ─────────────────────────────────────────────────────────────────

function CalcCard({
  id,
  icon,
  title,
  description,
  children,
  defaultOpen = false,
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section id={id} className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#F8FAFC] transition-colors"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-3 text-left">
          <div className="w-9 h-9 rounded-xl bg-[#F0FDF4] border border-[#D1FAE5] flex items-center justify-center text-[#059669] flex-shrink-0">
            {icon}
          </div>
          <div>
            <p className="text-sm font-bold text-[#0F172A]">{title}</p>
            <p className="text-xs text-[#64748B]">{description}</p>
          </div>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-[#94A3B8] flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[#94A3B8] flex-shrink-0" />
        )}
      </button>

      {open && (
        <div className="border-t border-[#E2E8F0] p-5">
          {children}
        </div>
      )}
    </section>
  );
}

function CalcInput({
  id,
  label,
  value,
  onChange,
  unit,
  unitOptions,
  onUnitChange,
  placeholder = '0',
  type = 'number',
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit?: string;
  unitOptions?: string[];
  onUnitChange?: (u: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-bold text-[#0F172A] mb-1.5">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={0}
          className="flex-1 px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-sm text-[#0F172A] bg-white focus:outline-none focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/20"
        />
        {unit && !unitOptions && (
          <span className="px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-xs font-semibold text-[#64748B]">
            {unit}
          </span>
        )}
        {unitOptions && unit && onUnitChange && (
          <select
            value={unit}
            onChange={(e) => onUnitChange(e.target.value)}
            className="px-2.5 py-2.5 rounded-lg border border-[#CBD5E1] text-xs text-[#0F172A] bg-white focus:outline-none focus:border-[#059669]"
          >
            {unitOptions.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        )}
      </div>
    </div>
  );
}

function ResultBox({ label, value, unit, note }: { label: string; value: string; unit?: string; note?: string }) {
  return (
    <div className="bg-[#F0FDF4] border border-[#A7F3D0] rounded-xl p-4">
      <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-bold text-[#059669]">
        {value}
        {unit && <span className="text-base ml-1 font-semibold text-[#34D399]">{unit}</span>}
      </p>
      {note && <p className="text-[10px] text-[#047857] mt-1">{note}</p>}
    </div>
  );
}

function EstimateDisclaimer() {
  return (
    <div className="flex items-start gap-2 p-3 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl mt-4">
      <Info className="w-3.5 h-3.5 text-[#D97706] flex-shrink-0 mt-0.5" />
      <p className="text-[10px] text-[#78350F] leading-relaxed">
        <strong>General engineering estimate only.</strong> This calculator uses standard electrical formulas and does not account for temperature, battery ageing, load profile variation, or system losses. Results are not a MEHAR product specification or performance guarantee.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// CALCULATOR 1 — ENERGY
// ─────────────────────────────────────────────────────────────────

function EnergyCalculator() {
  const [mode, setMode] = useState<'vh_to_wh' | 'wh_to_ah'>('vh_to_wh');
  const [v, setV] = useState('');
  const [ah, setAh] = useState('');
  const [wh, setWh] = useState('');

  const calcWh = () => {
    const voltage = parseFloat(v);
    const amps = parseFloat(ah);
    if (isNaN(voltage) || isNaN(amps)) return '—';
    const result = voltage * amps;
    return result >= 1000 ? `${round(result / 1000)} kWh` : `${round(result)} Wh`;
  };

  const calcAh = () => {
    const voltage = parseFloat(v);
    const energy = parseFloat(wh);
    if (isNaN(voltage) || isNaN(energy) || voltage === 0) return '—';
    return `${round(energy / voltage)} Ah`;
  };

  return (
    <div className="space-y-5">
      {/* Mode tabs */}
      <div className="flex gap-1 bg-[#F1F5F9] p-1 rounded-lg w-fit">
        <button
          onClick={() => setMode('vh_to_wh')}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
            mode === 'vh_to_wh' ? 'bg-white shadow-sm text-[#059669]' : 'text-[#64748B]'
          }`}
        >
          V × Ah → Wh
        </button>
        <button
          onClick={() => setMode('wh_to_ah')}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
            mode === 'wh_to_ah' ? 'bg-white shadow-sm text-[#059669]' : 'text-[#64748B]'
          }`}
        >
          Wh ÷ V → Ah
        </button>
      </div>

      {mode === 'vh_to_wh' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalcInput id="calc-e-v1" label="Voltage" value={v} onChange={setV} unit="V" />
          <CalcInput id="calc-e-ah" label="Capacity" value={ah} onChange={setAh} unit="Ah" />
          <div className="sm:col-span-2">
            <ResultBox label="Energy" value={calcWh()} note="Watt-hours (Wh) = Voltage × Ah" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalcInput id="calc-e-wh" label="Energy (Wh)" value={wh} onChange={setWh} unit="Wh" />
          <CalcInput id="calc-e-v2" label="Voltage" value={v} onChange={setV} unit="V" />
          <div className="sm:col-span-2">
            <ResultBox label="Capacity" value={calcAh()} note="Ah = Wh ÷ Voltage" />
          </div>
        </div>
      )}
      <EstimateDisclaimer />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// CALCULATOR 2 — RUNTIME
// ─────────────────────────────────────────────────────────────────

function RuntimeCalculator() {
  const [energyVal, setEnergyVal] = useState('');
  const [energyUnit, setEnergyUnit] = useState('Wh');
  const [loadVal, setLoadVal] = useState('');
  const [loadUnit, setLoadUnit] = useState('W');
  const [efficiency, setEfficiency] = useState('85');

  const calcRuntime = () => {
    let energy = parseFloat(energyVal);
    const load = parseFloat(loadVal);
    const eff = parseFloat(efficiency) / 100;

    if (isNaN(energy) || isNaN(load) || load === 0 || isNaN(eff) || eff <= 0) return null;

    // Normalise to Wh
    if (energyUnit === 'kWh') energy *= 1000;
    // Normalise load to W
    let loadW = load;
    if (loadUnit === 'kW') loadW = load * 1000;
    else if (loadUnit === 'A') {
      // can't convert without voltage — show note
      return { hours: null, note: 'To convert Amps to Watts, enter load in W or kW instead.' };
    }

    const hours = (energy * eff) / loadW;
    return { hours, note: null };
  };

  const result = calcRuntime();
  const displayHours = result?.hours != null
    ? result.hours >= 1
      ? `${round(result.hours)} h`
      : `${round(result.hours * 60, 1)} min`
    : '—';

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CalcInput
          id="calc-rt-energy"
          label="Battery Energy"
          value={energyVal}
          onChange={setEnergyVal}
          unit={energyUnit}
          unitOptions={['Wh', 'kWh']}
          onUnitChange={setEnergyUnit}
        />
        <CalcInput
          id="calc-rt-load"
          label="Average Load / Consumption"
          value={loadVal}
          onChange={setLoadVal}
          unit={loadUnit}
          unitOptions={['W', 'kW']}
          onUnitChange={setLoadUnit}
        />
        <CalcInput
          id="calc-rt-eff"
          label="System Efficiency (%)"
          value={efficiency}
          onChange={setEfficiency}
          unit="%"
          placeholder="85"
        />
      </div>

      {result?.note ? (
        <div className="p-3 bg-[#FEF9C3] border border-[#FDE68A] rounded-xl text-xs text-[#78350F]">{result.note}</div>
      ) : (
        <ResultBox
          label="Estimated Runtime"
          value={displayHours}
          note="Runtime = (Energy × Efficiency) ÷ Load"
        />
      )}
      <EstimateDisclaimer />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// CALCULATOR 3 — SERIES / PARALLEL
// ─────────────────────────────────────────────────────────────────

function SeriesParallelCalculator() {
  const [cellV, setCellV] = useState('');
  const [cellAh, setCellAh] = useState('');
  const [series, setSeries] = useState('');
  const [parallel, setParallel] = useState('');

  const s = parseInt(series) || 0;
  const p = parseInt(parallel) || 0;
  const cv = parseFloat(cellV) || 0;
  const ca = parseFloat(cellAh) || 0;

  const packV = cv * s;
  const packAh = ca * p;
  const packWh = packV * packAh;

  return (
    <div className="space-y-5">
      <p className="text-xs text-[#64748B]">
        Enter individual cell parameters and the series/parallel configuration to calculate pack-level totals.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CalcInput id="calc-sp-cv" label="Cell / Module Voltage" value={cellV} onChange={setCellV} unit="V" />
        <CalcInput id="calc-sp-ca" label="Cell / Module Capacity" value={cellAh} onChange={setCellAh} unit="Ah" />
        <CalcInput id="calc-sp-s" label="Cells in Series (S)" value={series} onChange={setSeries} placeholder="e.g. 14" />
        <CalcInput id="calc-sp-p" label="Cells in Parallel (P)" value={parallel} onChange={setParallel} placeholder="e.g. 4" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <ResultBox label="Pack Voltage" value={packV > 0 ? round(packV) : '—'} unit="V" note="= Cell V × S" />
        <ResultBox label="Pack Capacity" value={packAh > 0 ? round(packAh) : '—'} unit="Ah" note="= Cell Ah × P" />
        <ResultBox
          label="Pack Energy"
          value={packWh > 0 ? (packWh >= 1000 ? round(packWh / 1000) : round(packWh)) : '—'}
          unit={packWh >= 1000 ? 'kWh' : 'Wh'}
          note="= Pack V × Pack Ah"
        />
      </div>
      <EstimateDisclaimer />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// CALCULATOR 4 — UNIT CONVERTER
// ─────────────────────────────────────────────────────────────────

function UnitConverter() {
  // Length
  const [mm, setMm] = useState('');
  const [inches, setInches] = useState('');

  // Temperature
  const [tempIn, setTempIn] = useState('');
  const [tempFromUnit, setTempFromUnit] = useState('°C');
  const [tempToUnit, setTempToUnit] = useState('°F');

  // Energy
  const [ahIn, setAhIn] = useState('');
  const [voltForAh, setVoltForAh] = useState('');
  const [ahToWh, setAhToWh] = useState('');
  const [voltForWh, setVoltForWh] = useState('');

  // Length conversions
  const mmToIn = mm ? round(parseFloat(mm) / 25.4) : '—';
  const inToMm = inches ? round(parseFloat(inches) * 25.4) : '—';

  // Temperature
  const convertTemp = (): string => {
    const val = parseFloat(tempIn);
    if (isNaN(val)) return '—';
    if (tempFromUnit === '°C' && tempToUnit === '°F') return round((val * 9) / 5 + 32);
    if (tempFromUnit === '°C' && tempToUnit === 'K') return round(val + 273.15);
    if (tempFromUnit === '°F' && tempToUnit === '°C') return round(((val - 32) * 5) / 9);
    if (tempFromUnit === '°F' && tempToUnit === 'K') return round(((val - 32) * 5) / 9 + 273.15);
    if (tempFromUnit === 'K' && tempToUnit === '°C') return round(val - 273.15);
    if (tempFromUnit === 'K' && tempToUnit === '°F') return round(((val - 273.15) * 9) / 5 + 32);
    return round(val);
  };

  const calcAhToWh = (): string => {
    const a = parseFloat(ahIn), v = parseFloat(voltForAh);
    return isNaN(a) || isNaN(v) ? '—' : round(a * v);
  };
  const calcWhToAh = (): string => {
    const w = parseFloat(ahToWh), v = parseFloat(voltForWh);
    return isNaN(w) || isNaN(v) || v === 0 ? '—' : round(w / v);
  };

  return (
    <div className="space-y-6">
      {/* Length */}
      <div>
        <p className="text-xs font-bold text-[#059669] uppercase tracking-wider mb-3">Length</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <CalcInput id="calc-uc-mm" label="Millimetres" value={mm} onChange={setMm} unit="mm" />
            <p className="text-xs text-[#64748B] mt-1.5">= <span className="font-bold text-[#0F172A]">{mmToIn}</span> inches</p>
          </div>
          <div>
            <CalcInput id="calc-uc-in" label="Inches" value={inches} onChange={setInches} unit="in" />
            <p className="text-xs text-[#64748B] mt-1.5">= <span className="font-bold text-[#0F172A]">{inToMm}</span> mm</p>
          </div>
        </div>
      </div>

      {/* Temperature */}
      <div>
        <p className="text-xs font-bold text-[#059669] uppercase tracking-wider mb-3">Temperature</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1.5">From</label>
            <div className="flex gap-2">
              <input
                id="calc-uc-temp"
                type="number"
                value={tempIn}
                onChange={(e) => setTempIn(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-sm bg-white focus:outline-none focus:border-[#059669]"
              />
              <select
                value={tempFromUnit}
                onChange={(e) => setTempFromUnit(e.target.value)}
                className="px-2.5 py-2.5 rounded-lg border border-[#CBD5E1] text-xs bg-white focus:outline-none focus:border-[#059669]"
              >
                {['°C', '°F', 'K'].map((u) => <option key={u}>{u}</option>)}
              </select>
            </div>
          </div>
          <div className="flex justify-center">
            <ArrowLeftRight className="w-5 h-5 text-[#059669]" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1.5">To</label>
            <div className="flex gap-2">
              <div className="flex-1 px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] text-sm font-bold text-[#0F172A]">
                {convertTemp()}
              </div>
              <select
                value={tempToUnit}
                onChange={(e) => setTempToUnit(e.target.value)}
                className="px-2.5 py-2.5 rounded-lg border border-[#CBD5E1] text-xs bg-white focus:outline-none focus:border-[#059669]"
              >
                {['°F', '°C', 'K'].filter((u) => u !== tempFromUnit).map((u) => <option key={u}>{u}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Ah ↔ Wh */}
      <div>
        <p className="text-xs font-bold text-[#059669] uppercase tracking-wider mb-3">Capacity ↔ Energy</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-3">
            <p className="text-xs font-semibold text-[#334155]">Ah → Wh</p>
            <CalcInput id="calc-uc-ah" label="Capacity (Ah)" value={ahIn} onChange={setAhIn} unit="Ah" />
            <CalcInput id="calc-uc-vah" label="Voltage (V)" value={voltForAh} onChange={setVoltForAh} unit="V" />
            <p className="text-xs text-[#64748B]">= <span className="font-bold text-[#0F172A]">{calcAhToWh()}</span> Wh</p>
          </div>
          <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-3">
            <p className="text-xs font-semibold text-[#334155]">Wh → Ah</p>
            <CalcInput id="calc-uc-wh" label="Energy (Wh)" value={ahToWh} onChange={setAhToWh} unit="Wh" />
            <CalcInput id="calc-uc-vwh" label="Voltage (V)" value={voltForWh} onChange={setVoltForWh} unit="V" />
            <p className="text-xs text-[#64748B]">= <span className="font-bold text-[#0F172A]">{calcWhToAh()}</span> Ah</p>
          </div>
        </div>
      </div>
      <EstimateDisclaimer />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// TOOLS PAGE
// ─────────────────────────────────────────────────────────────────

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Page header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center gap-3 mb-1">
            <Link href="/" className="text-[#64748B] hover:text-[#059669] transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="text-[11px] text-[#94A3B8]">/</span>
            <span className="text-[11px] font-medium text-[#059669]">Engineering Tools</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A]">Battery Engineering Calculators</h1>
          <p className="text-sm text-[#475569] mt-1">
            General-purpose electrical engineering reference tools for battery system sizing and unit conversion.
          </p>

          <div className="mt-3 flex items-start gap-2 p-3 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl">
            <Info className="w-3.5 h-3.5 text-[#D97706] flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#78350F] leading-relaxed">
              <strong>General engineering tools only.</strong> These calculators use standard electrical formulas and are provided for reference and preliminary sizing only. Results do not constitute a MEHAR product recommendation, specification, or engineering validation. Consult a qualified engineer for all critical applications.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-4">

        <CalcCard
          id="energy-calculator"
          icon={<Zap className="w-5 h-5" />}
          title="Energy Calculator"
          description="Convert between Voltage, Capacity (Ah), and Energy (Wh / kWh)."
          defaultOpen
        >
          <EnergyCalculator />
        </CalcCard>

        <CalcCard
          id="runtime-estimator"
          icon={<Timer className="w-5 h-5" />}
          title="Runtime Estimator"
          description="Estimate battery runtime from energy, average load, and system efficiency."
        >
          <RuntimeCalculator />
        </CalcCard>

        <CalcCard
          id="series-parallel"
          icon={<GitBranch className="w-5 h-5" />}
          title="Series / Parallel Configuration"
          description="Calculate pack voltage, capacity, and energy from cell configuration."
        >
          <SeriesParallelCalculator />
        </CalcCard>

        <CalcCard
          id="unit-converter"
          icon={<ArrowLeftRight className="w-5 h-5" />}
          title="Unit Converter"
          description="Convert length (mm ↔ in), temperature (°C ↔ °F ↔ K), and capacity (Ah ↔ Wh)."
        >
          <UnitConverter />
        </CalcCard>

        {/* CTA */}
        <div className="mt-6 p-5 bg-white rounded-2xl border border-[#E2E8F0] text-center">
          <p className="text-sm font-bold text-[#0F172A] mb-1">Have a specific battery requirement?</p>
          <p className="text-xs text-[#64748B] mb-4">
            Use the Battery Finder to scope your requirements or submit a formal RFQ.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              href="/finder"
              className="px-5 py-2.5 rounded-xl border border-[#059669] text-[#059669] text-sm font-bold hover:bg-[#F0FDF4] transition-colors"
            >
              Battery Requirements Finder
            </Link>
            <Link
              href="/oem-custom-solutions"
              className="px-5 py-2.5 rounded-xl bg-[#059669] text-white text-sm font-bold hover:bg-[#047857] transition-colors"
            >
              OEM / Custom Battery Enquiry
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
