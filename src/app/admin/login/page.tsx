import React, { Suspense } from 'react';
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
    <div className="min-h-screen bg-theme-base flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-theme-primary relative overflow-hidden transition-colors duration-200">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-theme-green/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-elevated border border-theme-border shadow-sm">
          <div className="w-2 h-2 rounded-full bg-theme-green shadow-sm"></div>
          <span className="text-xs font-mono font-bold text-theme-primary">Administrative Access</span>
        </div>

        <h1 className="text-2xl font-extrabold text-theme-primary tracking-tight">
          Admin Management Portal
        </h1>
        <p className="text-xs text-theme-secondary">
          Authorized personnel only. All access attempts are cryptographically verified and recorded in the audit log.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-theme-card py-8 px-6 sm:px-10 rounded-3xl border border-theme-border shadow-2xl">
          <Suspense fallback={<div className="text-center text-xs text-theme-secondary">Loading login interface...</div>}>
            <LoginFormClient />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
