import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';

import { STORE_NAME } from '@/lib/store-defaults';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Pesanan Berhasil',
  description: 'Terima kasih! Pesanan Anda telah berhasil dibuat dan sedang diproses.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/order-success' },
};

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { order_id } = await searchParams;
  const orderId = typeof order_id === 'string' ? order_id : 'ORD-2026-001';
  const invoiceNumber = `INV-${orderId.replace(/[^a-zA-Z0-9]/g, '').slice(-6).toUpperCase()}`;

  return (
    <section className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      <main className="container mx-auto max-w-lg px-4 sm:px-6 pt-28 md:pt-36 pb-16 flex-1 flex items-start justify-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 w-full text-center">
          <div className="flex justify-center mb-6 animate-[scale-in_0.5s_ease-out_both]">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-500" strokeWidth={1.5} />
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-2 animate-[fade-in-up_0.5s_ease-out_0.2s_both]">
            Pesanan Berhasil!
          </h1>
          <p className="text-gray-500 text-sm md:text-base mb-6">
            Terima kasih telah berbelanja di {STORE_NAME}. Pesanan Anda sedang disiapkan dengan penuh cinta.
          </p>

          <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left space-y-2 border border-gray-100">
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-gray-500">ID Pesanan</span>
              <span className="font-mono font-semibold text-gray-900">{orderId}</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-gray-500">Nomor Invoice</span>
              <span className="font-mono font-semibold text-gray-900">{invoiceNumber}</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-gray-500">Status Pembayaran</span>
              <span className="font-semibold text-green-600">Lunas (Simulasi)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/orders"
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50 transition text-sm"
            >
              Lihat Pesanan Saya
            </Link>
            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-black font-semibold text-white hover:bg-gray-800 transition text-sm shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              Lanjut Belanja
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </section>
  );
}
