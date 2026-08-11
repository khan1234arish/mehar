import type { Metadata } from 'next';
import './globals.css';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'MEHAR Batteries | Lawad Infrastructure Private Limited | Official B2B Platform',
  description: 'Official B2B manufacturer website for MEHAR battery systems and energy storage solutions by Lawad Infrastructure Private Limited.',
  keywords: ['MEHAR', 'Lawad Infrastructure Private Limited', 'Battery Manufacturer', 'B2B Battery Supplier', 'EV Battery Pack', 'Inverter Battery', 'Solar Energy Storage'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/assets/logo/mehar-logo-icon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-[#080D1A] text-white antialiased flex flex-col justify-between selection:bg-[#00F59B]/20 selection:text-[#00F59B]">
        <div>
          <TopBar />
          <Header />
          <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
