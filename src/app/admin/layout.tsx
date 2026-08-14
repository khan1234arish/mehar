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
  return <div className="min-h-screen bg-theme-base text-theme-primary transition-colors duration-200">{children}</div>;
}
