import React, { Suspense } from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { verifyAdminSession } from '@/lib/auth';
import LoginFormClient from '@/components/admin/LoginFormClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin Authentication | MEHAR Management Portal',
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  // If user is already authenticated, redirect to /admin
  const session = await verifyAdminSession();
  if (session.authenticated && session.user) {
    if (session.user.mustChangePassword) {
      redirect('/admin/change-password');
    }
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-[#0B0F14] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-[#E6EAF0] relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#39D353]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4 relative z-10">
        <div className="w-36 sm:w-44 h-24 sm:h-28 relative mx-auto">
          <Image
            src="/assets/logo/mehar-logo.png"
            alt="MEHAR"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161C24] border border-[#1E2633] shadow-sm">
          <div className="w-2 h-2 rounded-full bg-[#39D353] shadow-[0_0_8px_rgba(57,211,83,0.8)]"></div>
          <span className="text-xs font-mono font-bold text-[#E6EAF0]">Administrative Access</span>
        </div>

        <h1 className="text-2xl font-extrabold text-[#E6EAF0] tracking-tight">
          Admin Management Portal
        </h1>
        <p className="text-xs text-[#A3AAB5]">
          Authorized personnel only. All access attempts are cryptographically verified and recorded in the audit log.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[#11161D] py-8 px-6 sm:px-10 rounded-3xl border border-[#1E2633] shadow-2xl">
          <Suspense fallback={<div className="text-center text-xs text-[#A3AAB5]">Loading login interface...</div>}>
            <LoginFormClient />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
