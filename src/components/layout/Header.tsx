'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BROAD_CATEGORIES } from '@/data/categories';
import {
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  Search,
  Wrench,
  Factory,
  SlidersHorizontal,
} from 'lucide-react';
import Button from '@/components/ui/Button';

// ─── Navigation structure ─────────────────────────────────────────────────────
// Desktop main nav — 7 corporate pages that fit comfortably on lg screens
const MAIN_NAV = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products', hasDropdown: true },
  { label: 'Applications', href: '/applications' },
  { label: 'Technology', href: '/technology' },
  { label: 'About Us', href: '/about' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact', href: '/contact' },
];

// Mobile-only extra items (tools / procurement — shown in hamburger drawer only)
const TOOLS_NAV = [
  { label: 'Battery Finder', href: '/finder', icon: 'search' },
  { label: 'Compare Categories', href: '/compare', icon: 'sliders' },
  { label: 'RFQ Builder', href: '/rfq', icon: 'arrow' },
  { label: 'OEM / ODM Enquiry', href: '/oem-custom-solutions', icon: 'factory' },
  { label: 'Engineering Calculators', href: '/tools', icon: 'wrench' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const linkCls = (href: string, extra = '') =>
    `px-2.5 py-1.5 rounded-lg text-[13px] font-semibold transition-colors whitespace-nowrap ${extra} ${
      isActive(href)
        ? 'text-[#059669] bg-[#ECFDF5]'
        : 'text-[#334155] hover:text-[#059669] hover:bg-[#F8FAFC]'
    }`;

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-sm'
          : 'bg-white border-b border-[#E2E8F0]'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4 h-[68px]">

          {/* ── Logo ──────────────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center shrink-0 group" aria-label="MEHAR – home">
            <div className="w-36 md:w-44 h-10 md:h-12 relative">
              <Image
                src="/assets/logo/mehar-logo.svg"
                alt="MEHAR – Lawad Infrastructure Private Limited"
                fill
                priority
                className="object-contain object-left group-hover:opacity-90 transition-opacity"
              />
            </div>
          </Link>

          {/* ── Desktop Main Navigation ───────────────────────────────────
               Shown at lg (1024px+). 7 corporate pages + Products dropdown.
               Separator then right-side CTA buttons.                       */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1" aria-label="Main navigation">
            {MAIN_NAV.map((link) => {
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
                      className={`inline-flex items-center gap-1 ${linkCls(link.href)}`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${
                          productsDropdownOpen ? 'rotate-180 text-[#059669]' : 'text-[#94A3B8]'
                        }`}
                      />
                    </Link>

                    {/* Products mega-dropdown */}
                    {productsDropdownOpen && (
                      <div className="absolute top-full left-0 w-[420px] pt-2 z-50">
                        <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xl">
                          <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E2E8F0]">
                            <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider">
                              Broad Battery Categories
                            </span>
                            <Link
                              href="/products"
                              className="text-[10px] font-mono font-semibold text-[#059669] hover:underline flex items-center gap-1"
                            >
                              All Categories <ArrowUpRight className="w-3 h-3" />
                            </Link>
                          </div>
                          <div className="space-y-1">
                            {BROAD_CATEGORIES.map((cat) => (
                              <Link
                                key={cat.id}
                                href={`/products/${cat.slug}`}
                                className="block p-2.5 rounded-lg hover:bg-[#F8FAFC] border border-transparent hover:border-[#E2E8F0] transition-all group"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#059669] transition-colors">
                                    {cat.name}
                                  </span>
                                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#FEFCE8] text-[#854D0E] border border-[#FEF08A]">
                                    Specs Soon
                                  </span>
                                </div>
                                <p className="text-[11px] text-[#64748B] line-clamp-1 mt-0.5">
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
                <Link key={link.href} href={link.href} className={linkCls(link.href)}>
                  {link.label}
                </Link>
              );
            })}

            {/* Spacer — pushes CTA buttons to the far right */}
            <div className="flex-1" />

            {/* Right-side CTA Buttons */}
            <div className="flex items-center gap-2 pl-3 border-l border-[#E2E8F0]">
              <Button
                href="/finder"
                variant="outline"
                size="sm"
                icon={<Search className="w-3.5 h-3.5" />}
              >
                Finder
              </Button>
              <Button
                href="/oem-custom-solutions"
                variant="outline"
                size="sm"
                icon={<Factory className="w-3.5 h-3.5" />}
              >
                OEM
              </Button>
              <Button
                href="/rfq"
                variant="primary"
                size="sm"
                icon={<ArrowUpRight className="w-3.5 h-3.5" />}
              >
                RFQ Builder
              </Button>
            </div>
          </nav>

          {/* ── Mobile / Tablet top-bar ───────────────────────────────────
               Shown below lg breakpoint: RFQ pill + hamburger toggle.      */}
          <div className="flex lg:hidden items-center gap-2 ml-auto">
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
              className="p-2 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] hover:text-[#059669] transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Drawer ─────────────────────────────────────────────────
           Full-height scrollable drawer containing ALL navigation links
           grouped into: Corporate Pages and B2B Tools.                    */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-x-0 top-[68px] bg-white border-b border-[#E2E8F0] shadow-xl max-h-[calc(100vh-68px)] overflow-y-auto z-40"
          role="dialog"
          aria-label="Mobile navigation"
        >
          <div className="p-4 space-y-5">

            {/* Corporate pages */}
            <div>
              <p className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#64748B] px-2 mb-2">
                Company
              </p>
              <div className="space-y-0.5">
                {MAIN_NAV.map((link) => (
                  <div key={link.href}>
                    <Link
                      href={link.href}
                      className={`block px-3 py-2.5 rounded-lg text-sm font-semibold ${
                        isActive(link.href)
                          ? 'text-[#059669] bg-[#ECFDF5]'
                          : 'text-[#0F172A] hover:bg-[#F8FAFC] hover:text-[#059669]'
                      }`}
                    >
                      {link.label}
                    </Link>

                    {/* Products sub-list */}
                    {link.hasDropdown && (
                      <div className="ml-4 mt-1 mb-1 pl-3 border-l-2 border-[#E2E8F0] space-y-0.5">
                        {BROAD_CATEGORIES.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/products/${cat.slug}`}
                            className="block py-1.5 text-xs text-[#475569] hover:text-[#059669] font-medium"
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

            {/* B2B Tools */}
            <div className="pt-1 border-t border-[#E2E8F0]">
              <p className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#64748B] px-2 mb-2">
                B2B Tools &amp; Procurement
              </p>
              <div className="space-y-0.5">
                {TOOLS_NAV.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold ${
                      isActive(link.href)
                        ? 'text-[#059669] bg-[#ECFDF5]'
                        : 'text-[#0F172A] hover:bg-[#F8FAFC] hover:text-[#059669]'
                    }`}
                  >
                    {link.icon === 'search' && <Search className="w-4 h-4 text-[#059669] flex-shrink-0" />}
                    {link.icon === 'sliders' && <SlidersHorizontal className="w-4 h-4 text-[#059669] flex-shrink-0" />}
                    {link.icon === 'arrow' && <ArrowUpRight className="w-4 h-4 text-[#059669] flex-shrink-0" />}
                    {link.icon === 'factory' && <Factory className="w-4 h-4 text-[#059669] flex-shrink-0" />}
                    {link.icon === 'wrench' && <Wrench className="w-4 h-4 text-[#059669] flex-shrink-0" />}
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile CTA buttons */}
            <div className="pt-3 border-t border-[#E2E8F0] space-y-2">
              <Button href="/oem-custom-solutions" variant="outline" size="md" className="w-full justify-center">
                OEM / Custom Battery Enquiry
              </Button>
              <Button href="/rfq" variant="primary" size="md" className="w-full justify-center">
                Open B2B RFQ Builder
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
