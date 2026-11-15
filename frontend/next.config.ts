import path from 'path';
import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    useOffline: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [64, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  async headers() {
    // Midtrans sandbox origins only needed in development
    const midtransSandbox = isDev
      ? 'https://app.sandbox.midtrans.com https://snap-assets.sandbox.midtrans.com'
      : '';

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              `default-src 'self'`,
              `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval' " : ''}https://app.midtrans.com https://snap-assets.midtrans.com ${midtransSandbox} https://*.google.com https://static.cloudflareinsights.com`.trim(),
              `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
              `font-src 'self' https://fonts.gstatic.com`,
              `img-src 'self' data: blob: https://images.unsplash.com https://venfarpomhxvaaimvoqc.supabase.co https://lh3.googleusercontent.com`,
              `connect-src 'self' https://venfarpomhxvaaimvoqc.supabase.co wss://venfarpomhxvaaimvoqc.supabase.co https://dapoerdjawa.onrender.com https://app.midtrans.com ${isDev ? 'https://app.sandbox.midtrans.com ' : ''}https://*.google.com https://static.cloudflareinsights.com https://cloudflareinsights.com`.trim(),
              `frame-src 'self' https://app.midtrans.com ${isDev ? 'https://app.sandbox.midtrans.com' : ''}`.trim(),
              `object-src 'none'`,
              `base-uri 'self'`,
              `form-action 'self'`,
              `frame-ancestors 'none'`,
            ].join('; '),
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(self)',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
