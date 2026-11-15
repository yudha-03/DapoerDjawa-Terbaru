import type { MetadataRoute } from 'next';
import { STORE_DOMAIN } from '@/lib/store-defaults';
import { PRODUCTS, VARIANTS } from '@/lib/data';

// Content-change dates, set by hand. Update ONLY when that page's copy changes.
const STATIC_PAGES: Array<{ path: string; lastModified: string }> = [
  { path: '/', lastModified: '2026-11-01' },
  { path: '/faq', lastModified: '2026-11-01' },
  { path: '/contact', lastModified: '2026-11-01' },
  { path: '/kue-kering', lastModified: '2026-11-01' },
  { path: '/hampers', lastModified: '2026-11-01' },
  { path: '/hampers-lebaran', lastModified: '2026-11-01' },
  { path: '/hampers-natal', lastModified: '2026-11-01' },
  { path: '/hampers-imlek', lastModified: '2026-11-01' },
  { path: '/delivery-balikpapan', lastModified: '2026-11-01' },
  { path: '/tentang', lastModified: '2026-11-01' },
  { path: '/panduan/cara-menyimpan-kue-kering', lastModified: '2026-11-01' },
  { path: '/panduan/kue-kering-tahan-berapa-lama', lastModified: '2026-11-01' },
  { path: '/panduan/kue-kering-untuk-hajatan', lastModified: '2026-11-01' },
  { path: '/panduan/kue-kering-khas-kalimantan-timur', lastModified: '2026-11-01' },
  { path: '/terms-conditions', lastModified: '2026-10-01' },
  { path: '/return-policy', lastModified: '2026-10-01' },
  { path: '/privacy-policy', lastModified: '2026-10-01' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = STORE_DOMAIN;

  const productEntries: MetadataRoute.Sitemap = PRODUCTS.map((p) => {
    const productVariants = VARIANTS.filter((v) => v.produk_id === p.id);
    return {
      url: `${base}/product/${p.slug || p.id}`,
      lastModified: new Date(p.created_at),
      images: [...new Set(productVariants.map((v) => v.img).filter(Boolean))],
    };
  });

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((p) => ({
    url: `${base}${p.path}`,
    lastModified: new Date(p.lastModified),
  }));

  return [...staticEntries, ...productEntries];
}
