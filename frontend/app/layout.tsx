import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Script from 'next/script';

import BackToTop from '@/components/layout/BackToTop';
import CookieConsent from '@/components/layout/CookieConsent';
import Navbar from '@/components/layout/Navbar';
import QueryProvider from '@/components/providers/QueryProvider';
import { AuthProvider } from '@/lib/auth-context';
import { ConfirmProvider } from '@/components/ui/ConfirmDialog';
import { CartModalProvider } from '@/components/ui/AddToCartModal';
import { Toaster } from '@/components/ui/toast';
import { STORE_DESCRIPTION, STORE_DOMAIN, STORE_NAME } from '@/lib/store-defaults';
import { JsonLd, buildRootGraph } from '@/components/seo/StructuredData';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === 'production' ? STORE_DOMAIN : 'http://localhost:3000'
  ),
  title: { default: STORE_NAME, template: '%s | ' + STORE_NAME },
  description: STORE_DESCRIPTION,
  keywords: [STORE_NAME, 'kue kering', 'cookies', 'kue kering Balikpapan', 'hampers kue', 'nastar', 'kastengel', 'putri salju', 'toko kue online', 'kue kering premium', 'UMKM Balikpapan'],
  manifest: '/manifest.webmanifest',
  robots: { index: true, follow: true },
  openGraph: {
    title: STORE_NAME,
    description: STORE_DESCRIPTION,
    url: STORE_DOMAIN,
    siteName: STORE_NAME,
    type: 'website',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: STORE_NAME,
    description: STORE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn('font-sans', inter.variable)}
    >
      <body className="font-sans font-normal text-gray-800 antialiased overflow-y-scroll" suppressHydrationWarning>
        <JsonLd data={buildRootGraph()} />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:text-black">
          Langsung ke konten utama
        </a>
        <QueryProvider>
          <AuthProvider>
            <ConfirmProvider>
              <CartModalProvider>
                <Navbar />
                <div id="main-content">{children}</div>
                <BackToTop />
                <CookieConsent />
                <Toaster />
              </CartModalProvider>
            </ConfirmProvider>
          </AuthProvider>
        </QueryProvider>
        {process.env.NEXT_PUBLIC_CF_BEACON_TOKEN && (
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token":"${process.env.NEXT_PUBLIC_CF_BEACON_TOKEN}"}`}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
