'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import ThemeToggle from '@/components/theme/ThemeToggle';
import { BROAD_CATEGORIES } from '@/data/categories';
import {
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  Layers,
  Search,
  SlidersHorizontal,
  FileSpreadsheet,
  Factory,
  Wrench,
} from 'lucide-react';

const MAIN_NAV = [
  { label: 'Products', href: '/products', hasDropdown: true },
  { label: 'Applications', href: '/applications' },
  { label: 'Technology', href: '/technology' },
  { label: 'About', href: '/about' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact', href: '/contact' },
];

const TOOLS_DROPDOWN_ITEMS = [
  {
    href: '/finder',
    label: 'Battery Requirements Finder',
    desc: 'Interactive tool to scope equipment specs and duty cycles',
    icon: Search,
  },
  {
    href: '/compare',
    label: 'Category Comparison Matrix',
    desc: 'Side-by-side technical evaluation across broad battery lines',
    icon: SlidersHorizontal,
  },
  {
    href: '/rfq',
    label: 'B2B RFQ Builder',
    desc: 'Configure batch procurement parameters & pricing tiers',
    icon: FileSpreadsheet,
  },
  {
    href: '/oem-custom-solutions',
    label: 'Custom OEM Engineering Intake',
    desc: 'Tailored pack dimensions, BMS protocols & cell integration',
    icon: Factory,
  },
  {
    href: '/tools',
    label: 'Engineering Sizing Calculators',
    desc: 'Energy (Wh), runtime estimator & cell configuration tools',
    icon: Wrench,
  },
];

const ALL_MOBILE_TOOLS = [
  { href: '/finder', label: 'Battery Finder', icon: Search },
  { href: '/compare', label: 'Compare Matrix', icon: SlidersHorizontal },
  { href: '/rfq', label: 'RFQ Builder', icon: FileSpreadsheet },
  { href: '/oem-custom-solutions', label: 'OEM Solutions', icon: Factory },
  { href: '/tools', label: 'Engineering Calculators', icon: Wrench },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close menus on page navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
    setToolsDropdownOpen(false);
  }, [pathname]);

  // Scroll detection for backdrop effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const linkCls = (href: string, extra = '') =>
    `px-2.5 py-1.5 xl:px-3 rounded-xl text-[12px] xl:text-[13px] font-semibold transition-all whitespace-nowrap ${extra} ${
      isActive(href)
        ? 'text-[#39D353] bg-[#39D353]/15 border border-[#39D353]/30 shadow-sm'
        : 'text-[#E6EAF0] hover:text-[#39D353] hover:bg-white/[0.08] border border-transparent'
    }`;

  return (
    <header className="site-header sticky top-0 z-50 bg-[#0B0F14] border-b border-[#1E2633] shadow-xl shadow-black/50 transition-all duration-200">
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center gap-3 lg:gap-4 xl:gap-6 h-[70px] lg:h-[76px]">

          {/* ── Logo (Immutable Approved Trademark Asset) ────────────────── */}
          <Link href="/" className="flex items-center shrink-0 group mr-2 xl:mr-4" aria-label="MEHAR – Home">
            <div className="w-32 sm:w-36 lg:w-40 xl:w-44 h-13 sm:h-14 lg:h-[58px] xl:h-[62px] relative py-1">
              <Image
                src="/assets/logo/mehar-logo.png"
                alt="MEHAR – The Name You Trust"
                fill
                priority
                className="object-contain object-left group-hover:opacity-90 transition-opacity"
              />
            </div>
          </Link>

          {/* ── Desktop Main Navigation ─────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main navigation">
            {MAIN_NAV.map((link) => {
              // Products Mega Dropdown
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setProductsDropdownOpen(true)}
                    onMouseLeave={() => setProductsDropdownOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={`inline-flex items-center gap-1 text-xs xl:text-sm ${linkCls(link.href)}`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          productsDropdownOpen ? 'rotate-180 text-[#39D353]' : 'text-[#A3AAB5]'
                        }`}
                      />
                    </Link>

                    {/* Products mega-dropdown */}
                    {productsDropdownOpen && (
                      <div className="absolute top-full left-0 w-[460px] pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        <div className="p-4 rounded-2xl bg-[#0D1117] border border-[#2A3649] shadow-2xl">
                          <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#2A3649]">
                            <span className="text-[10px] font-mono font-bold text-[#A3AAB5] uppercase tracking-wider flex items-center gap-1.5">
                              <Layers className="w-3 h-3 text-[#39D353]" />
                              Battery Portfolio Categories
                            </span>
                            <Link
                              href="/products"
                              className="text-[11px] font-mono font-bold text-[#39D353] hover:underline flex items-center gap-1"
                            >
                              View All Categories <ArrowUpRight className="w-3 h-3" />
                            </Link>
                          </div>
                          <div className="space-y-1">
                            {BROAD_CATEGORIES.map((cat) => (
                              <Link
                                key={cat.id}
                                href={`/products/${cat.slug}`}
                                className="block p-2.5 rounded-xl hover:bg-white/[0.06] border border-transparent hover:border-[#2A3649] transition-all group"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-[#E6EAF0] group-hover:text-[#39D353] transition-colors">
                                    {cat.name}
                                  </span>
                                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#39D353]/15 text-[#39D353] border border-[#39D353]/30 font-bold">
                                    B2B Specs
                                  </span>
                                </div>
                                <p className="text-[11px] text-[#CBD5E1] line-clamp-1 mt-0.5">
                                  {cat.tagline}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link key={link.href} href={link.href} className={`text-xs xl:text-sm ${linkCls(link.href)}`}>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* ── Right-Side Action Navigation (Desktop) ────────────────── */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 shrink-0">
            <Link
              href="/finder"
              className="hidden xl:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-[#E6EAF0] hover:text-[#39D353] hover:bg-white/[0.08] transition-colors whitespace-nowrap"
            >
              <Search className="w-3.5 h-3.5 text-[#39D353]" />
              <span>Finder</span>
            </Link>

            <Link
              href="/rfq"
              className="hidden xl:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-[#E6EAF0] hover:text-[#39D353] hover:bg-white/[0.08] transition-colors whitespace-nowrap"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#39D353]" />
              <span>RFQ Builder</span>
            </Link>

            <Link
              href="/oem-custom-solutions"
              className="hidden 2xl:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-[#E6EAF0] hover:text-[#00A3FF] hover:bg-[#00A3FF]/15 transition-colors whitespace-nowrap"
            >
              <Factory className="w-3.5 h-3.5 text-[#00A3FF]" />
              <span>OEM / ODM</span>
            </Link>

            {/* Tools Dropdown Button */}
            <div
              className="relative"
              onMouseEnter={() => setToolsDropdownOpen(true)}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              <Link
                href="/tools"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] xl:text-xs font-bold text-[#E6EAF0] hover:text-[#39D353] hover:bg-white/[0.08] transition-colors whitespace-nowrap"
              >
                <Wrench className="w-3.5 h-3.5 text-[#39D353]" />
                <span>Tools</span>
                <ChevronDown className="w-3 h-3 text-[#A3AAB5]" />
              </Link>

              {toolsDropdownOpen && (
                <div className="absolute top-full right-0 w-[320px] pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="p-3 rounded-2xl bg-[#0D1117] border border-[#2A3649] shadow-2xl space-y-1">
                    <div className="px-2 py-1 border-b border-[#2A3649] mb-1">
                      <span className="text-[10px] font-mono font-bold text-[#A3AAB5] uppercase tracking-wider">
                        B2B Engineering &amp; Sizing Tools
                      </span>
                    </div>
                    {TOOLS_DROPDOWN_ITEMS.map((item) => (
                      <Link
                        key={item.href + item.label}
                        href={item.href}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/[0.06] transition-all group"
                      >
                        <item.icon className="w-4 h-4 text-[#39D353] mt-0.5 shrink-0" />
                        <div>
                          <span className="text-xs font-bold text-[#E6EAF0] group-hover:text-[#39D353] transition-colors block">
                            {item.label}
                          </span>
                          <span className="text-[11px] text-[#CBD5E1] block leading-tight">
                            {item.desc}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Main RFQ Call-to-Action Button */}
            <Button
              href="/rfq"
              variant="primary"
              size="sm"
              className="ml-1 text-xs shrink-0 whitespace-nowrap"
              icon={<ArrowUpRight className="w-3.5 h-3.5" />}
            >
              RFQ
            </Button>

            {/* Theme Toggle (Desktop Compact Popover) */}
            <ThemeToggle variant="compact" className="ml-1 shrink-0" />
          </div>

          {/* ── Mobile / Tablet top-bar Trigger ─────────────────────────── */}
          <div className="flex lg:hidden items-center gap-2 ml-auto" aria-label="Mobile controls">
            <ThemeToggle variant="compact" />
            <Button
              href="/rfq"
              variant="primary"
              size="sm"
              className="text-xs px-3 py-1.5"
            >
              RFQ
            </Button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#161C24] border border-[#2A3649] text-[#E6EAF0] hover:text-[#39D353] transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile / Tablet Drawer ──────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden absolute inset-x-0 top-full bg-[#0B0F14]/98 backdrop-blur-2xl border-b border-[#1E2633] shadow-2xl max-h-[calc(100vh-120px)] overflow-y-auto z-40"
          role="dialog"
          aria-label="Mobile navigation"
        >
          <div className="p-4 space-y-5">

            {/* Theme Selection in Mobile Menu */}
            <div>
              <p className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#A3AAB5] px-2 mb-2">
                Color Theme
              </p>
              <ThemeToggle variant="segmented" className="w-full" />
            </div>

            {/* Main Navigation links */}
            <div>
              <p className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#A3AAB5] px-2 mb-2">
                Navigation
              </p>
              <div className="space-y-0.5">
                {MAIN_NAV.map((link) => (
                  <div key={link.href}>
                    <Link
                      href={link.href}
                      className={`block px-3 py-2.5 rounded-xl text-sm font-semibold ${
                        isActive(link.href)
                          ? 'text-[#39D353] bg-[#39D353]/15 border border-[#39D353]/30'
                          : 'text-[#E6EAF0] hover:bg-white/[0.08] hover:text-[#39D353]'
                      }`}
                    >
                      {link.label}
                    </Link>

                    {/* Products sub-list in mobile drawer */}
                    {link.hasDropdown && (
                      <div className="ml-4 mt-1 mb-1 pl-3 border-l-2 border-[#2A3649] space-y-1">
                        {BROAD_CATEGORIES.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/products/${cat.slug}`}
                            className="block py-1 text-xs text-[#CBD5E1] hover:text-[#39D353] font-medium"
                          >
                            {cat.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* B2B Procurement & Engineering Tools */}
            <div className="pt-3 border-t border-[#2A3649]">
              <p className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#A3AAB5] px-2 mb-2">
                B2B Procurement &amp; Engineering Tools
              </p>
              <div className="space-y-0.5">
                {ALL_MOBILE_TOOLS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                        isActive(link.href)
                          ? 'text-[#39D353] bg-[#39D353]/15 border border-[#39D353]/30'
                          : 'text-[#E6EAF0] hover:bg-white/[0.08] hover:text-[#39D353]'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#39D353] flex-shrink-0" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Mobile CTAs */}
            <div className="pt-3 border-t border-[#2A3649] space-y-2">
              <Button href="/oem-custom-solutions" variant="secondary" size="md" className="w-full justify-center">
                Configure Custom OEM Solution
              </Button>
              <Button href="/rfq" variant="primary" size="md" className="w-full justify-center">
                Request a Quote (RFQ)
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
