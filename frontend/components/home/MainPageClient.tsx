'use client';

import { useEffect, useRef } from 'react';

import { Footer } from '../layout/Footer';
import HeroCarousel, { Banner } from './HeroCarousel';
import ProductGrid, { Product } from './ProductGrid';

interface MainPageClientProps {
  banners: Banner[];
  products: Product[];
}

export default function MainPageClient({ banners, products }: MainPageClientProps) {
  const aboutRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = aboutRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('about-visible');
          observer.disconnect();
        }
      },
      { rootMargin: '-80px', threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-gray-50 text-gray-800 pt-24 min-h-screen">
      <HeroCarousel banners={banners} />
      <ProductGrid products={products} />
      <section
        ref={aboutRef}
        id="about"
        className="about-section bg-white py-12 border-t border-gray-200 scroll-mt-20"
      >
        <div className="container mx-auto px-5 max-w-4xl text-center md:text-left">
          <h2 className="about-h2 uppercase font-bold text-gray-900 text-xl mb-4">
            Tentang Kami
          </h2>
          <p className="about-p1 text-gray-600 text-base leading-relaxed mb-4 text-justify">
            Dapoer Djawa adalah UMKM rumahan yang bermula di Perum BDS 2, Balikpapan, pada awal 2020. Tanpa pabrik atau mesin canggih, operasional kami jalankan dengan ketekunan dalam menimbang, menguleni, dan memanggang adonan secara manual setiap hari.
          </p>
          <p className="about-p2 text-gray-600 text-base leading-relaxed text-justify">
            Kini, pesanan telah meluas menjangkau lebih banyak pelanggan secara online. Pertumbuhan ini mendorong kami untuk terus bertransformasi menjadi lebih profesional dalam melayani Anda.
          </p>
        </div>
      </section>
      <Footer />
    </section>
  );
}
