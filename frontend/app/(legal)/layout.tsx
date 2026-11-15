import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen w-full bg-gray-50 pb-16 text-base leading-normal tracking-normal text-gray-800 selection:bg-[#111111] selection:text-white flex flex-col">
      <main className="container mx-auto w-full max-w-3xl px-6 pt-24 flex-1">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke Beranda
        </Link>
        {children}
      </main>
      <Footer />
    </section>
  );
}
