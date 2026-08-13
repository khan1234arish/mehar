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
    <section id={id} className="bg-[#11161D] rounded-2xl border border-[#1E2633] overflow-hidden shadow-xl">
      <button
        type="button"
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-3 text-left">
          <div className="w-9 h-9 rounded-xl bg-[#161C24] border border-[#39D353]/30 flex items-center justify-center text-[#39D353] flex-shrink-0 shadow-[0_0_10px_rgba(57,211,83,0.15)]">
            {icon}
          </div>
          <div>
            <p className="text-sm font-bold text-[#E6EAF0]">{title}</p>
            <p className="text-xs text-[#A3AAB5]">{description}</p>
          </div>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-[#A3AAB5] flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[#A3AAB5] flex-shrink-0" />
        )}
      </button>

      {open && (
        <div className="border-t border-[#1E2633] p-5">
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
      <label htmlFor={id} className="block text-xs font-bold text-[#E6EAF0] mb-1.5">
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
          className="flex-1 px-3.5 py-2.5 rounded-lg border border-[#1E2633] text-sm text-[#E6EAF0] placeholder-[#64748B] bg-[#161C24] focus:outline-none focus:border-[#39D353] focus:ring-2 focus:ring-[#39D353]/20"
        />
        {unit && !unitOptions && (
          <span className="px-3.5 py-2.5 rounded-lg border border-[#1E2633] bg-[#161C24] text-xs font-semibold text-[#A3AAB5]">
            {unit}
          </span>
        )}
        {unitOptions && unit && onUnitChange && (
          <select
            value={unit}
            onChange={(e) => onUnitChange(e.target.value)}
            className="px-2.5 py-2.5 rounded-lg border border-[#1E2633] text-xs text-[#E6EAF0] bg-[#161C24] focus:outline-none focus:border-[#39D353]"
          >
            {unitOptions.map((u) => <option key={u} value={u} className="bg-[#161C24] text-[#E6EAF0]">{u}</option>)}
          </select>
        )}
      </div>
    </div>
  );
}

function ResultBox({ label, value, unit, note }: { label: string; value: string; unit?: string; note?: string }) {
  return (
    <div className="bg-[#161C24] border border-[#39D353]/30 rounded-xl p-4 shadow-[0_0_15px_rgba(57,211,83,0.1)]">
      <p className="text-[10px] font-bold text-[#A3AAB5] uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-bold text-[#39D353]">
        {value}
        {unit && <span className="text-base ml-1 font-semibold text-[#39D353]/80">{unit}</span>}
      </p>
      {note && <p className="text-[10px] text-[#A3AAB5] mt-1">{note}</p>}
    </div>
  );
}

function EstimateDisclaimer() {
  return (
    <div className="flex items-start gap-2 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl mt-4">
      <Info className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
      <p className="text-[10px] text-amber-200/90 leading-relaxed">
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
      <div className="flex gap-1 bg-[#161C24] p-1 rounded-xl w-fit border border-[#1E2633]">
        <button
          onClick={() => setMode('vh_to_wh')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            mode === 'vh_to_wh' ? 'bg-[#39D353] text-[#0B0F14] font-bold shadow-sm' : 'text-[#A3AAB5] hover:text-[#E6EAF0]'
          }`}
        >
          V × Ah → Wh
        </button>
        <button
          onClick={() => setMode('wh_to_ah')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            mode === 'wh_to_ah' ? 'bg-[#39D353] text-[#0B0F14] font-bold shadow-sm' : 'text-[#A3AAB5] hover:text-[#E6EAF0]'
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
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300">{result.note}</div>
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
      <p className="text-xs text-[#A3AAB5]">
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
        <p className="text-xs font-bold text-[#39D353] uppercase tracking-wider mb-3 font-mono">Length</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <CalcInput id="calc-uc-mm" label="Millimetres" value={mm} onChange={setMm} unit="mm" />
            <p className="text-xs text-[#A3AAB5] mt-1.5">= <span className="font-bold text-[#E6EAF0]">{mmToIn}</span> inches</p>
          </div>
          <div>
            <CalcInput id="calc-uc-in" label="Inches" value={inches} onChange={setInches} unit="in" />
            <p className="text-xs text-[#A3AAB5] mt-1.5">= <span className="font-bold text-[#E6EAF0]">{inToMm}</span> mm</p>
          </div>
        </div>
      </div>

      {/* Temperature */}
      <div>
        <p className="text-xs font-bold text-[#39D353] uppercase tracking-wider mb-3 font-mono">Temperature</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-[#E6EAF0] mb-1.5">From</label>
            <div className="flex gap-2">
              <input
                id="calc-uc-temp"
                type="number"
                value={tempIn}
                onChange={(e) => setTempIn(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-lg border border-[#1E2633] text-sm text-[#E6EAF0] bg-[#161C24] focus:outline-none focus:border-[#39D353]"
              />
              <select
                value={tempFromUnit}
                onChange={(e) => setTempFromUnit(e.target.value)}
                className="px-2.5 py-2.5 rounded-lg border border-[#1E2633] text-xs text-[#E6EAF0] bg-[#161C24] focus:outline-none focus:border-[#39D353]"
              >
                {['°C', '°F', 'K'].map((u) => <option key={u} className="bg-[#161C24] text-[#E6EAF0]">{u}</option>)}
              </select>
            </div>
          </div>
          <div className="flex justify-center">
            <ArrowLeftRight className="w-5 h-5 text-[#39D353]" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#E6EAF0] mb-1.5">To</label>
            <div className="flex gap-2">
              <div className="flex-1 px-3.5 py-2.5 rounded-lg border border-[#1E2633] bg-[#161C24] text-sm font-bold text-[#39D353]">
                {convertTemp()}
              </div>
              <select
                value={tempToUnit}
                onChange={(e) => setTempToUnit(e.target.value)}
                className="px-2.5 py-2.5 rounded-lg border border-[#1E2633] text-xs text-[#E6EAF0] bg-[#161C24] focus:outline-none focus:border-[#39D353]"
              >
                {['°F', '°C', 'K'].filter((u) => u !== tempFromUnit).map((u) => <option key={u} className="bg-[#161C24] text-[#E6EAF0]">{u}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Ah ↔ Wh */}
      <div>
        <p className="text-xs font-bold text-[#39D353] uppercase tracking-wider mb-3 font-mono">Capacity ↔ Energy</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-[#161C24] rounded-xl border border-[#1E2633] space-y-3">
            <p className="text-xs font-semibold text-[#E6EAF0]">Ah → Wh</p>
            <CalcInput id="calc-uc-ah" label="Capacity (Ah)" value={ahIn} onChange={setAhIn} unit="Ah" />
            <CalcInput id="calc-uc-vah" label="Voltage (V)" value={voltForAh} onChange={setVoltForAh} unit="V" />
            <p className="text-xs text-[#A3AAB5]">= <span className="font-bold text-[#39D353]">{calcAhToWh()}</span> Wh</p>
          </div>
          <div className="p-4 bg-[#161C24] rounded-xl border border-[#1E2633] space-y-3">
            <p className="text-xs font-semibold text-[#E6EAF0]">Wh → Ah</p>
            <CalcInput id="calc-uc-wh" label="Energy (Wh)" value={ahToWh} onChange={setAhToWh} unit="Wh" />
            <CalcInput id="calc-uc-vwh" label="Voltage (V)" value={voltForWh} onChange={setVoltForWh} unit="V" />
            <p className="text-xs text-[#A3AAB5]">= <span className="font-bold text-[#39D353]">{calcWhToAh()}</span> Ah</p>
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
    <main className="min-h-screen bg-[#0B0F14] text-[#E6EAF0]">
      {/* Page header */}
      <div className="bg-[#11161D] border-b border-[#1E2633]">
        <div className="max-w-5xl xl:max-w-[1240px] 2xl:max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          <div className="flex items-center gap-3 mb-1">
            <Link href="/" className="text-[#A3AAB5] hover:text-[#39D353] transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="text-[11px] text-[#1E2633]">/</span>
            <span className="text-[11px] font-medium text-[#39D353]">Engineering Tools</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#E6EAF0]">Battery Engineering Calculators</h1>
          <p className="text-sm sm:text-base text-[#A3AAB5] mt-1">
            General-purpose electrical engineering reference tools for battery system sizing and unit conversion.
          </p>

          <div className="mt-4 flex items-start gap-2 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl">
            <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-200/90 leading-relaxed">
              <strong>General engineering tools only.</strong> These calculators use standard electrical formulas and are provided for reference and preliminary sizing only. Results do not constitute a MEHAR product recommendation, specification, or engineering validation. Consult a qualified engineer for all critical applications.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl xl:max-w-[1240px] 2xl:max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 space-y-6">

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
        <div className="mt-6 p-6 bg-[#11161D] rounded-2xl border border-[#1E2633] text-center shadow-xl">
          <p className="text-sm font-bold text-[#E6EAF0] mb-1">Have a specific battery requirement?</p>
          <p className="text-xs text-[#A3AAB5] mb-4">
            Use the Battery Finder to scope your requirements or submit a formal RFQ.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/finder"
              className="px-5 py-2.5 rounded-xl border border-[#00A3FF] text-[#00A3FF] bg-[#00A3FF]/10 text-sm font-bold hover:bg-[#00A3FF]/20 transition-colors"
            >
              Battery Requirements Finder
            </Link>
            <Link
              href="/oem-custom-solutions"
              className="px-5 py-2.5 rounded-xl bg-[#39D353] text-[#0B0F14] text-sm font-bold hover:bg-[#2ec547] shadow-[0_0_15px_rgba(57,211,83,0.25)] transition-colors"
            >
              OEM / Custom Battery Enquiry
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
