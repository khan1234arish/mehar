import type { Metadata, Viewport } from 'next';
import './globals.css';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MeharAssistant from '@/components/chat/MeharAssistant';
import { Analytics } from '@vercel/analytics/react';


const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.meharbatteries.com';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'MEHAR – The Name You Trust | Official B2B Battery Platform',
    template: '%s | MEHAR – The Name You Trust',
  },
  description:
    'Official B2B platform for MEHAR battery systems and clean energy storage solutions by Lawad Infrastructure Private Limited. Supplying commercial EV OEMs, solar integrators, and industrial distributors across India.',
  keywords: [
    'MEHAR',
    'THE NAME YOU TRUST',
    'Battery Manufacturer',
    'Lithium Battery Solutions',
    'Solar Energy Storage',
    'Industrial Battery Systems',
    'OEM Battery Solutions',
    'B2B Battery Supplier',
    'Custom OEM Battery Engineering',
    'Lawad Infrastructure Private Limited',
  ],
  authors: [{ name: 'Lawad Infrastructure Private Limited' }],
  creator: 'Lawad Infrastructure Private Limited',
  publisher: 'MEHAR Batteries',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    title: 'MEHAR – The Name You Trust | Official B2B Battery Platform',
    description:
      'Official B2B platform for MEHAR battery systems and clean energy storage solutions by Lawad Infrastructure Private Limited.',
    siteName: 'MEHAR – The Name You Trust',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MEHAR – The Name You Trust | Official B2B Battery Platform',
    description:
      'Official B2B platform for MEHAR battery systems and clean energy storage solutions by Lawad Infrastructure Private Limited.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/assets/logo/mehar-logo.png" />
      </head>
      <body className="min-h-screen bg-[#0B0F14] text-[#E6EAF0] antialiased flex flex-col justify-between selection:bg-[#39D353]/30 selection:text-[#39D353]">
        <div>
          <TopBar />
          <Header />
          <main>{children}</main>
        </div>
        <Footer />
        {/* Persistent Floating B2B Assistant */}
        <MeharAssistant />
        {/* Official Vercel Web Analytics Provider */}
        <Analytics />
      </body>
    </html>
  );
}

