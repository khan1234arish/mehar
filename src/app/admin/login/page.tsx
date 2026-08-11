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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-[#0F172A]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4">
        <div className="w-48 h-12 relative mx-auto">
          <Image
            src="/assets/logo/mehar-logo.svg"
            alt="MEHAR"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E2E8F0] shadow-sm">
          <div className="w-2 h-2 rounded-full bg-[#059669]"></div>
          <span className="text-xs font-mono font-bold text-[#0F172A]">Administrative Access</span>
        </div>

        <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
          Admin Management Portal
        </h1>
        <p className="text-xs text-[#64748B]">
          Authorized personnel only. All access attempts are cryptographically verified and recorded in the audit log.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-[#E2E8F0] shadow-sm">
          <Suspense fallback={<div className="text-center text-xs text-[#64748B]">Loading login interface...</div>}>
            <LoginFormClient />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
