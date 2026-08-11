import React from 'react';
import { redirect } from 'next/navigation';
import { verifyAdminSession } from '@/lib/auth';
import AdminLayoutClient from '@/components/admin/AdminLayoutClient';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifyAdminSession();

  if (!session.authenticated || !session.user) {
    redirect('/admin/login');
  }

  if (session.user.mustChangePassword) {
    redirect('/admin/change-password');
  }

  return (
    <AdminLayoutClient user={session.user}>
      {children}
    </AdminLayoutClient>
  );
}
