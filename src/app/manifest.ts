import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MEHAR – The Name You Trust',
    short_name: 'MEHAR',
    description: 'Official B2B platform for MEHAR battery systems and clean energy storage solutions by Lawad Infrastructure Private Limited.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B0F14',
    theme_color: '#059669',
    icons: [
      {
        src: '/favicon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: '/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
