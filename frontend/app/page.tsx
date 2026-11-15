import { Suspense } from 'react';
import { Metadata } from 'next';

import MainPageClient from '@/components/home/MainPageClient';
import HomepageSkeleton from '@/components/home/HomepageSkeleton';
import { STORE_DOMAIN, STORE_NAME, STORE_TAGLINE } from '@/lib/store-defaults';
import { HERO_BANNERS, PRODUCTS, VARIANTS } from '@/lib/data';
import type { Banner } from '@/components/home/HeroCarousel';
import type { Product } from '@/components/home/ProductGrid';

export const revalidate = 300;

export const metadata: Metadata = {
  title: `${STORE_NAME} | ${STORE_TAGLINE}`,
  description: `Nikmati aneka kue kering premium khas rumahan dari ${STORE_NAME} Balikpapan. Tersedia Nastar, Kastengel, Putri Salju, dan varian cookies lezat lainnya.`,
  keywords: ['kue kering balikpapan', 'nastar premium', STORE_NAME.toLowerCase(), 'toko kue balikpapan', 'kue lebaran'],
  alternates: { canonical: '/' },
  openGraph: {
    title: `${STORE_NAME} - Toko Kue Kering Premium`,
    description: `Aneka kue kering premium khas rumahan dari ${STORE_NAME} Balikpapan.`,
    url: STORE_DOMAIN,
    siteName: STORE_NAME,
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${STORE_NAME} - Toko Kue Kering Premium`,
    description: `Aneka kue kering premium khas rumahan dari ${STORE_NAME} Balikpapan.`,
  },
};

function HomepageContent() {
  const banners: Banner[] = HERO_BANNERS.filter((b) => b.is_active).map((b) => ({
    id: b.id,
    img: b.image_url,
    alt: b.title || 'Hero Banner Dapoer Djawa',
    link: b.link_url,
    title: b.title || null,
    subtitle: b.subtitle || null,
    promoCode: b.promo_code || null,
    ctaText: b.cta_text || null,
  }));

  const products: Product[] = PRODUCTS.map((p) => {
    const variants = VARIANTS.filter((v) => v.produk_id === p.id);
    const minPrice = variants.length ? Math.min(...variants.map((v) => v.price)) : 0;
    return {
      id: p.id,
      name: p.nama_produk,
      price: minPrice,
      img: variants[0]?.img ?? p.foto_2,
      link: `/product/${p.slug || p.id}`,
    };
  });

  return <MainPageClient banners={banners} products={products} />;
}

export default function MainPage() {
  return (
    <Suspense fallback={<HomepageSkeleton />}>
      <HomepageContent />
    </Suspense>
  );
}
