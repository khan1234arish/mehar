'use client';

import React from 'react';
import Link from 'next/link';
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
    <aside className="w-64 bg-theme-surface border-r border-theme-border flex flex-col h-full select-none transition-colors duration-200">
      {/* Header */}
      <div className="p-5 border-b border-theme-border flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-theme-green/10 border border-theme-green/30 flex items-center justify-center text-theme-green font-black text-sm font-mono">
            M
          </div>
          <div>
            <div className="text-sm font-black text-theme-primary tracking-tight">Admin Console</div>
            <div className="text-[10px] text-theme-secondary font-mono">Management Portal</div>
          </div>
        </Link>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-lg hover:bg-theme-elevated text-theme-secondary md:hidden"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-theme-muted mb-2">
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
                  ? 'bg-theme-green/10 text-theme-green border border-theme-green/30 shadow-sm'
                  : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-elevated border border-transparent'
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* User Info & Logout Footer */}
      <div className="p-4 border-t border-theme-border space-y-3 bg-theme-base/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-theme-green/10 border border-theme-green/30 flex items-center justify-center font-bold text-xs text-theme-green">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-theme-primary truncate">{user?.name || 'Administrator'}</p>
            <p className="text-[10px] font-mono text-theme-muted truncate">{user?.email || 'admin@mehar.com'}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-theme-elevated border border-theme-border text-xs font-bold text-red-500 dark:text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
