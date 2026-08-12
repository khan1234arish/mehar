import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { verifyAdminSession } from '@/lib/auth';
import AnalyticsDashboardClient from '@/components/admin/AnalyticsDashboardClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Website Analytics & Telemetry | MEHAR Management Portal',
  robots: { index: false, follow: false },
};

export default async function AdminAnalyticsPage() {
  const session = await verifyAdminSession();

  if (!session.authenticated || !session.user) {
    redirect('/admin/login');
  }

  if (session.user.mustChangePassword) {
    redirect('/admin/change-password');
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 border-2 border-[#059669] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-mono text-[#64748B]">Loading analytics telemetry...</p>
          </div>
        </div>
      }
    >
      <AnalyticsDashboardClient />
    </Suspense>
  );
}
