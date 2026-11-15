import type { Metadata } from 'next';
import { Suspense } from 'react';

import CheckoutClient from './components/CheckoutClient';
import Loading from './loading';

export const metadata: Metadata = {
  title: 'Pembayaran',
  description: 'Selesaikan pesanan dan pembayaran Anda.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/checkout' },
};

export default function CheckoutPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CheckoutClient />
    </Suspense>
  );
}
