'use client';

import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
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
    <div className="min-h-screen bg-[#F8FAFC] flex text-[#0F172A]">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 shrink-0 h-screen sticky top-0">
        <AdminSidebar user={user} />
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-10 w-64 h-full bg-white shadow-2xl">
            <AdminSidebar user={user} onCloseMobile={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-[#E2E8F0] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] md:hidden"
              aria-label="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#059669]">CMS</span>
              <span className="text-[#CBD5E1]">/</span>
              <span className="text-xs font-bold text-[#0F172A] truncate">
                MEHAR Battery Systems
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <Link
              href="/"
              target="_blank"
              className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-[#475569] hover:text-[#059669] hover:border-[#059669] transition-colors flex items-center gap-1 text-[11px]"
            >
              <span>View Public Site ↗</span>
            </Link>

            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-[11px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
              <span>Admin Role: {user?.role || 'SUPER_ADMIN'}</span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Container */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
