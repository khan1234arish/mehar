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
} from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-sm'
          : 'bg-white border-b border-[#E2E8F0]'
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
                className="object-contain object-left group-hover:opacity-90 transition-opacity"
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
                      className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        isActive
                          ? 'text-[#059669] bg-[#ECFDF5]'
                          : 'text-[#334155] hover:text-[#059669] hover:bg-[#F8FAFC]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          productsDropdownOpen ? 'rotate-180 text-[#059669]' : 'text-[#64748B]'
                        }`}
                      />
                    </Link>

                    {/* Mega Dropdown Menu */}
                    {productsDropdownOpen && (
                      <div className="absolute top-full left-0 w-[440px] pt-2 z-50">
                        <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xl">
                          <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E2E8F0]">
                            <span className="text-[11px] font-mono font-bold text-[#64748B] uppercase tracking-wider">
                              Broad Battery Categories
                            </span>
                            <Link
                              href="/products"
                              className="text-[11px] font-mono font-semibold text-[#059669] hover:underline flex items-center gap-1"
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
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-[#059669] bg-[#ECFDF5]'
                      : 'text-[#334155] hover:text-[#059669] hover:bg-[#F8FAFC]'
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
              className="p-2 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] hover:text-[#059669] transition-colors"
              aria-label="Toggle Mobile Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[113px] bg-white border-b border-[#E2E8F0] shadow-xl max-h-[calc(100vh-120px)] overflow-y-auto">
          <div className="p-5 space-y-4">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <div key={link.href} className="border-b border-[#E2E8F0]/60 pb-1">
                    <Link
                      href={link.href}
                      className={`block px-3 py-2.5 rounded-lg text-sm font-bold ${
                        isActive
                          ? 'text-[#059669] bg-[#ECFDF5]'
                          : 'text-[#0F172A] hover:bg-[#F8FAFC]'
                      }`}
                    >
                      {link.label}
                    </Link>

                    {link.hasDropdown && (
                      <div className="pl-4 pr-2 py-2 space-y-1.5 bg-[#F8FAFC] rounded-lg mt-1 border border-[#E2E8F0]">
                        <span className="text-[10px] font-mono text-[#64748B] uppercase font-bold block mb-1">
                          Categories:
                        </span>
                        {BROAD_CATEGORIES.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/products/${cat.slug}`}
                            className="block py-1.5 text-xs text-[#334155] hover:text-[#059669] font-medium"
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

            <div className="pt-4 border-t border-[#E2E8F0] space-y-2">
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
