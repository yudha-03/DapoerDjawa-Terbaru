import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';

import { Footer } from '@/components/layout/Footer';
import { escapeJsonLd } from '@/lib/sanitize';
import { STORE_NAME } from '@/lib/store-defaults';
import { PRODUCTS, VARIANTS, REVIEWS, type Product } from '@/lib/data';
import DetailClient from './components/DetailClient';

export const revalidate = 300;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function resolveProduct(idOrSlug: string): Product | undefined {
  const isUuid = UUID_RE.test(idOrSlug);
  if (isUuid) {
    const found = PRODUCTS.find((p) => p.id === idOrSlug);
    if (found?.slug) {
      permanentRedirect(`/product/${found.slug}`);
    }
    return found;
  }
  return PRODUCTS.find((p) => p.slug === idOrSlug || p.id === idOrSlug);
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  if (!id) return { title: 'URL Tidak Valid' };

  const data = resolveProduct(id);
  if (!data) notFound();

  const slug = data.slug || id;
  const title = data.nama_produk;
  const description = data.deskripsi
    ? data.deskripsi.slice(0, data.deskripsi.lastIndexOf(' ', 150) > 80 ? data.deskripsi.lastIndexOf(' ', 150) : 150)
    : `Kue kering premium dari ${STORE_NAME}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/product/${slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: { canonical: `/product/${slug}` },
    other: { 'product:price:amount': '', 'product:price:currency': 'IDR' },
  };
}

export default async function DetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idOrSlug } = await params;

  const foundProduct = resolveProduct(idOrSlug);

  if (!foundProduct) {
    notFound();
  }

  const productId = foundProduct.id;
  const productVariants = VARIANTS.filter((v) => v.produk_id === productId);
  const productReviews = REVIEWS.filter((r) => r.produk_id === productId).map((r) => ({
    id: r.id,
    produk_id: r.produk_id,
    varian_id: r.varian_id || productVariants[0]?.id || 'var-1',
    user_id: r.user_id,
    user_name: r.user_name || r.nama_user || 'Pelanggan',
    rating: r.rating,
    comment: r.comment,
    reply: r.reply ?? null,
    created_at: r.created_at,
  }));

  const product = {
    id: foundProduct.id,
    nama_produk: foundProduct.nama_produk,
    deskripsi: foundProduct.deskripsi,
    foto_2: foundProduct.foto_2,
    foto_3: productVariants[0]?.foto_3 ?? null,
    variants: productVariants,
  };

  const otherProducts = PRODUCTS.filter((p) => p.id !== productId);
  const fpGrowthProducts = otherProducts.slice(0, 3).map((p, idx) => {
    const v = VARIANTS.find((va) => va.produk_id === p.id);
    return {
      id: p.id,
      name: p.nama_produk,
      price: v?.price || 65000,
      image: v?.img || p.foto_2,
      confidence: Number((0.88 - idx * 0.05).toFixed(2)),
      support: Number((0.45 - idx * 0.04).toFixed(2)),
    };
  });

  const fallbackProducts = otherProducts.slice(2, 6).map((rp) => {
    const variant = VARIANTS.find((v) => v.produk_id === rp.id);
    return {
      id: rp.id,
      slug: rp.slug || rp.id,
      name: rp.nama_produk,
      price: variant?.price || 0,
      image: variant?.img || '/placeholder.png',
    };
  });

  const offers = product.variants.map((v) => ({
    '@type': 'Offer' as const,
    sku: v.id,
    price: v.price,
    priceCurrency: 'IDR',
    availability: v.stok > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    itemCondition: 'https://schema.org/NewCondition',
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.nama_produk,
    image: product.foto_2,
    description: product.deskripsi,
    brand: { '@type': 'Brand', name: 'DapoerDjawa' },
    sku: product.id,
    category: 'Kue Kering',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: product.variants.length > 0 ? Math.min(...product.variants.map((v) => v.price)) : 0,
      highPrice: product.variants.length > 0 ? Math.max(...product.variants.map((v) => v.price)) : 0,
      priceCurrency: 'IDR',
      offerCount: product.variants.length,
      availability: product.variants.some((v) => v.stok > 0)
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      offers,
    },
  };

  const safeJsonLd = escapeJsonLd(jsonLd);

  return (
    <section className="min-h-screen bg-white selection:bg-[#111111] selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd }} />
      <main className="mx-auto max-w-360 px-4 md:px-6 pt-24 md:pt-32 pb-10 md:pb-16">
        <DetailClient
          product={product}
          initialReviews={productReviews}
          fpGrowthProducts={fpGrowthProducts}
          fallbackProducts={fallbackProducts}
          recommendationSource="fp-growth"
        />
      </main>
      <Footer />
    </section>
  );
}
