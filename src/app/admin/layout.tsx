import React from 'react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'MEHAR Admin Management Portal',
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-[#0B0F14] text-[#E6EAF0]">{children}</div>;
}
