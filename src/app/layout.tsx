import type { Metadata, Viewport } from 'next';
import './globals.css';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MeharAssistant from '@/components/chat/MeharAssistant';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { ThemeScript } from '@/components/theme/ThemeScript';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://meharbatteries.com';

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
    siteName: 'MEHAR',
    images: [
      {
        url: '/og-image.png',
        width: 1024,
        height: 559,
        alt: 'MEHAR – The Name You Trust',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MEHAR – The Name You Trust | Official B2B Battery Platform',
    description:
      'Official B2B platform for MEHAR battery systems and clean energy storage solutions by Lawad Infrastructure Private Limited.',
    images: [
      {
        url: '/og-image.png',
        width: 1024,
        height: 559,
        alt: 'MEHAR – The Name You Trust',
      },
    ],
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
  icons: {
    icon: [
      { url: '/assets/logo/mehar-symbol.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/assets/logo/mehar-symbol.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/assets/logo/mehar-symbol.png'],
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
        <link rel="icon" href="/assets/logo/mehar-symbol.png" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/logo/mehar-symbol.png" />
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
