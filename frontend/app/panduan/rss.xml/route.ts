import { STORE_DOMAIN, STORE_NAME } from '@/lib/store-defaults';

const PANDUAN_PAGES = [
  {
    title: 'Cara Menyimpan Kue Kering agar Tetap Renyah',
    path: '/panduan/cara-menyimpan-kue-kering',
    description: 'Panduan praktis menyimpan kue kering: wadah kedap udara, suhu ruang, tips per jenis kue.',
    date: '2026-11-01',
  },
  {
    title: 'Kue Kering Tahan Berapa Lama? Panduan Masa Simpan',
    path: '/panduan/kue-kering-tahan-berapa-lama',
    description: 'Kue kering bertahan 2-3 bulan dalam wadah kedap udara. Faktor yang mempengaruhi dan tips iklim tropis.',
    date: '2026-11-01',
  },
  {
    title: 'Kue Kering untuk Hajatan - Panduan Pemesanan',
    path: '/panduan/kue-kering-untuk-hajatan',
    description: 'Panduan memesan kue kering untuk acara hajatan: estimasi jumlah, produk yang cocok, lead time.',
    date: '2026-11-01',
  },
  {
    title: 'Kue Kering Khas Kalimantan Timur',
    path: '/panduan/kue-kering-khas-kalimantan-timur',
    description: 'Peran kue kering dalam budaya dan acara sosial di Kalimantan Timur, khususnya Balikpapan.',
    date: '2026-11-01',
  },
];

function buildRss(): string {
  const items = PANDUAN_PAGES.map(
    (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${STORE_DOMAIN}${p.path}</link>
      <description>${escapeXml(p.description)}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${STORE_DOMAIN}${p.path}</guid>
    </item>`
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Panduan Kue Kering - ${STORE_NAME}</title>
    <link>${STORE_DOMAIN}/panduan</link>
    <description>Panduan lengkap seputar kue kering dari ${STORE_NAME}, Balikpapan.</description>
    <language>id</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${STORE_DOMAIN}/panduan/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function GET() {
  const xml = buildRss();
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
