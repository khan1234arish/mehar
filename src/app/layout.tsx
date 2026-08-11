import type { Metadata } from 'next';
import './globals.css';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MeharAssistant from '@/components/chat/MeharAssistant';

export const metadata: Metadata = {
  title: 'MEHAR Batteries | Lawad Infrastructure Private Limited | Official B2B Platform',
  description: 'Official B2B platform for MEHAR battery systems and energy storage solutions by Lawad Infrastructure Private Limited.',
  keywords: ['MEHAR', 'Lawad Infrastructure Private Limited', 'Battery Manufacturer India', 'B2B Battery Supplier', 'EV Battery Pack', 'Inverter Battery', 'Solar Energy Storage'],
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
