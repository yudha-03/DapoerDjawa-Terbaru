import type { Metadata } from 'next';
import Link from 'next/link';

import { STORE_NAME, STORE_DOMAIN } from '@/lib/store-defaults';

const pageTitle = `Tentang ${STORE_NAME} - Toko Kue Kering Rumahan Balikpapan`;
const pageDescription =
  `${STORE_NAME} adalah toko kue kering rumahan di Balikpapan, Kalimantan Timur. Berdiri sejak 2020, menyajikan 12 varian kue kering premium dari bahan baku lokal tanpa pengawet buatan.`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: '/tentang' },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${STORE_DOMAIN}/tentang`,
    siteName: STORE_NAME,
    type: 'website',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
  },
};

export default function TentangPage() {
  return (
    <article>
      <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
        Apa Itu {STORE_NAME}?
      </h1>
      <p className="mb-10 text-sm text-gray-500">
        Mengenal lebih dekat toko kue kering rumahan dari Balikpapan
      </p>

      <div className="space-y-10 text-gray-700">
        {/* AEO lead answer */}
        <section>
          <p className="leading-relaxed">
            {STORE_NAME} adalah usaha kue kering rumahan yang berlokasi di Perum BDS 2, Balikpapan,
            Kalimantan Timur. Didirikan pada tahun 2020, {STORE_NAME} memproduksi 12 varian kue
            kering premium menggunakan bahan baku lokal berkualitas tanpa pengawet buatan. Setiap
            produk tersedia dalam kemasan 300 gram dan 500 gram. {STORE_NAME} melayani pemesanan
            online dengan pengiriman ke seluruh Indonesia melalui berbagai ekspedisi.
          </p>
        </section>

        {/* Siapa di balik DapoerDjawa */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Siapa yang Membuat Kue Kering {STORE_NAME}?
          </h2>
          <p className="leading-relaxed">
            {STORE_NAME} dikelola oleh Ibu pemilik usaha yang memulai bisnis kue kering dari dapur
            rumah di Balikpapan. Berawal dari hobi membuat kue untuk keluarga dan tetangga, kini
            {' '}{STORE_NAME} telah melayani ratusan pelanggan di berbagai kota. Setiap kue kering
            dibuat secara langsung oleh tim kecil yang memastikan konsistensi rasa dan kualitas di
            setiap batch produksi.
          </p>
        </section>

        {/* Filosofi produk */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Mengapa {STORE_NAME} Memilih Bahan Baku Lokal?
          </h2>
          <p className="leading-relaxed">
            Kami percaya bahwa bahan baku lokal dari Kalimantan Timur mampu menghasilkan kue kering
            dengan cita rasa autentik. Mentega, tepung terigu, telur, gula, dan bahan lainnya
            diperoleh dari pemasok terpercaya di sekitar Balikpapan. Rantai distribusi yang pendek
            menjamin kesegaran bahan. Tidak ada pengawet buatan, pewarna sintetis, atau bahan kimia
            tambahan dalam resep kami. Aroma dan rasa yang Anda nikmati murni berasal dari kualitas
            bahan dan teknik pembuatan yang telah teruji.
          </p>
        </section>

        {/* Produk */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Apa Saja Produk {STORE_NAME}?
          </h2>
          <p className="mb-4 leading-relaxed">
            Saat ini {STORE_NAME} menyediakan 12 varian kue kering yang terbagi dalam beberapa
            kategori. Seluruh produk dapat dilihat di halaman{' '}
            <Link href="/kue-kering" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Kue Kering
            </Link>.
          </p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {[
              { name: 'Nastar Classic', slug: 'nastar-classic' },
              { name: 'Nastar Daun', slug: 'nastar-daun' },
              { name: 'Nastar Keranjang', slug: 'nastar-keranjang' },
              { name: 'Kastengel Keju', slug: 'kastengel-keju' },
              { name: 'Cookies Cokelat', slug: 'cookies-cokelat' },
              { name: 'Cookies Cokelat & Vanila', slug: 'cookies-cokelat-vanila' },
              { name: 'Kue Kacang', slug: 'kue-kacang' },
              { name: 'Sagu Keju', slug: 'sagu-keju' },
              { name: 'Lidah Kucing', slug: 'lidah-kucing' },
              { name: 'Putri Salju', slug: 'putri-salju' },
              { name: 'Semprit Bunga', slug: 'semprit-bunga' },
              { name: 'Semprit Panjang', slug: 'semprit-panjang' },
            ].map((p) => (
              <Link
                key={p.slug}
                href={`/product/${p.slug}`}
                className="rounded-lg border border-gray-100 px-3 py-2 text-sm font-medium text-gray-800 transition-colors hover:border-gray-300 hover:bg-gray-50"
              >
                {p.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Lokasi */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Di Mana Lokasi {STORE_NAME}?
          </h2>
          <p className="leading-relaxed">
            {STORE_NAME} berlokasi di Perum BDS 2, Balikpapan, Kalimantan Timur, Indonesia.
            Produksi dilakukan di dapur rumahan yang bersih dan higienis. Meskipun kami tidak
            memiliki toko fisik untuk kunjungan langsung, seluruh pemesanan dapat dilakukan secara
            online melalui website ini. Informasi pengiriman lengkap tersedia di halaman{' '}
            <Link href="/delivery-balikpapan" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Pengiriman Balikpapan
            </Link>.
          </p>
        </section>

        {/* Teknologi */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Bagaimana Sistem Pemesanan Online {STORE_NAME}?
          </h2>
          <p className="leading-relaxed">
            Website {STORE_NAME} dirancang untuk memudahkan pelanggan dalam berbelanja kue kering
            secara online. Sistem kami dilengkapi dengan fitur rekomendasi bundling produk yang
            menggunakan algoritma FP-Growth untuk menganalisis pola belanja pelanggan. Apabila Anda
            melihat halaman produk atau keranjang belanja, sistem akan menampilkan produk yang sering
            dibeli bersamaan. Pembayaran diproses melalui Midtrans yang mendukung transfer bank,
            e-wallet, kartu kredit, dan gerai retail. Ongkos kirim dihitung otomatis melalui
            Biteship berdasarkan alamat tujuan.
          </p>
        </section>

        {/* Nilai */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Apa yang Membedakan {STORE_NAME}?
          </h2>
          <ul className="space-y-3 pl-5 list-disc leading-relaxed">
            <li>Bahan baku lokal berkualitas dari pemasok terpercaya di Balikpapan</li>
            <li>Tanpa pengawet buatan, pewarna sintetis, atau bahan kimia tambahan</li>
            <li>Diproduksi dalam batch kecil untuk menjaga konsistensi rasa</li>
            <li>12 varian kue kering dengan dua pilihan kemasan (300gr dan 500gr)</li>
            <li>Rekomendasi bundling cerdas berdasarkan data belanja pelanggan</li>
            <li>Pengiriman ke seluruh Indonesia dengan pengemasan aman (bubble wrap + kardus)</li>
            <li>Masa simpan 2-3 bulan dalam wadah kedap udara</li>
          </ul>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-gray-100 bg-gray-50 p-6 md:p-8">
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Ingin Mencoba Kue Kering {STORE_NAME}?
          </h2>
          <p className="leading-relaxed">
            Kunjungi halaman{' '}
            <Link href="/#shop" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Toko
            </Link>{' '}
            untuk melihat seluruh produk kami, atau baca{' '}
            <Link href="/faq" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              FAQ
            </Link>{' '}
            apabila ada pertanyaan seputar pemesanan, pengiriman, atau pembayaran. Anda juga bisa
            langsung menghubungi kami melalui halaman{' '}
            <Link href="/contact" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900">
              Kontak
            </Link>.
          </p>
        </section>
      </div>
    </article>
  );
}
