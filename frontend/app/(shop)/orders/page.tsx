import { Metadata } from 'next';

import { Footer } from '@/components/layout/Footer';
import HistoryClient from './components/HistoryClient';

export const metadata: Metadata = {
  title: 'Riwayat Pesanan',
  description: 'Lacak pesanan dan lihat riwayat transaksimu dengan mudah dan aman.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/orders' },
};

export default function OrdersPage() {
  return (
    <section className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      <main className="container mx-auto max-w-5xl px-4 sm:px-6 pt-24 md:pt-32 pb-16 flex-1">
        <HistoryClient />
      </main>
      <Footer />
    </section>
  );
}
