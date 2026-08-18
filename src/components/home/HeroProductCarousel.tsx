'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowUpRight, BatteryCharging } from 'lucide-react';

interface SlideItem {
  id: string;
  name: string;
  category: string;
  specs: string;
  imageUrl: string;
  href: string;
  tag: string;
}

const SLIDES: SlideItem[] = [
  {
    id: '2w',
    name: 'MEHAR 60.8V 30Ah Prismatic E-Scooter Pack',
    category: 'Commercial Delivery 2-Wheeler',
    specs: '60.8V · 30Ah · AIS-156 Phase 2 · 1.82kWh',
    imageUrl: '/assets/products/mehar-2w-battery.jpg',
    href: '/products/electric-2-wheeler-batteries',
    tag: 'EV Traction',
  },
  {
    id: '3w',
    name: 'MEHAR 51.2V 100Ah Heavy E-Rickshaw Battery',
    category: 'Heavy-Duty 3-Wheeler Commercial Traction',
    specs: '51.2V · 100Ah · LiFePO4 · Blue LCD · 5.12kWh',
    imageUrl: '/assets/products/mehar-3w-battery.jpg',
    href: '/products/electric-3-wheeler-batteries',
    tag: 'E-Rickshaw 3W',
  },
  {
    id: 'ess',
    name: 'MEHAR 51.2V 100Ah 19" 4U Server Rack ESS',
    category: 'Commercial & Telecom Power Backup',
    specs: '51.2V · 100Ah · 19" 4U · RS485/CAN · 5.12kWh',
    imageUrl: '/assets/products/mehar-ess-battery.jpg',
    href: '/products/energy-storage-inverter-batteries',
    tag: 'Solar ESS',
  },
  {
    id: 'solar',
    name: 'MEHAR 51.2V 200Ah Solar Storage Cabinet',
    category: 'Renewable Solar Power System',
    specs: '51.2V · 200Ah · 10.24kWh · LCD Touchscreen',
    imageUrl: '/assets/products/mehar-solar-battery.jpg',
    href: '/products/solar-renewable-energy-batteries',
    tag: 'Solar Storage',
  },
  {
    id: 'forklift',
    name: 'MEHAR 48V / 80V 400Ah Forklift LiFePO4 System',
    category: 'Material Handling Industrial Tray',
    specs: '48V / 80V · 400Ah · REMA 320A · Heavy Steel',
    imageUrl: '/assets/products/mehar-forklift-battery.jpg',
    href: '/products/custom-oem-industrial-batteries',
    tag: 'Industrial Motive',
  },
  {
    id: 'agv',
    name: 'MEHAR 24V / 48V 60Ah AGV Robotics Pack',
    category: 'Automated Guided Vehicles & AMRs',
    specs: '24V / 48V · 60Ah · Quick-Dock · IP67',
    imageUrl: '/assets/products/mehar-agv-battery.jpg',
    href: '/products/custom-oem-industrial-batteries',
    tag: 'AGV Robotics',
  },
  {
    id: 'oem',
    name: 'MEHAR Custom OEM Modular Pack Assembly',
    category: 'Precision Engineered Pack Module',
    specs: 'Custom Voltage & Ah · CNC Alloy · CAN BMS',
    imageUrl: '/assets/products/mehar-oem-battery.jpg',
    href: '/oem-custom-solutions',
    tag: 'Custom OEM',
  },
  {
    id: 'charger',
    name: 'MEHAR 60kW / 120kW Dual-Gun DC Fast Charger',
    category: 'Commercial EV Fast Charging Pedestal',
    specs: '60kW / 120kW · Dual CCS2 · 7" Touchscreen',
    imageUrl: '/assets/products/mehar-ev-charger.jpg',
    href: '/products/custom-oem-industrial-batteries',
    tag: 'EV Fast Charger',
  },
  {
    id: 'cells',
    name: 'MEHAR Grade-A Cells (Prismatic & Cylindrical)',
    category: 'Tier-1 Direct Factory Supply',
    specs: '3.2V 100-314Ah Prismatic · 18650 / 21700 / 32700',
    imageUrl: '/assets/products/mehar-cylindrical-cells.jpg',
    href: '/products/cylindrical-li-ion-cells',
    tag: 'Tier-1 Cells',
  },
];

export default function HeroProductCarousel({ parentCompany = 'Lawad Infrastructure Private Limited' }: { parentCompany?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance slideshow every 3.8 seconds when not hovered
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 3800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const currentSlide = SLIDES[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  return (
    <div
      className="rounded-3xl bg-theme-card border border-theme-border p-4 sm:p-5 lg:p-6 shadow-2xl hover:border-theme-green/40 transition-all duration-300 relative group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex flex-col justify-between rounded-2xl bg-theme-surface border border-theme-border p-4 sm:p-5 lg:p-6 space-y-4">
        
        {/* ── Card Header ────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-theme-green/10 border border-theme-green/25 flex items-center justify-center shrink-0">
              <BatteryCharging className="w-4 h-4 text-theme-green" />
            </div>
            <div className="min-w-0">
              <span className="text-xs sm:text-sm font-mono font-bold text-theme-green block truncate">
                MEHAR Battery Systems
              </span>
              <span className="text-[11px] text-theme-secondary block truncate">
                {parentCompany}
              </span>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-theme-green/10 text-theme-green border border-theme-green/25 shrink-0">
            B2B Only
          </span>
        </div>

        {/* ── Dynamic Product Title & Specs ───────────────────────── */}
        <div className="flex items-center justify-between gap-2 px-0.5">
          <div className="min-w-0">
            <h4 className="text-sm sm:text-base font-bold text-theme-primary truncate">
              {currentSlide.name}
            </h4>
            <p className="text-xs text-theme-secondary font-mono truncate">
              {currentSlide.specs}
            </p>
          </div>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-theme-blue/10 text-theme-blue border border-theme-blue/25 shrink-0">
            {currentSlide.tag}
          </span>
        </div>

        {/* ── Slideshow Image Stage ───────────────────────────────── */}
        <div className="relative w-full h-52 xs:h-56 sm:h-64 lg:h-72 rounded-2xl bg-theme-base border border-theme-border overflow-hidden">
          
          {/* Stacked Images with Smooth Cross-Fade */}
          {SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 p-3 transition-all duration-700 ease-in-out ${
                idx === currentIndex
                  ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                  : 'opacity-0 scale-98 z-0 pointer-events-none'
              }`}
            >
              <Image
                src={slide.imageUrl}
                alt={`${slide.name} - MEHAR Official B2B Battery Platform`}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                priority={idx === 0 || idx === 1}
                className="object-contain p-2 hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}

          {/* Navigation Chevron Buttons (Always accessible on touch/mobile, hover on desktop) */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-8 sm:h-8 rounded-full bg-black/75 hover:bg-theme-green hover:text-black border border-white/20 text-white flex items-center justify-center transition-all opacity-85 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 z-20 shadow-lg cursor-pointer touch-manipulation"
            aria-label="Previous battery slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-8 sm:h-8 rounded-full bg-black/75 hover:bg-theme-green hover:text-black border border-white/20 text-white flex items-center justify-center transition-all opacity-85 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 z-20 shadow-lg cursor-pointer touch-manipulation"
            aria-label="Next battery slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Slide Progress Counter Badge */}
          <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-white z-20 shadow-sm">
            {currentIndex + 1} / {SLIDES.length}
          </div>
        </div>

        {/* ── Slide Indicator Dots ─────────────────────────────────── */}
        <div className="flex items-center justify-center gap-1 pt-0.5">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className="p-1 touch-manipulation flex items-center justify-center cursor-pointer"
              aria-label={`Go to slide ${idx + 1}: ${slide.name}`}
            >
              <span
                className={`h-1.5 rounded-full transition-all duration-300 block ${
                  idx === currentIndex
                    ? 'w-6 bg-theme-green'
                    : 'w-1.5 bg-theme-border-strong hover:bg-theme-secondary'
                }`}
              />
            </button>
          ))}
        </div>

        {/* ── Card Footer Tags & Explore Action ───────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-theme-border">
          <div className="flex flex-wrap gap-1.5">
            {['EV Traction', 'Solar ESS', 'Industrial Motive', 'Custom OEM'].map((tag) => (
              <span
                key={tag}
                className={`px-2.5 py-0.5 rounded-lg text-[11px] font-mono transition-colors ${
                  tag === currentSlide.tag
                    ? 'bg-theme-green/15 text-theme-green font-bold border border-theme-green/30'
                    : 'bg-theme-elevated border border-theme-border text-theme-secondary'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          <Link
            href={currentSlide.href}
            className="inline-flex items-center gap-1 text-xs font-mono font-bold text-theme-green hover:underline shrink-0"
          >
            <span>Explore</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
