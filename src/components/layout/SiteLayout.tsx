'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

interface SiteLayoutProps {
  children: React.ReactNode;
  topBar: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
  assistant: React.ReactNode;
}

export default function SiteLayout({
  children,
  topBar,
  header,
  footer,
  assistant,
}: SiteLayoutProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <main className="flex-1 min-h-screen flex flex-col">{children}</main>;
  }

  return (
    <>
      <div className="flex flex-col flex-1">
        {topBar}
        {header}
        <main className="flex-1">{children}</main>
      </div>
      {footer}
      {assistant}
    </>
  );
}
