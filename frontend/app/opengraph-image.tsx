import { ImageResponse } from 'next/og';
import { STORE_NAME, STORE_TAGLINE } from '@/lib/store-defaults';

export const alt = `${STORE_NAME} - kue kering rumahan Balikpapan`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#fffbeb',
          padding: 64,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 72, fontWeight: 800, color: '#111111' }}>
            {STORE_NAME}
          </div>
          <div style={{ fontSize: 34, color: '#d97706', fontWeight: 600 }}>
            {STORE_TAGLINE}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 28, color: '#111111' }}>
            Nastar | Kastengel | Putri Salju | Sagu Keju | Lidah Kucing
          </div>
          <div style={{ fontSize: 22, color: '#6b7280' }}>
            Kue kering rumahan, dibuat di Balikpapan sejak 2020
          </div>
        </div>
      </div>
    ),
    size,
  );
}
