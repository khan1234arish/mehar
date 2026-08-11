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
  FileSpreadsheet,
  Cpu,
  Layers,
  Building2,
  Download,
  PhoneCall,
} from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products', hasDropdown: true },
    { label: 'Applications', href: '/applications' },
    { label: 'Technology & Quality', href: '/technology' },
    { label: 'About & Infrastructure', href: '/about' },
    { label: 'Resources', href: '/resources' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080D1A]/95 backdrop-blur-md border-b border-[#1E293B] shadow-lg shadow-black/40'
          : 'bg-[#080D1A]/85 backdrop-blur-sm border-b border-[#1E293B]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* MEHAR Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-48 sm:w-56 h-12 sm:h-14 relative">
              <Image
                src="/assets/logo/mehar-logo.svg"
                alt="MEHAR - Lawad Infrastructure Private Limited"
                fill
                priority
                className="object-contain object-left group-hover:opacity-95 transition-opacity"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

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
                      className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-[#00F59B] bg-[#00F59B]/5'
                          : 'text-[#CBD5E1] hover:text-white hover:bg-[#131F37]/50'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          productsDropdownOpen ? 'rotate-180 text-[#00F59B]' : 'text-[#64748B]'
                        }`}
                      />
                    </Link>

                    {/* Mega Dropdown Menu */}
                    {productsDropdownOpen && (
                      <div className="absolute top-full left-0 w-[440px] pt-2 z-50">
                        <div className="p-4 rounded-xl bg-[#0F172A] border border-[#1E293B] shadow-2xl shadow-black/80 backdrop-blur-xl">
                          <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#1E293B]">
                            <span className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider">
                              Broad Battery Categories
                            </span>
                            <Link
                              href="/products"
                              className="text-[11px] font-mono text-[#00D2FF] hover:text-[#00F59B] flex items-center gap-1"
                            >
                              All Solutions <ArrowUpRight className="w-3 h-3" />
                            </Link>
                          </div>

                          <div className="space-y-1">
                            {BROAD_CATEGORIES.map((cat) => (
                              <Link
                                key={cat.id}
                                href={`/products/${cat.slug}`}
                                className="block p-2.5 rounded-lg hover:bg-[#131F37] border border-transparent hover:border-[#1E293B] transition-all group"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-semibold text-white group-hover:text-[#00F59B] transition-colors">
                                    {cat.name}
                                  </span>
                                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                                    Specs Soon
                                  </span>
                                </div>
                                <p className="text-[11px] text-[#94A3B8] line-clamp-1 mt-0.5">
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
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#00F59B] bg-[#00F59B]/5'
                      : 'text-[#CBD5E1] hover:text-white hover:bg-[#131F37]/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Primary Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              href="/contact?type=rfq"
              variant="primary"
              size="sm"
              icon={<ArrowUpRight className="w-4 h-4" />}
            >
              Request a Quote
            </Button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              href="/contact?type=rfq"
              variant="primary"
              size="sm"
              className="text-xs px-3 py-1.5"
            >
              RFQ
            </Button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#131F37] border border-[#1E293B] text-white hover:text-[#00F59B] transition-colors"
              aria-label="Toggle Mobile Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[113px] bg-[#080D1A]/98 border-b border-[#1E293B] shadow-2xl backdrop-blur-2xl max-h-[calc(100vh-120px)] overflow-y-auto">
          <div className="p-5 space-y-4">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <div key={link.href} className="border-b border-[#1E293B]/40 pb-1">
                    <Link
                      href={link.href}
                      className={`block px-3 py-2.5 rounded-lg text-sm font-semibold ${
                        isActive
                          ? 'text-[#00F59B] bg-[#00F59B]/10'
                          : 'text-white hover:bg-[#131F37]'
                      }`}
                    >
                      {link.label}
                    </Link>

                    {link.hasDropdown && (
                      <div className="pl-4 pr-2 py-2 space-y-1.5 bg-[#0F172A]/50 rounded-lg mt-1 border border-[#1E293B]/50">
                        <span className="text-[10px] font-mono text-[#94A3B8] uppercase block mb-1">
                          Categories:
                        </span>
                        {BROAD_CATEGORIES.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/products/${cat.slug}`}
                            className="block py-1.5 text-xs text-[#CBD5E1] hover:text-[#00F59B]"
                          >
                            • {cat.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#1E293B] space-y-2">
              <Button
                href="/contact?type=rfq"
                variant="primary"
                size="md"
                className="w-full justify-center"
              >
                Submit B2B Quotation Request
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
