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
    <section id={id} className="bg-theme-card rounded-2xl border border-theme-border overflow-hidden shadow-xl">
      <button
        type="button"
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-theme-elevated transition-colors"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-3 text-left">
          <div className="w-9 h-9 rounded-xl bg-theme-elevated border border-theme-green/30 flex items-center justify-center text-theme-green flex-shrink-0 shadow-sm">
            {icon}
          </div>
          <div>
            <p className="text-sm font-bold text-theme-primary">{title}</p>
            <p className="text-xs text-theme-secondary">{description}</p>
          </div>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-theme-secondary flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-theme-secondary flex-shrink-0" />
        )}
      </button>

      {open && (
        <div className="border-t border-theme-border p-5">
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
      <label htmlFor={id} className="block text-xs font-semibold text-theme-secondary mb-1">
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
          className="flex-1 px-3 py-2 rounded-lg border border-theme-border bg-theme-elevated text-theme-primary placeholder-theme-muted text-sm focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors"
        />
        {unitOptions && onUnitChange && (
          <select
            value={unit}
            onChange={(e) => onUnitChange(e.target.value)}
            className="px-2.5 py-2 rounded-lg border border-theme-border bg-theme-elevated text-theme-primary text-xs focus:outline-none focus:border-theme-green transition-colors"
          >
            {unitOptions.map((u) => (
              <option key={u} value={u} className="bg-theme-card text-theme-primary">
                {u}
              </option>
            ))}
          </select>
        )}
        {!unitOptions && unit && (
          <span className="flex items-center px-3 py-2 rounded-lg bg-theme-elevated border border-theme-border text-xs text-theme-secondary font-mono font-medium select-none">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

function ResultBox({
  label,
  value,
  unit,
  subtext,
}: {
  label: string;
  value: string;
  unit?: string;
  subtext?: string;
}) {
  return (
    <div className="p-4 rounded-xl bg-theme-elevated border border-theme-border flex flex-col justify-between">
      <p className="text-xs font-medium text-theme-secondary">{label}</p>
      <div className="my-1">
        <span className="text-xl sm:text-2xl font-black text-theme-green font-mono">{value}</span>
        {unit && <span className="ml-1.5 text-xs text-theme-secondary font-mono">{unit}</span>}
      </div>
      {subtext && <p className="text-[11px] text-theme-muted">{subtext}</p>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// CALCULATORS
// ─────────────────────────────────────────────────────────────────

function EnergyCalculator() {
  const [voltage, setVoltage] = useState('48');
  const [capacity, setCapacity] = useState('100');

  const v = parseFloat(voltage) || 0;
  const c = parseFloat(capacity) || 0;

  const wh = v * c;
  const kwh = wh / 1000;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CalcInput
          id="energy-voltage"
          label="Nominal Voltage (V)"
          value={voltage}
          onChange={setVoltage}
          unit="V"
          placeholder="e.g. 48"
        />
        <CalcInput
          id="energy-capacity"
          label="Battery Capacity (Ah)"
          value={capacity}
          onChange={setCapacity}
          unit="Ah"
          placeholder="e.g. 100"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <ResultBox label="Total Energy (Wh)" value={round(wh, 1)} unit="Wh" subtext="Watt-hours" />
        <ResultBox label="Total Energy (kWh)" value={round(kwh, 3)} unit="kWh" subtext="Kilowatt-hours" />
      </div>
    </div>
  );
}

function RuntimeCalculator() {
  const [energy, setEnergy] = useState('4800');
  const [load, setLoad] = useState('1000');
  const [efficiency, setEfficiency] = useState('90');

  const e = parseFloat(energy) || 0;
  const l = parseFloat(load) || 0;
  const eff = (parseFloat(efficiency) || 100) / 100;

  const usableEnergy = e * eff;
  const hours = l > 0 ? usableEnergy / l : 0;
  const minutes = hours * 60;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CalcInput
          id="runtime-energy"
          label="Battery Energy (Wh)"
          value={energy}
          onChange={setEnergy}
          unit="Wh"
          placeholder="e.g. 4800"
        />
        <CalcInput
          id="runtime-load"
          label="Average Power Load (W)"
          value={load}
          onChange={setLoad}
          unit="W"
          placeholder="e.g. 1000"
        />
        <CalcInput
          id="runtime-eff"
          label="System Efficiency (%)"
          value={efficiency}
          onChange={setEfficiency}
          unit="%"
          placeholder="e.g. 90"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <ResultBox label="Estimated Runtime (Hours)" value={round(hours, 2)} unit="hours" subtext={`${round(minutes, 0)} minutes approx.`} />
        <ResultBox label="Usable Energy (Accounting for efficiency)" value={round(usableEnergy, 1)} unit="Wh" subtext={`${efficiency}% efficiency factor`} />
      </div>
    </div>
  );
}

function SeriesParallelCalculator() {
  const [cellV, setCellV] = useState('3.2');
  const [cellAh, setCellAh] = useState('6');
  const [sCount, setSCount] = useState('16');
  const [pCount, setPCount] = useState('4');

  const cv = parseFloat(cellV) || 0;
  const cah = parseFloat(cellAh) || 0;
  const s = parseInt(sCount, 10) || 0;
  const p = parseInt(pCount, 10) || 0;

  const packV = cv * s;
  const packAh = cah * p;
  const packWh = packV * packAh;
  const totalCells = s * p;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcInput
          id="sp-cell-v"
          label="Cell Voltage (V)"
          value={cellV}
          onChange={setCellV}
          unit="V"
          placeholder="e.g. 3.2"
        />
        <CalcInput
          id="sp-cell-ah"
          label="Cell Capacity (Ah)"
          value={cellAh}
          onChange={setCellAh}
          unit="Ah"
          placeholder="e.g. 6.0"
        />
        <CalcInput
          id="sp-s-count"
          label="Series (S)"
          value={sCount}
          onChange={setSCount}
          unit="in series"
          placeholder="e.g. 16"
        />
        <CalcInput
          id="sp-p-count"
          label="Parallel (P)"
          value={pCount}
          onChange={setPCount}
          unit="in parallel"
          placeholder="e.g. 4"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
        <ResultBox label="Nominal Pack Voltage" value={round(packV, 1)} unit="V" subtext={`${s}S string`} />
        <ResultBox label="Pack Capacity" value={round(packAh, 1)} unit="Ah" subtext={`${p}P string`} />
        <ResultBox label="Total Energy" value={round(packWh, 1)} unit="Wh" subtext={`${round(packWh / 1000, 2)} kWh`} />
        <ResultBox label="Total Cell Count" value={totalCells.toString()} unit="cells" subtext={`${s}S × ${p}P`} />
      </div>
    </div>
  );
}

function UnitConverter() {
  const [mm, setMm] = useState('300');
  const [celsius, setCelsius] = useState('25');

  const mmVal = parseFloat(mm) || 0;
  const inchVal = mmVal / 25.4;

  const cVal = parseFloat(celsius) || 0;
  const fVal = (cVal * 9) / 5 + 32;
  const kVal = cVal + 273.15;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold text-theme-primary uppercase tracking-wider mb-3">Length: Millimeters ↔ Inches</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalcInput id="conv-mm" label="Length (mm)" value={mm} onChange={setMm} unit="mm" />
          <ResultBox label="Inches (in)" value={round(inchVal, 3)} unit="in" subtext={`${round(mmVal, 1)} mm`} />
        </div>
      </div>

      <div className="pt-4 border-t border-theme-border">
        <p className="text-xs font-bold text-theme-primary uppercase tracking-wider mb-3">Temperature: °C ↔ °F ↔ Kelvin</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <CalcInput id="conv-c" label="Temperature (°C)" value={celsius} onChange={setCelsius} unit="°C" />
          <ResultBox label="Fahrenheit (°F)" value={round(fVal, 1)} unit="°F" />
          <ResultBox label="Kelvin (K)" value={round(kVal, 2)} unit="K" />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// PAGE ROOT
// ─────────────────────────────────────────────────────────────────

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-theme-base text-theme-primary transition-colors duration-200">
      {/* Header */}
      <div className="bg-theme-card border-b border-theme-border">
        <div className="max-w-5xl xl:max-w-[1240px] 2xl:max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          <div className="flex items-center gap-2 mb-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-[11px] font-medium text-theme-secondary hover:text-theme-green transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Home
            </Link>
            <span className="text-[11px] text-theme-border-strong">/</span>
            <span className="text-[11px] font-medium text-theme-green">Engineering Tools</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-theme-primary">Battery Engineering Calculators</h1>
          <p className="text-sm sm:text-base text-theme-secondary mt-1">
            General-purpose electrical engineering reference tools for battery system sizing and unit conversion.
          </p>

          <div className="mt-4 flex items-start gap-2 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl">
            <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 dark:text-amber-200/90 leading-relaxed">
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
        <div className="mt-6 p-6 bg-theme-card rounded-2xl border border-theme-border text-center shadow-xl">
          <p className="text-sm font-bold text-theme-primary mb-1">Have a specific battery requirement?</p>
          <p className="text-xs text-theme-secondary mb-4">
            Use the Battery Finder to scope your requirements or submit a formal RFQ.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/finder"
              className="px-5 py-2.5 rounded-xl border border-theme-blue text-theme-blue bg-theme-blue/10 text-sm font-bold hover:bg-theme-blue/20 transition-colors"
            >
              Battery Requirements Finder
            </Link>
            <Link
              href="/oem-custom-solutions"
              className="px-5 py-2.5 rounded-xl bg-theme-green text-white dark:text-[#0B0F14] text-sm font-bold hover:bg-theme-green-hover shadow-sm transition-colors"
            >
              OEM / Custom Battery Enquiry
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
