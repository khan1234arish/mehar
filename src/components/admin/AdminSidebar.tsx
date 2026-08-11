'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
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
  const router = useRouter();

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
    <aside className="w-64 bg-white border-r border-[#E2E8F0] flex flex-col h-full select-none">
      {/* Header */}
      <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-36 h-9 relative">
            <Image
              src="/assets/logo/mehar-logo.svg"
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
            className="p-1 rounded-lg hover:bg-[#F8FAFC] text-[#64748B] md:hidden"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-[#94A3B8] mb-2">
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
                  ? 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]'
                  : 'text-[#334155] hover:bg-[#F8FAFC] hover:text-[#059669]'
              }`}
            >
              <item.icon className={`w-4 h-4 shrink-0 ${active ? 'text-[#059669]' : 'text-[#64748B]'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Admin User Info & Logout */}
      <div className="p-4 border-t border-[#E2E8F0] space-y-3 bg-[#F8FAFC]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center font-bold text-xs text-[#059669] shrink-0">
            {user?.name ? user.name[0].toUpperCase() : 'A'}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-[#0F172A] truncate">{user?.name || 'Administrator'}</p>
            <p className="text-[10px] font-mono text-[#64748B] truncate">{user?.email || 'admin'}</p>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-[#E2E8F0]">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FEFCE8] text-[#854D0E] border border-[#FEF08A]">
            {user?.role || 'SUPER_ADMIN'}
          </span>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-xs font-semibold text-[#DC2626] hover:text-[#991B1B] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
