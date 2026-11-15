import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen bg-white selection:bg-[#111111] selection:text-white flex flex-col">
      <main className="mx-auto max-w-3xl px-4 md:px-6 pt-24 md:pt-32 pb-10 md:pb-16 flex-1">
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
