'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Layers,
  FileSpreadsheet,
  FileText,
  Building2,
  PhoneCall,
  Edit3,
  ShieldCheck,
  KeyRound,
  BarChart3,
  LogOut,
  X,
} from 'lucide-react';

interface SidebarProps {
  user?: {
    name: string;
    email: string;
    role: string;
  };
  onCloseMobile?: () => void;
}

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Website Analytics', href: '/admin/analytics', icon: BarChart3 },
  { label: 'Products & Specs', href: '/admin/products', icon: Layers },
  { label: 'Enquiries & RFQs', href: '/admin/enquiries', icon: FileSpreadsheet },
  { label: 'Resource Center', href: '/admin/resources', icon: FileText },
  { label: 'Company Settings', href: '/admin/company-settings', icon: Building2 },
  { label: 'Sales & Desks', href: '/admin/sales-settings', icon: PhoneCall },
  { label: 'Website Content', href: '/admin/content', icon: Edit3 },
  { label: 'Audit Logs', href: '/admin/audit-logs', icon: ShieldCheck },
  { label: 'Change Password', href: '/admin/change-password', icon: KeyRound },
];

export default function AdminSidebar({ user, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
    } catch {
      // Continue with client redirection
    }
    window.location.href = '/admin/login';
  };

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  return (
    <aside className="w-64 bg-[#070A0E] border-r border-[#1E2633] flex flex-col h-full select-none">
      {/* Header */}
      <div className="p-5 border-b border-[#1E2633] flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-32 sm:w-36 h-13 sm:h-14 relative">
            <Image
              src="/assets/logo/mehar-logo.png"
              alt="MEHAR Admin"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-lg hover:bg-white/[0.04] text-[#A3AAB5] md:hidden"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B] mb-2">
          Administrative Modules
        </p>

        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                active
                  ? 'bg-[#39D353]/10 text-[#39D353] border border-[#39D353]/30 shadow-[0_0_12px_rgba(57,211,83,0.15)]'
                  : 'text-[#A3AAB5] hover:bg-white/[0.04] hover:text-[#E6EAF0]'
              }`}
            >
              <item.icon className={`w-4 h-4 shrink-0 ${active ? 'text-[#39D353]' : 'text-[#64748B]'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Admin User Info & Logout */}
      <div className="p-4 border-t border-[#1E2633] space-y-3 bg-[#0B0F14]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#161C24] border border-[#39D353]/30 flex items-center justify-center font-bold text-xs text-[#39D353] shrink-0">
            {user?.name ? user.name[0].toUpperCase() : 'A'}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-[#E6EAF0] truncate">{user?.name || 'Administrator'}</p>
            <p className="text-[10px] font-mono text-[#64748B] truncate">{user?.email || 'admin'}</p>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-[#1E2633]">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
            {user?.role || 'SUPER_ADMIN'}
          </span>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
