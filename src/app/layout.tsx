import type { Metadata, Viewport } from 'next';
import './globals.css';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MeharAssistant from '@/components/chat/MeharAssistant';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { ThemeScript } from '@/components/theme/ThemeScript';

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    const url = process.env.NEXT_PUBLIC_SITE_URL;
    return url.startsWith('http') ? url : `https://${url}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  return 'https://www.meharbatteries.com';
}

const siteUrl = resolveSiteUrl();

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0F14' },
  ],
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/assets/logo/mehar-logo.png" />
      </head>
      <body className="min-h-screen bg-theme-base text-theme-primary antialiased flex flex-col justify-between selection:bg-theme-green/30 selection:text-theme-green">
        <ThemeProvider>
          <div className="flex flex-col flex-1">
            <TopBar />
            <Header />
            <main className="flex-1">{children}</main>
          </div>
          <Footer />
          {/* Persistent Floating B2B Assistant */}
          <MeharAssistant />
          {/* Official Vercel Web Analytics Provider */}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
