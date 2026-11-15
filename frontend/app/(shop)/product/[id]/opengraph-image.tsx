import { ImageResponse } from 'next/og';
import { PRODUCTS, VARIANTS } from '@/lib/data';
import { formatRupiah } from '@/lib/api';

export const alt = 'Produk DapoerDjawa';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = PRODUCTS.find((p) => p.slug === id || p.id === id) || PRODUCTS[0];
  const name = product.nama_produk;
  const variants = VARIANTS.filter((v) => v.produk_id === product.id);
  const minPrice = variants.length ? Math.min(...variants.map((v) => v.price)) : 0;
  const priceLabel = minPrice > 0 ? `Mulai ${formatRupiah(minPrice)}` : '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFBEB',
          padding: 80,
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: '#B45309',
              letterSpacing: '-0.02em',
            }}
          >
            DapoerDjawa
          </span>
          <span
            style={{
              fontSize: 20,
              color: '#92400E',
              marginLeft: 12,
              fontWeight: 500,
            }}
          >
            Kue Kering Premium Balikpapan
          </span>
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: '#1F2937',
            textAlign: 'center',
            lineHeight: 1.15,
            maxWidth: 1000,
            marginBottom: 24,
          }}
        >
          {name}
        </div>
        {priceLabel && (
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#D97706',
              backgroundColor: '#FEF3C7',
              padding: '12px 28px',
              borderRadius: 9999,
            }}
          >
            {priceLabel}
          </div>
        )}
      </div>
    ),
    { ...size }
  );
}
