import type { Metadata, Viewport } from 'next';
import './globals.css';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MeharAssistant from '@/components/chat/MeharAssistant';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.meharbatteries.com';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'MEHAR Batteries | Lawad Infrastructure Private Limited | Official B2B Platform',
    template: '%s | MEHAR Batteries',
  },
  description:
    'Official B2B platform for MEHAR battery systems and energy storage solutions by Lawad Infrastructure Private Limited. Supplying commercial EV OEMs, solar integrators, and industrial distributors.',
  keywords: [
    'MEHAR',
    'Lawad Infrastructure Private Limited',
    'Battery Manufacturer India',
    'B2B Battery Supplier',
    'EV Battery Pack',
    'Inverter Battery',
    'Solar Energy Storage',
    'Lithium Iron Phosphate',
    'Custom OEM Battery Engineering',
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
    title: 'MEHAR Batteries | Lawad Infrastructure Private Limited | Official B2B Platform',
    description:
      'Official B2B platform for MEHAR battery systems and energy storage solutions by Lawad Infrastructure Private Limited.',
    siteName: 'MEHAR Batteries',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MEHAR Batteries | Official B2B Platform',
    description:
      'Official B2B platform for MEHAR battery systems and energy storage solutions by Lawad Infrastructure Private Limited.',
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
        <link rel="icon" href="/assets/logo/mehar-logo-icon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-white text-[#0F172A] antialiased flex flex-col justify-between selection:bg-[#10B981]/20 selection:text-[#065F46]">
        <div>
          <TopBar />
          <Header />
          <main>{children}</main>
        </div>
        <Footer />
        {/* Persistent Floating B2B Assistant */}
        <MeharAssistant />
      </body>
    </html>
  );
}
