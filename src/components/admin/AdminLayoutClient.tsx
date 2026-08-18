'use client';

import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import ThemeToggle from '@/components/theme/ThemeToggle';
import { Menu, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface ClientLayoutProps {
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
    mustChangePassword: boolean;
  };
  children: React.ReactNode;
}

export default function AdminLayoutClient({ user, children }: ClientLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-theme-base flex text-theme-primary transition-colors duration-200">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 shrink-0 h-screen sticky top-0">
        <AdminSidebar user={user} />
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-10 w-64 h-full bg-theme-surface shadow-2xl">
            <AdminSidebar user={user} onCloseMobile={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="h-16 bg-theme-base/90 backdrop-blur-xl border-b border-theme-border px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 rounded-lg bg-theme-elevated border border-theme-border text-theme-primary md:hidden"
              aria-label="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-theme-green">CMS</span>
              <span className="text-theme-border-strong">/</span>
              <span className="text-xs font-bold text-theme-primary truncate">
                MEHAR Battery Systems
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <ThemeToggle variant="compact" />

            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-theme-elevated border border-theme-border text-theme-secondary hover:text-theme-green hover:border-theme-green/50 transition-colors flex items-center gap-1 text-[11px]"
            >
              <span>View Public Site ↗</span>
            </Link>

            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-theme-green/10 border border-theme-green/30 text-theme-green text-[11px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Role: {user?.role || 'SUPER_ADMIN'}</span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Container */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 bg-theme-base">
          {children}
        </main>
      </div>
    </div>
  );
}
