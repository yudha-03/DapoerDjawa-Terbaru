import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DapoerDjawa - Kue Kering Khas Hari Raya',
    short_name: 'DapoerDjawa',
    description:
      'Toko online kue kering khas hari raya - Nastar, Kastengel, Putri Salju, dan lainnya',
    start_url: '/',
    display: 'standalone',
    background_color: '#fffbeb',
    theme_color: '#d97706',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
